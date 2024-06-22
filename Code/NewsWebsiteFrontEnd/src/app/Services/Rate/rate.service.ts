// src/app/services/rate.service.ts
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderUtilService } from '../header-util.service';
import { RateArticleDTO } from '../../models/rate/rate';
import { ResponseStructure } from '../../models/response/response';
import { rateEndpoints } from '../../URL/url';

@Injectable({
  providedIn: 'root',
})
export class RateService {
  constructor(
    private http: HttpClient,
    private headerUtil: HeaderUtilService
  ) {}

  rateArticle(model: RateArticleDTO): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();
    return this.http.post<ResponseStructure>(rateEndpoints.rateArticle, model, {
      headers: headers,
    });
  }

  getUserRating(
    userId: string,
    urlAsText: string
  ): Observable<{ Rate: number }> {
    const headers = this.headerUtil.generateHeaders();
    const params = new HttpParams()
      .set('userId', userId)
      .set('urlAsText', urlAsText);
    return this.http.get<{ Rate: number }>(rateEndpoints.userRating, {
      headers: headers,
      params,
    });
  }
}
