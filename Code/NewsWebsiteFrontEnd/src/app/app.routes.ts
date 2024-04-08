import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminlayoutComponent } from './layouts/adminlayout/adminlayout.component';
import { AuthlayoutComponent } from './layouts/authlayout/authlayout.component';
import { SystemAnalizerComponent } from './pages/system-analizer/system-analizer.component';
import { AllHashTagsComponent } from './pages/hashTags/all-hash-tags/all-hash-tags.component';
import { AllCategoriesComponent } from './pages/category/all-categories/all-categories.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthlayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: 'Admin',
    component: AdminlayoutComponent,
    children: [
      { path: '', component: SystemAnalizerComponent },
      { path: 'system-analizer', component: SystemAnalizerComponent },
      { path: 'hash-tags-all', component: AllHashTagsComponent },
      { path: 'categories-all', component: AllCategoriesComponent },
    ],
  },
];
