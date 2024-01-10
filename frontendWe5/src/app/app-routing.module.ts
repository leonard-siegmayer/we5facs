import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProblemDispatchesComponent } from './problem-dispatches/problem-dispatches.component';
import { HeadReportingComponent } from './head-reporting/head-reporting.component';
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationComponent } from './authentication/authentication.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { RoomCreationComponent } from './room-creation/room-creation.component';
import { RoomManagementComponent } from './room-management/room-management.component';

const routes: Routes = [
  { path: "report/:name", component: HeadReportingComponent },
  { path: "dispatches", component: ProblemDispatchesComponent },
  { path: "userManagement", component: RoleManagementComponent },
  { path: '',   redirectTo: '/report/WE5_03.098', pathMatch: 'full' },
  { path: "auth", component: AuthenticationComponent },
  { path: "createRoom", component: RoomCreationComponent },
  { path: "rooms", component: RoomManagementComponent },
  { path: "editRoom/:name", component: RoomCreationComponent },
  { path: '**', component: PageNotFoundComponent },
  ]
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
