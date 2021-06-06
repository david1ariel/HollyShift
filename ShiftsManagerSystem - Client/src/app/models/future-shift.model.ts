export class FutureShiftModel {
    public constructor(
        public shiftId?: number,
        public shiftTypeId?: number,
        public employeeId?: string,
        public started?: Date,
        public ended?: Date
    ){}
}
