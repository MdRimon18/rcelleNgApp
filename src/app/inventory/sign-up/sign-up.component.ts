import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DateResizerService } from '../../@core/mock/marchandizer/date-resizer.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { UserService } from '../../@core/mock/marchandizer/user.service';

@Component({
  selector: 'ngx-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  UserTypeList=[
    {name:'Customer'},
    {name:'Shop Owner'} 
    
  ]
filteredArray=[];
  singupObj={name:'',phone:'',pass:'',userType:'',agree_term:false,entryDate:'',isApproved:false}
  resetForm(form?:NgForm){
     
    if(form!=null)
    this.singupObj={name:'',phone:'',pass:'',userType:'',agree_term:false,entryDate:'',isApproved:false}
  }
  
  
  constructor(public userService:UserService,
    private dateResizerService:DateResizerService,
    private router:Router,
    public languageService:LanguageConverterService,
    ) { }

  ngOnInit() {
    this.resetForm()
    this.singupObj.phone=this.singupObj.phone.trim().replace(/\s/g,"");
  this.filteredArray=[];
  this.userService.getAllUserInfo().snapshotChanges().subscribe(item=>{
    item.forEach(element => {
      var y = element.payload.toJSON();
      this.filteredArray.push(y);
    })  
  })
  }
signUp(){

  
  // let filteredArray=[]
  // filteredArray=this.filteredArray.filter(f=>f.phone == this.singupObj.phone)
      
  //     if(filteredArray.length>0){
  //       alert('This Phone Number is Already Exist!')
  //     }else{
  //       this.singupObj.entryDate=this.dateResizerService.resize(new Date());
  //       this.userService.addUserInfo(this.singupObj).then(t=>{
  //         alert('Sign Up Successfull !')
  //         this.router.navigate(['/inventory/login']);
      
  //         }).catch(error=>{
  //           alert(error.message);
  //         })
  //     }
  
 
    } 
 
    Redirect(){
      this.router.navigate(['/inventory/login']);
    } 

   
}
