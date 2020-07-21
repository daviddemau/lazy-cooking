import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthenticationResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDn-Q9ptuh1GxBmTkc_2MnhtCprNVifOtY';
  signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDn-Q9ptuh1GxBmTkc_2MnhtCprNVifOtY';

  connectedUser = new BehaviorSubject<User>(null);
  private autoLogoutTimer;

  constructor(private http: HttpClient, private router: Router) {
  }

  signup(credentials) {
    return this.http.post<AuthenticationResponse>(this.signUpUrl, {...credentials, returnSecureToken: true})
      .pipe(catchError(error => this.handleError(error)), tap(response => this.manageUser(response)));
  }

  login(credentials) {
    return this.http.post<AuthenticationResponse>(this.signInUrl, {...credentials, returnSecureToken: true})
      .pipe(catchError(error => this.handleError(error)), tap(response => this.manageUser(response)));
  }

  logout() {
    this.connectedUser.next(null);
    localStorage.removeItem('connectedUser');
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }
    this.autoLogoutTimer = null;
    this.router.navigate(['/authentication']);
  }

  autoLogin() {
    const userData: { email: string, id: string, TOKEN: string, TOKEN_EXPIRATION_DATE: string }
      = JSON.parse(localStorage.getItem('connectedUser'));

    if (userData) {
      const user =
        new User(
          userData.email,
          userData.id,
          userData.TOKEN,
          new Date(userData.TOKEN_EXPIRATION_DATE)
        );

      if (user.token) {
        this.connectedUser.next(user);
      }

      // auto log out the user after token is expired
      const expirationTimer = new Date(userData.TOKEN_EXPIRATION_DATE).getTime() - new Date().getTime();
      this.autoLogout(expirationTimer);
    }
  }

  autoLogout(expirationTimer: number) {
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, expirationTimer);
  }

  manageUser(response: AuthenticationResponse) {
    let expirationDate;
    response.expiresIn ? expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
    : expirationDate = null;

    const user =
      new User(
        response.email,
        response.localId,
        response.idToken,
        expirationDate
      );

    this.connectedUser.next(user);
    localStorage.setItem('connectedUser', JSON.stringify(user));

    // auto log out the user after token is expired
    if (expirationDate) {
      this.autoLogout(+response.expiresIn * 1000);
    }
  }

  handleError(error) {
    let errorMessage = 'An unknown error occured!';
    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'email already exists';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'too many attempts, please retry later';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.';
    }
    return throwError(errorMessage);
  }
}
