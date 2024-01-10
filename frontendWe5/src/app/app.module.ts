import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopProblemsComponent } from './top-problems/top-problems.component';
import { ReportProblemComponent } from './report-problem/report-problem.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProblemDispatchesComponent } from './problem-dispatches/problem-dispatches.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HeadReportingComponent } from './head-reporting/head-reporting.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import $ from "jquery";
import { LoginComponent } from './login/login.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { UserlistEntryComponent } from './userlist-entry/userlist-entry.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RoomCreationComponent } from './room-creation/room-creation.component';
import { EquipmentModalComponent } from './equipment-modal/equipment-modal.component';
import { TopReportModalComponent } from './top-report-modal/top-report-modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RoomManagementComponent } from './room-management/room-management.component';

@NgModule({
  declarations: [
    AppComponent,
    TopProblemsComponent,
    ReportProblemComponent,
    ProblemDispatchesComponent,
    PageNotFoundComponent,
    HeadReportingComponent,
    LoginComponent,
    AuthenticationComponent,
    RoleManagementComponent,
    UserlistEntryComponent,
    UserlistEntryComponent,
    RoomCreationComponent,
    EquipmentModalComponent,
    TopReportModalComponent,
    NavbarComponent,
    RoomManagementComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    NgbActiveModal
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EquipmentModalComponent,
    TopReportModalComponent
  ]
  
})

export class AppModule { }
