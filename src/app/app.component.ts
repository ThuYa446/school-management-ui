import { Component, OnInit, enableProdMode, HostListener, OnDestroy } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router, RouterOutlet} from '@angular/router';
import { IntercomService } from './services/intercom.service';
import { HttpClientService} from './services/httpClient.service';
import { timer } from 'rxjs';
// import * as $ from 'jquery';

// declare var jQuery: any;
declare var $: any;
enableProdMode();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  mflag = true;
  showMenu = this.ics.show_menu;
  customMessage = {flag: true, msg: 'Hello', type: 'Success'};
  // tslint:disable-next-line: max-line-length
  constructor(private ics: IntercomService, private http: HttpClientService, private title: Title, private router: Router) {
    this.ics.rpbean$.subscribe(
      x => {
          if (x.t1 != null && x.t1 === 'custom-loading-off') {
            this.mflag = true;
            $('#loading').modal('hide');
          }

          if (x.t1 != null && x.t1 === 'custom-loading') {
            this.mflag = false;
            $('#loading').modal({backdrop: 'static'});
          }

          if ( x.t1 != null && x.t1 === 'custom-msg') {
            this.customMessage = { flag : false, msg: x.t2, type: x.t3 };
            $('#customMsgPopup').modal({show: true});
          }
          if (x.t1 != null && x.t1 === 'custom-msg-off') {
            this.customMessage = {flag: false , msg: '' , type : ''};
           // $('.modal-backdrop').remove();
            $('#customMsgPopup').modal('hide');
          }
      }
    );
    this.init();
  }

  showCustomMsg(msg, type) {
    if ( type === true) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Information' }); }
    if ( type === false) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Error' }); }
    if ( type === undefined) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Warning' }); }
    if ( type === null) {this.ics.sendBean({t1: 'custom-msg', t2: msg, t3: 'Success' }); }
  }

  offCustomMsg(type) {
    if (type === true) {this.ics.sendBean({t1: 'custom-msg-off', t2: '', t3: ''} ); }
  }

  showloading(type) {
    if (type === true) {this.ics.sendBean({t1: 'custom-loading'}); }
    if (type === false) {this.ics.sendBean({t1: 'custom-loading-off'}); }
  }

  async init() {
     await this.http.doGet('assets/json/config.json').subscribe(
      data => {
        this.ics.title = data.title;
        this.ics.app = data.app;
        this.ics.version = data.version;
        this.title.setTitle(data.title);
      }
    );
  }

  ngOnInit() {
    this.router.navigate(['/login']);
  }
}
