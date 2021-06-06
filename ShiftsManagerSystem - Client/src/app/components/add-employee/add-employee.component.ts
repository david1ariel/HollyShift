import { AuthService } from './../../services/auth.service';
import { environment } from 'src/environments/environment';
import { EmployeesService } from './../../services/employees.service';
import { EmployeeModel } from './../../models/employee.model';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatOptionSelectionChange } from '@angular/material/core';



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

    employee = new EmployeeModel();
    preview: string;


    constructor(private myEmployeeService: EmployeesService, private myAuthService: AuthService, private myRouter: Router) { }

    public async addEmployee(){
      try {
          this.employee = await this.myEmployeeService.addEmployee(this.employee);
          alert("Employee has been added. ID: "+ this.employee.employeeId);

          this.myRouter.navigateByUrl(environment.employeesBaseUrl);
      } catch (error) {
          console.log(error.message);
      }
    }

    public async register(){
        const success = await this.myAuthService.register(this.employee);
        if(success){
            this.myRouter.navigateByUrl(environment.employeesBaseUrl);
        }

    }

    public changeEmployeeRole(e: MatOptionSelectionChange){
        this.employee.role = e.source.value;
        console.log(this.employee.role);
    }

    displayPreview(image: File): void {
      this.employee.image = image;
      const fileReader = new FileReader();
      fileReader.onload = args => {
          this.preview = args.target.result.toString();
          console.log(this.preview);
      };
      fileReader.readAsDataURL(image);
  }

}
