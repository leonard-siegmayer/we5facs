import { Equipment } from './equipment';
import { ReportStatus } from './report-status';
import { ProblemType } from './problemType';
import { ReportPriority } from './report-priority';

export class Report {
    id : number;
    description : string;
    email : string;
    note : string;
    roomName : string;
    equipment : Equipment;
    date : string;
    status : ReportStatus;
    type : ProblemType;
    priority : ReportPriority;


    constructor(description: string, roomName:string, equipment:Equipment, type:ProblemType, priority: ReportPriority) {
        this.description = description;
        this.roomName = roomName;
        this.equipment = equipment;
        this.type = type;
        this.status = ReportStatus.OPEN;
        this.priority = priority;
    }
}
   