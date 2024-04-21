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
  }

  fetchArticlesForCategories(): void {
    if (this.allCategories.length > 0) {
      const paginationModel: PaginationModel = { startRow: 0, endRow: 5 };
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
