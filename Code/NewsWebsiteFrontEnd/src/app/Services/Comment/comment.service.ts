import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderUtilService } from '../header-util.service';
import { CommentResponse } from '../../models/comment/CommentResponse';
import { Observable } from 'rxjs';
import { commentEndpoints } from '../../URL/url';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private http: HttpClient,
    private headerUtil: HeaderUtilService
  ) {}

  getComments(urlAsText: string): Observable<CommentResponse> {
    const headers = this.headerUtil.generateHeaders();
    return this.http.get<CommentResponse>(
      commentEndpoints.getComments(urlAsText),
      { headers }
    );
  }

  addComment(urlAsText: string, text: string): Observable<any> {
    const headers = this.headerUtil.generateHeaders();
    return this.http.post<any>(
      commentEndpoints.addComment(urlAsText),
      { text },
      { headers }
    );
  }

  updateComment(commentId: number, text: string): Observable<any> {
    const headers = this.headerUtil.generateHeaders();
    return this.http.put<any>(
      commentEndpoints.updateComment(commentId),
      { text },
      { headers }
    );
  }

  deleteComment(commentId: number): Observable<any> {
    const headers = this.headerUtil.generateHeaders();
    return this.http.delete<any>(commentEndpoints.deleteComment(commentId), {
      headers,
    });
  }
}
