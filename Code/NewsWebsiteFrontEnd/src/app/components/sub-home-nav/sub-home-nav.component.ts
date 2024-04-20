import { PaginationModel } from './../../models/pagination/pagination-model';
import { GeneralCategoryDetailsViewModel } from './../../models/category/general-category-details-view-model';
import { GeneralArticleDetailsViewModel } from './../../models/article/general-article-details-view-model';
import { ArticlesService } from './../../Services/Articles/articles.service';
import { CategoryService } from './../../Services/Category/category.service';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sub-home-nav',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './sub-home-nav.component.html',
  styleUrl: './sub-home-nav.component.css',
})
export class SubHomeNavComponent implements OnInit {
  generalCategories: GeneralCategoryDetailsViewModel[] = [];
  generalArticles: GeneralArticleDetailsViewModel[] = [];
  currentDate: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private categoryService: CategoryService,
    private articlesService: ArticlesService
  ) {
    this.currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getAllCategories();
      this.getTopRatedArticles();
    }
  }

  getAllCategories() {
    const PaginationModel: PaginationModel = {
      startRow: 0,
      endRow: 100,
    };

    this.categoryService.getAllCategories(PaginationModel).subscribe(
      (res) => {
        this.generalCategories = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTopRatedArticles() {
    this.articlesService.getTopRatedArticles().subscribe(
      (res) => {
        this.generalArticles = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
