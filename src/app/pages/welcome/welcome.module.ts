import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { SearchComponent } from '../../components/search/search.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { NzCardModule } from 'ng-zorro-antd/card';

@NgModule({
  declarations: [WelcomeComponent, SearchComponent, UserListComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    NzGridModule,
    NzInputModule,
    ReactiveFormsModule,
    NzPaginationModule,
    NzButtonModule,
    NzFormModule,
    NzCardModule,
  ],
})
export class WelcomeModule {}
