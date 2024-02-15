


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientService} from './services/httpClient.service';
import {IntercomService} from './services/intercom.service';
import { AdvSearchComponent } from './adv-search/adv-search.component';
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

@NgModule({
   declarations: [
      AppComponent,
      AdvSearchComponent,
      LoginComponent,
      MenuComponent,
      HomeComponent,
      TeacherlistComponent,
      TeachersetupComponent,
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
