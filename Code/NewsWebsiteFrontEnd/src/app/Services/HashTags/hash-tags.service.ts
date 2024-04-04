import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateHashTagViewModel } from '../../models/hash-tag/create-hash-tag-view-model';
import { UpdateHashTagViewModel } from '../../models/hash-tag/update-hash-tag-view-model';
import { ResponseStructure } from '../../models/response/response';
import { hashTagsEndpoints } from '../../URL/url';
import { PaginationModel } from '../../models/pagination/pagination-model';

@Injectable({
  providedIn: 'root',
})
export class HashTagsService {
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getAllHashTags(model: PaginationModel): Observable<ResponseStructure> {
    const params = new HttpParams({
      fromObject: {
        startRow: model.startRow.toString(),
        endRow: model.endRow.toString(),
      },
    });

    return this.http.get<ResponseStructure>(hashTagsEndpoints.getAllHashTags, {
      params,
      headers: this.getHeaders(),
    });
  }

  getHashTagById(id: number): Observable<ResponseStructure> {
    return this.http.get<ResponseStructure>(
      `${hashTagsEndpoints.getHashTagById}${id}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  createHashTag(model: CreateHashTagViewModel): Observable<ResponseStructure> {
    return this.http.post<ResponseStructure>(
      hashTagsEndpoints.createHashTag,
      model,
      {
        headers: this.getHeaders(),
      }
    );
  }

  updateHashTag(
    id: number,
    model: UpdateHashTagViewModel
  ): Observable<ResponseStructure> {
    return this.http.put<ResponseStructure>(
      `${hashTagsEndpoints.updateHashTagById}${id}`,
      model,
      {
        headers: this.getHeaders(),
      }
    );
  }

  deleteHashTag(id: number): Observable<ResponseStructure> {
    return this.http.put<ResponseStructure>(
      `${hashTagsEndpoints.deleteHashTagById}${id}`,
      {},
      {
        headers: this.getHeaders(),
      }
    );
  }

  getAllHashTagsCount(): Observable<ResponseStructure> {
    return this.http.get<ResponseStructure>(hashTagsEndpoints.hashTagCountAll, {
      headers: this.getHeaders(),
    });
  }

  getUsedHashTagsCount(): Observable<ResponseStructure> {
    return this.http.get<ResponseStructure>(
      hashTagsEndpoints.hashTagCountIsUsed,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
