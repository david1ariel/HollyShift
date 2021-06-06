import { store } from './../../redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

    public employee = store.getState().employee;
    private unsubscribe: Unsubscribe;
    public greetings = this.getGreetings;


    displayedColumns: string[] = ['Firts Name', 'Last Name', 'weight', 'symbol'];

    constructor() { }



    ngOnInit(): void {
        this.unsubscribe = store.subscribe(() => {
            this.employee = store.getState().employee;
            this.greetings = this.getGreetings;
        });
        console.log(this.employee);
    }

    private getGreetings(): string {
        return "היי " + (this.employee ? this.employee.firstName : "Guest");
    }

    ngOnDestroy(): void {
        this.unsubscribe();
    }
}
