import { Data } from '@angular/router';

export class DisplayShift {
    public constructor(
        public title: string,
        public started: Date,
        public ended: Date,
        public employee1: string,
        public employee2: string,
        public employee3: string,
    ) { }
}
