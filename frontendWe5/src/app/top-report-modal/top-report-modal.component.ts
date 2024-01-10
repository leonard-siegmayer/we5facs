import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProblemType } from '../problemType';
import { ReportPriority } from '../report-priority';
import { Equipment } from '../equipment';
import { FormGroup, FormControl } from '@angular/forms';
import { Report } from '../report';
import { EnumTranslationService } from '../enum-translation.service';

@Component({
  selector: 'app-top-report-modal',
  templateUrl: './top-report-modal.component.html',
  styleUrls: ['./top-report-modal.component.css']
})
export class TopReportModalComponent implements OnInit {

  @Input() equipment: Equipment[];
  @Output() newTopReport = new EventEmitter<Report>();
  
  types = Object.keys(ProblemType);
  priorities = Object.keys(ReportPriority);

  topReportForm: FormGroup = new FormGroup({
    description: new FormControl,
    type: new FormControl,
    priority: new FormControl,
    equipment: new FormControl
  });

  constructor(public activeModal: NgbActiveModal, private translationService : EnumTranslationService) { }

  ngOnInit() { }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
  
  /**
   * Formats and translates the name of a problemType. 
   * E.g. REPAIR becomes Reparieren
   * @param type the problemType to format 
   */
  getTypeName(type: ProblemType): string {
    return this.translationService.translateProblemTypeFromEngToGer(type);
  }

  /**
   * Formats and translates the name of a priority. 
   * E.g. MEDIUM becomes Mittel
   * @param priority the priority to format 
   */
  getPriorityName(priority: ReportPriority): string {
    return this.translationService.translatePriorityFromEngToGer(priority);
  }

  save() {
    const description: string = this.topReportForm.get("description").value;
    const equipment: Equipment = this.getEquipmentByName(this.topReportForm.get("equipment").value);
    const type: ProblemType = this.topReportForm.get("type").value;
    const priority: ReportPriority = this.topReportForm.get("priority").value;
    const topReport: Report = new Report(description, null, equipment, type, priority);
    this.newTopReport.emit(topReport);
    this.closeModal();
  }

  private getEquipmentByName(name: string): Equipment {
    return this.equipment.find(e => e.name == name);
  }
}
