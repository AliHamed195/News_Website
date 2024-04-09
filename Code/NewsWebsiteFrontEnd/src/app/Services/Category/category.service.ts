import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationModel } from '../../models/pagination/pagination-model';
import { ResponseStructure } from '../../models/response/response';
import { categoryEndpoints } from '../../URL/url';
import { Observable } from 'rxjs';
import { CreateCategoryViewModel } from '../../models/category/create-category-view-model';
import { UpdateCategoryViewModel } from '../../models/category/update-category-view-model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getAllCategories(model: PaginationModel): Observable<ResponseStructure> {
    const params = new HttpParams({
      fromObject: {
        startRow: model.startRow.toString(),
        endRow: model.endRow.toString(),
      },
    });

    return this.http.get<ResponseStructure>(categoryEndpoints.getAllCategorys, {
      params,
      headers: this.getHeaders(),
    });
  }

  getCategoryById(id: number): Observable<ResponseStructure> {
    return this.http.get<ResponseStructure>(
      `${categoryEndpoints.getCategoryById}${id}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  createCategory(
    model: CreateCategoryViewModel
  ): Observable<ResponseStructure> {
    return this.http.post<ResponseStructure>(
      categoryEndpoints.createCategory,
      model,
      {
        headers: this.getHeaders(),
      }
    );
  }

  updateCategory(
    id: number,
    model: UpdateCategoryViewModel
  ): Observable<ResponseStructure> {
    return this.http.put<ResponseStructure>(
      `${categoryEndpoints.updateCategoryById}${id}`,
      model,
      {
        headers: this.getHeaders(),
      }
    );
  }

  deleteCategory(id: number): Observable<ResponseStructure> {
    return this.http.put<ResponseStructure>(
      `${categoryEndpoints.deleteCategoryById}${id}`,
      {},
      {
        headers: this.getHeaders(),
      }
    );
  }

  getAllcategoriesCount(): Observable<ResponseStructure> {
    return this.http.get<ResponseStructure>(
      categoryEndpoints.categoryCountAll,
      {
        headers: this.getHeaders(),
      }
    );
  }

  getAllCategoriesWithArticlesCount(): Observable<ResponseStructure> {
    return this.http.get<ResponseStructure>(
      categoryEndpoints.categoryCountWithArticles,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
