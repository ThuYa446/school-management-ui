import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntercomService {
   private mybean: any;
  version = '';
  title = '';
  app = '';
  appname = '';
  welcomeText = '';
  token = '';
  show_menu = false;

  private rpbeanSource = new Subject<any>();
  rpbean$ = this.rpbeanSource.asObservable();

  constructor() { }

  sendBean(x: any) {
    this.mybean = x;
    this.rpbeanSource.next(x);
  }

  getBean(): any {
      return this.mybean;
  }
}
