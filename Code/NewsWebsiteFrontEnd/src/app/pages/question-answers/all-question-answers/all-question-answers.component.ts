import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { GeneralQuestionAnswerDetailsViewModel } from '../../../models/question-answer/general-question-answer-details-view-model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { QuestionsAnswersService } from '../../../Services/QuestionsAnswers/questions-answers.service';
import { NgIf, isPlatformBrowser } from '@angular/common';
import { PaginationModel } from '../../../models/pagination/pagination-model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-question-answers',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: './all-question-answers.component.html',
  styleUrl: './all-question-answers.component.css',
})
export class AllQuestionAnswersComponent implements OnInit {
  isLoading: boolean = true;
  paginationModel: PaginationModel = {
    startRow: 0,
    endRow: 100,
  };

  allQuestionAnswers: GeneralQuestionAnswerDetailsViewModel[] = [];
  displayedColumns: string[] = ['#', 'Question', 'Options'];
  dataSource = new MatTableDataSource<GeneralQuestionAnswerDetailsViewModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private questionsAnswersService: QuestionsAnswersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadQuestionAnswers();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadQuestionAnswers(lastPage: number = 0): void {
    this.isLoading = true;
    this.questionsAnswersService
      .getAllQuestionsAnswers(this.paginationModel)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.isLoading = false;
            this.cdr.detectChanges();
            if (this.paginationModel.startRow === 0) {
              this.allQuestionAnswers = response.data;
              this.dataSource.data = response.data;
            } else {
              this.allQuestionAnswers = this.allQuestionAnswers.concat(
                response.data
              );
              this.dataSource.data = this.allQuestionAnswers;
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  pageChanged(event: any): void {
    let boolCount = event.pageIndex * event.pageSize + 1;
    if (boolCount >= this.allQuestionAnswers.length) {
      this.paginationModel.startRow = this.allQuestionAnswers.length;
      this.paginationModel.endRow = this.allQuestionAnswers.length + 100;
      this.loadQuestionAnswers(event.pageIndex + 1);
    }
  }

  create(): void {
    this.router.navigate(['/Admin/questions-answers-upsert']);
  }

  edit(id: number): void {
    this.router.navigate(['/Admin/questions-answers-upsert', id]);
  }

  details(id: number): void {
    this.router.navigate(['/Admin/questions-answers-details', id]);
  }

  delete(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this question and answer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionsAnswersService.deleteQuestionAnswer(id).subscribe({
          next: (response) => {
            if (response.success) {
              Swal.fire(
                'Deleted!',
                'The question and answer have been deleted.',
                'success'
              );
              this.allQuestionAnswers = this.allQuestionAnswers.filter(
                (qa) => qa.id !== id
              );
              this.dataSource.data = this.allQuestionAnswers;
            } else {
              Swal.fire(
                'Failed!',
                'Failed to delete the question and answer.',
                'error'
              );
            }
          },
          error: (error) => {
            console.error('Error deleting the question and answer', error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the question and answer.',
              'error'
            );
          },
        });
      }
    });
  }
}
