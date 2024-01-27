import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { MyShopEmpService } from '../../@core/mock/marchandizer/my-shop-emp.service';
import { UserService } from '../../@core/mock/marchandizer/user.service';
 
@Component({
  selector: 'ngx-shop-emp-edit',
  templateUrl: './shop-emp-edit.component.html',
  styleUrls: ['./shop-emp-edit.component.scss']
})
export class ShopEmpEditComponent implements OnInit {
  shopEmp=[];
  ShopEmpList=[];
 
  singupObj={name:'',designation:'',phone:'',pass:'',userType:'',agree_term:false,cmpCode:''}
  resetForm(form?:NgForm){
    console.log(form)
    if(form!=null)
    this.singupObj={name:'',designation:'',phone:'',pass:'',userType:'',agree_term:false,cmpCode:''}
  }
  
  key: string;
  constructor(
    public userService:UserService,
    private router:Router,
    private route:ActivatedRoute,
    public languageService:LanguageConverterService
    ) { 
     
    }

  ngOnInit() {
    this.key=this.route.snapshot.paramMap.get('key');
      this.userService.getUserBycmpCode(localStorage.getItem('cmpCode')).snapshotChanges().subscribe(item=>{
        item.forEach(element => {
          var y = element.payload.toJSON();
          y["key"] = element.key;
          this.shopEmp.push(y as any);
        });
        let obj=this.shopEmp.find(f=>f.key==this.key);
        if(obj!=undefined){
        this.singupObj=obj;
        }
      });
  }
  signUp(){
    this.singupObj.phone=this.singupObj.phone.trim().replace(/\s+/g, '').replace(/[^\w\s]/gi, '');
    this.userService.updateUserInfo(this.key,this.singupObj).then(t=>{
      alert('User Update Successfull !');
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
