import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { CredentialsModel } from './../../models/credentials.model';
import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public credentials = new CredentialsModel();
  verificationCode: string;
  emailToSendVerificationCode: string;
  newPassword: string;
  newPasswordCheck: string;
  openDialogs: MatDialogRef<any>[]=[];
  localDialogRef;

  constructor(
    private myAuthService: AuthService,
    private router: Router,
    private dialog: MatDialog) { }

  public async login() {
    const employee = await this.myAuthService.login(this.credentials);
    if (employee){
      if (employee.isLoggedinFirstTime===true && employee.role==="admin")
        this.router.navigateByUrl("/business-settings");
      else
        this.router.navigateByUrl("/home");
    }

    else
      alert("Incorrect username or password!");
  }



  // closeDialog(templateRef) {
  //   this.dialog.close(templateRef);
  // }

  forgotPasswordClicked(templateRef) {
    this.openDialog(templateRef);
  }

  async getVerificationCodeFromServer(enterVerificationCodeTemplateRef, emailErrorTempalteRef) {
    const success = await this.myAuthService.forgotPassword(this.emailToSendVerificationCode);
    this.openDialog(success ? enterVerificationCodeTemplateRef : emailErrorTempalteRef);
  }

  async verifyCode(chooseNewPasswordTemplateRef, codeErrorTemplateRef) {
    const success = await this.myAuthService.ConfirmVerificationCode(this.emailToSendVerificationCode, this.verificationCode);
    this.openDialog(success ? chooseNewPasswordTemplateRef : codeErrorTemplateRef);
  }

  async checkPassword(passwordChangedTemplateRef, passwordsNotMatchTemplateRef){
    if(this.newPassword===this.newPasswordCheck){
      await this.myAuthService.setNewPassword(this.verificationCode, this.credentials);
      this.openDialog(passwordChangedTemplateRef);
    }
    else{
      this.openDialog(passwordsNotMatchTemplateRef);
    }
  }

  openDialog(templateRef) {
    this.openDialogs.push(this.dialog.open(templateRef, {panelClass: "custom-modal"}));
  }

  onCloseDialog(){
    this.dialog.openDialogs[this.dialog.openDialogs.length-1].close();
  }

}
