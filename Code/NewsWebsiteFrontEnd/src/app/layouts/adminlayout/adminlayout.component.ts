import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateCategoriesComponent } from '../../pages/category/create-categories/create-categories.component';

@Component({
  selector: 'app-adminlayout',
  standalone: true,
  imports: [RouterOutlet,CreateCategoriesComponent],
  templateUrl: './adminlayout.component.html',
  styleUrl: './adminlayout.component.css'
})
export class AdminlayoutComponent {

}
