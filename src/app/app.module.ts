


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientService} from './services/httpClient.service';
import {IntercomService} from './services/intercom.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RpReferences } from './services/reference-list';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { TeacherlistComponent } from './teacher/teacherlist/teacherlist.component';
import { TeachersetupComponent } from './teacher/teachersetup/teachersetup.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { SubjectlistComponent } from './subject/subjectlist/subjectlist.component';
import { SubjectsetupComponent } from './subject/subjectsetup/subjectsetup.component';
import { StudentlistComponent } from './student/studentlist/studentlist.component';
import { StudentsetupComponent } from './student/studentsetup/studentsetup.component';
import { EnrolllistComponent } from './enroll/enrolllist/enrolllist.component';
import { EnrollsetupComponent } from './enroll/enrollsetup/enrollsetup.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      MenuComponent,
      HomeComponent,
      TeacherlistComponent,
      TeachersetupComponent,
      SubjectlistComponent,
      SubjectsetupComponent,
      StudentlistComponent,
      StudentsetupComponent,
      EnrolllistComponent,
      EnrollsetupComponent,
      PagenotfoundComponent,
   ],
   imports: [
      BrowserModule,
      RouterModule,
      AppRoutingModule,
      NgbModule,
      FormsModule,
      HttpClientModule,
   ],
   providers: [
     IntercomService,
     HttpClientService,
     RpReferences,
     {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
     }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
