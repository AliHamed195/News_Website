import { NgIf, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-news-card-two',
  standalone: true,
  imports: [NgStyle, NgIf],
  templateUrl: './news-card-two.component.html',
  styleUrl: './news-card-two.component.css',
})
export class NewsCardTwoComponent {
  @Input() article: any;
  @Input() width?: string = '100%';
  @Input() height?: string = 'auto';

  get(url: string): void {}
}
