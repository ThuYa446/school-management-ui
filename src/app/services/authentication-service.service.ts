import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IntercomService } from './intercom.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private ics : IntercomService) { 

  }

  login(): void {
    // Logic to perform login
    if(this.ics.token != ''){
      this.ics.show_menu = true;
      this.isAuthenticatedSubject.next(true);
    }
  }

  logout(): void {
    // Logic to perform logout
    if(this.ics.token == ''){
      this.ics.show_menu = false;
      this.isAuthenticatedSubject.next(false);
    }
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
