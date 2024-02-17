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
import { StudentlistComponent } from './student/studentlist/studentlist.component';
import { StudentsetupComponent } from './student/studentsetup/studentsetup.component';
import { EnrolllistComponent } from './enroll/enrolllist/enrolllist.component';
import { EnrollsetupComponent } from './enroll/enrollsetup/enrollsetup.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CoachlistComponent } from './coach/coachlist/coachlist.component';
import { CoachsetupComponent } from './coach/coachsetup/coachsetup.component';


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
    path: 'teachers',
    component: TeacherlistComponent,
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
    path: 'subject/:id',
    component: SubjectsetupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'students',
    component: StudentlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'student/:id',
    component: StudentsetupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'enrolls',
    component: EnrolllistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'enroll/:id',
    component: EnrollsetupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'coaches',
    component: CoachlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'coach/:id',
    component: CoachsetupComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
