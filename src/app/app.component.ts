import { Component } from '@angular/core';
import { UserService } from '../modules/authentication/services/user.service';

@Component({
  selector: 'lz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private userService: UserService) {}

  public logOut() {
    this.userService.resetToken();
  }
}
