import { $ } from 'protractor';
import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from '../backend.service';
import { Room } from '../room';
import { Equipment } from '../equipment';
import { ProblemType } from '../problemType';
import { NgForm } from '@angular/forms';
import { Report } from '../report';
import { Role } from '../role';
import { ReportPriority } from '../report-priority';

@Component({
  selector: 'report-problem',
  templateUrl: './report-problem.component.html',
  styleUrls: ['./report-problem.component.css']
})
export class ReportProblemComponent implements OnInit {

  @Input() roomName: string;
  room: Room;
  repairEquipment: Equipment[] = [];
  cleanEquipment: Equipment[] = [];
  refillEquipment: Equipment[] = [];

  message() {
    window.alert('Zur Zeit nicht möglich.');
    
    event.preventDefault();
  }
    
  constructor(private backendService: BackendService) {
  }

  ngOnInit() {
    this.backendService.getRoomByName(this.roomName).subscribe((room) => {
      this.room = room;
      // putting the room equipment into the corresponding equipment array
      this.repairEquipment = this.filterEquipment(ProblemType.REPAIR);
      this.cleanEquipment = this.filterEquipment(ProblemType.CLEAN);
      this.refillEquipment = this.filterEquipment(ProblemType.REFILL);
    })
  }

  /**
   * Creates a new report and stores it in the backend.
   * @param form the form containing the data for the new report
   * @param type the type of the new report. Possible values: "repair", "refill", "clean" and "other"
   */
  saveReport(form : NgForm, type : string) {
    let data = form.value;
    if(type != "other" && data.equipment == ""){
      alert("Bitte betroffenes Objekt auswählen!");
      return;
    } 
    let equipment : Equipment;
    if(data.equipment == null) {
      equipment = new Equipment("Sonstiges", [ProblemType.CLEAN, ProblemType.REFILL, ProblemType.REPAIR, ProblemType.OTHER], Role.ROLE_HAUSVERWALTUNG);
    } else {
      equipment = this.room.equipment.find(e => e.name == data.equipment);
    }
    let description : string = data.description;
    let notifyMe : boolean = data.notifyMe; // not yet implemented
    let newReport: Report = new Report(description, this.room.name, equipment, this.getProblemType(type), ReportPriority.MEDIUM);
    this.backendService.saveReport(newReport).subscribe((resp) => {
      resp.status == 200 ? alert("Vielen Dank für Ihr Feedback!") : alert("Beim Melden ist ein Fehler aufgetreten.");
    })
  }

  /**
   * Takes a problemType and returns every corresponding equpiment from the current room
   * @param ProblemType the problemType used as filter
   */
  private filterEquipment(type: ProblemType): Equipment[] {
    return this.room.equipment.filter((e) => e.problemTypes.includes(type));
  }

  collapse(toCollapseId: string) {
    // for displaying and hinding the collapse
    let content = document.getElementById(toCollapseId);
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      this.hideAllCollapsibles();
      content.style.display = "block";
    }
  }

  hideAllCollapsibles() {
    const allCollapsibles = [document.getElementById("refillContent"), document.getElementById("repairContent"), document.getElementById("otherContent"), document.getElementById("cleanContent")];

    for(let c of allCollapsibles) {
      if (c != null) (c.style.display = "none");
    }
  }

  /**
   * Maps a string to its corresponding ProblemType enum
   * @param type the string to be mapped
   */
  private getProblemType(type:string) : ProblemType {
    switch (type) {
      case "repair":
        return ProblemType.REPAIR;
      case "clean":
        return ProblemType.CLEAN;
      case "refill":
        return ProblemType.REFILL;
      default:
        return ProblemType.OTHER;
    }
  }
}