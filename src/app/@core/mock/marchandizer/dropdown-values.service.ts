import { ElementRef, Inject, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
//import { ProductSeralNumbersService } from '../../../pages/merchandizer-module/InventorySystem/product-serial-numbers/product-seral-numbers.service';
//import { ProductSerialNumbersComponent } from '../../../pages/merchandizer-module/InventorySystem/product-serial-numbers/product-serial-numbers.component';
import { ProductCategories } from '../../data/marchanzider-model/product-categories';
import { ProductSeralNumbersService } from '../../data/marchanzider-model/product-seral-numbers.service';
import { ProductSubCategories } from '../../data/marchanzider-model/product-sub-categories';
import { ProductInfo } from '../../data/ProductInfo';
import { ProductCategoryService } from './product-category.service';
import { ProductInfoService } from './product-info.service';
import { ProductSubCategoriesService } from './product-sub-categories.service';

@Injectable({
  providedIn: 'root'
})
export class DropdownValuesService {
  Category='';
  SubCategory='';
  productSubCategories: any[]=[];
  productCategories: any[]=[];
  productBrands:ProductInfo[]=[];
  filteredOptions: Observable<string[]>;
  myControl = new FormControl();
  myControlSerialNumber = new FormControl();
  filteredOptionsSerialNumber: Observable<string[]>;
  subscription:Subscription;
  filterproduct: any[];
  filterproductSubCategories: any[];
  SeralList: any[]=[];
  ProductSerialNumbers: any[]=[];
  filterProducts: ProductInfo[]=[];
  ProductName='';
  isShowProductList=false;

  selectedDateRange='Last 30 Days';
  DateRanges=[
    {name:'Today'},
    {name:'Yesterday'},
    {name:'Last 7 Days'},
    {name:'Last 30 Days'},
    {name:'Last 90 Days'},
    {name:'Last Month'},
    {name:'Last Year'},
    
  ];
  toDate='';
  fromDate='';
  constructor(
    private productInfosServicess:ProductInfoService,
    
    private productCategoriesService:ProductCategoryService,
    private productSubCategoryService:ProductSubCategoriesService,
    public productSerialNumbersService:ProductSeralNumbersService,
    ) { 
    //  const dom: HTMLElement = this.elementRef.nativeElement;   
  this.initialization();
   
  }

  initialization(){
    this.productCategoriesService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.productCategories=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
  
        this.productCategories.push(y as ProductCategories);
      })
  
    });
  
    this.productSubCategoryService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.productSubCategories=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
  
        this.productSubCategories.push(y as ProductSubCategories);
      })
     
    });
  this.productBrandDDL();
  this.productSerialDDL();

  this.filterProductName();
  this.filterSerialNumber();
   
  }
  OnCategoryDDLChange(catagory){
   
      let filterproductSubCategories = (catagory) ?
      this.productSubCategories.filter(p => p.productCategoriesId==catagory):
       this.productSubCategories;      
       this.filterproductSubCategories=filterproductSubCategories;

       let filterproduct = (catagory) ?
       this.productBrands.filter(p => p.catagory==catagory):
        this.productSubCategories;      
        this.filterproduct=filterproduct;

        this.filterProductName();
        this.filterSerialNumber();

  }
  OnSubCategoryDDLChange(subCatagory){
   
    //  console.log(this.Category)
    //  console.log(this.productBrands)

     let filterproduct = (subCatagory) ?
     this.productBrands.filter(p =>p.catagory==this.Category&&p.subCategory==subCatagory):
      this.productBrands;      
      this.filterproduct=filterproduct;

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterOneB(value))
      );
}
applyFilterMyControl() {
  this.myControl.reset('');
 
  }
  applyFilterSerial() {
    
    this.myControlSerialNumber.reset('');
    }
  filterProductName(){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterOneA(value))
    );
   
  }
  filterSerialNumber(){
    this.filteredOptionsSerialNumber = this.myControlSerialNumber.valueChanges.pipe(
      startWith(''),
      map(value => this._filterTwo(value))
    );
   
  }
   
  private _filterOneA(value: any): any[] {
    const filterValue = value.toLowerCase();

    return this.productBrands.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterOneB(value: any): any[] {
    const filterValue = value.toLowerCase();

    return this.filterproduct.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterTwo(value: any): any[] {
    const filterValue = value.toLowerCase();

    return this.productBrands.filter(option =>
                option.serialNumber.toString()
                .indexOf(filterValue) === 0);
  }
   
 
  
  productBrandDDL(){
        
    //this is actualy product info information loaded
    this.subscription= this.productInfosServicess.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.productBrands=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
  
        this.productBrands.push(y as ProductInfo);
      })
    //console.log(this.productBrands)
    })
  }
  productSerialDDL(){
        
    //this is actualy product Serial No. info information loaded
    this.subscription= this.productSerialNumbersService.getAllProductSerialNumber().snapshotChanges().subscribe(item=>{
      this.ProductSerialNumbers=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
  
        this.ProductSerialNumbers.push(y as ProductInfo);
      })
      
  
    })
  }
  filtereProduct(value){
 //   console.log(value)
    this.filterProducts=[];
    //console.log(this.productBrands)
   let filterProducts=(value)?this.productBrands
   .filter(f=>f.name.trim()
   .toLowerCase()==value.trim().
   toLowerCase()):this.productBrands;
  this.filterProducts=filterProducts;
 
  
  //  console.log(filterProducts)
   
   
  }
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
dateNdTimeFormat(entryDate){
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  const date = new Date(entryDate);
  const taketime = new Date();
  
  // Get the individual date and time components
  const day = date.toLocaleString('en-US', { day: '2-digit' });
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.toLocaleString('en-US', { year: 'numeric' });
  const time = taketime.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone });
  
  const EntryDateTime = `${day} ${month} ${year} ${time}`;
  return EntryDateTime;
}

getDateRange() {
  const today = new Date();
  this.toDate = today.toISOString().split('T')[0];
  
  switch (this.selectedDateRange) {
    case 'Today':
      this.fromDate = this.toDate;
      break;
    case 'Yesterday':
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      this.fromDate = yesterday.toISOString().split('T')[0];
      break;
    case 'Last 7 Days':
      const last7Days = new Date(today);
      last7Days.setDate(last7Days.getDate() - 6);
      this.fromDate = last7Days.toISOString().split('T')[0];
      break;
    case 'Last 30 Days':
      const last30Days = new Date(today);
      last30Days.setDate(last30Days.getDate() - 29);
      this.fromDate = last30Days.toISOString().split('T')[0];
      break;
    case 'Last 90 Days':
      const last90Days = new Date(today);
      last90Days.setDate(last90Days.getDate() - 89);
      this.fromDate = last90Days.toISOString().split('T')[0];
      break;
    case 'Last Month':
        const lastMonth = new Date(today);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        this.fromDate = lastMonth.toISOString().split('T')[0];
        break;
    case 'Last Year':
        const lastYear = new Date(today);
        lastYear.setFullYear(lastYear.getFullYear() - 1);
        this.fromDate = lastYear.toISOString().split('T')[0];
        break;
    // Handle other cases similarly
  }
}

}
