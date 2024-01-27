import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
 
import { Subscription } from 'rxjs';
 
import { NbToastrService } from '@nebular/theme';
 
 
import { Tostr } from '../../@core/data/tostr.model';
import { MatDialogService } from '../../@core/mock/mat-dialog.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { ProductCategories } from '../../@core/data/marchanzider-model/product-categories';
import { ProductCategoryService } from '../../@core/mock/marchandizer/product-category.service';
import { ToasterService } from '../../@core/mock/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['key', 'ProductName'];
  columns = [
    {field:"filter"},
    {field:"ProductName",header:`${this.languageService.SalesReturnInfo.productCategoryName}`}
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };
  productInfos:ProductCategories[]=[];
  Tostr=new Tostr();
  subscription:Subscription;
  constructor(public productInfoService:ProductCategoryService,
    private toastrService:ToasterService,
    private mathdialogService: MatDialogService,
    public languageService:LanguageConverterService,
    public router:Router) { }

  ngOnInit() {
    this.refresList();
   }
 
   applyFilter(filterValue: string) {
     filterValue = filterValue.trim(); // Remove whitespace
     filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
     this.dataSource.filter = filterValue;
   }
   search(value,searchIndex){
    if(searchIndex==1){
        let searchMemoNo =this.productInfos.filter(  
          (res:any) =>res.ProductName.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ',''))
        );
        this.dataSource = new MatTableDataSource(searchMemoNo);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    
        if(searchMemoNo.length==0){
          this.toastrService.searchNotFoundMessage();
        }
      
    }
 
 
  }
  clearFilters() {
    this.refresList();
    this.filtersModel = [];
    this.filterKeys = {};
   }
   AddNewInpurRow(){
     this.productInfos=[];
     this.subscription=   this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
       item.forEach(element => {
         var y = element.payload.toJSON();
         y["key"] = element.key;
 
         this.productInfos.push(y as ProductCategories);
       })
      
       this.productInfos.unshift({ key: '', ProductName: ''});
       this.dataSource=new MatTableDataSource(this.productInfos);
      
     })
   }
   redirectNew(){
    this.router.navigate(["/inventory/add-Product-category/",'0']);
    
  }

  redirectEdit(element){
    this.router.navigate(["/inventory/add-Product-category/",element.key])
        
      }
  
  
 
   delete(element){
    
     this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
                .afterClosed().subscribe(res=>{
                 if(res){
                   this.productInfoService.deleteProductInfo(element.key).then(res=>{
                     this.refresList();
                     this.toastrService.deleteMessage()
                   },(err) => {   this.toastrService.errorMessage()});
                 }
                })
   }
 
   refresList(){
    
     this.subscription= this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
       item.forEach(element => {
         var y = element.payload.toJSON();
         y["key"] = element.key;
 
      
       this.productInfos.push(y as ProductCategories);
       })
      this.productInfos.reverse();
       this.dataSource=new MatTableDataSource(this.productInfos);
     
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
     })
    
   }
}
