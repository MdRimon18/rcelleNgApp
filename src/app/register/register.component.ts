import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DateResizerService } from '../@core/mock/marchandizer/date-resizer.service';
import { LanguageConverterService } from '../@core/mock/marchandizer/language-converter.service';
import { UserService } from '../@core/mock/marchandizer/user.service';
import { ToasterService } from '../@core/mock/toaster.service';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  phoneNumber: string;
  code: string;
  confirmationResult:any;
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  isShowVerificationCode:boolean;
 
  UserTypeList=[
    {name:'Customer'},
    {name:'Shop Owner'} 
    
  ]
filteredArray=[];
  singupObj={name:'',phone:'',pass:'',userType:'',agree_term:false,entryDate:'',isApproved:true,cmpCode:''}
  resetForm(form?:NgForm){
     
    if(form!=null)
    this.singupObj={name:'',phone:'',pass:'',userType:'',agree_term:false,entryDate:'',isApproved:true,cmpCode:''}
  }
  
  
  constructor(public userService:UserService,
    private dateResizerService:DateResizerService,
    private router:Router,
    private afAuth: AngularFireAuth, private db: AngularFireDatabase,
    public languageService:LanguageConverterService,
    private toasterService:ToasterService) { }
    async signInWithPhoneNumber(phoneNumber: string) {
      
        const confirmationResult = await this.afAuth.auth.signInWithPhoneNumber(phoneNumber, this.recaptchaVerifier);
      return confirmationResult;
    }
  
    async verifyCode(code: string, confirmationResult) {
      try {
        const userCredential = await confirmationResult.confirm(code);
        
        return userCredential.user;
      } catch (error) {
        throw error;
      }
    }
  
    async signUp() {
      try {
        
        this.confirmationResult= await this.signInWithPhoneNumber('+88'+this.singupObj.phone.trim().replace(/\s/g,""));
        this.isShowVerificationCode=true;
        this.toasterService.openSnackBarAlerming('Verification code was Send in your Mobile,Please check and verify','ok');
     //   const user = await this.verifyCode(this.code, confirmationResult);
      //  console.log(user)
        // Save the user data to Firebase Realtime Database
      } catch (error) {
        this.isShowVerificationCode=false;
        console.error(error);
        this.toasterService.openSnackBarAlerming(error.message,'ok');
      }
    }

    async getGenuinUser(){
      let countCompany=0;
        if(this.singupObj.userType=='Shop Owner'){
          countCompany=this.filteredArray.filter(f=>f.userType=='Shop Owner').length;
          this.singupObj.cmpCode="C"+countCompany;
        }

      try {
      //   const user = await this.verifyCode(this.code,this.confirmationResult);
      //  let filteredArray=[]
      //  filteredArray=this.filteredArray.filter(f=>f.phone == this.singupObj.phone)
      
      // if(filteredArray.length>0){
      // this.toasterService.openSnackBarWarning(`This Phone Number is Already Exist!`,`Ok`)
      // this.isShowVerificationCode=false;
      // }else{
        
        this.singupObj.entryDate=this.dateResizerService.resize(new Date());

        this.userService.addUserInfo(this.singupObj).then(t=>{
       
          this.toasterService.openSnackBarSuccess(`Sign Up Successfull !`,`Ok`)
          this.router.navigate(['/login']);
      
          }).catch(error=>{
            alert(error.message);
          })
      //}
       } catch (error) {
      //   this.toasterService.openSnackBarAlerming(error.message,'ok');
      //   this.isShowVerificationCode=false;
      //   console.error(error.message);
       }
    }
   

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.recaptchaVerifier.render()
   // console.log(this.recaptchaVerifier.render())
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
// signUp(){
   
  
//   let filteredArray=[]
//   filteredArray=this.filteredArray.filter(f=>f.phone == this.singupObj.phone)
      
//       if(filteredArray.length>0){
//         this.toasterService.openSnackBarWarning(`This Phone Number is Already Exist!`,`Ok`)
        
//       }else{
//         this.singupObj.entryDate=this.dateResizerService.resize(new Date());
//         this.userService.addUserInfo(this.singupObj).then(t=>{
       
//           this.toasterService.openSnackBarSuccess(`Sign Up Successfull !.Please Wait For Approval. Thank You !`,`Ok`)
//           this.router.navigate(['/login']);
      
//           }).catch(error=>{
//             alert(error.message);
//           })
//       }
  
 
//     } 
 
    Redirect(){
      this.router.navigate(['/login']);
    } 

    

}
