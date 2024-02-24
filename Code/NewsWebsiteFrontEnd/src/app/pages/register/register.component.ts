import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, this.emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(8), this.noWhitespaceValidator]],
      confirmPassword: [''],
      fullName: ['', Validators.required]
    }, { validators: this.checkPasswords });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Registration successful', this.registerForm.value);
    }
  }

  checkPasswords: ValidationErrors | null = (group: FormGroup) => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  };

  noWhitespaceValidator: ValidationErrors | null = (control: AbstractControl) => {
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
}