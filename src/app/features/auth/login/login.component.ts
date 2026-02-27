import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MATERIAL_MODULES } from '../../../shared/material.module';
import { LoginRequest, AuthResponse } from '../../../core/models/auth.model';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ...MATERIAL_MODULES
    ],
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isLoading = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  validateLogin(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload: LoginRequest = this.loginForm.value as LoginRequest;

    this.isLoading.set(true);

    this.authService.login(payload).subscribe({
      next: (response: AuthResponse) => {

        if (response.res==0) {

          // Store required auth data
          localStorage.setItem('token', response.data.user_id.toString());
          localStorage.setItem('user', JSON.stringify(response.data));

          this.snackBar.open(response.msg, 'Close', {
            duration: 3000
          });

          this.loginForm.reset();

          this.router.navigate(['/welcome']);

        } else {
          this.snackBar.open(response.msg, 'Close', {
            duration: 3000
          });
        }
      },

      error: (error) => {
        console.error('Login Error:', error);

        this.snackBar.open(
          'Something went wrong. Please try again.',
          'Close',
          { duration: 3000 }
        );
      },

      complete: () => {
        this.isLoading.set(false);
      }
    });
  }
}
