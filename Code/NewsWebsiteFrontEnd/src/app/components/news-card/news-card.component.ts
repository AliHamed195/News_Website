import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css',
})
export class NewsCardComponent {
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() creator!: string;
  @Input() date!: string;
  @Input() views!: number;
  @Input() rating!: number;
  @Input() category!: string;
  @Input() width: string = '100%';
  @Input() height: string = 'auto';
}
