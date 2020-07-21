import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { User } from '../authentication/user.model';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  connectedUser: User;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.connectedUser = this.authenticationService.connectedUser.getValue();
  }

}
