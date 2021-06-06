import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmployeesService } from './services/employees.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component'
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { AddBusinessComponent } from './components/add-business/add-business.component';
import { DinamicSquareComponent } from './components/dinamic-square/dinamic-square.component';
import { PairsPipe } from './pipes/pairs.pipe';
import { SubmitShiftsComponent } from './components/submit-shifts/submit-shifts.component';
import { HomePageImageComponent } from './components/home-page-image/home-page-image.component';
import { BusinessSettingsComponent } from './components/business-settings/business-settings.component';
import { HebWeekDayPipe } from './pipes/heb-week-day.pipe';
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/he";
import { ManageWorkScheduleComponent } from './components/manag-work-schedule/manage-work-schedule.component';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';



registerLocaleData(localeDe);

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    PageNotFoundComponent,
    EmployeesComponent,
    ThumbnailComponent,
    AddEmployeeComponent,
    LoginComponent,
    LogoutComponent,
    UpdateEmployeeComponent,
    AddBusinessComponent,
    DinamicSquareComponent,
    PairsPipe, SubmitShiftsComponent, HomePageImageComponent, BusinessSettingsComponent, HebWeekDayPipe, ManageWorkScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatSidenavModule,
    MatCardModule,
    DragDropModule,
    MatDialogModule,
    MatTabsModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },

  ],
  bootstrap: [LayoutComponent],
  exports: [HebWeekDayPipe]
})
export class AppModule { }
