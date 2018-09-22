import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../modules/authentication/services/user.service';
import { User } from '../../../modules/authentication/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lz-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.subscription = this.userService.getCurrentUser()
        .subscribe((user: User) => {
          console.log(user);
        });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
