import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OthersShopService } from '../../@core/mock/marchandizer/others-shop.service';
import { UserService } from '../../@core/mock/marchandizer/user.service';
 
@Component({
  selector: 'ngx-your-others-shop',
  templateUrl: './your-others-shop.component.html',
  styleUrls: ['./your-others-shop.component.scss']
})
export class YourOthersShopComponent implements  OnInit {
  loginObj={your_name:'',your_pass:'',remember_me:false};
  users=[];
  subscription:Subscription;
  filteredArray=[];
    constructor( 
      private userService:UserService ,
      private othersShopService:OthersShopService ,
      private router:Router){
      
    }
    login(){
    let loginUser=this.filteredArray.find(f=>f.phone==this.loginObj.your_name
        &&f.pass==this.loginObj.your_pass);
      
        if(loginUser==undefined){
          alert('Shop did not found');
          return;
        }else{
          this.othersShopService.addMyOthersShopInfo(loginUser).then(t=>{
            alert(`Your Shop Added Succesfully !`);
          },err=>console.log(err))
         
          
        }
      
    }
     ngOnInit(){
      
      this.userService.getAllUserInfo().snapshotChanges().subscribe(item=>{
        item.forEach(element => {
          var y = element.payload.toJSON();
          y["key"] = element.key;
          this.filteredArray.push(y);
        })
      })
     }
  

}

