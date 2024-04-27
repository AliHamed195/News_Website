import { PaginationModel } from './../../models/pagination/pagination-model';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../../Services/Articles/articles.service';
import { ArticleDetailsViewModel } from '../../models/article/article-details-view-model';
import { ArticleForReadComponent } from '../../components/article-for-read/article-for-read.component';
import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { AddsComponent } from '../../components/adds/adds.component';
import { MedioumArticleCardComponent } from '../../components/medioum-article-card/medioum-article-card.component';
import { GeneralArticleDetailsViewModel } from '../../models/article/general-article-details-view-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-article-details-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ArticleForReadComponent,
    AddsComponent,
    MedioumArticleCardComponent,
  ],
  templateUrl: './home-article-details-page.component.html',
  styleUrl: './home-article-details-page.component.css',
})
export class HomeArticleDetailsPageComponent implements OnInit, OnDestroy {
  articleUrl: string | null = null;
  thearticle: ArticleDetailsViewModel | null = null;
  someArticles: GeneralArticleDetailsViewModel[] = [];
  private paramMapSubscription: Subscription | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private articlesService: ArticlesService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.paramMapSubscription = this.route.paramMap.subscribe((params) => {
        const newArticleUrl = params.get('url');
        this.articleUrl = newArticleUrl;
        this.thearticle = null;
        this.loadArticleDetails();
      });
    }
  }

  loadArticleDetails(): void {
    if (!this.articleUrl) return;

    this.articlesService.getArticleByUrlAsText(this.articleUrl).subscribe({
      next: (response) => {
        this.thearticle = response.data;
        this.loadSomeArticles();
      },
      error: (err) => console.error('Error fetching article:', err),
    });
  }

  loadSomeArticles(): void {
    if (!this.thearticle?.categoryId) return;

    const paginationModel: PaginationModel = {
      startRow: 0,
      endRow: 3,
    };

    this.articlesService
      .getPublishedArticlesByCategoryId(
        this.thearticle.categoryId,
        paginationModel
      )
      .subscribe({
        next: (response: any) => {
          this.someArticles = response.data;
        },
        error: (err) => console.error('Error fetching related articles:', err),
      });
  }

  ngOnDestroy(): void {
    this.paramMapSubscription?.unsubscribe();
  }
}
