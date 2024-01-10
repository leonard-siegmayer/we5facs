import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-head-reporting',
  templateUrl: './head-reporting.component.html',
  styleUrls: ['./head-reporting.component.css']
})
export class HeadReportingComponent implements OnInit {

  roomName : string;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => this.roomName = params.name);
  }

  ngOnInit() { }

}
