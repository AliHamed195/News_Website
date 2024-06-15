import { GeneralCategoryDetailsViewModel } from './../../models/category/general-category-details-view-model';
import { PaginationModel } from './../../models/pagination/pagination-model';
import { CategoryService } from './../../Services/Category/category.service';
import { ArticlesService } from './../../Services/Articles/articles.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LargeArticleCardComponent } from '../../components/large-article-card/large-article-card.component';
import { SmallArticleCardComponent } from '../../components/small-article-card/small-article-card.component';
import { NgFor, NgIf, NgStyle, isPlatformBrowser } from '@angular/common';
import { forkJoin } from 'rxjs';
import { MapComponent } from '../../components/map/map.component';
import { NewsCardComponent } from '../../components/news-card/news-card.component';
import { GeneralArticleDetailsViewModel } from '../../models/article/general-article-details-view-model';
import { NewsCardTwoComponent } from '../../components/news-card-two/news-card-two.component';
import { SocialMediaCardComponent } from '../../components/social-media-card/social-media-card.component';

@Component({
  selector: 'app-home-landing-page',
  standalone: true,
  imports: [
    NgStyle,
    NgIf,
    NgFor,
    LargeArticleCardComponent,
    SmallArticleCardComponent,
    MapComponent,
    NewsCardComponent,
    NewsCardTwoComponent,
    SocialMediaCardComponent,
  ],
  templateUrl: './home-landing-page.component.html',
  styleUrl: './home-landing-page.component.css',
})
export class HomeLandingPageComponent implements OnInit {
  categoryColors: string[] = [
    '#32cd32',
    '#ff6347',
    '#4682b4',
    '#ff8c00',
    '#6a5acd',
    '#ff1493',
    '#dad720',
    '#2e8b57',
  ];
  allCategories: GeneralCategoryDetailsViewModel[] = [];
  articlesByCategory: Map<number, any[]> = new Map();

  testArticleDetails: GeneralArticleDetailsViewModel = {
    createdById: '12345',
    createdByFullName: 'John Doe',
    urlAsText: 'https://example.com/article/12345',
    id: 12345,
    title: 'A Comprehensive Guide to TypeScript',
    summary:
      'This article provides a comprehensive guide to TypeScript, including its features, benefits, and best practices.',
    coverImagePath: '../../../assets/images/avatars/avatar1.jpeg',
    totalNumberOfViews: 2500,
    ratingAvg: 4.5,
    createdAt: new Date('2023-05-12T07:00:00Z'),
    isPublished: true,
    lat: 37.7749,
    lng: -122.4194,
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private categoryService: CategoryService,
    private articlesService: ArticlesService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getAllCategories();
    }
  }

  getAllCategories(): void {
    const paginationModel: PaginationModel = { startRow: 0, endRow: 100 };
    this.categoryService.getAllCategories(paginationModel).subscribe({
      next: (response) => {
        this.allCategories = response.data;
        this.allCategories.reverse();
        this.fetchArticlesForCategories();
      },
      error: (err) => console.error('Failed to load categories:', err),
    });

    setTimeout(() => {
      console.log(this.allCategories);
      console.log(this.articlesByCategory);
      console.log(
        'this.articlesByCategory.get(1)',
        this.articlesByCategory.get(1)![0].id ?? 'null'
      );
    }, 2000);
  }

  fetchArticlesForCategories(): void {
    if (this.allCategories.length > 0) {
      const paginationModel: PaginationModel = { startRow: 0, endRow: 100 };
      const observables = this.allCategories.map((category) =>
        this.articlesService.getPublishedArticlesByCategoryId(
          category.id,
          paginationModel
        )
      );

      forkJoin(observables).subscribe((results) => {
        results.forEach((result, index) => {
          this.articlesByCategory.set(
            this.allCategories[index].id,
            result.data
          );
        });
        console.log(this.articlesByCategory);
      });
    }
  }
}
