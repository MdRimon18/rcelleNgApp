import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoTblService } from '../../@core/data/ClientDb/user-info-tbl.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { MyShopEmpService } from '../../@core/mock/marchandizer/my-shop-emp.service';
import { UserService } from '../../@core/mock/marchandizer/user.service';
 
@Component({
  selector: 'ngx-shop-emp',
  templateUrl: './shop-emp.component.html',
  styleUrls: ['./shop-emp.component.scss']
})
export class ShopEmpComponent implements OnInit {
 
users=[];
  singupObj={name:'',designation:'',phone:'',isApproved:true,
  pass:'',userType:'Employee',agree_term:false,cmpCode:'',orgName:''}
  filteredArray: any=[];
  resetForm(form?:NgForm){
    
    if(form!=null)
    this.singupObj={name:'',designation:'',phone:'',isApproved:true,pass:'',userType:'Employee',agree_term:false,cmpCode:'',orgName:''}
  }
  
  
  constructor(
    public userService:UserService,
    public myShopEmpService:MyShopEmpService,
    private router:Router,
    private userInfoTblService:UserInfoTblService,
    public languageService:LanguageConverterService) { }

  ngOnInit() {
    this.resetForm();
   
 
  }
signUp(){
  this.singupObj.phone=this.singupObj.phone.trim().replace(/\s+/g, '').replace(/[^\w\s]/gi, '');
   this.userService.checkPhoneNumberExists(this.singupObj.phone).then(isExist=>{
    console.log(isExist);
    if(isExist){
      alert('User is Already Exist Try Another Number');
      return;
    }else{
     //create new user
     this.singupObj.cmpCode=localStorage.getItem('cmpCode');
     this.userService.addUserInfo(this.singupObj).then(t=>{
      alert('User Created Successfull !');
     });
    }

   });
    
  //});

  
    

    
     //let users=this.isExistingUser(this.singupObj.phone);
    //  if(users.length>0){
    //    alert('This Phone Number is Already Exist!')
    //  }else{
    //    this.singupObj.orgName=this.userInfoTblService.ObjectReciever.value.orgName;
    //    this.userService.addUserInfo(this.singupObj).then(t=>{
    //      this.myShopEmpService.addMyEmpProfileInfo(this.singupObj).then(t=>{
    //       alert('User Created Successfull !')
    //   }).catch(error=>{
    //     alert(error.message);
    //   })
    //   }).catch(error=>{
    //        alert(error.message);
    //  })
  //   }
  
     
}

 


}