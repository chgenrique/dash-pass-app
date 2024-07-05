import { Component } from '@angular/core';
import { User } from './models/user';
import { AccountService } from './services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dash-pass-app';

  navbarOpen = false;
  currentUser: User = new User;

  show = false;
  allowToShow = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  isNavbarCollapsed = true;
  navbarCollapsed = true;

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  constructor(private accountService: AccountService, private router: Router) { 
    this.CheckAuthToShow();
  }

  onContextMenuAction(item: string) {
    //alert(`click ${item}`);
    this.router.navigate([item]);
  }

  CheckAuthToShow(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.accountService.user.subscribe(u => {
      this.allowToShow = u != null && u.token != null;
    });
    
  }

  logout(): void {
    this.accountService.logout();
    //.then(() => this.router.navigate(['login']));
  }
}
