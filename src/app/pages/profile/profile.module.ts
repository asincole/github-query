import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { RepoListComponent } from '../../components/repo-list/repo-list.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  EyeOutline,
  ForkOutline,
  GlobalOutline,
  PushpinOutline,
  StarOutline,
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
  PushpinOutline,
  GlobalOutline,
  StarOutline,
  EyeOutline,
  ForkOutline,
];

@NgModule({
  declarations: [ProfileComponent, UserProfileComponent, RepoListComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NzListModule,
    NzSkeletonModule,
    NzGridModule,
    NzIconModule.forChild(icons),
  ],
})
export class ProfileModule {}
