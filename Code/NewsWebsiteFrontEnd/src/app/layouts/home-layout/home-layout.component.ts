import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../../Services/Auth/auth-service.service';
import { UsersService } from '../../Services/Users/users.service';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf, isPlatformBrowser } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SubHomeNavComponent } from '../../components/sub-home-nav/sub-home-nav.component';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    SubHomeNavComponent,
    NgIf,
  ],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css',
})
export class HomeLayoutComponent implements OnInit {
  UserFullName: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthServiceService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUserInfo();
    }
  }

  private loadUserInfo() {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const userData = JSON.parse(userInfo);
      this.UserFullName = userData.fullName;
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  logout() {
    this.authService.logout();
  }

  resetPassword() {
    Swal.fire({
      title: 'Reset Password',
      html: `
    <input id="swal-input1" class="swal2-input" placeholder="Current Password" type="password" style="margin-bottom: 8px;">
    <input id="swal-input2" class="swal2-input" placeholder="New Password" type="password" style="margin-bottom: 8px;">
    <input id="swal-input3" class="swal2-input" placeholder="Confirm New Password" type="password" style="margin-bottom: 8px;">
  `,
      focusConfirm: false,
      preConfirm: () => {
        const currentPassword = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        const newPassword = (
          document.getElementById('swal-input2') as HTMLInputElement
        ).value;
        const confirmPassword = (
          document.getElementById('swal-input3') as HTMLInputElement
        ).value;

        if (newPassword !== confirmPassword) {
          Swal.showValidationMessage('Passwords do not match');
          return false;
        } else {
          return { currentPassword, newPassword };
        }
      },
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const userId = this.authService.getUserInfo()?.userId ?? '';
        this.usersService
          .updateUserPassword(userId, {
            currentPassword: result.value.currentPassword,
            newPassword: result.value.newPassword,
          })
          .subscribe(
            (response) => {
              Swal.fire(
                'Success',
                'Password has been updated successfully.',
                'success'
              );
            },
            (error) => {
              Swal.fire(
                'Error',
                'There was a problem updating your password.',
                'error'
              );
            }
          );
      }
    });
  }

  goToProfile() {
    this.router.navigate(['/settings']);
  }
}
