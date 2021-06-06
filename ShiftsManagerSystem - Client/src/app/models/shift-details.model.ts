import { Time } from '@angular/common';

export class ShiftDetailsModel {
    public constructor(
        public nthShift?: number,
        public startTime?: string,
        public endTime?: string,
        public type?: string
    ){}

}
