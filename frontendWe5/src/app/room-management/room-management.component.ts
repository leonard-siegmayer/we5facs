import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { BackendService } from '../backend.service';
import { Equipment } from '../equipment';
import { LoginService } from '../login.service';
import { Role } from '../role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.component.html',
  styleUrls: ['./room-management.component.css']
})
export class RoomManagementComponent implements OnInit {

  admin : boolean;
  rooms : Room[] = [];

  constructor(private loginService: LoginService, private backendService : BackendService, private router: Router) { }

  ngOnInit() {
    // check if user is authorized
    this.loginService.getUser(
      user => {
        this.admin = user && user.role == Role.ROLE_ADMIN;
    });

    // query all rooms
    this.backendService.getRooms().subscribe(r => this.rooms = this.sortRooms(r));
  }

  /**
   * Replaces "_" with "/" in room names
   * @param name the name of the room
   */
  formatName(name : string) : string {
    return name.replace("_", "/");
  }

  /**
   * Returns a string displaying all the names of the given equipment list
   * @param equipment the list with the equipment
   */
  formatEquipment(equipment : Equipment[]) : string {
    let result = "Ausstattung:";
    for(let e of equipment) {
      result += ` ${e.name},`;
    }
    result = result.endsWith(",") ? result.substring(0, result.length - 1) : result;
    return result;
  }

  /**
   * Deletes a room
   * @param name the name (i.e. id) of the room
   */
  deleteRoom(name : string) {
    this.backendService.deleteRoomByName(name).subscribe(
      succ => this.rooms = this.rooms.filter(r => r.name != name));
      err => alert("Ein Fehler ist aufgetreten!");
  }

  /**
   * redirects to edit page of the room
   * @param roomName the name of the room
   */
  editRoom(roomName : string) {
    this.router.navigateByUrl(`/editRoom/${roomName}`);
  }

  redirect(roomName: string){
    this.router.navigateByUrl(`/report/${roomName}`);
  }

  /**
   * Sorts a list of rooms by their name (ascending)
   * @param rooms the list of rooms
   */
  private sortRooms(rooms : Room[]) {
    return rooms.sort((a,b) => {
      return (a.name < b.name) ? -1 : 1;
    })
  }
}
