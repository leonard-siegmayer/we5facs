import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../room';
import { BackendService } from '../backend.service';
import { Report } from '../report';

@Component({
  selector: 'top-problems',
  templateUrl: './top-problems.component.html',
  styleUrls: ['./top-problems.component.css']
})
export class TopProblemsComponent implements OnInit {

  @Input() roomName: string;
  room: Room;
  name: string;
  topReports: Report[] = [];

  constructor(private backendService: BackendService) {

  }

  ngOnInit() {
    this.backendService.getRoomByName(this.roomName).subscribe((room) => {
      if (room) {
        this.room = room;
        this.topReports = this.room.topReports;
        this.name = room.name.replace("_", "/");
      }
    });
  }

  sendReport(report: Report) {
    let newReport: Report = new Report(report.description, this.room.name, report.equipment, report.type, report.priority);
    this.backendService.saveReport(newReport).subscribe((resp) => {
      resp.status == 200 ? alert("Vielen Dank für Ihr Feedback!") : alert("Beim Melden ist ein Fehler aufgetreten.");
    })
  }
}