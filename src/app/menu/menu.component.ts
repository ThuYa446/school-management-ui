import { Component, OnInit } from '@angular/core';
import { IntercomService } from '../services/intercom.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  showMenu = this.ics.show_menu;
  constructor(private ics: IntercomService) { 

  }

  ngOnInit() {
  }

}
