import { CategoryService } from './../../../Services/Category/category.service';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PaginationModel } from '../../../models/pagination/pagination-model';
import { GeneralCategoryDetailsViewModel } from '../../../models/category/general-category-details-view-model';
import { MatSort } from '@angular/material/sort';
import { NgIf, isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-categories',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.css',
})
export class AllCategoriesComponent implements OnInit {
  paginationModel: PaginationModel = {
    startRow: 0,
    endRow: 100,
  };

  allCategories: GeneralCategoryDetailsViewModel[] = [];

  displayedColumns: string[] = ['#', 'Name', 'ArticlesCount', 'Options'];
  dataSource = new MatTableDataSource<GeneralCategoryDetailsViewModel>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getAllCategories();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }

  getAllCategories(lastPage: number = 0): void {
    this.categoryService.getAllCategories(this.paginationModel).subscribe(
      (response) => {
        if (response.success) {
          if (this.paginationModel.startRow === 0) {
            this.allCategories = response.data;
            this.dataSource.data = response.data;
            this.dataSource.paginator = this.paginator;
          } else {
            this.allCategories = this.allCategories.concat(response.data);
            this.dataSource.data = this.allCategories;
            this.dataSource.paginator = this.paginator;
            this.paginator.pageIndex = lastPage;
          }
        } else {
          console.log(response.message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  pageChanged(event: any): void {
    this.paginationModel.startRow = event.pageIndex * event.pageSize;
    this.paginationModel.endRow =
      this.paginationModel.startRow + event.pageSize;

    if (this.paginationModel.endRow >= this.allCategories.length) {
      if (
        this.allCategories.length - this.paginationModel.startRow <=
        event.pageSize * 2
      ) {
        this.paginationModel.endRow = this.allCategories.length + 100;
        this.getAllCategories(event.previousPageIndex + 2);
      }
    }
  }

  create(): void {
    Swal.fire({
      title: 'Create Category',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Create',
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        return this.categoryService.createCategory({ name }).toPromise();
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
      .then((result) => {
        if (result.isConfirmed && result.value.success) {
          const newCategory = result.value.data;
          this.allCategories.unshift(newCategory);
          this.dataSource.data = [...this.dataSource.data];
          Swal.fire('Success', 'Category created successfully', 'success');
        } else if (result.isConfirmed && !result.value.success) {
          Swal.fire(
            'Error',
            result.value.message || 'Failed to create category',
            'error'
          );
        }
      })
      .catch((error) => {
        Swal.fire(
          'Error',
          error.message || 'An unexpected error occurred',
          'error'
        );
      });
  }

  edit(id: number): void {
    const index = this.dataSource.data.findIndex((c) => c.id === id);
    if (index === -1) {
      Swal.fire('Error', 'Category not found', 'error');
      return;
    }

    const category = this.dataSource.data[index];
    Swal.fire({
      title: 'Edit Category',
      input: 'text',
      inputValue: category.name,
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: (name) => {
        return this.categoryService.updateCategory(id, { name }).toPromise();
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
      .then((result) => {
        if (result.isConfirmed && result.value.success) {
          const updatedCategory = result.value.data;
          this.dataSource.data[index] = updatedCategory;
          this.dataSource.data = [...this.dataSource.data];
          Swal.fire('Success', 'Category updated successfully', 'success');
        } else if (result.isConfirmed && !result.value.success) {
          Swal.fire(
            'Error',
            result.value.message || 'Failed to update category',
            'error'
          );
        }
      })
      .catch((error) => {
        Swal.fire(
          'Error',
          error.message || 'An unexpected error occurred',
          'error'
        );
      });
  }

  delete(id: number): void {
    const index = this.dataSource.data.findIndex((c) => c.id === id);
    if (index === -1) {
      Swal.fire('Error', 'Category not found', 'error');
      return;
    }
    this.categoryService.deleteCategory(id).subscribe(
      (response) => {
        if (response.success) {
          this.allCategories.splice(index, 1);
          this.dataSource.data.splice(index, 1);
          this.dataSource.data = [...this.dataSource.data];
          Swal.fire('Success', 'Category deleted successfully', 'success');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
