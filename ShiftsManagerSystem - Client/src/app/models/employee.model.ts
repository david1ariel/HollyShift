export class EmployeeModel {
  public constructor(
    public employeeId?: string,
    public firstName?: string,
    public lastName?: string,
    public title?: string,
    public birthDate?: Date,
    public hireDate?: Date,
    public adress?: string,
    public postalCode?: number,
    public phone1?: string,
    public phone2?: string,
    public notes?: string,
    public image?: File,
    public imageFileName?: string,
    public username?: string,
    public password?: string,
    public role?: string,
    public jwtToken?: string,
    public lastLoginDate?: Date,
    public isLoggedinFirstTime?: boolean,
    public qualityGroup?: number,
    public weeklyGrade?: number,
    public contractMinShifts?: number,
    public contractMaxShifts?: number,

  ) { }
}
