import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  
  constructor(private router: Router) { 
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.getUserAsObservable()
        .pipe(map(u => {
     
            console.log("pipe map");
            console.log(u);

            if (u && u.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(u));
              this.userSubject.next(u);
            }

            return u;
        }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);

    //TBD
    this.router.navigate(['/login']);

    //this.router.navigate(['/account/login']);
  }

  getUserAsObservable(): Observable<User> {
    return of({
       id: 1001,
       username: '',
       firstName: 'User',
       lastName: 'Doe',
       token: 'xcFD100jushYUI-%sdf'
    });
  }
}
