import { Component } from '@angular/core';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  currentUser: User;
  users: User[] = [];

  constructor(private authenticationService: LoginService) { 
      //this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  }

  logout(): void {
    this.authenticationService.logout();
    //.then(() => this.router.navigate(['login']));
  }


}
