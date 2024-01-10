import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Role } from '../role';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  staff: boolean = false;
  admin: boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getUser(user => {
      if (user && (user.role != Role.ROLE_ADMIN || user.role != Role.ROLE_REPORTER)) {
        this.staff = true;
      }
      if (user && (user.role == Role.ROLE_ADMIN)) {
        this.admin = true;
      }
    })
  }
}
