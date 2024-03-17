import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { ArticleDetailsViewModel } from '../../../models/article/article-details-view-model';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css'
})
export class ArticleDetailsComponent {
  @Input() article: ArticleDetailsViewModel | undefined;
}
