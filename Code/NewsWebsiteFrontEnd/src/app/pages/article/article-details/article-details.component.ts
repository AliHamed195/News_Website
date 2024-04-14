import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../../../Services/Articles/articles.service';
import { ResponseStructure } from '../../../models/response/response';
import { ArticleDetailsViewModel } from '../../../models/article/article-details-view-model';
import { ArticleForReadComponent } from '../../../components/article-for-read/article-for-read.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [ArticleForReadComponent, NgIf],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css',
})
export class ArticleDetailsComponent {
  articleId!: number;
  article!: ArticleDetailsViewModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articlesService: ArticlesService
  ) {}

  ngOnInit(): void {
    this.articleId = this.activatedRoute.snapshot.params['id'];
    this.loadArticle(this.articleId);
  }

  private loadArticle(id: number): void {
    this.articlesService
      .getArticleById(id)
      .subscribe((res: ResponseStructure) => {
        if (res && res.success) {
          this.article = res.data;
        }
      });
  }
}
