import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthServiceService } from '../../Services/Auth/auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { roleNames } from '../../staticData/role-names';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (res) => {
          if (res) {
            if (res.success) {
              this.errorMessage = undefined;
              this.redirectUser();
            } else {
              this.errorMessage = res.message;
            }
          } else {
            this.errorMessage = 'Invalid login credentials.';
          }
        },
        error: (error) => {
          this.errorMessage = 'An error occurred during login.';
        },
      });
    }
  }

  private redirectUser(): void {
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      if (userInfo.roles.includes(roleNames.Admin)) {
        this.router.navigate(['/Admin']);
      } else if (userInfo.roles.includes(roleNames.Visitor)) {
        this.router.navigate(['/Home']);
      } else {
        this.router.navigate(['/login']);
      }
    }
  }

  clearErrorMessage(): void {
    this.errorMessage = undefined;
  }
}
