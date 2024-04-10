import { Injectable } from '@angular/core';
import { questionsAnswersEndpoints } from '../../URL/url';
import { HeaderUtilService } from '../header-util.service';
import { HttpClient } from '@angular/common/http';
import { PaginationModel } from '../../models/pagination/pagination-model';
import { ResponseStructure } from '../../models/response/response';
import { Observable } from 'rxjs';
import { CreateQuestionAnswerViewModel } from '../../models/question-answer/create-question-answer-view-model';
import { UpdateQuestionAnswerViewModel } from '../../models/question-answer/update-question-answer-view-model';

@Injectable({
  providedIn: 'root',
})
export class QuestionsAnswersService {
  constructor(
    private http: HttpClient,
    private headerUtil: HeaderUtilService
  ) {}

  getAllQuestions(model: PaginationModel): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();
    return this.http.get<ResponseStructure>(
      questionsAnswersEndpoints.getAllQuestions,
      {
        headers: headers,
        params: model as any,
      }
    );
  }

  getAllQuestionsAnswers(
    model: PaginationModel
  ): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();
    return this.http.get<ResponseStructure>(
      questionsAnswersEndpoints.getAllQuestionsAndAnswers,
      {
        headers: headers,
        params: model as any,
      }
    );
  }

  getQuestionAnswerById(id: number): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();
    return this.http.get<ResponseStructure>(
      `${questionsAnswersEndpoints.getAllQuestionAndAnswerById}${id}`,
      {
        headers: headers,
      }
    );
  }

  createQuestionAnswer(
    model: CreateQuestionAnswerViewModel
  ): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();
    return this.http.post<ResponseStructure>(
      questionsAnswersEndpoints.createQuestionAndAnswer,
      model,
      {
        headers: headers,
      }
    );
  }

  updateQuestionAnswer(
    id: number,
    model: UpdateQuestionAnswerViewModel
  ): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();
    return this.http.put<ResponseStructure>(
      `${questionsAnswersEndpoints.updateQuestionAndAnswerById}${id}`,
      model,
      {
        headers: headers,
      }
    );
  }

  deleteQuestionAnswer(id: number): Observable<ResponseStructure> {
    const headers = this.headerUtil.generateHeaders();
    return this.http.put<ResponseStructure>(
      `${questionsAnswersEndpoints.deleteQuestionAndAnswerById}${id}`,
      {},
      {
        headers: headers,
      }
    );
  }
}
