import { Component, OnInit } from '@angular/core';
import { QuestionsAnswersService } from '../../../Services/QuestionsAnswers/questions-answers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { CreateQuestionAnswerViewModel } from '../../../models/question-answer/create-question-answer-view-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-and-update-question-answer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-and-update-question-answer.component.html',
  styleUrl: './create-and-update-question-answer.component.css',
})
export class CreateAndUpdateQuestionAnswerComponent implements OnInit {
  questionAnswerId: number | null = null;
  questionAnswerModel: CreateQuestionAnswerViewModel = {
    question: '',
    answer: '',
  };

  constructor(
    private questionsAnswersService: QuestionsAnswersService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.questionAnswerId = this.route.snapshot.params['id']
      ? parseInt(this.route.snapshot.params['id'], 10)
      : null;
  }

  ngOnInit(): void {
    if (this.questionAnswerId !== null) {
      this.loadQuestionAnswerById();
    }
  }

  loadQuestionAnswerById(): void {
    if (this.questionAnswerId === null) return;

    this.questionsAnswersService
      .getQuestionAnswerById(this.questionAnswerId)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.questionAnswerModel = {
              question: response.data.question,
              answer: response.data.answer,
            };
          } else {
            Swal.fire(
              'Error',
              response.message || 'Failed to load data.',
              'error'
            );
          }
        },
        error: (error) => {
          console.error('Error loading data', error);
          Swal.fire('Error', 'An error occurred while loading data.', 'error');
        },
      });
  }

  submitForm(form: NgForm): void {
    if (!form.valid) {
      Swal.fire('Error', 'Please fill out the form correctly.', 'error');
      return;
    }

    const model: CreateQuestionAnswerViewModel = form.value;

    let requestObservable: Observable<any>;
    if (this.questionAnswerId === null) {
      requestObservable =
        this.questionsAnswersService.createQuestionAnswer(model);
    } else {
      requestObservable = this.questionsAnswersService.updateQuestionAnswer(
        this.questionAnswerId,
        model
      );
    }

    requestObservable.subscribe({
      next: (response) => {
        if (response.success) {
          Swal.fire('Success', 'The operation was successful.', 'success');
          this.router.navigateByUrl('/Admin/questions-answers-all');
        } else {
          Swal.fire(
            'Error',
            response.message || 'Failed to perform the operation.',
            'error'
          );
        }
      },
      error: (error) => {
        console.error('Error performing the operation', error);
        Swal.fire(
          'Error',
          'An error occurred while performing the operation.',
          'error'
        );
      },
    });
  }

  cancelAndBack(): void {
    this.router.navigateByUrl('/Admin/questions-answers-all');
  }
}
