import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { IUser, IUserRepository } from '../../interfaces/interfaces';
import { ignoreElements, Observable, of, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // user data property
  user$!: Observable<IUser>;
  userError$!: Observable<string>;

  // user repositories property
  userRepos$!: Observable<IUserRepository[]>;
  userReposError$!: Observable<string>;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.user$ = this.userService.getUser(id).pipe(
      tap((user) => {
        this.titleService.setTitle(`Github Search - ${user.name}`);
      })
    );
    this.userError$ = this.user$.pipe(
      ignoreElements(),
      catchError((err) => of(err))
    );

    // get user's repository data
    this.userRepos$ = this.userService.getUserRepos(id);
    this.userReposError$ = this.userRepos$.pipe(
      ignoreElements(),
      catchError((err) => of(err))
    );
  }
}
