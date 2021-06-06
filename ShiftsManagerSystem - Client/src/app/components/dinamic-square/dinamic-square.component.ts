import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-dinamic-square',
    templateUrl: './dinamic-square.component.html',
    styleUrls: ['./dinamic-square.component.css']
})
export class DinamicSquareComponent implements OnInit {

    constructor() { }


    @Input()
    public name: string = "a";

    @Input()
    public shift: string = "a";

    @Input()
    public backgroundColor: string = "red";

    @Input()
    public textColor: string

    ngOnInit(): void {
    }

}
