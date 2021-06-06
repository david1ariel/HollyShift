// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //david start
  employeesPerShiftsUrl: "https://localhost:44333/api/shifts/employees-per-shifts",
  proposedEmployeesPerShiftsUrl: "https://localhost:44333/api/shifts/proposed-employees-per-shifts",
  homeBaseUrl: "https://localhost:44333/api/home",
  authBaseUrl: "https://localhost:44333/api/auth",
  employeesBaseUrl: "https://localhost:44333/api/employees",
  pastShiftsBaseUrl: "https://localhost:44333/api/shifts/past_shifts",
  futureShiftsBaseUrl: "https://localhost:44333/api/shifts/future_shifts",
  shiftTypesBaseUrl: "https://localhost:44333/api/shifts/shift_types",
  businessBaseUrl: "https://localhost:44333/api/business",
  futureShiftsEmployeeBaseUrl: "https://localhost:44333/api/shifts/future_shifts_employees",
  shiftsBaseUrl: "https://localhost:44333/api/shifts",
  settingsBaseUrl: "https://localhost:44333/api/settings",
  imagesBaseUrl: "https://localhost:44333/api/images",

  //david end
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
