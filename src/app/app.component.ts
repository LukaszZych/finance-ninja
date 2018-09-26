import { Component, OnInit } from '@angular/core';
import { UserService } from '../modules/authentication/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'lz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public userService: UserService,
              private router: Router,
              public snackBar: MatSnackBar) {
  }

  public logOut() {
    this.userService.resetToken();
    this.router.navigate(['./']);
    this.snackBar.open(`Logout successful`, null, {
      panelClass: 'force-center',
      duration: 3000
    });
  }
}
