import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import {
  IQueryResponse,
  IUser,
  IUserRepository,
} from '../interfaces/interfaces';
import { GITHUB } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  searchUsers(query: string, page: number): Observable<IQueryResponse> {
    return this.http
      .get<IQueryResponse>(
        `${GITHUB.baseUrl}search/users?q=${query}&per_page=30&page=${page}`
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  getUser(user: string): Observable<IUser> {
    return this.http
      .get<IUser>(`${GITHUB.baseUrl}users/${user}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUserRepos(user: string): Observable<IUserRepository[]> {
    return this.http
      .get<IUserRepository[]>(
        `${GITHUB.baseUrl}users/${user}/repos?per_page=10`
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errMsg = 'Something bad happened; please try again later.';
    if (error.status === 0) {
      errMsg = 'Please check your internet connection';
    } else {
      errMsg = error.error.message;
    }
    return throwError(() => errMsg);
  }
}
