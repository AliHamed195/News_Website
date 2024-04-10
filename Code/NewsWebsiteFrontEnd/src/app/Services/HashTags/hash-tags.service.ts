import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateHashTagViewModel } from '../../models/hash-tag/create-hash-tag-view-model';
import { UpdateHashTagViewModel } from '../../models/hash-tag/update-hash-tag-view-model';
import { ResponseStructure } from '../../models/response/response';
import { hashTagsEndpoints } from '../../URL/url';
import { PaginationModel } from '../../models/pagination/pagination-model';
import { HeaderUtilService } from '../header-util.service';

@Injectable({
  providedIn: 'root',
})
export class HashTagsService {
  constructor(
    private http: HttpClient,
    private headerUtil: HeaderUtilService
  ) {}

  getAllHashTags(model: PaginationModel): Observable<ResponseStructure> {
    const params = new HttpParams({
      fromObject: {
        startRow: model.startRow.toString(),
        endRow: model.endRow.toString(),
      },
    });

    const headers = this.headerUtil.generateHeaders();

    return this.http.get<ResponseStructure>(hashTagsEndpoints.getAllHashTags, {
      params,
      headers: headers,
    });
  }

  getHashTagById(id: number): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();

    return this.http.get<ResponseStructure>(
      `${hashTagsEndpoints.getHashTagById}${id}`,
      {
        headers: headers,
      }
    );
  }

  createHashTag(model: CreateHashTagViewModel): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();

    return this.http.post<ResponseStructure>(
      hashTagsEndpoints.createHashTag,
      model,
      {
        headers: headers,
      }
    );
  }

  updateHashTag(
    id: number,
    model: UpdateHashTagViewModel
  ): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();

    return this.http.put<ResponseStructure>(
      `${hashTagsEndpoints.updateHashTagById}${id}`,
      model,
      {
        headers: headers,
      }
    );
  }

  deleteHashTag(id: number): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();

    return this.http.put<ResponseStructure>(
      `${hashTagsEndpoints.deleteHashTagById}${id}`,
      {},
      {
        headers: headers,
      }
    );
  }

  getAllHashTagsCount(): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();

    return this.http.get<ResponseStructure>(hashTagsEndpoints.hashTagCountAll, {
      headers: headers,
    });
  }

  getUsedHashTagsCount(): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();

    return this.http.get<ResponseStructure>(
      hashTagsEndpoints.hashTagCountIsUsed,
      {
        headers: headers,
      }
    );
  }
}
