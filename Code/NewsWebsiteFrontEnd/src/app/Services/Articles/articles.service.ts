import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderUtilService } from '../header-util.service';
import { PaginationModel } from '../../models/pagination/pagination-model';
import { Observable } from 'rxjs';
import { ResponseStructure } from '../../models/response/response';
import { articleEndpoints } from '../../URL/url';
import { CreateArticleViewModel } from '../../models/article/create-article-view-model';
import { UpdateArticleViewModel } from '../../models/article/update-article-view-model';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(
    private http: HttpClient,
    private headerUtil: HeaderUtilService
  ) {}

  getPublishedArticlesByCategoryId(
    categoryId: number,
    model: PaginationModel
  ): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();
    const params = new HttpParams({
      fromObject: {
        startRow: model.startRow.toString(),
        endRow: model.endRow.toString(),
      },
    });

    return this.http.get<ResponseStructure>(
      `${articleEndpoints.getPublishedByCategoryId}${categoryId}`,
      { params, headers }
    );
  }

  getTopRatedArticles(): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();
    return this.http.get<ResponseStructure>(articleEndpoints.getTopRated, {
      headers,
    });
  }

  getAllArticles(model: PaginationModel): Observable<ResponseStructure> {
    const params = new HttpParams({
      fromObject: {
        startRow: model.startRow.toString(),
        endRow: model.endRow.toString(),
      },
    });

    const headers = this.headerUtil.generateHeaders();

    return this.http.get<ResponseStructure>(articleEndpoints.getAllArticles, {
      params,
      headers,
    });
  }

  getArticleById(id: number): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();

    return this.http.get<ResponseStructure>(
      `${articleEndpoints.getArticleById}${id}`,
      { headers }
    );
  }

  getAllArticlesCount(): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();
    return this.http.get<ResponseStructure>(
      articleEndpoints.getAllArticlesCount,
      { headers }
    );
  }

  getPublishedArticlesCount(): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();
    return this.http.get<ResponseStructure>(
      articleEndpoints.getPublishedArticlesCount,
      { headers }
    );
  }

  getUnpublishedArticlesCount(): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();
    return this.http.get<ResponseStructure>(
      articleEndpoints.getUnpublishedArticlesCount,
      { headers }
    );
  }

  saveArticle(
    articleId: number | null,
    model: CreateArticleViewModel | UpdateArticleViewModel
  ): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();
    if (articleId === null || articleId === undefined) {
      return this.http.post<ResponseStructure>(
        articleEndpoints.createArticle,
        model,
        { headers }
      );
    } else {
      return this.http.put<ResponseStructure>(
        `${articleEndpoints.updateArticleById}${articleId}`,
        model,
        { headers }
      );
    }
  }

  createArticle(model: CreateArticleViewModel): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();

    return this.http.post<ResponseStructure>(
      articleEndpoints.createArticle,
      model,
      { headers }
    );
  }

  updateArticle(
    id: number,
    model: UpdateArticleViewModel
  ): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();

    return this.http.put<ResponseStructure>(
      `${articleEndpoints.updateArticleById}${id}`,
      model,
      { headers }
    );
  }

  deleteArticle(id: number): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();

    return this.http.put<ResponseStructure>(
      `${articleEndpoints.deleteArticleById}${id}`,
      {},
      {
        headers: headers,
      }
    );
  }

  publishArticle(id: number): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();

    return this.http.post<ResponseStructure>(
      `${articleEndpoints.publishArticleById}${id}`,
      {},
      { headers }
    );
  }

  unpublishArticle(id: number): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();

    return this.http.post<ResponseStructure>(
      `${articleEndpoints.unpublishArticleById}${id}`,
      {},
      { headers }
    );
  }
}
