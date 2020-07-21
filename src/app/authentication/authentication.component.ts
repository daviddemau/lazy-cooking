import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationResponse, AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import set = Reflect.set;

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  isLoginMode = true;
  isLoading: boolean;
  authentForm: FormGroup;
  authenticationError: string;
  authenticationObs: Observable<AuthenticationResponse>;

  constructor(private fb: FormBuilder, private authentService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  toggleAuthenticationMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  createForm() {
    this.authentForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.authentForm.get('email');
  }

  get password() {
    return this.authentForm.get('password');
  }

  authenticate() {
    if (this.authentForm.valid) {
      this.isLoading = true;
      this.isLoginMode ? this.authenticationObs = this.authentService.login(this.authentForm.value) :
        this.authenticationObs = this.authentService.signup(this.authentForm.value);

      this.authenticationObs.subscribe(
        response => {
          this.router.navigate(['recipes']);
          setTimeout(() => this.isLoading = false, 1000);
          this.authenticationError = null;
        },
        errorMessage => {
          this.isLoading = false;
          this.authenticationError = errorMessage;
        }
      );
      this.authentForm.reset();
    }
  }
}
