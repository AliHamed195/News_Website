import { PaginationModel } from './../../models/pagination/pagination-model';
import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { GeneralArticleDetailsViewModel } from '../../models/article/general-article-details-view-model';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../../Services/Articles/articles.service';
import { MedioumArticleCardComponent } from '../../components/medioum-article-card/medioum-article-card.component';
import { Subscription } from 'rxjs';
import { SignalrService } from '../../Services/SignalR/signalr.service';

@Component({
  selector: 'app-carigory-articles',
  standalone: true,
  imports: [NgIf, NgFor, MedioumArticleCardComponent],
  templateUrl: './carigory-articles.component.html',
  styleUrl: './carigory-articles.component.css',
})
export class CarigoryArticlesComponent implements OnInit, OnDestroy {
  categoryId: number | null = null;
  articles: GeneralArticleDetailsViewModel[] = [];
  private paramCategorySubscription: Subscription | undefined;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private signalRService: SignalrService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.paramCategorySubscription = this.route.params.subscribe((params) => {
        const id = params['id'];
        if (id) {
          this.categoryId = parseInt(id, 10);
          if (!isNaN(this.categoryId)) {
            this.getArticlesByCategoryId();
          }
        }
      });

      this.signalRService.startConnection();
      this.signalRService.addReceiveNewArticleListener(
        (article: GeneralArticleDetailsViewModel) => {
          this.articles.unshift(article);
          console.log(article);
        }
      );
    }
  }

  getArticlesByCategoryId(): void {
    if (this.categoryId === null) return;

    const paginationModel: PaginationModel = {
      startRow: 0,
      endRow: 100,
    };

    this.articlesService
      .getPublishedArticlesByCategoryId(this.categoryId, paginationModel)
      .subscribe((articles) => {
        this.articles = articles.data;
      });
  }

  ngOnDestroy(): void {
    this.paramCategorySubscription?.unsubscribe();
  }
}
