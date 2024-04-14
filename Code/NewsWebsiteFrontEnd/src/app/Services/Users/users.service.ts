import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userEndpoints } from '../../URL/url';
import { UserDetailsViewModel } from '../../models/user/user-details-view-model';
import { UpdateUserViewModel } from '../../models/user/update-user-view-model';
import { UpdateUserPasswordViewModel } from '../../models/user/update-user-password-view-model';
import { GeneralUserDetailsViewModel } from '../../models/user/general-user-details-view-model';
import { HeaderUtilService } from '../header-util.service';
import { CreateUserViewModel } from '../../models/user/create-user-view-model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private headerUtil: HeaderUtilService
  ) {}

  private getHeaders(): HttpHeaders {
    return this.headerUtil.generateHeaders();
  }

  getAllUsers(pagination: {
    startRow: number;
    endRow: number;
  }): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        startRow: pagination.startRow.toString(),
        endRow: pagination.endRow.toString(),
      },
    });

    const headers = this.getHeaders();

    return this.http.get<any>(userEndpoints.getAllUsers, { params, headers });
  }

  getAllDeletedUsers(pagination: {
    startRow: number;
    endRow: number;
  }): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        startRow: pagination.startRow.toString(),
        endRow: pagination.endRow.toString(),
      },
    });

    const headers = this.getHeaders();

    return this.http.get<any>(userEndpoints.getAllDeletedUsers, {
      params,
      headers,
    });
  }

  getUserById(id: string): Observable<UserDetailsViewModel> {
    const headers = this.getHeaders();

    return this.http.get<UserDetailsViewModel>(
      `${userEndpoints.getUserById}${id}`,
      { headers }
    );
  }

  createUser(createUser: CreateUserViewModel): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post<any>(`${userEndpoints.createNewUser}`, createUser, {
      headers,
    });
  }

  updateUser(id: string, updateUser: UpdateUserViewModel): Observable<any> {
    const headers = this.getHeaders();

    return this.http.put<any>(
      `${userEndpoints.updateUserById}${id}`,
      updateUser,
      { headers }
    );
  }

  blockUser(id: string): Observable<any> {
    const headers = this.getHeaders();

    return this.http.put<any>(
      `${userEndpoints.blockUserById}${id}`,
      {},
      { headers }
    );
  }

  unblockUser(id: string): Observable<any> {
    const headers = this.getHeaders();

    return this.http.put<any>(
      `${userEndpoints.unblockUserById}${id}`,
      {},
      { headers }
    );
  }

  deleteUser(id: string): Observable<any> {
    const headers = this.getHeaders();

    return this.http.put<any>(
      `${userEndpoints.deleteUserById}${id}`,
      {},
      { headers }
    );
  }

  undeleteUser(id: string): Observable<any> {
    const headers = this.getHeaders();

    return this.http.put<any>(
      `${userEndpoints.undeleteUserById}${id}`,
      {},
      { headers }
    );
  }

  updateUserPassword(
    id: string,
    passwords: UpdateUserPasswordViewModel
  ): Observable<any> {
    const headers = this.getHeaders();

    return this.http.put<any>(
      `${userEndpoints.updateUserPassword}${id}`,
      passwords,
      { headers }
    );
  }

  getUsersCount(): Observable<any> {
    const headers = this.getHeaders();

    return this.http.get<any>(userEndpoints.getUsersCount, { headers });
  }

  getBlockedUsersCount(): Observable<any> {
    const headers = this.getHeaders();

    return this.http.get<any>(userEndpoints.getBlockedUsersCount, { headers });
  }

  getDeletedUsersCount(): Observable<any> {
    const headers = this.getHeaders();

    return this.http.get<any>(userEndpoints.getDeletedUsersCount, { headers });
  }

  getUserTypes(): Observable<any> {
    const headers = this.getHeaders();

    return this.http.get<any>(userEndpoints.getUserTypes, { headers });
  }

  getUserTypesCount(): Observable<any> {
    const headers = this.getHeaders();

    return this.http.get<any>(userEndpoints.getUserTypesCount, { headers });
  }

  getUsersByType(
    typeId: number,
    pagination: { startRow: number; endRow: number }
  ): Observable<GeneralUserDetailsViewModel[]> {
    const params = new HttpParams({
      fromObject: {
        startRow: pagination.startRow.toString(),
        endRow: pagination.endRow.toString(),
      },
    });

    const headers = this.getHeaders();

    return this.http.get<GeneralUserDetailsViewModel[]>(
      `${userEndpoints.getUsersByType}${typeId}`,
      { params, headers }
    );
  }
}
