import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '../../../@core/mock/marchandizer/country.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { UserService } from '../../../@core/mock/marchandizer/user.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
 
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'ngx-my-supplier-profile',
  templateUrl: './my-supplier-profile.component.html',
  styleUrls: ['./my-supplier-profile.component.scss']
})
export class MySupplierProfileComponent implements OnInit {
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
  ]
  singupObj={name:'',orgName:'',pass:'',countryCode:'',State:'',AddressLineOne:'',AddressLineTwo:'',storeType:'',offDayName:'',startEndTime:'',phone:'',ActiveStatus:1,ImageLink:'',email:''}
  constructor(private countryService:CountryService,
    public supplierService:SupplierService,
    public user:UserService,
    public languageService:LanguageConverterService,
    private router:Router,
    private toaster:ToasterService) { }

  ngOnInit() {
   
   this.countryService.getAllCountriesInfo().snapshotChanges().subscribe(item=>{
    item.forEach(element => {
      var y = element.payload.toJSON();
      y["key"] = element.key;

      this.countryList.push(y as any);
    });
  });
  }

  saveMySupplier(){
     
   
 this.supplierService.addMySupplierProfileInfo(this.singupObj).then(t=>{
 
  this.toaster.saveMessage();
   },err=>{console.log(err)});
  }

  findExistingSystemSupplier(){
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
    this.router.navigate(["/inventory/supplier-profile-display"]);
  }
}
