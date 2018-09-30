import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../modules/finances/services/user.service';
import { User } from '../../modules/authentication/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lz-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {}

  ngOnInit() {

  }
}
