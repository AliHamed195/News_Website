import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../../Services/Users/users.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { UpdateUserViewModel } from '../../../models/user/update-user-view-model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgFor, NgIf],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  userTypes: any[] = [];
  languages = [
    { code: 'EN', name: 'English' },
    { code: 'AR', name: 'Arabic' },
  ];
  countries = [
    { code: 'USA', name: 'United States' },
    { code: 'EGY', name: 'Egypt' },
  ];
  userId: string;
  profileImagePreview: string | undefined;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.userId = this.route.snapshot.params['id'];
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      userTypeId: ['', Validators.required],
      country: ['', Validators.required],
      websiteLanguage: ['', Validators.required],
      profileImage: [null],
    });
  }

  ngOnInit(): void {
    this.loadUserDetails(this.userId);
    this.loadUserTypes();
  }

  loadUserDetails(id: string) {
    this.usersService.getUserById(id).subscribe((res: any) => {
      this.userForm.patchValue(res.data);
      console.log('res.data = ', res.data);
      this.profileImagePreview = res.data.profileImagePath
        ? JSON.parse(res.data.profileImagePath)
        : this.getUserDefaultProfileImage();

      console.log('this.profileImagePreview = ' + this.profileImagePreview);
    });
  }

  loadUserTypes() {
    this.usersService.getUserTypes().subscribe((res: any) => {
      this.userTypes = res.data;
    });
  }

  onProfileImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImagePreview = reader.result?.toString();
      };
      reader.readAsDataURL(file);
    }
  }

  saveUser() {
    if (this.userForm.valid) {
      const model: UpdateUserViewModel = {
        userName: this.userForm.value.userName,
        email: this.userForm.value.email,
        fullName: this.userForm.value.fullName,
        userTypeId: this.userForm.value.userTypeId,
        country: this.userForm.value.country,
        websiteLanguage: this.userForm.value.websiteLanguage,
        profileImagePath: JSON.stringify(this.profileImagePreview?.toString()),
      };

      console.log(model);

      this.usersService.updateUser(this.userId, model).subscribe({
        next: () => {
          Swal.fire('Success', 'User updated successfully', 'success');
          this.router.navigate(['/Admin/users-all']);
        },
        error: (error) => {
          Swal.fire('Error', 'Failed to update user', 'error');
        },
      });
    }
  }

  cancel() {
    this.router.navigate(['/Admin/users-all']);
  }

  getUserDefaultProfileImage() {
    const defaultImageData = atob(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    );
    const blob = new Blob(
      [
        new Uint8Array(
          defaultImageData.split('').map((char) => char.charCodeAt(0))
        ),
      ],
      { type: 'image/gif' }
    );
    const imageUrl = URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
}
