import { Component, OnInit } from '@angular/core';
import { IntercomService } from '../services/intercom.service';
import { AuthenticationService } from '../services/authentication-service.service';
import { Router } from '@angular/router';
declare var jQuery: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  showMenu = this.ics.show_menu;
  constructor(private ics: IntercomService,
    private authService: AuthenticationService,
    private router: Router) { 

  }

  ngOnInit() {
  }

  popupConfirm(){
    jQuery("#confirmpopup").modal();
  }

  logOut(){
    this.ics.token = '';
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
