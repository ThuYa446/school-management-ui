import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { IntercomService } from '../services/intercom.service';
import { HttpClientService } from '../services/httpClient.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  apiUrl = environment.apiUrl+'/auth/login';
  user : User = {};
  constructor(private http:HttpClientService,
    private ics: IntercomService,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {

  }

  showCustomMsg(msg, type) {
    if ( type === true) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Information' }); }
    if ( type === false) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Error' }); }
    if ( type === undefined) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Warning' }); }
    if ( type === null) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Success' }); }
  }

  validateLogIn(){
    if(this.user.email == null || this.user.email == undefined || this.user.email == ''){
      this.showCustomMsg('Email is required',true);
      return false;
    }
    if(this.user.password == null || this.user.password == undefined || this.user.password == ''){
      this.showCustomMsg('Password is required',true);
      return false;
    }
    return true;
  }

  logIn(){
    let jsonObj = JSON.parse(JSON.stringify( this.user));
    if(this.validateLogIn()){
      this.http.doPost(this.apiUrl, jsonObj).subscribe(
        (data) => {
          if(data!= null || data != undefined){
            this.ics.token = data.accessToken;  
            this.authService.login();
            this.router.navigate(['/menu']);
          }
        },
        (error) => {
          this.showCustomMsg(error,false);
        }
      );
    }
  }
}
