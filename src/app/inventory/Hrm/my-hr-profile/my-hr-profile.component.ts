import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../../@core/mock/marchandizer/country.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { UserService } from '../../../@core/mock/marchandizer/user.service';
 
import { HrProfileService } from '../hr-profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-my-hr-profile',
  templateUrl: './my-hr-profile.component.html',
  styleUrls: ['./my-hr-profile.component.scss']
})
export class MyHrProfileComponent implements OnInit {
  countryList=[];
   
  singupObj={name:'' ,department:'',designation:'',grade:'',salary:'',countryCode:'',State:'',AddressLineOne:'',AddressLineTwo:'' ,  phone:'',ActiveStatus:1,ImageLink:'',email:''}
  constructor(public countryService:CountryService,
    public hrProfileService:HrProfileService,
    public user:UserService,
    public languageService:LanguageConverterService,
    public router:Router) { }

  ngOnInit() {
   
   this.countryService.getAllCountriesInfo().snapshotChanges().subscribe(item=>{
    item.forEach(element => {
      var y = element.payload.toJSON();
      y["key"] = element.key;

      this.countryList.push(y as any);
    });
  });
  }

  saveMyCustomer(){
     
   
 this.hrProfileService.addMyHrProfileInfo(this.singupObj).then(t=>{
 
  alert('Save Successfull !')
   },err=>{console.log(err)});
  }

  findExistingSystemCustomer(){
    let users=[];
    this.user.getAllUserInfo().snapshotChanges().subscribe(item=>{
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
         
        users.push(y as any);
      });
      
      let filteredUserByPhone=users.find(f=>f.phone.trim()==this.singupObj.phone.trim());
    
      if(filteredUserByPhone!=undefined){
        filteredUserByPhone.pass='';
       this.singupObj=filteredUserByPhone;
      }else{
        alert('This Supplier is not Sign up yet !')
      }
    });
  }
  backTo(){
    this.router.navigate(["/inventory/my-hr-profile-display"]);
  }
}
