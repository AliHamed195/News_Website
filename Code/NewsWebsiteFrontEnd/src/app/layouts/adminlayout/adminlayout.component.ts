import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateCategoriesComponent } from '../../pages/category/create-categories/create-categories.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { isPlatformBrowser } from '@angular/common';
import { AuthServiceService } from '../../Services/Auth/auth-service.service';

@Component({
  selector: 'app-adminlayout',
  standalone: true,
  imports: [
    RouterOutlet,
    CreateCategoriesComponent,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './adminlayout.component.html',
  styleUrl: './adminlayout.component.css',
})
export class AdminlayoutComponent implements OnInit {
  UserFullName: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthServiceService
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

  logout() {
    this.authService.logout();
  }
}
