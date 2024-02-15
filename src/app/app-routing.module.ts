import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { TeacherlistComponent } from './teacher/teacherlist/teacherlist.component';
import { TeachersetupComponent } from './teacher/teachersetup/teachersetup.component';
import { SubjectlistComponent } from './subject/subjectlist/subjectlist.component';
import { SubjectsetupComponent } from './subject/subjectsetup/subjectsetup.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',   // This is the Default Route When browser Start
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'teacherlist',
    component: TeacherlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'teacher',
    component: TeachersetupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'teacher/:id',
    component: TeachersetupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subjects',
    component: SubjectlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subject',
    component: SubjectsetupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subject/:id',
    component: SubjectsetupComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
