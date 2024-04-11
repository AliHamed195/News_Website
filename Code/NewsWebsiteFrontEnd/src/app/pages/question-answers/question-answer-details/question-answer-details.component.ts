import { Component, OnInit } from '@angular/core';
import { QuestionAnswerDetailsViewModel } from '../../../models/question-answer/question-answer-details-view-model';
import { ActivatedRoute } from '@angular/router';
import { QuestionsAnswersService } from '../../../Services/QuestionsAnswers/questions-answers.service';
import { CommonModule } from '@angular/common';
import { QuestionAnswerContentComponent } from '../../../components/question-answer/question-answer-content/question-answer-content.component';

@Component({
  selector: 'app-question-answer-details',
  standalone: true,
  imports: [CommonModule, QuestionAnswerContentComponent],
  templateUrl: './question-answer-details.component.html',
  styleUrl: './question-answer-details.component.css',
})
export class QuestionAnswerDetailsComponent implements OnInit {
  questionAnswerDetails: QuestionAnswerDetailsViewModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private questionsAnswersService: QuestionsAnswersService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.questionsAnswersService.getQuestionAnswerById(+id).subscribe({
          next: (response) => {
            this.questionAnswerDetails = response.data;
          },
          error: (err) => console.error(err),
        });
      }
    });
  }
}
