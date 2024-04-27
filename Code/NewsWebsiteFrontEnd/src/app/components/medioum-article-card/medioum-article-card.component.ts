import { Component, Input } from '@angular/core';
import { GeneralArticleDetailsViewModel } from '../../models/article/general-article-details-view-model';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-medioum-article-card',
  standalone: true,
  imports: [NgIf, DatePipe],
  templateUrl: './medioum-article-card.component.html',
  styleUrl: './medioum-article-card.component.css',
})
export class MedioumArticleCardComponent {
  @Input() article!: GeneralArticleDetailsViewModel;

  constructor(private router: Router) {}

  get(url: string): void {
    this.router.navigate(['/Home/article-details-home', url]);
  }
}
