import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { PaginationModel } from '../../../models/pagination/pagination-model';
import { GeneralUserDetailsViewModel } from '../../../models/user/general-user-details-view-model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from 'express';
import { UsersService } from '../../../Services/Users/users.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf, isPlatformBrowser } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css',
})
export class AllUsersComponent implements OnInit {
  isLoading: boolean = true;
  paginationModel: PaginationModel = {
    startRow: 0,
    endRow: 100,
  };

  allUsers: GeneralUserDetailsViewModel[] = [];
  totalUsers: number = 0;
  blockedUsers: number = 0;
  deletedUsers: number = 0;
  displayedColumns: string[] = [
    '#',
    'User Name',
    'Email',
    'Full Name',
    'Options',
  ];
  dataSource = new MatTableDataSource<GeneralUserDetailsViewModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private usersService: UsersService //private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUsers();
      this.loadUserDataForAnalize();
    }
  }

  loadUsers(lastPage: number = 0): void {
    this.isLoading = true;
    this.usersService.getAllUsers(this.paginationModel).subscribe({
      next: (response) => {
        if (response.success) {
          this.isLoading = false;
          this.cdr.detectChanges();
          if (this.paginationModel.startRow === 0) {
            this.allUsers = response.data;
            this.dataSource.data = response.data;
          } else {
            this.allUsers = this.allUsers.concat(response.data);
            this.dataSource.data = this.allUsers;
          }
          this.dataSource.paginator = this.paginator;
          this.paginator.pageIndex = lastPage;
          this.dataSource.sort = this.sort;
        } else {
          console.error('Failed to load question and answers');
        }
      },
      error: (error) => {
        console.error('Error fetching question and answers', error);
        this.isLoading = false;
      },
    });
  }

  loadUserDataForAnalize(): void {
    forkJoin({
      total: this.usersService.getUsersCount(),
      blocked: this.usersService.getBlockedUsersCount(),
      deleted: this.usersService.getDeletedUsersCount(),
    }).subscribe({
      next: (results) => {
        this.totalUsers = results.total.data;
        this.blockedUsers = results.blocked.data;
        this.deletedUsers = results.deleted.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching data', error);
        this.isLoading = false;
      },
    });
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
    if (boolCount >= this.allUsers.length) {
      this.paginationModel.startRow = this.allUsers.length;
      this.paginationModel.endRow = this.allUsers.length + 100;
      this.loadUsers(event.pageIndex + 1);
    }
  }

  create(): void {}

  edit(id: number): void {}

  delete(id: number): void {}

  details(id: number): void {}
}
