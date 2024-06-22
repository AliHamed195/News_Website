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
import { AuthServiceService } from '../../Services/Auth/auth-service.service';
import { RateArticleDTO } from '../../models/rate/rate';
import { RateService } from '../../Services/Rate/rate.service';
import { RatingInputComponent } from '../../components/rating-input/rating-input.component';

@Component({
  selector: 'app-home-article-details-page',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ArticleForReadComponent,
    AddsComponent,
    MedioumArticleCardComponent,
    RatingInputComponent,
  ],
  templateUrl: './home-article-details-page.component.html',
  styleUrl: './home-article-details-page.component.css',
})
export class HomeArticleDetailsPageComponent implements OnInit, OnDestroy {
  articleUrl: string | null = null;
  thearticle: ArticleDetailsViewModel | null = null;
  someArticles: GeneralArticleDetailsViewModel[] = [];
  private paramMapSubscription: Subscription | undefined;
  isLoggedIn: boolean = false;
  userRating: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private authService: AuthServiceService,
    private rateService: RateService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.paramMapSubscription = this.route.paramMap.subscribe((params) => {
        const newArticleUrl = params.get('url');
        this.articleUrl = newArticleUrl;
        this.thearticle = null;
        this.loadArticleDetails();
      });
      this.isLoggedIn = !!this.authService.getUserInfo();
    }
  }

  loadArticleDetails(): void {
    if (!this.articleUrl) return;

    this.articlesService.getArticleByUrlAsText(this.articleUrl).subscribe({
      next: (response) => {
        this.thearticle = response.data;
        if (this.isLoggedIn) {
          this.loadUserRating();
        }
        this.loadSomeArticles();
      },
      error: (err) => console.error('Error fetching article:', err),
    });
  }

  loadSomeArticles(): void {
    if (!this.thearticle?.categoryId) return;

    const paginationModel: PaginationModel = {
      startRow: 0,
      endRow: 4,
    };

    this.articlesService
      .getPublishedArticlesByCategoryId(
        this.thearticle.categoryId,
        paginationModel
      )
      .subscribe({
        next: (response: any) => {
          this.someArticles = response.data;
          if (this.thearticle != null)
            this.someArticles = this.someArticles.filter(
              (article) => article.id != this.thearticle?.id
            );
        },
        error: (err) => console.error('Error fetching related articles:', err),
      });
  }

  loadUserRating(): void {
    if (!this.thearticle) return;

    const userInfo = this.authService.getUserInfo();
    if (!userInfo) return;

    this.rateService
      .getUserRating(userInfo.userId, this.thearticle.urlAsText)
      .subscribe({
        next: (response: any) => {
          this.userRating = response.rate;
          console.log('this.userRating', response);
        },
        error: (error: any) => {
          console.error('Error fetching user rating:', error);
        },
      });
  }

  handleRatingSelected(rating: number): void {
    if (!this.thearticle) return;

    const userInfo = this.authService.getUserInfo();
    if (!userInfo) return;

    const rateArticleDTO: RateArticleDTO = {
      userId: userInfo.userId,
      urlAsText: this.thearticle.urlAsText,
      rate: rating,
    };

    this.rateService.rateArticle(rateArticleDTO).subscribe({
      next: (response) => {
        console.log('Article rated successfully', response);
      },
      error: (error) => {
        console.error('Error rating article:', error);
      },
    });
  }

  ngOnDestroy(): void {
    this.paramMapSubscription?.unsubscribe();
  }
}
