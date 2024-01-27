import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
 
import { Subscription } from 'rxjs';
 
import { NbToastrService } from '@nebular/theme';
import { Tostr } from '../../@core/data/tostr.model';
import { ProductCategories } from '../../@core/data/marchanzider-model/product-categories';
import { ProductSubCategories } from '../../@core/data/marchanzider-model/product-sub-categories';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { ProductCategoryService } from '../../@core/mock/marchandizer/product-category.service';
import { ProductSubCategoriesService } from '../../@core/mock/marchandizer/product-sub-categories.service';
import { MatDialogService } from '../../@core/mock/mat-dialog.service';
import { ToasterService } from '../../@core/mock/toaster.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../E-commerce/data-sharing.service';
 

@Component({
  selector: 'ngx-product-sub-categories',
  templateUrl: './product-sub-categories.component.html',
  styleUrls: ['./product-sub-categories.component.scss']
})
export class ProductSubCategoriesComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['key', 'productCategoriesId',
  'SubCategoreisName'];
  columns = [
    {field:"filter"},
    {field:"productCategoriesId",header:`${this.languageService.SalesReturnInfo.productCategoryName}`},
    {field:"SubCategoreisName",header:`${this.languageService.SalesReturnInfo.productSubCategoryName}`}
    
    
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };
  productInfos:ProductSubCategories[]=[];
  PCategory:ProductCategories[]=[];
  Tostr=new Tostr();
  subscription:Subscription;
  constructor(public productInfoService:ProductSubCategoriesService,
    private toastrService:ToasterService,
    private mathdialogService: MatDialogService,
    public productCategoriesService:ProductCategoryService,
    public languageService:LanguageConverterService,
    public dataSharingService:DataSharingService,
    private router:Router) { }

  ngOnInit() {
    this.refresList();
 this.productCategoriesService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;

        this.PCategory.push(y as ProductCategories);
      });

     
    });

   }

   applyFilter(filterValue: string) {
     filterValue = filterValue.trim(); // Remove whitespace
     filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
     this.dataSource.filter = filterValue;
   }
 
   AddNewInpurRow(){
    this.router.navigate(["/inventory/add-Product-sub-categories/",'0']);
    //  this.productInfos=[];
    //  this.subscription=   this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
    //    item.forEach(element => {
    //      var y = element.payload.toJSON();
    //      y["key"] = element.key;
 
    //      this.productInfos.push(y as ProductSubCategories);
    //    })
      
    //    this.productInfos.unshift({ key: '',productCategoriesId:'', SubCategoreisName:''});
    //    this.dataSource=new MatTableDataSource(this.productInfos);
       
    //  })
   }
 
   save(element){
     
     this.productInfoService.addProductInfo(element).then(data=>{
     
       this.toastrService.saveMessage()
       this.refresList();
     },(err) => { this.toastrService.errorMessage()})
 
   }
   refreshDataSource(searchData){
    this.dataSource = new MatTableDataSource(searchData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
   search(ProductSubCategorySearchArry,searchIndex) {
    let emptyValue,productCategoriesId,SubCategoreisName;
     [emptyValue,productCategoriesId,SubCategoreisName]=ProductSubCategorySearchArry;
    let result= this.dataSharingService.productSearchByMultiColumn(
      this.productInfos,
      undefined,undefined,undefined,productCategoriesId,SubCategoreisName
     )
    this.refreshDataSource(result)
   }

  //  search(value,searchIndex){
  //   if(searchIndex==1){
  //       let searchMemoNo =this.productInfos.filter(  
  //         (res:any) =>res.productCategoriesId.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ',''))
  //       );
  //       this.dataSource = new MatTableDataSource(searchMemoNo);
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
    
  //       if(searchMemoNo.length==0){
  //         this.toastrService.searchNotFoundMessage();
  //       }
      
  //   }
  //   if(searchIndex==2){
  // let searchProductCategoriesId=this.productInfos.filter(f=>f.SubCategoreisName.match(value))
  // this.dataSource=new MatTableDataSource(searchProductCategoriesId);
  // this.dataSource.sort = this.sort;
  // this.dataSource.paginator = this.paginator;  
  // if(searchProductCategoriesId.length==0){
  //   this.toastrService.searchNotFoundMessage();
  // } 
  //    }
 
  // }
  clearFilters() {
    this.refresList();
    this.filtersModel = [];
    this.filterKeys = {};
   }


   edit(element){
    this.router.navigate(["/inventory/add-Product-sub-categories/",element.key])
   }
 
   delete(element){
     
     this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
                .afterClosed().subscribe(res=>{
                 if(res){
                   this.productInfoService.deleteProductInfo(element.key).then(res=>{
                     this.refresList();
                     this.toastrService.deleteMessage()
                   },(err) => {this.toastrService.errorMessage()});
                 }
                })
   }
 
   refresList(){
    
     this.subscription= this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
       item.forEach(element => {
         var y = element.payload.toJSON();
         y["key"] = element.key;
 
      
       this.productInfos.push(y as ProductSubCategories);
       })
     
      this.productInfos.reverse();
       this.dataSource=new MatTableDataSource(this.productInfos);
       
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
     })
    
   }

}
