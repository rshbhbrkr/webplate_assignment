import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../services/AuthService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });


  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.snackBar.open('Please enter valid credentials.', 'Close', {
        duration: 6000,
        panelClass: ['snackbar-error'],
      });
      return;
    }

    this.isLoading = true;

    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(
      (response) => {
        this.isLoading = false;
        this.authService.storeTokenAndUserData(response);
        this.router.navigate(['/profile']);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Login failed! Please check your credentials.';
        this.snackBar.open(this.errorMessage, 'Close', {
          duration: 10000,
          panelClass: ['snackbar-error'],
          //horizontalPosition: 'end'
        });
      }
    );
  }
}