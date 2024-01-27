import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-supplier-shop',
  templateUrl: './supplier-shop.component.html',
  styleUrls: ['./supplier-shop.component.scss']
})
export class SupplierShopComponent implements OnInit {
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
  singupObj={name:'',countryCode:'',State:'',AddressLineOne:'',AddressLineTwo:'',storeType:'',offDayName:'',startEndTime:'',Mobile:'',ActiveStatus:1,ImageLink:'',email:'requirdemail@gmail.com'}
  constructor() { }

  ngOnInit() {
  }
  signUp(){}
}
