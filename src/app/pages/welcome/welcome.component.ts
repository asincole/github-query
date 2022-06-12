import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IQueryResponse } from '../../interfaces/interfaces';
import { UsersService } from '../../services/users.service';
import { ignoreElements, Observable, of, tap } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  queryObject = {
    query: '',
    page: 1,
  };
  queryResult$!: Observable<IQueryResponse>;
  queryResultError$!: Observable<string>;
  isLoading = false;

  constructor(
    private titleService: Title,
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Github Search - Welcome');
    this.route.queryParams.subscribe((params) => {
      this.queryObject = { ...this.queryObject, ...params };
      this.queryUser(this.queryObject.page);
    });
  }

  setQueryString(query: string) {
    this.queryObject.query = query;
    this.queryUser(this.queryObject.page);
  }

  queryUser(page = 1) {
    if (this.queryObject.query) {
      this.isLoading = true;
      this.queryObject.page = page;
      this.queryResult$ = this.userService
        .searchUsers(this.queryObject.query, page)
        .pipe(tap(() => this.updateQueryParams(this.queryObject)));

      this.queryResultError$ = this.queryResult$.pipe(
        ignoreElements(),
        catchError((err) => {
          this.updateQueryParams({
            query: null,
            page: null,
          });
          return of(err);
        })
      );
    }
  }

  async updateQueryParams(params: Params) {
    // we could move this loading flag into the tap operator as well
    this.isLoading = false;
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
