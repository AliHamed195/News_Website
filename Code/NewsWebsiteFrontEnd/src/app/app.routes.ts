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
    ],
  },
];
