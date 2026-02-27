import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MATERIAL_MODULES } from '../../../shared/material.module';
import { AuthService } from '../auth.service';
import { RegisterRequest } from 'src/app/core/models/auth.model';

@Component({
    selector: 'app-register',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ...MATERIAL_MODULES
    ],
    standalone: true,
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  isLoading = signal(false);

  // 👁 Toggle states
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  // 🔐 Strong Password Pattern
  private strongPasswordPattern =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';

  registerForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.pattern(this.strongPasswordPattern)
    ]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  // 🔁 Password match validator (clean version)
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const passwordControl = group.get('password');
    const confirmControl = group.get('confirmPassword');

    if (!passwordControl || !confirmControl) return null;

    if (passwordControl.value !== confirmControl.value) {
      confirmControl.setErrors({ passwordMismatch: true });
    } else {
      // remove only passwordMismatch error
      if (confirmControl.hasError('passwordMismatch')) {
        confirmControl.setErrors(null);
      }
    }

    return null;
  }



  // 👁 Toggle methods
  togglePassword(): void {
    this.hidePassword.set(!this.hidePassword());
  }

  toggleConfirmPassword(): void {
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
  }

  register(): void {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const payload: RegisterRequest = {
      firstName: this.registerForm.value.firstName!,
      lastName: this.registerForm.value.lastName!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    };

    this.isLoading.set(true);

    this.authService.register(payload).subscribe({
      next: (response: any) => {

        if (response.isSuccess) {

          // ✅ Clear old session (like old project)
          localStorage.clear();

          // ✅ Store user session (same as old storageService.write)
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data));

          this.snackBar.open(response.msg, 'Close', {
            duration: 3000
          });

          this.registerForm.reset();

          // ✅ Auto redirect (auto login behavior)
          this.router.navigate(['/address-book']);

        } else {
          this.snackBar.open(response.msg, 'Close', {
            duration: 3000
          });
        }
      },

      error: () => {
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
