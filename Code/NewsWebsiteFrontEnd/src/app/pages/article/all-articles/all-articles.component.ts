import { NgIf, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
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
import { Router } from '@angular/router';
import { PaginationModel } from '../../../models/pagination/pagination-model';
import { GeneralArticleDetailsViewModel } from '../../../models/article/general-article-details-view-model';
import { MatSort } from '@angular/material/sort';
import { ArticlesService } from '../../../Services/Articles/articles.service';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-all-articles',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: './all-articles.component.html',
  styleUrl: './all-articles.component.css',
})
export class AllArticlesComponent implements OnInit {
  isLoading: boolean = true;
  paginationModel: PaginationModel = {
    startRow: 0,
    endRow: 100,
  };

  allArticles: GeneralArticleDetailsViewModel[] = [];
  totalArticles: number = 0;
  publishedArticles: number = 0;
  unpublishedArticles: number = 0;
  displayedColumns: string[] = [
    '#',
    'Title',
    'Rating Avg',
    'Created By',
    'Options',
  ];
  dataSource = new MatTableDataSource<GeneralArticleDetailsViewModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private articlesService: ArticlesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadArticles();
      this.loadArticleDataForAnalize();
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  pageChanged(event: any): void {
    let boolCount = event.pageIndex * event.pageSize + 1;
    if (boolCount >= this.allArticles.length) {
      this.paginationModel.startRow = this.allArticles.length;
      this.paginationModel.endRow = this.allArticles.length + 100;
      this.loadArticles(event.pageIndex + 1);
    }
  }

  loadArticles(lastPage: number = 0): void {
    this.isLoading = true;
    this.articlesService.getAllArticles(this.paginationModel).subscribe({
      next: (response) => {
        if (response.success) {
          this.isLoading = false;
          this.cdr.detectChanges();
          if (this.paginationModel.startRow === 0) {
            this.allArticles = response.data;
            this.dataSource.data = response.data;
            console.log(this.allArticles);
            console.log(this.dataSource.data);
          } else {
            this.allArticles = this.allArticles.concat(response.data);
            this.dataSource.data = this.allArticles;
          }
          this.dataSource.paginator = this.paginator;
          this.paginator.pageIndex = lastPage;
          this.dataSource.sort = this.sort;
        } else {
          console.error('Failed to load articles and answers');
        }
      },
      error: (error) => {
        console.error('Error fetching articles', error);
        this.isLoading = false;
      },
    });
  }

  loadArticleDataForAnalize(): void {
    forkJoin({
      total: this.articlesService.getAllArticlesCount(),
      published: this.articlesService.getPublishedArticlesCount(),
      unpublished: this.articlesService.getUnpublishedArticlesCount(),
    }).subscribe({
      next: (results) => {
        this.totalArticles = results.total.data;
        this.publishedArticles = results.published.data;
        this.unpublishedArticles = results.unpublished.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching article data', error);
        this.isLoading = false;
      },
    });
  }

  create(): void {
    this.router.navigate(['/Admin/articles-upsert']);
  }

  edit(id: number): void {
    this.router.navigate(['/Admin/articles-upsert', id]);
  }

  delete(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this article!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.articlesService.deleteArticle(id).subscribe({
          next: (response) => {
            if (response.success) {
              Swal.fire(
                'Deleted!',
                'The article have been deleted.',
                'success'
              );
              this.allArticles = this.allArticles.filter((qa) => qa.id !== id);
              this.dataSource.data = this.allArticles;
            } else {
              Swal.fire('Failed!', 'Failed to delete the article.', 'error');
            }
          },
          error: (error) => {
            console.error('Error deleting the article', error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the article.',
              'error'
            );
          },
        });
      }
    });
  }

  details(id: number): void {
    this.router.navigate(['/Admin/articles-details', id]);
  }

  publish(id: number): void {
    this.articlesService.publishArticle(id).subscribe({
      next: (response) => {
        if (response.success) {
          Swal.fire(
            'Published!',
            'The article have been published.',
            'success'
          );
          this.loadArticleDataForAnalize();
        } else {
          Swal.fire('Failed!', 'Failed to publish the article.', 'error');
        }
      },
      error: (error) => {
        console.error('Error publishing the article', error);
        Swal.fire(
          'Error!',
          'An error occurred while publishing the article.',
          'error'
        );
      },
    });
  }

  unpublish(id: number): void {
    this.articlesService.unpublishArticle(id).subscribe({
      next: (response) => {
        if (response.success) {
          Swal.fire(
            'Unpublished!',
            'The article have been unpublished.',
            'success'
          );
          this.loadArticleDataForAnalize();
        } else {
          Swal.fire('Failed!', 'Failed to unpublish the article.', 'error');
        }
      },
      error: (error) => {
        console.error('Error unpublishing the article', error);
        Swal.fire(
          'Error!',
          'An error occurred while unpublishing the article.',
          'error'
        );
      },
    });
  }
}
