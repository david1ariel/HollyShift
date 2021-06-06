import { Router } from '@angular/router';
import { EmployeeModel } from 'src/app/models/employee.model';
import { Component, OnInit } from '@angular/core';
import { store } from 'src/app/redux/store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

    employee: EmployeeModel;
  constructor(private myRouter: Router) { }

  ngOnInit(): void {
    this.employee = store.getState().employee;
    if(!this.employee){
        this.myRouter.navigateByUrl("/login");
    }
  }

}
