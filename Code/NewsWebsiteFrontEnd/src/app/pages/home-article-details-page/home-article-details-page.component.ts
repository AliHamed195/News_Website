import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../../Services/Articles/articles.service';
import { ArticleDetailsViewModel } from '../../models/article/article-details-view-model';
import { ArticleForReadComponent } from '../../components/article-for-read/article-for-read.component';
import { NgIf, isPlatformBrowser } from '@angular/common';
import { AddsComponent } from '../../components/adds/adds.component';

@Component({
  selector: 'app-home-article-details-page',
  standalone: true,
  imports: [NgIf, ArticleForReadComponent, AddsComponent],
  templateUrl: './home-article-details-page.component.html',
  styleUrl: './home-article-details-page.component.css',
})
export class HomeArticleDetailsPageComponent implements OnInit {
  articleUrl: string | null = null;
  article: ArticleDetailsViewModel | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private articlesService: ArticlesService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.route.paramMap.subscribe((params) => {
        this.articleUrl = params.get('url');
        if (this.articleUrl) {
          this.loadArticleDetails(this.articleUrl);
        }
      });
    }
  }

  loadArticleDetails(url: string): void {
    this.articlesService.getArticleByUrlAsText(url).subscribe({
      next: (response) => {
        this.article = response.data;
      },
      error: (err) => console.error('Error fetching article:', err),
    });
  }
}
