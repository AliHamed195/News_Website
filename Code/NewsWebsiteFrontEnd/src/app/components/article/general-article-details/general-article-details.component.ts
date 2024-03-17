import { Component, Input, OnInit } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { GeneralArticleDetailsViewModel } from '../../../models/article/general-article-details-view-model';

@Component({
  selector: 'app-general-article-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-article-details.component.html',
  styleUrl: './general-article-details.component.css'
})
export class GeneralArticleDetailsComponent implements OnInit{

  @Input() article: GeneralArticleDetailsViewModel | undefined;
  formattedRating: string | undefined;

  ngOnInit(): void {
    this.formattedRating = this.article!.ratingAvg.toFixed(2);
  }
}
