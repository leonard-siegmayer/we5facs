import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from '../role';
import { FormControl, FormGroup } from '@angular/forms';
import { Equipment } from '../equipment';
import { ProblemType } from '../problemType';

@Component({
  selector: 'app-equipment-modal',
  templateUrl: './equipment-modal.component.html',
  styleUrls: ['./equipment-modal.component.css']
})
export class EquipmentModalComponent implements OnInit {

  @Output() newEquipment = new EventEmitter<Equipment>();

  roles = Object.keys(Role);
  checked = false;

  equipmentForm: FormGroup = new FormGroup({
    repairCheck: new FormControl,
    cleanCheck: new FormControl,
    refillCheck: new FormControl,
    name: new FormControl,
    role: new FormControl,
    hiddenCheck: new FormControl
  });

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.roles = this.roles.filter(r => !(r == Role.ROLE_ADMIN || r == Role.ROLE_REPORTER));
    this.equipmentForm.patchValue({
      repairCheck: false,
      cleanCheck: false,
      refillCheck: false,
      hiddenCheck: false
    })
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  /**
   * Formats the name of role. 
   * E.g. ROLE_ADMIN becomes Admin
   * @param role the role to format 
   */
  getRoleName(role: Role): string {
    let name = Role[role].substring(5).toLowerCase();
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  save() {
    let name = this.equipmentForm.get("name").value;
    let types = [];
    (this.equipmentForm.get("repairCheck").value) ? types.push(ProblemType.REPAIR) : "";
    (this.equipmentForm.get("cleanCheck").value) ? types.push(ProblemType.CLEAN) : "";
    (this.equipmentForm.get("refillCheck").value) ? types.push(ProblemType.REFILL) : "";
    let role = this.equipmentForm.get("role").value;

    let equipment = new Equipment(name, types, role);

    this.newEquipment.emit(equipment);
    this.closeModal();
  }

  checkboxChanged() {
    const oneChecked = (this.equipmentForm.get("repairCheck").value || this.equipmentForm.get("cleanCheck").value || this.equipmentForm.get("refillCheck").value);
    oneChecked ? this.equipmentForm.patchValue({hiddenCheck: true}) : this.equipmentForm.patchValue({hiddenCheck: false});
  }
}
