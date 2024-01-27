import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserInfoTblService } from '../../@core/data/ClientDb/user-info-tbl.service';
import { CountryService } from '../../@core/mock/marchandizer/country.service';
import { SignUpByShopService } from '../../@core/mock/marchandizer/sign-up-by-shop.service';
import { UserService } from '../../@core/mock/marchandizer/user.service';
import { DataSharingService } from '../E-commerce/data-sharing.service';
import { UploadImagesComponent } from '../upload-images/upload-images.component';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { UploadImagesService } from '../../@core/mock/marchandizer/upload-images.service';
import { ToasterService } from '../../@core/mock/toaster.service';
 
@Component({
  selector: 'ngx-sign-up-by-shop',
  templateUrl: './sign-up-by-shop.component.html',
  styleUrls: ['./sign-up-by-shop.component.scss']
})
export class SignUpByShopComponent implements OnInit,OnDestroy {
  countryList=[];
  shopTypeList=[
    {name:'Fashion and Apparel',code:'FashionandApparel'},
    {name:'General',code:'General Store'},
    {name:'Electronics',code:'Electronics'},
    {name:'Food and Beverage',code:'Food and Beverage'},
    {name:'Healthcare',code:'Healthcare'},
    {name:'Entertainment',code:'Entertainment'},
    {name:'Home Improvement',code:'HomeImprovement'},
    {name:'Department',code:'Dept'},
    {name:'Grocery',code:'Grocery'},
    {name:'Technology',code:'technology'},
    {name:'Clothing',code:'Cloth'},
    {name:'Accessory',code:'Accessories'},
    {name:'Pharmacies',code:'Pharmacies'},
    {name:'Pet stores',code:'Petstores'},
    {name:'Toy stores',code:'Toystores'},
    {name:'Specialty stores',code:'Specialty stores'},
    {name:'Kioskss',code:'Kiosks'},
    {name:'Travel and Hospitality',code:'Travel and Hospitality'},
   
    {name:'Others',code:'Others'},
  ]
  singupObj={name:'',orgName:'',countryCode:'',State:'',AddressLineOne:'',AddressLineTwo:'',storeType:'',offDayName:'',phone:'',startEndTime:'',ActiveStatus:1,ImageLink:'',email:''}
  //singupObj:any;
  //singupObj={name:'' ,designation:'',countryCode:'',State:'',AddressLineOne:'',AddressLineTwo:'' ,  phone:'',ActiveStatus:1,ImageLink:'',email:''}
  key:string;
  isLoading = false;
  constructor(public userService:UserService,
    private countryService:CountryService
   , private router:Router,
   public signUpByShopService:SignUpByShopService,
   public user:UserService,
   private userInfoTblService:UserInfoTblService,
   private dialog:MatDialog,
   public uploadImagesService:UploadImagesService,
   private languageService:LanguageConverterService,
   public datSharingService:DataSharingService,
   private toastrService:ToasterService) { }
  ngOnDestroy(): void {
    this.datSharingService.imageLink=new BehaviorSubject<any>(0);
  }

   ngOnInit() {
   // this.singupObj.ImageLink='';
    this.datSharingService.getImageLink().subscribe(img=>{
      if(img!=0){
        this.singupObj.ImageLink=img;
      
      }
      
    })
    //this.singupObj.name=''
  
    
    // this.singupObj.name=localStorage.getItem('name');
    //  console.log(this.singupObj.name)
    //  console.log(this.singupObj.phone)
       this.key =localStorage.getItem('key');
      let user=[]
    this.user.getUserByMobileNoNPassWord(localStorage.getItem('phone')).snapshotChanges().subscribe((item:any)=>{
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
        user.push(y);
      })
      if(item.length>0){
        let obj=user.find(f=>f.key==this.key);
        if(obj!=undefined){
          this.singupObj=obj;
          
        }
      }
   
    
    // item.forEach(element => {
    //   var y = element.payload.toJSON();
    //   y["key"] = element.key;
    //   if(element.key==key){
    //     this.singupObj=y as any;
        
    //     this.userInfoTblService.initialLoad(y);
    //   }
       
    // });
  });
  //   this.countryService.getAllCountriesInfo().snapshotChanges().subscribe(item=>{
  //    item.forEach(element => {
  //      var y = element.payload.toJSON();
  //      y["key"] = element.key;
 
  //      this.countryList.push(y as any);
  //    });
  //  });
   }
   reset(form?:NgForm){
    if(form!=null)
    form.resetForm();     
    this.singupObj = {
      name: '',
      orgName: '',
      countryCode: '',
      State: '',
      AddressLineOne: '',
      AddressLineTwo: '',
      storeType: '',
      offDayName: '',
      phone: '',
      startEndTime: '',
      ActiveStatus: 1,
      ImageLink: '',
      email: ''
    };

 
    
   }
   
   onSubmit(){
    this.isLoading = true;
    if(this.uploadImagesService.ImageUp.imageUrlFile!=null){
     this.uploadImagesService.saveImage('Logo',this.uploadImagesService.ImageUp.imageUrlFile).then(
       t=>{
        this.singupObj.ImageLink=t; 
         this.user.updateUserInfo(this.key,this.singupObj).then(t=>{
         this.isLoading = false;
       this.toastrService.saveMessage()
     //this.router.navigate(["/inventory/product-info"]);
     
       },(err) => {
         this.isLoading = false;
          this.toastrService.errorMessage()})
       }
       ).catch(c=>{
       console.log(c)
       this.isLoading = false;
     })
    }else{
     
      this.user.updateUserInfo(this.key,this.singupObj).then(t=>{
       this.isLoading = false;
       this.toastrService.saveMessage()
     //this.router.navigate(["/inventory/product-info"]);
     
       },(err) => { 
         this.isLoading = false;
         this.toastrService.errorMessage();
       })
    }
 
   
    // this.user.updateUserInfo(this.key,this.singupObj).then(t=>{
    //  alert('Company Info Save Successfull !')
    //   },err=>{console.log(err)});
  
}
// onLoadImageUpload(){
  
//   const dialogConfig = new MatDialogConfig();
//   dialogConfig.disableClose = true;
//   dialogConfig.autoFocus = true;
//   dialogConfig.width = "40%";
//   dialogConfig.height = "40%";
//   //dialogConfig.data=obj;
//   //this.dialog.open(ShowTrimsItemFormComponent, dialogConfig);
//   this.dialog.open(UploadImagesComponent, dialogConfig);
// }
onDeleteImage(singupObj){
  //console.log(Product)
   
  this.uploadImagesService.deleteImageByUrl(singupObj.ImageLink)
 .then(() => {
  singupObj.ImageLink='';
 //  console.log('Image deleted successfully.');
   this.toastrService.openSnackBarSuccess('Image Delete Successfull!','Ok');
   this.singupObj=singupObj;
  // console.log(this.Product)
  this.user.updateUserInfo(this.key,this.singupObj).then(t=>{
     },err=>{console.log(err)});
 })
 .catch(error => {
   console.error('Error deleting image:', error);
 });
 }
}
