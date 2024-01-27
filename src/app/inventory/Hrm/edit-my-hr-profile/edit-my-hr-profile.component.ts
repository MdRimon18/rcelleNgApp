import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../../@core/mock/marchandizer/country.service';
import { UserService } from '../../../@core/mock/marchandizer/user.service';
 
import { HrProfileService } from '../hr-profile.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';

@Component({
  selector: 'ngx-edit-my-hr-profile',
  templateUrl: './edit-my-hr-profile.component.html',
  styleUrls: ['./edit-my-hr-profile.component.scss']
})
export class EditMyHrProfileComponent implements OnInit {
  countryList=[];
   
  singupObj={name:'' ,department:'',designation:'',grade:'',salary:'',countryCode:'',State:'',AddressLineOne:'',AddressLineTwo:'' ,  phone:'',ActiveStatus:1,ImageLink:'',email:''}
  key: string;
  hrs: any=[];
  constructor(public countryService:CountryService,
    public hrProfileService:HrProfileService,
    public user:UserService,
    public languageService:LanguageConverterService,
    public router:Router,
    private route:ActivatedRoute) { 
      
      this.key=this.route.snapshot.paramMap.get('key');
      this.hrProfileService.getAllMyHrProfileInfo().snapshotChanges().subscribe(item=>{
        item.forEach(element => {
          var y = element.payload.toJSON();
          y["key"] = element.key;
    
          this.hrs.push(y as any);
        });
        let obj=this.hrs.find(f=>f.key==this.key);
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
     
   
 this.hrProfileService.updateMyHrProfileInfo(this.key,this.singupObj).then(t=>{
 
  alert('Update Successfull !')
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
        alert('This Supplier is not Sign up yet !')
      }
    });
  }
  backTo(){
    this.router.navigate(["/inventory/my-hr-profile-display"]);
  }
}
