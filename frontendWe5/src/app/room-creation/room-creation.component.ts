import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipmentModalComponent } from '../equipment-modal/equipment-modal.component';
import { TopReportModalComponent } from '../top-report-modal/top-report-modal.component';
import { Equipment } from '../equipment';
import { Role } from '../role';
import { FormGroup, FormControl } from '@angular/forms';
import { Report } from '../report';
import { LoginService } from '../login.service';
import { Room } from '../room';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProblemType } from '../problemType';

@Component({
  selector: 'app-room-creation',
  templateUrl: './room-creation.component.html',
  styleUrls: ['./room-creation.component.css']
})
export class RoomCreationComponent implements OnInit {

  title: string = "Neuen Raum erstellen";

  form: FormGroup = new FormGroup({
    name: new FormControl
  });

  allTopReports: Report[] = [];
  availableTopReports: Report[] = [];
  selectedTopReports: Report[] = [];

  availableEquipment: Equipment[] = [];
  selectedEquipment: Equipment[] = [];
  // equipment "sonstiges" is added by default to all rooms
  otherEquipment: Equipment = new Equipment("Sonstiges", [ProblemType.CLEAN, ProblemType.OTHER, ProblemType.REFILL, ProblemType.REPAIR], Role.ROLE_HAUSVERWALTUNG);

  availableTypes: String[] = [];

  admin: boolean;

  constructor(private modalService: NgbModal, private loginService: LoginService,
    private backendService: BackendService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // check if user is authorized
    this.loginService.getUser(
      user => {
        if (!user) {
          this.admin = false;
        } else {
          (user.role == Role.ROLE_ADMIN) ? (this.admin = true) : (this.admin = false);
        }
      });

    this.backendService.getEquipment().subscribe(e => {
      this.availableEquipment = e.filter(e => e.name != "Sonstiges");
      // if 'editRoom' is used, fill the field with the information of the room
      this.activatedRoute.paramMap.subscribe(p => {
        if (p.get('name')) {
          const n = p.get('name');
          this.backendService.getRoomByName(n).subscribe(r => {
            this.form.reset({
              name: { value: n.replace("_", "/"), disabled: true }
            });
            r.equipment.forEach(e => e.name != "Sonstiges" ? this.addEquipment(e) : e);
            r.topReports.forEach(r => this.addTopReport(r));
          });
          this.title = "Raum bearbeiten";
        }
      });
    });
    this.backendService.getReports().subscribe(r => this.allTopReports = r.filter(r => !r.roomName)); // a report without a roomName is a topReport
  }

  /**
   * Opens either modal for the creation of a new equipment, or modal for the creation of a new top Report.
   * @param type the modal to be opened, can either be "equipment" or "topReport"
   */
  openFormModal(type: string) {
    let modalRef;
    switch (type) {
      case "equipment":
        modalRef = this.modalService.open(EquipmentModalComponent);
        modalRef.componentInstance.newEquipment.subscribe(equ => {
          if ([...this.availableEquipment, ...this.selectedEquipment].find(e => e.name == equ.name)) {
            alert("Ausrüstung mit diesem Namen existiert bereits");
          } else {
            (this.selectedEquipment.push(equ))
          }
        })
        break;
      case "topReport":
        modalRef = this.modalService.open(TopReportModalComponent);
        modalRef.componentInstance.equipment = [...this.selectedEquipment, this.otherEquipment];
        modalRef.componentInstance.newTopReport.subscribe(r => this.selectedTopReports.push(r));
        break;
    }
  }

  /**
   * Saves the newly created room in the backend.
   */
  save() {
    let roomName: string = this.form.get("name").value;
    if (!roomName) { alert("Bitte geben Sie einen Namen ein!"); return; } else { roomName = roomName.replace("/", "_") }
    let topReports = this.selectedTopReports;
    let equipment = [...this.selectedEquipment];
    equipment.push(this.otherEquipment);
    let newRoom: Room = new Room(roomName, equipment, topReports);
    this.backendService.saveRoom(newRoom).subscribe(
      res =>  this.router.navigateByUrl("/report/" + roomName),
        err => alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut!")
    );

  }

  /**
   * Formats a report object into a readable string.
   * Format: [equipmentName]: [reportDescription]
   * @param r the report to be formatted
   */
  formatReport(r: Report) {
    return r.equipment.name + ": " + r.description;
  }

  /**
   * moves a topReport from the available list to the selected list
   * @param r the topReport selected
   */
  addTopReport(r: Report) {
    this.selectedTopReports.push(r);
    this.availableTopReports = this.availableTopReports.filter(rep => rep.id != r.id);
  }

  /**
   * moves a topReport from the selected list to the available list
   * @param r the topReport selected
   */
  removeTopReport(r: Report) {
    this.availableTopReports.push(r);
    this.selectedTopReports = this.selectedTopReports.filter(rep => rep.id != r.id);
  }

  /**
   * moves an equipment from the available list to the selected list
   * @param e the equipment selected
   */
  addEquipment(e: Equipment) {
    this.selectedEquipment.push(e);
    this.availableEquipment = this.availableEquipment.filter(equ => equ.name != e.name);

    // add top reports with this equipment to the availableTopReports list
    const newPossibleTopReports = this.allTopReports.filter(r => r.equipment.name == e.name);
    this.availableTopReports.push(...newPossibleTopReports);
  }

  /**
   * moves an equipment from the selected list to the available list
   * @param e the equipment selected
   */
  removeEquipment(e: Equipment) {
    this.availableEquipment.push(e);
    this.selectedEquipment = this.selectedEquipment.filter(equ => equ.name != e.name);

    // remove top reports with this equipment from the availableTopReports list and the selectedTopReports list
    this.availableTopReports = this.availableTopReports.filter(r => r.equipment.name != e.name);
    this.selectedTopReports = this.selectedTopReports.filter(r => r.equipment.name != e.name);
  }
}
