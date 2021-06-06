import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeModel } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  employee: EmployeeModel;
  preview: string;


  constructor(private myActivatedRoute: ActivatedRoute,
    private myEmployeesService: EmployeesService, private myRouter: Router) { }

  async ngOnInit() {
    try {
      const id = +this.myActivatedRoute.snapshot.params.employeeId;
      this.employee = await this.myEmployeesService.getOneEmployee(id);
    }
    catch (err) {
      alert(err.message);
    }
  }

  public async updateEmployee() {
    const success = await this.myEmployeesService.updateEmployee(this.employee);
    if (success) alert("Employee has been updated. ID: " + this.employee.employeeId);
    else alert('אירעה שגיאה. אנא נסה שנית מאוחר יותר.')
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
