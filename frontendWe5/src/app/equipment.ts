import { ProblemType } from './problemType';
import { Role } from './role';

export class Equipment {
  name : string;
  problemTypes : ProblemType[];
  roleInCharge : Role;

  constructor(name : string, types : ProblemType[], roleInCharge : Role) {
    this.name = name;
    this.problemTypes = types;
    this.roleInCharge = roleInCharge;
  }
}