import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/Auth/auth-service.service';
import { isPlatformBrowser } from '@angular/common';
import { roleNames } from '../../staticData/role-names';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css',
})
export class ErrorPageComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  goBackHome(): void {
    if (isPlatformBrowser(this.platformId)) {
      const user = this.authService.getUserInfo();
      if (user && user.roles.includes(roleNames.Admin)) {
        this.router.navigate(['/Admin/']);
        return;
      }
      this.router.navigate(['/Home/']);
    }
  }
}
