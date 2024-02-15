import { Component, OnInit } from '@angular/core';
import { IntercomService } from '../services/intercom.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private ics:IntercomService) { 
    console.log(this.ics.show_menu);
  }

  ngOnInit() {
    console.log(this.ics.show_menu);
  }

}
