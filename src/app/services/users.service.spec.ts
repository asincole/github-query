import { TestBed, waitForAsync } from '@angular/core/testing';

import { UsersService } from './users.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import {
  IQueryResponse,
  IUser,
  IUserRepository,
} from '../interfaces/interfaces';

describe('UsersService', () => {
  let service: UsersService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UsersService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  function retryRequestHelper(
    retryCount: number,
    url: string,
    errObj: { msg: string; status: number }
  ) {
    for (let i = 0, c = retryCount + 1; i < c; i++) {
      let req = httpTestingController.expectOne(url);
      req.flush(new Error(errObj.msg), {
        status: errObj.status,
        statusText: errObj.msg,
      });
    }
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Search Users', () => {
    it('should get list of users', waitForAsync(() => {
      const testData: IQueryResponse = {
        total_count: 5,
        incomplete_results: false,
        items: [],
      };

      service.searchUsers('cole', 2).subscribe((data) => {
        expect(data).toEqual(testData);
      });

      const req = httpTestingController.expectOne(
        'https://api.github.com/search/users?q=cole&per_page=30&page=2'
      );

      expect(req.request.method).toEqual('GET');

      req.flush(testData);
    }));

    it('should handle error appropriately', waitForAsync(() => {
      const emsg = 'rate limit exceeded';

      service.searchUsers('err', 2).subscribe({
        next: () => fail('should have failed with the network error'),
        error: (error: string) => {
          expect(error).toBe(emsg);
        },
      });
      retryRequestHelper(
        2,
        'https://api.github.com/search/users?q=err&per_page=30&page=2',
        {
          status: 403,
          msg: emsg,
        }
      );
    }));
  });

  describe('Get User', () => {
    it('should get specific user', waitForAsync(() => {
      const testData: IUser = {
        login: 'asincole',
        avatar_url: 'fake url',
        followers_url: 'test url',
      } as IUser;

      service.getUser('cole').subscribe((data) => {
        expect(data).toEqual(testData);
      });

      const req = httpTestingController.expectOne(
        'https://api.github.com/users/cole'
      );

      expect(req.request.method).toEqual('GET');

      req.flush(testData);
    }));

    it('should handle error appropriately', waitForAsync(() => {
      const emsg = 'user not found';

      service.getUser('cole').subscribe({
        next: () => fail('should have failed with the network error'),
        error: (error: string) => {
          expect(error).toBe(emsg);
        },
      });
      retryRequestHelper(2, 'https://api.github.com/users/cole', {
        status: 404,
        msg: emsg,
      });
    }));
  });

  describe('Get User Repo', () => {
    it('should get specific user', waitForAsync(() => {
      const testData: IUserRepository = {
        stargazers_count: 2,
        watchers_count: 1,
        forks: 5,
      } as IUserRepository;

      service.getUserRepos('cole').subscribe((data) => {
        expect(data).toEqual([testData]);
      });

      const req = httpTestingController.expectOne(
        'https://api.github.com/users/cole/repos?per_page=10'
      );

      expect(req.request.method).toEqual('GET');

      req.flush([testData]);
    }));

    it('should handle error appropriately', waitForAsync(() => {
      const emsg = 'Please check your internet connection';

      service.getUserRepos('cole').subscribe({
        next: () => fail('should have failed with the network error'),
        error: (error: string) => {
          expect(error).toBe(emsg);
        },
      });
      retryRequestHelper(
        2,
        'https://api.github.com/users/cole/repos?per_page=10',
        {
          status: 0,
          msg: emsg,
        }
      );
    }));
  });
});
