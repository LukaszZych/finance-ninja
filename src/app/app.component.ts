import { Component, OnInit } from '@angular/core';
import { UserService } from '../modules/shared/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TokenService } from '../modules/shared/services/token.service';

@Component({
  selector: 'lz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router,
              public snackBar: MatSnackBar,
              public token: TokenService) {
  }

  public logOut() {
    this.token.resetToken();
    this.router.navigate(['./']);
    this.snackBar.open(`Logout successful`, null, {
      panelClass: 'force-center',
      duration: 3000
    });
  }
}
