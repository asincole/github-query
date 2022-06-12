import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { UsersService } from '../../services/users.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { IUser, IUserRepository } from '../../interfaces/interfaces';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const usersService = jasmine.createSpyObj('UsersService', [
    'getUser',
    'getUserRepos',
  ]);

  let getUserSpy = usersService.getUser.and.returnValue(of({} as IUser));
  let getUserReposSpy = usersService.getUserRepos.and.returnValue(
    of([{} as IUserRepository])
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [{ provide: UsersService, useValue: usersService }],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
