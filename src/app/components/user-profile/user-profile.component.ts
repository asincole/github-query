import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/interfaces';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {
  @Input() user!: IUser;
}
