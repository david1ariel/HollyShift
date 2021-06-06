import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-logout',
    template: '',
})
export class LogoutComponent implements OnInit {

    constructor(private myAuthService: AuthService, private myRouter: Router) { }

    ngOnInit(): void {
        this.myAuthService.logout();
        this.myRouter.navigateByUrl("/home");
    }

}
