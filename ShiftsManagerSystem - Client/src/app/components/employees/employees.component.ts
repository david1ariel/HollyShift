import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { EmployeeModel } from '../../models/employee.model';
import { AppRoutingModule } from '../../app-routing.module';
import { Unsubscribe } from 'redux';
import { EmployeesService } from '../../services/employees.service';
import { store } from '../../redux/store';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {

    constructor(public myEmployeesService: EmployeesService, private http: HttpClient) { }

    public employees: EmployeeModel[];
    public router: AppRoutingModule;
    public unSubscribe: Unsubscribe;

    // dataSource = new MatTableDataSource();

    
    



    async ngOnInit() {
        this.unSubscribe = store.subscribe(() => {
            this.employees = store.getState().employees;
        })

        if (store.getState().employees.length > 0) {
            this.employees = store.getState().employees;
        }
        else {

            try {
                await this.myEmployeesService.getAllEmployees();
            }
            catch (err) {
                alert(err.message);
            }
        }
    }

    
    

    public async deleteEmployee(id: number) {
        try {
            const answer = confirm("Are you sure?");
            if (!answer) {
                return;
            }
            await this.myEmployeesService.deleteEmployee(id);
            alert('The employee has been deleted');
            location.reload();


        } catch (error) {
            alert(error.message);
        }

        
    }


    // displayedColumns: string[] = 
    // [
    //     'First name', 
    //     'Larst name', 
    //     'Title', 
    //     'Birts Date', 
    //     'Hire Date'
    // ];
    

    // @ViewChild(MatSort) sort: MatSort;

    
    // ngAfterViewInit(): void {
    //     this.dataSource.sort = this.sort;
    // }

    async ngOnDestroy() {
        await this.unSubscribe();
    }

    
}
