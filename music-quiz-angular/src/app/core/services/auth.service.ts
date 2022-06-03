import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { user } from '../types/models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<user> = new BehaviorSubject(undefined);
  public user$: Observable<user> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.userSubject.next(user);
    }
  }

  public login = (email: string, password: string) =>
    this.http
      .get<user>('http://localhost:3000/login', { params: { email, password } })
      .pipe(
        map((value) => {
          //console.log(value);
          return value;
        }),
        tap((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        })
        // catchError((err) => {
        //   throw new Error('error en credenciales');
        // })
      );
  public isLoggedIn(): boolean {
    return this.userSubject.value !== undefined;
  }
  public logout() {
    localStorage.removeItem('user');
    this.userSubject.next(undefined);
  }
}
