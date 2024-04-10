import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationModel } from '../../models/pagination/pagination-model';
import { ResponseStructure } from '../../models/response/response';
import { categoryEndpoints } from '../../URL/url';
import { Observable } from 'rxjs';
import { CreateCategoryViewModel } from '../../models/category/create-category-view-model';
import { UpdateCategoryViewModel } from '../../models/category/update-category-view-model';
import { HeaderUtilService } from '../header-util.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private http: HttpClient,
    private headerUtil: HeaderUtilService
  ) {}

  getAllCategories(model: PaginationModel): Observable<ResponseStructure> {
    const params = new HttpParams({
      fromObject: {
        startRow: model.startRow.toString(),
        endRow: model.endRow.toString(),
      },
    });

    const headers = this.headerUtil.generateHeaders();

    return this.http.get<ResponseStructure>(categoryEndpoints.getAllCategorys, {
      params,
      headers: headers,
    });
  }

  getCategoryById(id: number): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();

    return this.http.get<ResponseStructure>(
      `${categoryEndpoints.getCategoryById}${id}`,
      {
        headers: headers,
      }
    );
  }

  createCategory(
    model: CreateCategoryViewModel
  ): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();

    return this.http.post<ResponseStructure>(
      categoryEndpoints.createCategory,
      model,
      {
        headers: headers,
      }
    );
  }

  updateCategory(
    id: number,
    model: UpdateCategoryViewModel
  ): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();

    return this.http.put<ResponseStructure>(
      `${categoryEndpoints.updateCategoryById}${id}`,
      model,
      {
        headers: headers,
      }
    );
  }

  deleteCategory(id: number): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();

    return this.http.put<ResponseStructure>(
      `${categoryEndpoints.deleteCategoryById}${id}`,
      {},
      {
        headers: headers,
      }
    );
  }

  getAllcategoriesCount(): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();

    return this.http.get<ResponseStructure>(
      categoryEndpoints.categoryCountAll,
      {
        headers: headers,
      }
    );
  }

  getAllCategoriesWithArticlesCount(): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();

    return this.http.get<ResponseStructure>(
      categoryEndpoints.categoryCountWithArticles,
      {
        headers: headers,
      }
    );
  }
}
