import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Room } from './room';
import { JsonResponse } from './jsonResponse';
import { Report } from './report';
import { environment } from 'src/environments/environment';
import { Equipment } from './equipment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Can be used to access the backend. Supports CRUD Operations for rooms, reports and equipment.
 */
export class BackendService {

  restApi = environment.API_HOST + ":" + environment.API_PORT;

  constructor(private http: HttpClient, private loginService: LoginService) { }

  // functions for rooms

  getRoomByName(name: string): Observable<Room> {
    return this.http.get<Room>(this.restApi + '/rooms/get/' + name, { withCredentials: true });
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.restApi + '/rooms/get/', { withCredentials: true });
  }

  saveRoom(room: Room): Observable<JsonResponse> {
    return this.http.post<JsonResponse>(this.restApi + '/rooms', room, { withCredentials: true });
  }

  deleteRoomByName(name: string): Observable<JsonResponse> {
    return this.http.delete<JsonResponse>(this.restApi + '/rooms/' + name, { withCredentials: true });
  }


  // functions for reports

  getReportById(id: number): Observable<Report> {
    return this.http.get<Report>(this.restApi + '/reports/get/' + id, { withCredentials: true });
  }

  getReports(): Observable<Report[]> {
    if (this.loginService.currentUser == null) {
      return null;
    } else {
      let userId = this.loginService.currentUser.id;
      return this.http.get<Report[]>(this.restApi + '/reports/' + userId, { withCredentials: true });
    }
  }

  saveReport(report: Report): Observable<JsonResponse> {
    return this.http.post<JsonResponse>(this.restApi + '/reports/save', report, { withCredentials: true });
  }

  deleteReport(id: number): Observable<JsonResponse> {
    return this.http.delete<JsonResponse>(this.restApi + '/reports/' + id, {withCredentials: true});
  }

  // functions for equipment

  getEquipmentByName(name: string): Observable<Equipment> {
    return this.http.get<Equipment>(this.restApi + '/equipment/get/' + name, { withCredentials: true });
  }

  getEquipment(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.restApi + '/equipment', { withCredentials: true });
  }

  saveEquipment(equipment: Equipment): Observable<JsonResponse> {
    return this.http.post<JsonResponse>(this.restApi + '/equipment', equipment, { withCredentials: true });
  }

  deleteEquipmentByName(name: string): Observable<JsonResponse> {
    return this.http.delete<JsonResponse>(this.restApi + '/equipment/' + name, { withCredentials: true });
  }
}