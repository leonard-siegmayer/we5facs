import { Report } from './report';
import { Equipment } from './equipment';

export class Room {
  name : string;
  equipment : Equipment[];
  topReports : Report[];

  constructor(name : string, equipment : Equipment[], topReports : Report[]) {
    this.name = name;
    this.equipment = equipment;
    this.topReports = topReports;
  }
}