import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-question-answer-content',
  standalone: true,
  imports: [],
  templateUrl: './question-answer-content.component.html',
  styleUrl: './question-answer-content.component.css',
})
export class QuestionAnswerContentComponent {
  @Input() question: string = '';
  @Input() answer: string = '';
}
