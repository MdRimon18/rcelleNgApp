import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../../@core/mock/marchandizer/country.service';
import { UserService } from '../../../@core/mock/marchandizer/user.service';
 
import { CustomerService } from '../customer.service';

@Component({
  selector: 'ngx-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements  OnInit {
  countryList=[];
   
  singupObj={name:'' ,countryCode:'',State:'',AddressLineOne:'',AddressLineTwo:'' ,  phone:'',ActiveStatus:1,ImageLink:'',email:''}
  constructor(private countryService:CountryService,
    public customerService:CustomerService,
    public user:UserService) { }

  ngOnInit() {
   this.singupObj.phone=localStorage.getItem('phone');
   this.singupObj.name=localStorage.getItem('name');
   let key =localStorage.getItem('key');
   this.user.getAllUserInfo().snapshotChanges().subscribe(item=>{
    item.forEach(element => {
      var y = element.payload.toJSON();
      y["key"] = element.key;
      if(element.key==key){
        this.singupObj=y as any;
       
      }
       
    });
  });
   this.countryService.getAllCountriesInfo().snapshotChanges().subscribe(item=>{
    item.forEach(element => {
      var y = element.payload.toJSON();
      y["key"] = element.key;

      this.countryList.push(y as any);
    });
  });
  }

  saveMyCustomer(){
     
    let key =localStorage.getItem('key');
 this.user.updateUserInfo(key,this.singupObj).then(t=>{
 
  alert('Profile Completion Successfull !')
   },err=>{console.log(err)});
  }

  // findExistingSystemCustomer(){
  //   let users=[];
  //   this.user.getAllUserInfo().snapshotChanges().subscribe(item=>{
  //     item.forEach(element => {
  //       var y = element.payload.toJSON();
  //       y["key"] = element.key;
         
  //       users.push(y as any);
  //     });
      
  //     let filteredUserByPhone=users.find(f=>f.phone.trim()==this.singupObj.phone.trim());
    
  //     if(filteredUserByPhone!=undefined){
  //       filteredUserByPhone.pass='';
  //      this.singupObj=filteredUserByPhone;
  //     }else{
  //       alert('This Supplier is not Sign up yet !')
  //     }
  //   });
  // }
}
