import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subject, Subscription } from 'rxjs';
import { ProductCategories } from '../../../@core/data/marchanzider-model/product-categories';
import { ProductSubCategories } from '../../../@core/data/marchanzider-model/product-sub-categories';
import { StockInfo } from '../../../@core/data/marchanzider-model/stock-info';
import { Tostr } from '../../../@core/data/tostr.model';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { ProductCategoryService } from '../../../@core/mock/marchandizer/product-category.service';
import { ProductInfoService } from '../../../@core/mock/marchandizer/product-info.service';
import { ProductSubCategoriesService } from '../../../@core/mock/marchandizer/product-sub-categories.service';
import { StockInfoService } from '../../../@core/mock/marchandizer/stock-info.service';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
  

@Component({
  selector: 'ngx-alerming-product',
  templateUrl: './alerming-product.component.html',
  styleUrls: ['./alerming-product.component.scss']
})
export class AlermingProductComponent implements  OnInit,OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   
  dataSource = new MatTableDataSource();
  displayedColumns = ['catagory','subCategory','name', 'SerialNo', 'quantity','unit'];
  columns = [
    {field:"filter"},
    {field:"catagory",header:`${this.languageService.stockInfo.productCategory}`},
    {field:"subCategory",header:`${this.languageService.stockInfo.subCategory}`},
    {field:"name",header:`${this.languageService.stockInfo.productName}`},
    {field:"serialNumber",header:`${this.languageService.stockInfo.serialNumber}`},
    {field:"quantity",header:`${this.languageService.stockInfo.inStock}`},
    {field:"unit",header:`${this.languageService.stockInfo.unit}`}
    
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };
  
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
  private onDestroy$ = new Subject<boolean>();
  constructor(public productInfoService:ProductInfoService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private productCategoriesService:ProductCategoryService,
     private stockinfoService:StockInfoService,
     private productSubCategoryService:ProductSubCategoriesService,
     private router:Router ,
     public languageService:LanguageConverterService,
    ) { }

  ngOnInit() {
     

    
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
  search(value,searchIndex){
    if(searchIndex==1){
        let searchCatagory =this.productInfos.filter(  
          (res:any) =>res.catagory.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ',''))
        );
        this.dataSource = new MatTableDataSource(searchCatagory);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    
        if(searchCatagory.length==0){
          this.toastrService.searchNotFoundMessage();
        }
      
    }
    if(searchIndex==2){
        let searchSubCategory =this.productInfos.filter(  
          (res:any) =>res.subCategory.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ',''))
        );
        this.dataSource = new MatTableDataSource(searchSubCategory);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    
        if(searchSubCategory.length==0){
          this.toastrService.searchNotFoundMessage();
        }
      
    }
    if(searchIndex==3){
      let searchName=this.productInfos.filter(f=>f.name.match(value))
      this.dataSource=new MatTableDataSource(searchName);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;  
      if(searchName.length==0){
        this.toastrService.searchNotFoundMessage();
      } 
         }
     if(searchIndex==4){
      let searchSerialNumber=this.productInfos.filter(f=>f.serialNumber.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ','')))
      this.dataSource=new MatTableDataSource(searchSerialNumber);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;  
      if(searchSerialNumber.length==0){
        this.toastrService.searchNotFoundMessage();
      } 
         }
         
         if(searchIndex==5){
          let searchQuantity=this.productInfos.filter(f=>f.quantity.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ','')))
          this.dataSource=new MatTableDataSource(searchQuantity);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;  
          if(searchQuantity.length==0){
            this.toastrService.searchNotFoundMessage();
          } 
             }
         if(searchIndex==6){
          let searchUnit=this.productInfos.filter(f=>f.unit.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ','')))
          this.dataSource=new MatTableDataSource(searchUnit);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;  
          if(searchUnit.length==0){
            this.toastrService.searchNotFoundMessage();
          } 
             }
  }
  clearFilters() {
    this.refresList();
    this.filtersModel = [];
    this.filterKeys = {};
   }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
    this.router.navigate(["/inventory/product-info-create"]);
    // this.productInfos=[];
    // this.subscription=   this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
    //   item.forEach(element => {
    //     var y = element.payload.toJSON();
    //     y["key"] = element.key;

    //     this.productInfos.push(y as ProductInfo);
    //   })
     
    //   this.productInfos.unshift({ key: '', catagory: '',subCategory:'', name: '',quantity:0,date:'',importedForm:'',cost:0});
    //   this.dataSource=new MatTableDataSource(this.productInfos);
     
    // })
  }


  save(element){

   

 

  }

  edit(element){
this.router.navigate(["/inventory/product-info-create/",element.key])
    // this.productInfoService.updateProductInfo(element.key,element).then(data=>{
     
    //   this.Tostr.showToast('primary',"", "Updated Successfully", "",this.toastrService);
    //   this.refresList();
    //   this.ngOnInit();
    // },(err) => { this.Tostr.showToast("danger","", err.statusText, "",this.toastrService);})
  }

  delete(element){
  
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
               .afterClosed().subscribe(res=>{
                if(res){
                  this.productInfoService.deleteProductInfo(element.key).then(res=>{

                    //then delete froms stock
                          this.stockinfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
                            let stockInfo=[];
                            item.forEach(element => {
                              var y = element.payload.toJSON();
                              y["key"] = element.key;
                              stockInfo.push(y as StockInfo);
                            });
                            
                        let stockListByelementId=  stockInfo.find(f=>f.productKey==element.key);
                       
                        if(stockListByelementId!=undefined){
                          this.stockinfoService.deleteProductInfo(stockListByelementId.key).then(t=>console.log(t));
                        }
                       
                           
                        
                         
                         
                        
                     

                      });
                   
                    this.refresList();
                 this.toastrService.deleteMessage()
                  },(err) => { this.toastrService.deleteMessage()});
                }
               })
  }

  refresList(){
    this.subscription= this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y:any = element.payload.toJSON();
      
        y["key"] = element.key;
      // let sortDate= y["date"].split("/");
      // sortDate=sortDate[0]+sortDate[1]+sortDate[2];
      // y["eDate"]=parseInt(sortDate);
      if(y.quantity<=y.alertQuantity){
        this.productInfos.push(y);
      }
      
      
      });
     

      //  this.productInfos.sort((a:any,b:any)=>{
      //     if(a.quantity>b.quantity) return 1;
      //     if(a.quantity>b.quantity) return 0;
          
      //   })
      this.dataSource=new MatTableDataSource(this.productInfos);
     
     
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
   
  }
  // ngAfterViewInit() {
  //   /**
  //    * Set the "data-column-name" attribute for every body row cell, either on
  //    * thead row changes (e.g. language changes) or tbody rows changes (add, delete).
  //    */
  //   combineLatest([this.theadChanged$, this.tbodyChanged$])
  //     .pipe(
  //       mapTo([this.thead.rows.item(0), this.tbody.rows]),
  //       map(
  //         ([headRow, bodyRows]: [
  //           HTMLTableRowElement,
  //           HTMLCollectionOf<HTMLTableRowElement>
  //         ]) => [
  //           [...headRow.children].map(headerCell => headerCell.textContent),
  //           [...bodyRows].map(row => [...row.children])
  //         ]
  //       ),
  //       takeUntil(this.onDestroy$)
  //     )
  //     .subscribe(([columnNames, rows]: [string[], HTMLTableCellElement[][]]) =>
  //       rows.forEach(rowCells =>
  //         rowCells.forEach(cell =>
  //           this.renderer.setAttribute(
  //             cell,
  //             'data-column-name',
  //             columnNames[cell.cellIndex]
  //           )
  //         )
  //       )
  //     );
  // }
  ngOnDestroy(): void {
    
   
  } 
  
}
