import { NgFor } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-rating-input',
  standalone: true,
  imports: [NgFor],
  templateUrl: './rating-input.component.html',
  styleUrl: './rating-input.component.css',
})
export class RatingInputComponent {
  @Input() maxRating: number = 5;
  @Input() rating: number = 0; // Add this input property to bind the rating from the parent component
  @Output() ratingSelected: EventEmitter<number> = new EventEmitter<number>();

  currentRating: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rating']) {
      this.currentRating = this.rating;
    }
  }

  selectRating(rating: number): void {
    this.currentRating = rating;
    this.ratingSelected.emit(this.currentRating);
  }
}
