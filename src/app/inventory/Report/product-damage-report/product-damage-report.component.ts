import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { ProductCategories } from '../../../@core/data/marchanzider-model/product-categories';
import { ProductSubCategories } from '../../../@core/data/marchanzider-model/product-sub-categories';
import { Tostr } from '../../../@core/data/tostr.model';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { ProductCategoryService } from '../../../@core/mock/marchandizer/product-category.service';
import { ProductSubCategoriesService } from '../../../@core/mock/marchandizer/product-sub-categories.service';
import { RemoveStockReasonService } from '../../../@core/mock/marchandizer/remove-stock-reason.service';
import { StockInfoService } from '../../../@core/mock/marchandizer/stock-info.service';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
import { DataSharingService } from '../../E-commerce/data-sharing.service';
  
import { ProductSerialNumberModalComponent } from '../../product-serial-number-modal/product-serial-number-modal.component';
import { ShowDamageproductSerialNumberComponent } from '../show-damageproduct-serial-number/show-damageproduct-serial-number.component';

@Component({
  selector: 'ngx-product-damage-report',
  templateUrl: './product-damage-report.component.html',
  styleUrls: ['./product-damage-report.component.scss']
})
export class ProductDamageReportComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  filtersModel = [];
  filterKeys = {};
  dataSource = new MatTableDataSource();

  columns = [
    {field:"filter"},
    {field:"catagory",header:"Catagory"},
    {field:"subCategory",header:"Sub Catatory"},
    {field:"name",header:"Name/Model"},
    // {field:"serialNo",header:"Serial No"},
    {field:"remarks",header:"Remarks"}
    
    ];
    headers: string[] = this.columns.map(x => x.field);
    headersFilters = this.headers.map((x, i) => x+'_'+i);
  productInfos:any[]=[];
 
  productCategories:ProductCategories[]=[];
  productSubCategories:ProductSubCategories[]=[];
  productSubCategoriesFilterd:ProductSubCategories[]=[];
  Tostr=new Tostr();
  subscription:Subscription;
  stockInfos:any[]=[];
  productInfostwo:any[]=[];
 
  isBangla=false;
  rows: any;
   
  constructor(public productInfoService:RemoveStockReasonService,
    public removeStockReasonService:RemoveStockReasonService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private productCategoriesService:ProductCategoryService,
     private stockinfoService:StockInfoService,
     private productSubCategoryService:ProductSubCategoriesService,
     private router:Router ,
     private dialog:MatDialog,
     public languageService:LanguageConverterService,
     public dataSharingService:DataSharingService,
    ) { }

  ngOnInit() {
     
 
   if(localStorage.getItem("Language")=='Bangla'){
    this.isBangla=true;
   }
   this.refresList();
  this.productCategoriesService.getAllProductInfo().snapshotChanges().subscribe(item=>{
    item.forEach(element => {
      var y = element.payload.toJSON();
      y["key"] = element.key;

      this.productCategories.push(y as ProductCategories);
    })
    
  })

  this.productSubCategoryService.getAllProductInfo().snapshotChanges().subscribe(item=>{
    item.forEach(element => {
      var y = element.payload.toJSON();
      y["key"] = element.key;

      this.productSubCategories.push(y as ProductSubCategories);
    })
    
  })
  }
  refreshDataSource(searchByThree){
    this.dataSource = new MatTableDataSource(searchByThree);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  search(productDamageArry,searchIndex) {
    let emptyValue,catagory,subCategory,name,remarks;
    [emptyValue,catagory,subCategory,name,remarks]=productDamageArry;
    let result= this.dataSharingService.productSearchByMultiColumn(this.productInfos,
      catagory,subCategory,name,remarks)
    this.refreshDataSource(result)
  
   }
 
   clearFilters() {
    this.refresList();
     this.filtersModel = [];
     this.filterKeys = {};
    }

  OnCategoryDDLChange(catagory){

this.productSubCategories=[];

this.productSubCategoryService.getAllProductInfo().snapshotChanges().subscribe(item=>{
  item.forEach(element => {
    var y = element.payload.toJSON();
    y["key"] = element.key;

    this.productSubCategories.push(y as ProductSubCategories);
  })
  
  let filterproductSubCategories = (catagory) ?
   this.productSubCategories.filter(p => p.productCategoriesId==catagory):
    this.productSubCategories;      
    this.productSubCategories=filterproductSubCategories;
});

  }
  AddNewInpurRow(){
    this.router.navigate(["/inventory/remove-purchase-stock"]);
  }

  refresList(){
    
    this.subscription= this.productInfoService.getAllReasonsOfRemovalStock().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
      this.productInfos.push(y);
      
      });
      

      //  this.productInfos.sort((a:any,b:any)=>{
      //     if(a.quantity>b.quantity) return 1;
      //     if(a.quantity>b.quantity) return 0;
          
      //   })
      this.productInfos.reverse();
      this.dataSource=new MatTableDataSource(this.productInfos);
       
     
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
   
  }
  ngOnDestroy(): void {
  } 
  onAddSeialNumbera(element){
    this.router.navigate(["/inventory/serial-number/",element.key])
  }
   
  showSerialNo(value){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "60%";
   dialogConfig.data=value;
    this.dialog.open(ShowDamageproductSerialNumberComponent, dialogConfig);
  }
}
