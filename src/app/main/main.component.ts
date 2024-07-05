import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../models/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  currentUser: User;
  users: User[] = [];

  constructor(private accountService: AccountService) { 
      //this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  }

  logout(): void {
    this.accountService.logout();
    //.then(() => this.router.navigate(['login']));
  }


}
