import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GeneralArticleDetailsViewModel } from '../../models/article/general-article-details-view-model';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css',
})
export class NewsCardComponent {
  @Input() article!: GeneralArticleDetailsViewModel;
  @Input() categoryName!: string;
  @Input() categoryColor: string = '#007bff';
  @Input() width: string = '100%';
  @Input() height: string = 'auto';
}
