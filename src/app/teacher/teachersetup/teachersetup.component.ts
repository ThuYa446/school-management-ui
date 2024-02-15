import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientService } from 'src/app/services/httpClient.service';
import { IntercomService } from 'src/app/services/intercom.service';

@Component({
  selector: 'app-teachersetup',
  templateUrl: './teachersetup.component.html',
  styleUrls: ['./teachersetup.component.css']
})
export class TeachersetupComponent implements OnInit {
  id: number = 0;

  constructor(private http:HttpClientService,
    private ics: IntercomService,private route: ActivatedRoute) { 

  }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
  }

}
