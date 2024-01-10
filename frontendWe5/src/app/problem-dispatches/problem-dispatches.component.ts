import { Component, OnInit } from '@angular/core';
import { Report } from '../report';
import { BackendService } from '../backend.service';
import { ReportStatus } from '../report-status';
import { ReportPriority } from '../report-priority';
import { LoginService } from '../login.service';
import { EnumTranslationService } from '../enum-translation.service';

@Component({
  selector: 'app-problem-dispatches',
  templateUrl: './problem-dispatches.component.html',
  styleUrls: ['./problem-dispatches.component.css']
})

export class ProblemDispatchesComponent implements OnInit {

  openReports: Report[];
  closedReports: Report[];
  role : string;

  priorities = Object.keys(ReportPriority);
  status = Object.keys(ReportStatus);

  constructor(private backendService: BackendService, private loginService: LoginService, private translationService: EnumTranslationService) { }

  ngOnInit() {
    this.loginService.getUser(
      user => {
        if (user) {
          this.role = user.role;
          // format role name
          this.role = this.role.substring(5).toLowerCase();
          this.role = this.role[0].toUpperCase() + this.role.substring(1);
        }
    });

    this.backendService.getReports().subscribe((reports) => {
      this.closedReports = reports.filter(r => r.roomName != null && r.status == ReportStatus.CLOSED); // reports without roomName are topReports
      this.openReports = reports.filter(r => r.roomName != null && r.status != ReportStatus.CLOSED); // reports without roomName are topReports
      if(this.closedReports.length == 0) { this.closedReports = null}
      if(this.openReports.length == 0) { this.openReports = null}
    });
  }

  collapse(toCollapseId: string) {
    // for displaying and hinding the collapse
    let content = document.getElementById(toCollapseId);
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  }

  /**
   * Returns an array of arrays with reports grouped by their room names.
   * Other than 'groupReportsByEquipment()', this function has no input array and instead uses all reports
   * @param type the reports to be grouped, either 'open' or 'closed'
   */
  groupReportsByRoomName(type: string): Report[][] {
    let result: Report[][] = [];
    let allRoomNames: string[] = [];
    let reports: Report[] = type == "open" ? this.openReports : this.closedReports;

    reports.forEach((r) => {
      let roomName = r.roomName;
      // if an array for the room of the next report already exists, push the report on it, otherwise add a new array for this room
      if (allRoomNames.includes(roomName)) {
        result.find(reports => roomName == reports[0].roomName).push(r);
      } else {
        result.push([r]);
        allRoomNames.push(roomName);
      }
    });

    return result;
  }

  /**
   * returns an array of arrays with reports grouped by their equipmentNames
   * @param toBeGrouped the array to be grouped
   */
  groupReportsByEquipment(toBeGrouped: Report[]): Report[][] {
    let result: Report[][] = [];
    let allEquipmentNames: string[] = [];

    toBeGrouped.forEach((r) => {
      let equipmentName = r.equipment.name;
      // if an array for the room of the next report already exists, push the report on it, otherwise add a new array for this room
      if (allEquipmentNames.includes(equipmentName)) {
        result.find(reports => equipmentName == reports[0].equipment.name).push(r);
      } else {
        result.push([r]);
        allEquipmentNames.push(equipmentName);
      }
    });
    return result;
  }

  /**
   * replaces '_' of a room name with '/'
   * @param name the name to be formatted
   */
  formatRoomName(name: string) {
    return name.replace("_", "/");
  }

  updateStatus(reportId: string, value: ReportStatus) {
    let report: Report = this.getReportById(reportId);
    report.status = value;
    this.backendService.saveReport(report).subscribe(resp => { 
      if (resp.status != 200) {
        alert(resp.message);
      }
    })
  }

  updatePriority(reportId: string, value: ReportPriority) {
    let report: Report = this.getReportById(reportId);
    report.priority = value;
    this.backendService.saveReport(report).subscribe(resp => { if (resp.status != 200) alert(resp.message) })
  }

  updateNote(reportId: string, value: string) {
    let report: Report = this.getReportById(reportId);
    report.note = value;
    this.backendService.saveReport(report).subscribe(resp => { (resp.status != 200) ? alert(resp.message) : ""})
  }

  updateDescription(reportId: string, value: string) {
    let report: Report = this.getReportById(reportId);
    report.description = value;
    this.backendService.saveReport(report).subscribe(resp => { if (resp.status != 200) alert(resp.message) })
  }

  getReportById(reportId: string): Report {
    let allReports : Report[] = [];
    (this.openReports) ? allReports.push(...this.openReports) : "";
    (this.closedReports) ? allReports.push(...this.closedReports) : "";
    return allReports.find(r => r.id == +reportId);
  }

  deleteReport(id: string) {
    this.backendService.deleteReport(+id).subscribe(_ => {
      document.getElementById(id).innerHTML = "<p style='text-align:center; color: rgb(185, 8, 8); font-weight: bold'>Gelöscht</p>";
    });
  }

  translatePriority(p: ReportPriority) : string {
    return this.translationService.translatePriorityFromEngToGer(p);
  }

  translateStatus(s: ReportStatus, x?:string) : string {
    return this.translationService.translateStatusFromEngToGer(s);
  }

  // prevents *ngFor from reloading by overriding the initial trackFunction
  myTrackByFunction() { }
}
