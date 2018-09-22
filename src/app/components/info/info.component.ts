import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../modules/authentication/services/user.service';
import { User } from '../../../modules/authentication/models/user.model';

@Component({
  selector: 'lz-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(private userService: UserService) {
    this.userService.getCurrentUser().subscribe((user: User) => {
      console.log(user);
    });
  }

  ngOnInit() {}

}
