import { Component, Input } from '@angular/core';
import { GeneralArticleDetailsViewModel } from '../../models/article/general-article-details-view-model';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-large-article-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './large-article-card.component.html',
  styleUrl: './large-article-card.component.css',
})
export class LargeArticleCardComponent {
  @Input() article!: GeneralArticleDetailsViewModel;

  constructor(private router: Router) {}

  get(url: string): void {
    this.router.navigate(['/Home/article-details-home', url]);
  }
}
