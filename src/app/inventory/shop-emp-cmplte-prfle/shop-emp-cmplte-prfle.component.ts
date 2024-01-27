import { Component, OnInit } from '@angular/core';
import { UserInfoTblService } from '../../@core/data/ClientDb/user-info-tbl.service';
import { CountryService } from '../../@core/mock/marchandizer/country.service';
 
import { UserService } from '../../@core/mock/marchandizer/user.service';
 
@Component({
  selector: 'ngx-shop-emp-cmplte-prfle',
  templateUrl: './shop-emp-cmplte-prfle.component.html',
  styleUrls: ['./shop-emp-cmplte-prfle.component.scss']
})
export class ShopEmpCmpltePrfleComponent implements OnInit {
  countryList=[];
   
  singupObj={name:'' ,designation:'',countryCode:'',State:'',AddressLineOne:'',AddressLineTwo:'' ,  phone:'',ActiveStatus:1,ImageLink:'',email:''}
  constructor(private countryService:CountryService,
    private userInfoTblService:UserInfoTblService,
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
        console.log(y);
       
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

 
}
