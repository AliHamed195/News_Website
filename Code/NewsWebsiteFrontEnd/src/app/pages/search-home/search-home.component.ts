import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticlesService } from '../../Services/Articles/articles.service';
import { ResponseStructure } from '../../models/response/response';
import { GeneralArticleDetailsViewModel } from '../../models/article/general-article-details-view-model';
import { forkJoin } from 'rxjs';
import { MedioumArticleCardComponent } from '../../components/medioum-article-card/medioum-article-card.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-search-home',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, MedioumArticleCardComponent],
  templateUrl: './search-home.component.html',
  styleUrl: './search-home.component.css',
})
export class SearchHomeComponent {
  textForSearch!: string;
  searchResultsIds: any[] = [];
  articles: GeneralArticleDetailsViewModel[] = [];

  constructor(private articlesService: ArticlesService) {}

  startSearch(): void {
    this.articlesService.searchArticles(this.textForSearch).subscribe({
      next: (response: any) => {
        if (response.length > 0) {
          this.searchResultsIds = response.map((r: any) => r.id);
          this.fetchArticlesByIds();
          console.log('Search results:', this.searchResultsIds);
        } else {
          console.error('Search failed:', response);
        }
      },
      error: (error) => {
        console.error('Error during search:', error);
      },
    });
  }

  fetchArticlesByIds(): void {
    const articleObservables = this.searchResultsIds.map((id: number) =>
      this.articlesService.getArticleById(id)
    );

    forkJoin(articleObservables).subscribe({
      next: (results: any) => {
        console.log('Fetched articles:', results);
        this.articles = results.map((r: any) => r.data);
        console.log('Fetched articles:', this.articles);
      },
      error: (error) => {
        console.error('Error fetching articles data', error);
      },
    });
  }
}
