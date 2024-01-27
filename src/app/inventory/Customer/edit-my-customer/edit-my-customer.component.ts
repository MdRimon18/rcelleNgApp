import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../../@core/mock/marchandizer/country.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { UserService } from '../../../@core/mock/marchandizer/user.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
 
 
 
import { CustomerService } from '../customer.service';

@Component({
  selector: 'ngx-edit-my-customer',
  templateUrl: './edit-my-customer.component.html',
  styleUrls: ['./edit-my-customer.component.scss']
})
export class EditMyCustomerComponent implements OnInit {
  countryList=[];
   customer=[];
  singupObj={name:'' ,countryCode:'',State:'',AddressLineOne:'',AddressLineTwo:'' ,  phone:'',ActiveStatus:1,ImageLink:'',email:'',officeName:'',occupation:'',DueAmount:0,AdvanceAmount:0}
  key: string;
  constructor(public countryService:CountryService,
    public customerService:CustomerService,
    public user:UserService,
    private route:ActivatedRoute,
    private router:Router,
    public languageService:LanguageConverterService,
    private toasterService:ToasterService) {
      this.key=this.route.snapshot.paramMap.get('key');
      this.customerService.getAllMyCustomerProfileInfo().snapshotChanges().subscribe(item=>{
        item.forEach(element => {
          var y = element.payload.toJSON();
          y["key"] = element.key;
    
          this.customer.push(y as any);
        });
        let obj=this.customer.find(f=>f.key==this.key);
        if(obj!=undefined){
        this.singupObj=obj;
        }
      });
     }

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
     
   
 this.customerService.updateMyCustomerProfileInfo(this.key,this.singupObj).then(t=>{
 
  this.toasterService.updateMessage()
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
