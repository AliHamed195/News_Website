import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminlayoutComponent } from './layouts/adminlayout/adminlayout.component';
import { AuthlayoutComponent } from './layouts/authlayout/authlayout.component';
import { SystemAnalizerComponent } from './pages/system-analizer/system-analizer.component';
import { AllHashTagsComponent } from './pages/hashTags/all-hash-tags/all-hash-tags.component';
import { AllCategoriesComponent } from './pages/category/all-categories/all-categories.component';
import { AllQuestionAnswersComponent } from './pages/question-answers/all-question-answers/all-question-answers.component';
import { CreateAndUpdateQuestionAnswerComponent } from './pages/question-answers/create-and-update-question-answer/create-and-update-question-answer.component';
import { QuestionAnswerDetailsComponent } from './pages/question-answers/question-answer-details/question-answer-details.component';
import { AllArticlesComponent } from './pages/article/all-articles/all-articles.component';
import { CreateAndUpdateArticleComponent } from './pages/article/create-and-update-article/create-and-update-article.component';
import { ArticleDetailsComponent } from './pages/article/article-details/article-details.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { HomeLandingPageComponent } from './pages/home-landing-page/home-landing-page.component';
import { AdminGuard } from './auth/admin.guard';
import { AllUsersComponent } from './pages/user/all-users/all-users.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
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
    path: 'Home',
    component: HomeLayoutComponent,
    children: [{ path: '', component: HomeLandingPageComponent }],
  },
  {
    path: 'Admin',
    component: AdminlayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', component: SystemAnalizerComponent },
      { path: 'system-analizer', component: SystemAnalizerComponent },
      { path: 'users-all', component: AllUsersComponent },
      { path: 'hash-tags-all', component: AllHashTagsComponent },
      { path: 'categories-all', component: AllCategoriesComponent },
      { path: 'questions-answers-all', component: AllQuestionAnswersComponent },
      {
        path: 'questions-answers-upsert',
        component: CreateAndUpdateQuestionAnswerComponent,
      },
      {
        path: 'questions-answers-upsert/:id',
        component: CreateAndUpdateQuestionAnswerComponent,
      },
      {
        path: 'questions-answers-details/:id',
        component: QuestionAnswerDetailsComponent,
      },
      {
        path: 'articles-all',
        component: AllArticlesComponent,
      },
      {
        path: 'articles-upsert',
        component: CreateAndUpdateArticleComponent,
      },
      {
        path: 'articles-upsert/:id',
        component: CreateAndUpdateArticleComponent,
      },
      {
        path: 'articles-details/:id',
        component: ArticleDetailsComponent,
      },
    ],
  },
  { path: 'Error-Page', component: ErrorPageComponent },
  { path: '**', component: ErrorPageComponent },
];
