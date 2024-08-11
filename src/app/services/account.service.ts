import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account';
import { nanoid } from 'nanoid'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getContact(id: string): Observable<Account | undefined> {
    return this.http.get<Account>(`api/accounts/${id}`)
      .pipe(map(c => {
        const cd = c.createDate ? new Date(c.createDate) : null;
        return { ...c, createDate: cd }
      }));
  }

  getAllContacts(): Observable<Account[]> {
    return this.http.get<Account[]>('api/accounts');
  }

  saveContact(a: Partial<Account>): Observable<Account> {
    const headers = { headers: { 'Content-Type': 'application/json' } };

    if (!a.id || a.id === 0) {
      let newContact: Partial<Account> = { ...a, id: +nanoid(5) };
      return this.http.post<Account>('api/accounts/', newContact, headers)
    }
    else
      return this.http.put<Account>('api/accounts/', a, headers)
  }
}
