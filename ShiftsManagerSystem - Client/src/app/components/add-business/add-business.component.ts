import { BusinessService } from './../../services/business.service';
import { BusinessModel } from './../../models/business-model';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent {

  public business = new BusinessModel();

    constructor(private myBusinessService: BusinessService, private myRouter: Router) { }
  
    public async addBusiness(){
      try {
          this.business = await this.myBusinessService.addBusiness(this.business);
          alert("business has been added. ID: "+ this.business.businessId);
          
          this.myRouter.navigateByUrl(environment.businessBaseUrl);
      } catch (error) {
          console.log(error.message);
      }      
    }
}
