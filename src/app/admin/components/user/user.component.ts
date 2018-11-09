import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FullUser } from '../../models/full-user.model';

@Component({
  selector: 'lz-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  @Input() account: FullUser;
  @Output() removeAccount = new EventEmitter<string>();

  public removeUser(id) {
    this.removeAccount.emit(id);
  }
}
