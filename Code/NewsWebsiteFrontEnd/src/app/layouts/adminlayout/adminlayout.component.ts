import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateCategoriesComponent } from '../../pages/category/create-categories/create-categories.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

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
export class AdminlayoutComponent {}
