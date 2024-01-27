import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../../../@core/mock/marchandizer/country.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { UserService } from '../../../@core/mock/marchandizer/user.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
 
import { CustomerService } from '../customer.service';

@Component({
  selector: 'ngx-my-customer',
  templateUrl: './my-customer.component.html',
  styleUrls: ['./my-customer.component.scss']
})
export class MyCustomerComponent implements OnInit {
  countryList=[]
   
  singupObj={name:'' ,countryCode:'',State:'',AddressLineOne:'',AddressLineTwo:'' ,  phone:'',ActiveStatus:1,ImageLink:'',email:'',officeName:'',occupation:'',DueAmount:0,AdvanceAmount:0}
  constructor(public countryService:CountryService,
    public customerService:CustomerService,
    public user:UserService,
    public languageService:LanguageConverterService,
    private router:Router,
    private toasterService:ToasterService,
    ) { }

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
     
   
 this.customerService.addMyCustomerProfileInfo(this.singupObj).then(t=>{
 
this.toasterService.saveMessage()
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
        this.toasterService.openSnackBarWarning('This Customer is not Sign up yet !','Ok')
       
      }
    });
  }
  backTo(){
    this.router.navigate(["/inventory/customer-display"]);
  }
}
