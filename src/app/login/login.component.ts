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
  user : User = new User();
  constructor(private http:HttpClientService,
    private ics: IntercomService,
    private authService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {

  }

  showCustomMsg(msg, type) {
    if ( type === 1) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Information' }); }
    if ( type === 2) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Error' }); }
    if ( type === 3) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Warning' }); }
    if ( type === 4) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Success' }); }
  }

  validateLogIn(){
    if(this.user.email == null || this.user.email == undefined || this.user.email == ''){
      this.showCustomMsg('Email is required',1);
      return false;
    }
    if(this.user.password == null || this.user.password == undefined || this.user.password == ''){
      this.showCustomMsg('Password is required',1);
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
          if(error == undefined){
            this.showCustomMsg('Network Connection Error',2);
          }else{
            this.showCustomMsg(error,2);
          }
        }
      );
    }
  }
}
