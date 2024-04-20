import { Component, Input } from '@angular/core';
import { GeneralArticleDetailsViewModel } from '../../models/article/general-article-details-view-model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-small-article-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './small-article-card.component.html',
  styleUrl: './small-article-card.component.css',
})
export class SmallArticleCardComponent {
  @Input() article!: GeneralArticleDetailsViewModel;

  get(url: string): void {
    console.log('url: ' + url);
  }
}
