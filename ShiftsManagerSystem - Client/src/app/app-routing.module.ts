import { HomePageImageComponent } from './components/home-page-image/home-page-image.component';
import { SubmitShiftsComponent } from './components/submit-shifts/submit-shifts.component';
import { AddBusinessComponent } from './components/add-business/add-business.component';
import { ManagerGuard } from './services/manager.guard';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { AdminGuard } from './services/admin.guard';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuardService } from './services/login-guard.service';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessSettingsComponent } from './components/business-settings/business-settings.component';
import { ManageWorkScheduleComponent } from './components/manag-work-schedule/manage-work-schedule.component';


const routes: Routes = [
    {path:"home", canActivate: [LoginGuardService], component: HomeComponent},
    {path:"about", component: AboutComponent},
    {path:"business-settings", canActivate: [ManagerGuard], component: BusinessSettingsComponent},
    {path:"admin/add-business", canActivate: [AdminGuard], component: AddBusinessComponent},
    {path:"employees", canActivate: [ManagerGuard], component: EmployeesComponent},
    {path:"employees/new", canActivate: [ManagerGuard], component: AddEmployeeComponent},
    {path:"employees/edit/:employeeId", canActivate: [LoginGuardService], component: UpdateEmployeeComponent},
    {path:"login", component: LoginComponent},
    {path:"login/screen-logo", component: HomePageImageComponent},
    {path:"logout", component: LogoutComponent},
    {path:"submit-shifts", canActivate: [LoginGuardService], component: SubmitShiftsComponent},
    {path: "work-schedule", canActivate: [ManagerGuard], component: ManageWorkScheduleComponent},
    {path:"", redirectTo: "/home", pathMatch:"full"},
    {path:"**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
