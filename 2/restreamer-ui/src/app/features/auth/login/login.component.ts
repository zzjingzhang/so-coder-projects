import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { LoginCredentials } from '../../../core/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  auth0Loading: boolean = false;
  submitted: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    this.checkAuthCallback();
  }

  private checkAuthCallback(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    const state = this.route.snapshot.queryParamMap.get('state');

    if (code && state) {
      this.auth0Loading = true;
      this.authService.handleAuth0Callback(code, state).subscribe({
        next: () => {
          this.successMessage = 'Login successful!';
          this.auth0Loading = false;
          this.navigateToDashboard();
        },
        error: (err) => {
          this.errorMessage = err.message || 'Auth0 login failed';
          this.auth0Loading = false;
        }
      });
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.loginForm.invalid) {
      return;
    }

    const credentials: LoginCredentials = {
      username: this.f['username'].value,
      password: this.f['password'].value,
      rememberMe: this.f['rememberMe'].value
    };

    this.loading = true;
    this.authService.login(credentials).subscribe({
      next: (user) => {
        console.log('Login successful', user);
        this.successMessage = 'Login successful!';
        this.loading = false;
        setTimeout(() => {
          this.navigateToDashboard();
        }, 500);
      },
      error: (err) => {
        console.log('Login failed', err);
        this.errorMessage = err.message || 'Login failed. Please check your username and password.';
        this.loading = false;
      }
    });
  }

  loginWithAuth0(): void {
    this.authService.loginWithAuth0();
  }

  private navigateToDashboard(): void {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    console.log('Navigating to:', returnUrl || '/dashboard');
    this.router.navigate([returnUrl || '/dashboard']).then(success => {
      console.log('Navigation success:', success);
    }).catch(err => {
      console.error('Navigation error:', err);
    });
  }
}
