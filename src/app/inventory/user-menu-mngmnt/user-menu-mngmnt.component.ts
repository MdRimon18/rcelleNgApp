import { Component, OnInit } from '@angular/core';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../@core/mock/marchandizer/user.service';
import { ToasterService } from '../../@core/mock/toaster.service';

@Component({
  selector: 'ngx-user-menu-mngmnt',
  templateUrl: './user-menu-mngmnt.component.html',
  styleUrls: ['./user-menu-mngmnt.component.scss']
})
export class UserMenuMngmntComponent implements OnInit {

  selectAll:boolean;
  userId='';
  isUpdated:boolean;
  isSaved:boolean;
 
  isActiveSetPrivilizeButton:boolean= true;
  menu:any[]=[];
  subscription:Subscription;
  userList:any[]=[];
  key: string='';
  constructor(public LanguageService:LanguageConverterService,
    public userService:UserService,
    private toasterService:ToasterService) { 
      this.userService.getAllUserMenu().valueChanges().subscribe(res=>{
        console.log(res);
      })
    }

  ngOnInit() {
   // console.log(this.LanguageService.shopOwner())
  //  console.log(this.LanguageService.userMenuBangla())
   // this.menu=this.LanguageService.userMenu();

    // console.log(this.LanguageService.shopOwner())
    // console.log(this.LanguageService.shopOwnerBangla())
    let visibility = false;
    let isSave = false;
    let isEdit = false;
    let isDelete = false;
    let isShowReport = false;
   // let occupation = 'Engineer';
    //let gender = 'Male';
 //   this.menu = this.LanguageService.shopOwner().map(obj => ({ ...obj, visibility }));
   
 this.menu=this.LanguageService.userMenu().map(obj => ({
      ...obj,visibility,
      children: obj.children.map(chld => ({ ...chld, visibility,isSave,isEdit,isDelete,isShowReport }))
    }));
//console.log(this.menu);
    this.subscription= this.userService.getUserBycmpCode(localStorage.getItem('cmpCode')).snapshotChanges().subscribe(item=>{
      this.userList=[];
      item.forEach(element => {
        var y = element.payload.val();
        y["key"] = element.key;
        if(y['userType']=='Employee'){
          this.userList.push(y);
        }
     
      
      });
      //console.log(this.userList)
  }); 
  }
  onChangeSelectAllBtn(){
    if(this.selectAll){

      let visibility = true;
    let isSave = true;
    let isEdit = true;
    let isDelete = true;
    let isShowReport = true;

    this.menu=this.LanguageService.userMenu().map(obj => ({
      ...obj,visibility,
      children: obj.children.map(chld => ({ ...chld, visibility,isSave,isEdit,isDelete,isShowReport }))
    }))}
    else{
      let visibility = false;
    let isSave = false;
    let isEdit = false;
    let isDelete = false;
    let isShowReport = false;

    this.menu=this.LanguageService.userMenu().map(obj => ({
      ...obj,visibility,
      children: obj.children.map(chld => ({ ...chld, visibility,isSave,isEdit,isDelete,isShowReport }))
    }))
    }
  }
  onSubmit(){
    console.log(this.userId)
    console.log(this.menu)
   if(this.userId!==''){
    if(this.key!==''){
      this.userService.updateUserMenu(this.key,{Userkey:this.userId,Menu:this.menu}).then(t=>{
        this.toasterService.updateMessage();
         }).catch(c=>{})
    }else{
      this.userService.addUserMenu({Userkey:this.userId,Menu:this.menu}).then(t=>{
        this.toasterService.saveMessage();
        this.onChangeUser();
         }).catch(c=>{})
    }
 
   }else{
    this.toasterService.openSnackBarAlerming('Please Select a User!','Ok')
   }
     

 
  }
  onChangeUser(){
    this.selectAll=false;
    if(this.userId!=''){
      this.userService.getUserMenuByUserId(this.userId).snapshotChanges().subscribe((menuRes:any)=>{
    
        menuRes=menuRes.map(item => {
          const y = item.payload.val();
          y["key"] = item.key;
         
          return y;
        });
        console.log(menuRes)
        if(menuRes.length>0){
          this.menu=menuRes[0].Menu;
          this.key=menuRes[0].key;

    //      console.log(this.menu);
          
        }else{
          this.menu=this.LanguageService.userMenu();
          this.key='';
        }
      });
    
   // this.dropdownValueService.erpMenuList=this.staticFeaturesService.getErpMenu();
    }else{
      this.menu=this.LanguageService.userMenu();
      this.key='';
    }
  }
}
