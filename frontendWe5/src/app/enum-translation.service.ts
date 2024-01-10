import { Injectable } from '@angular/core';
import { ProblemType } from './problemType';
import { ReportPriority } from './report-priority';
import { ReportStatus } from './report-status';

@Injectable({
  providedIn: 'root'
})
export class EnumTranslationService {

  constructor() { }

  /**
   * Translates a priority from english to german and returns it as a string.
   * @param priority the priority to be translated
   */
  translatePriorityFromEngToGer(priority: ReportPriority): string {
    switch (priority) {
      case ReportPriority.HIGH:
        return "Hoch";
      case ReportPriority.MEDIUM:
        return "Mittel";
      case ReportPriority.LOW:
        return "Niedrig";
      default:
        return "";
    }
  }

  /**
 * Translates a status from english to german and returns it as a string.
 * @param status the status to be translated
 */
  translateStatusFromEngToGer(status: ReportStatus): string {
    switch (status) {
      case ReportStatus.CLOSED:
        return "Geschlossen";
      case ReportStatus.IN_PROGRESS:
        return "In Bearbeitung";
      case ReportStatus.OPEN:
        return "Offen";
      default:
        return "";
    }
  }

  /**
* Translates a problemtype from english to german and returns it as a string.
* @param type the problemType to be translated
*/
  translateProblemTypeFromEngToGer(type: ProblemType): string {
    switch (type) {
      case ProblemType.CLEAN:
        return "Reinigen";
      case ProblemType.OTHER:
        return "Sonstiges";
      case ProblemType.REFILL:
        return "Auffüllen";
      case ProblemType.REPAIR:
        return "Reparieren";
      default:
        return "";
    }
  }
}
