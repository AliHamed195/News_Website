import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { GeneralQuestionAnswerDetailsViewModel } from '../../models/question-answer/general-question-answer-details-view-model';
import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { QuestionsAnswersService } from '../../Services/QuestionsAnswers/questions-answers.service';
import { PaginationModel } from '../../models/pagination/pagination-model';

@Component({
  selector: 'app-questions-answers',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './questions-answers.component.html',
  styleUrl: './questions-answers.component.css',
})
export class QuestionsAnswersComponent {
  questionsAnswers: GeneralQuestionAnswerDetailsViewModel[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private apiService: QuestionsAnswersService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getQuestionsAnswers();
    }
  }

  getQuestionsAnswers(): void {
    const pagenation: PaginationModel = {
      startRow: 0,
      endRow: 100,
    };

    this.apiService.getAllQuestionsAnswers(pagenation).subscribe((response) => {
      this.questionsAnswers = response.data;
    });
  }
}
