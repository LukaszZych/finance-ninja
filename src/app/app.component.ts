import { Component } from '@angular/core';
import { UserService } from '../modules/authentication/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public userService: UserService,
              private router: Router) {
  }

  public logOut() {
    this.userService.resetToken();
    this.router.navigate(['./']);
  }
}
