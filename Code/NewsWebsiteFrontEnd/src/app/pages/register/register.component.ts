import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthServiceService } from '../../Services/Auth/auth-service.service';
import { RegisterModel } from '../../models/account/register-model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        userName: ['', Validators.required],
        email: ['', [Validators.required, this.emailValidator()]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.noWhitespaceValidator,
          ],
        ],
        confirmPassword: [''],
        fullName: ['', Validators.required],
      },
      { validators: this.checkPasswords }
    );
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerModel: RegisterModel = {
        userName: this.registerForm.get('userName')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        fullName: this.registerForm.get('fullName')?.value,
      };

      this.authService.register(registerModel).subscribe({
        next: (res) => {
          if (res) {
            if (res.success) {
              this.clearErrorMessage();
            } else {
              this.errorMessage = `${res.message}, ${res.errors}`;
            }
          } else {
            this.errorMessage = 'Registration failed';
          }
        },
        error: (error) => (this.errorMessage = 'Registration error'),
      });
    }
  }

  checkPasswords: ValidationErrors | null = (group: FormGroup) => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  };

  noWhitespaceValidator: ValidationErrors | null = (
    control: AbstractControl
  ) => {
    const isWhitespace = /\s/.test(control.value);
    return !isWhitespace ? null : { whitespace: true };
  };

  emailValidator(): Validators {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
      const valid = emailRegex.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }

  clearErrorMessage(): void {
    this.errorMessage = undefined;
  }
}
