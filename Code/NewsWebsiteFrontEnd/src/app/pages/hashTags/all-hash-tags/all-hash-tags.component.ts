import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { HashTagsService } from '../../../Services/HashTags/hash-tags.service';
import { GeneralHashTagDetailsViewModel } from '../../../models/hash-tag/general-hash-tag-details-view-model';
import { PaginationModel } from '../../../models/pagination/pagination-model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgIf, isPlatformBrowser } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-all-hash-tags',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: './all-hash-tags.component.html',
  styleUrl: './all-hash-tags.component.css',
})
export class AllHashTagsComponent implements OnInit {
  paginationModel: PaginationModel = {
    startRow: 0,
    endRow: 10,
  };

  allHashTags: GeneralHashTagDetailsViewModel[] = [];
  totalHashTagsCount: number = 0;
  usedHashTagsCount: number = 0;
  unusedHashTagsCount: number = 0;

  displayedColumns: string[] = ['#', 'Tag', 'Options'];
  dataSource = new MatTableDataSource<GeneralHashTagDetailsViewModel>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private hashTagsService: HashTagsService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadHashTags();
      this.loadHashTagsCounts();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.dataSource.disconnect();
  }

  loadHashTags(lastPage: number = 0): void {
    this.hashTagsService.getAllHashTags(this.paginationModel).subscribe({
      next: (response) => {
        if (response.success) {
          if (this.paginationModel.startRow === 0) {
            this.allHashTags = response.data;
            this.dataSource.data = response.data;
            this.dataSource.paginator = this.paginator;
          } else {
            this.allHashTags = this.allHashTags.concat(response.data);
            this.dataSource.data = this.allHashTags;
            this.dataSource.paginator = this.paginator;
            this.paginator.pageIndex = lastPage;
          }
        } else {
          console.log(response.message);
        }
      },
      error: (error) => {
        console.error('Error fetching hash tags', error);
      },
    });
  }

  loadHashTagsCounts(): void {
    let isFinishedGettingAllCounts = false;
    let isFinishedGettingUsedCounts = false;
    this.hashTagsService.getAllHashTagsCount().subscribe({
      next: (response) => {
        this.totalHashTagsCount = response.data;
        isFinishedGettingAllCounts = true;
      },
      error: (error) =>
        console.error('Error fetching total hashtags count', error),
    });

    this.hashTagsService.getUsedHashTagsCount().subscribe({
      next: (response) => {
        this.usedHashTagsCount = response.data;
        isFinishedGettingUsedCounts = true;
      },
      error: (error) =>
        console.error('Error fetching used hashtags count', error),
    });

    const interval = setInterval(() => {
      if (isFinishedGettingAllCounts && isFinishedGettingUsedCounts) {
        clearInterval(interval);
        this.calculateHashTagsCounts();
      }
    }, 1000);
  }

  calculateHashTagsCounts(): void {
    this.unusedHashTagsCount = this.totalHashTagsCount - this.usedHashTagsCount;
  }

  create(): void {
    // create using swal
    Swal.fire({
      title: 'Create Hashtag',
      html: `
        <style>
          .special-input, .special-textarea {
            border: 2px solid #007BFF; /* Bootstrap primary color */
            border-radius: 4px;
            padding: 10px;
            width: 100%;
            margin-bottom: 20px;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 14px;
          }
          .special-textarea {
            height: 100px;
            resize: vertical;
          }
        </style>
        <input id="swal-input1" class="special-input" placeholder="Hashtag Name">
        <textarea id="swal-input2" class="special-textarea" placeholder="Description"></textarea>
      `,
      focusConfirm: false,
      confirmButtonColor: '#007BFF',
      cancelButtonColor: '#6c757d',
      preConfirm: () => {
        return {
          text: (document.getElementById('swal-input1') as HTMLInputElement)
            .value,
          description: (
            document.getElementById('swal-input2') as HTMLTextAreaElement
          ).value,
        };
      },
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.hashTagsService
          .createHashTag({
            text: result.value.text,
            description: result.value.description,
          })
          .subscribe({
            next: (response) => {
              if (response.success) {
                Swal.fire(
                  'Created!',
                  'Your hashtag has been created.',
                  'success'
                );
                this.allHashTags.push(response.data);
                this.dataSource.data = [...this.dataSource.data];
              } else {
                Swal.fire(
                  'Failed!',
                  'There was an issue creating your hashtag.',
                  'error'
                );
              }
            },
            error: (error) => {
              Swal.fire('Error!', 'Unable to create hashtag.', 'error');
            },
          });
      }
    });
  }

  edit(id: number): void {
    const index = this.dataSource.data.findIndex((h) => h.id === id);
    if (index === -1 || this.dataSource.data[index].isUsed) {
      Swal.fire(
        'Failed!',
        'This hashtag is currently in use and cannot be updated.',
        'error'
      );
      return;
    }
    this.hashTagsService.getHashTagById(id).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const hashTag = response.data;
          Swal.fire({
            title: 'Edit Hashtag',
            html: `
            <style>
              .special-input, .special-textarea {
                border: 2px solid #007BFF; /* Bootstrap primary color */
                border-radius: 4px;
                padding: 10px;
                width: 100%;
                margin-bottom: 20px;
                box-sizing: border-box;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 14px;
              }
              .special-textarea {
                height: 100px;
                resize: vertical;
              }
            </style>
            <input id="swal-input1" class="special-input" placeholder="Hashtag Name" value="${
              hashTag.text
            }">
            <textarea id="swal-input2" class="special-textarea" placeholder="Description">${
              hashTag.description || ''
            }</textarea>
          `,
            focusConfirm: false,
            confirmButtonColor: '#007BFF',
            cancelButtonColor: '#6c757d',
            preConfirm: () => {
              return {
                text: (
                  document.getElementById('swal-input1') as HTMLInputElement
                ).value,
                description: (
                  document.getElementById('swal-input2') as HTMLTextAreaElement
                ).value,
              };
            },
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed && result.value) {
              this.hashTagsService
                .updateHashTag(id, {
                  text: result.value.text,
                  description: result.value.description,
                })
                .subscribe({
                  next: (updateResponse) => {
                    if (updateResponse.success) {
                      Swal.fire(
                        'Updated!',
                        'Your hashtag has been updated.',
                        'success'
                      );
                      this.allHashTags[index].text = result.value.text;
                      this.dataSource.data[index].text = result.value.text;
                      this.dataSource.data = [...this.dataSource.data];
                    } else {
                      Swal.fire(
                        'Failed!',
                        'There was an issue updating your hashtag.',
                        'error'
                      );
                    }
                  },
                  error: (error) => {
                    Swal.fire('Error!', 'Unable to update hashtag.', 'error');
                  },
                });
            }
          });
        } else {
          Swal.fire('Failed!', 'Hashtag not found.', 'error');
        }
      },
      error: (error) => {
        Swal.fire('Error!', 'Unable to fetch hashtag details.', 'error');
      },
    });
  }

  delete(id: number): void {
    const index = this.dataSource.data.findIndex((h) => h.id === id);
    if (index === -1 || this.dataSource.data[index].isUsed) {
      Swal.fire(
        'Failed!',
        'This hashtag is currently in use and cannot be deleted.',
        'error'
      );
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this hashtag!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hashTagsService.deleteHashTag(id).subscribe({
          next: (response) => {
            if (response.success) {
              Swal.fire(
                'Deleted!',
                'Your hashtag has been deleted.',
                'success'
              );
              this.allHashTags.splice(index, 1);
              this.dataSource.data.splice(index, 1);
              this.dataSource.data = [...this.dataSource.data];
            } else {
              Swal.fire(
                'Failed!',
                `There was an issue deleting your hashtag. ${response.message}`,
                'error'
              );
            }
          },
          error: (error) => {
            Swal.fire('Error!', 'Unable to delete hashtag.', 'error');
          },
        });
      }
    });
  }

  applyFilter(event: Event) {
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

    if (this.paginationModel.endRow >= this.allHashTags.length) {
      if (
        this.allHashTags.length - this.paginationModel.startRow <=
        event.pageSize * 2
      ) {
        this.paginationModel.endRow = this.allHashTags.length + 100;
        this.loadHashTags(event.previousPageIndex + 2);
      }
    }
  }
}
