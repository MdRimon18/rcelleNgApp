import { Component, OnInit } from '@angular/core';
import { UserInfoTblService } from '../../../@core/data/ClientDb/user-info-tbl.service';
import { CountryService } from '../../../@core/mock/marchandizer/country.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { UserService } from '../../../@core/mock/marchandizer/user.service';
 
@Component({
  selector: 'ngx-supplier-profile',
  templateUrl: './supplier-profile.component.html',
  styleUrls: ['./supplier-profile.component.scss']
})
export class SupplierProfileComponent implements OnInit {
  countryList=[];
  shopTypeList=[
    {name:'Department stores',code:'DeptStore'},
    {name:'Grocery stores',code:'GroceryStore'},
    {name:'Technology',code:'technologyStore'},
    {name:'Clothing stores',code:'ClothStore'},
    {name:'Accessory stores',code:'AccessoriesStore'},
    {name:'Pharmacies',code:'Pharmacies'},
    {name:'Pet stores',code:'Petstores'},
    {name:'Toy stores',code:'Toystores'},
    {name:'Specialty stores',code:'Specialtystores'},
    {name:'Kioskss',code:'Kiosks'},
    {name:'Generale Store',code:'GeneralStore'},
    {name:'Others',code:'Others'},
  ];
  key;
  singupObj={name:'',orgName:'',countryCode:'',State:'',AddressLineOne:'',AddressLineTwo:'',storeType:'',offDayName:'',startEndTime:'',phone:'',ActiveStatus:1,ImageLink:'',email:''}
  constructor(private countryService:CountryService,
    public user:UserService,
    private userInfoTblService:UserInfoTblService,
    public languageService:LanguageConverterService) { }

  ngOnInit() {
   this.singupObj.phone=localStorage.getItem('phone');
   this.singupObj.name=localStorage.getItem('name');
   this.key =localStorage.getItem('key');
   this.user.getAllUserInfo().snapshotChanges().subscribe(item=>{
    item.forEach(element => {
      var y = element.payload.toJSON();
      y["key"] = element.key;
      if(element.key==this.key){
        this.singupObj=y as any;
   
      //  this.userInfoTblService.initialLoad(y);
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
  signUp(){
  
 this.user.updateUserInfo(this.key,this.singupObj).then(t=>{
  
  alert('Profile Completion Successful !')
   });
  }
}
