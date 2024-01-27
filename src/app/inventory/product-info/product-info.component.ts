import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from "@angular/material";
import { Router } from "@angular/router";
import { NbToastrService } from "@nebular/theme";
import { empty, Subscription } from "rxjs";
import { ProductCategories } from "../../@core/data/marchanzider-model/product-categories";
import { ProductSubCategories } from "../../@core/data/marchanzider-model/product-sub-categories";
import { StockInfo } from "../../@core/data/marchanzider-model/stock-info";
import { Tostr } from "../../@core/data/tostr.model";
import { LanguageConverterService } from "../../@core/mock/marchandizer/language-converter.service";
import { ProductCategoryService } from "../../@core/mock/marchandizer/product-category.service";
import { ProductInfoService } from "../../@core/mock/marchandizer/product-info.service";
import { ProductSubCategoriesService } from "../../@core/mock/marchandizer/product-sub-categories.service";
import { StockInfoService } from "../../@core/mock/marchandizer/stock-info.service";
import { MatDialogService } from "../../@core/mock/mat-dialog.service";
import { ToasterService } from "../../@core/mock/toaster.service";
import { DataSharingService } from "../E-commerce/data-sharing.service";
import { ProductSerialNumbersComponent } from "../product-serial-numbers/product-serial-numbers.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ProductUpdateV2Component } from "./product-update-v2/product-update-v2.component";
import { saveAs } from 'file-saver';
   
@Component({
  selector: 'ngx-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit,OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
filtersModel = [];
filterKeys = {};
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
dataSource = new MatTableDataSource();
  columns = [
    {field:"filter"},
    {field:"catagory",header:"Catagory"},
    {field:"subCategory",header:"Sub Catatory"},
    {field:"name",header:"Name/Model"},
    {field:"quantity",header:"Quantity"},
    {field:"cost",header:"Price"},
    {field:"date",header:"Date"},
    {field:"importedForm",header:"Imported Form"},
    {field:"serialNumber",header:"Serial No"},
    {field:"remarks",header:"Remarks"},
    {field:"Description",header:"Description"}
    
    ];
    headers: string[] = this.columns.map(x => x.field);
    headersFilters = this.headers.map((x, i) => x+'_'+i);
 
   
  constructor(public productInfoService:ProductInfoService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private productCategoriesService:ProductCategoryService,
     private stockinfoService:StockInfoService,
     private productSubCategoryService:ProductSubCategoriesService,
     private dataSharingService:DataSharingService,
     private router:Router ,
     private dialog:MatDialog,
     
     public languageService:LanguageConverterService,
    ) {
       
     }
    searchData(data, searchObject) {
      // filter the data based on the search object
     let newArry=[];
      return data.filter(item => {
        let match = true;
        for (let key in searchObject) {
          console.log('Column',item[key])
          console.log('searchObj',searchObject[key])
         if(typeof(item[key])=='string'){
          if (item[key].toLowerCase().trim().replace(/\s/g, '')!==searchObject[key]
          .toLowerCase().trim().replace(/\s/g, '')) {
            match = false;
            break;
          }
         }else{
          if (item[key]!==searchObject[key]) {
            match = false;
            break;
          }
         }
        }
        return match;
      });
    }
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
  groupSearch(category,subCategory,product){
    if(category==undefined){category=''}
    if(subCategory==undefined){subCategory=''}
    if(product==undefined){product=''}

      if(category!=''&&subCategory!=''&&product!=''){
        let searchResult =this.productInfos.filter(  
          (res:any) =>res.catagory.toString().toLowerCase().replaceAll(' ','').match(category.toLocaleLowerCase().replaceAll(' ',''))&&
          res.subCategory.toString().toLowerCase().replaceAll(' ','').match(subCategory.toLocaleLowerCase().replaceAll(' ',''))&&
          res.name.toString().toLowerCase().replaceAll(' ','').match(product.toLocaleLowerCase().replaceAll(' ',''))
        );
       this.refreshDataSource(searchResult)
        return;
      }
      if(category!=''&&subCategory!=''){
        let searchResult =this.productInfos.filter(  
          (res:any) =>res.catagory.toString().toLowerCase().replaceAll(' ','').match(category.toLocaleLowerCase().replaceAll(' ',''))&&
          res.subCategory.toString().toLowerCase().replaceAll(' ','').match(subCategory.toLocaleLowerCase().replaceAll(' ','')) 
          
        );
       this.refreshDataSource(searchResult)
        return;
      }
      if(subCategory!=''&&product!=''){
        let searchResult =this.productInfos.filter(  
          (res:any) =>res.name.toString().toLowerCase().replaceAll(' ','').match(product.toLocaleLowerCase().replaceAll(' ',''))&&
          res.subCategory.toString().toLowerCase().replaceAll(' ','').match(subCategory.toLocaleLowerCase().replaceAll(' ','')) 
          
        );
       this.refreshDataSource(searchResult)
        return;
      }
      if(category!=''){
        let searchResult =this.productInfos.filter(  
          (res:any) =>res.catagory.toString().toLowerCase().replaceAll(' ','').match(category.toLocaleLowerCase().replaceAll(' ','')) 
        );
       this.refreshDataSource(searchResult)
       return;
      }
      if(subCategory!=''){
        let searchResult =this.productInfos.filter(  
          (res:any) => 
          res.subCategory.toString().toLowerCase().replaceAll(' ','').match(subCategory.toLocaleLowerCase().replaceAll(' ','')) 
          
        );
       this.refreshDataSource(searchResult)
      return;
      }
      if(product!=''){
        let searchResult =this.productInfos.filter(  
          (res:any) => 
          res.name.toString().toLowerCase().replaceAll(' ','').match(product.toLocaleLowerCase().replaceAll(' ','')) 
          
        );
       this.refreshDataSource(searchResult)
        return;
      }
  }
   searchBy(category,subCategory,name) {

    const filteredDatas = this.productInfos.filter(item =>(category ? item.catagory .match(category) : true)
    && (subCategory ? item.subCategory.match(subCategory): true)&&
     (name ? item.name.match(name): true));
     console.log(filteredDatas)
       
    this.refreshDataSource(filteredDatas)

}
  search(value,searchIndex) {
   let result= this.dataSharingService.productSearchByMultiColumn(this.productInfos,value[1],value[2],value[3])
   this.refreshDataSource(result)
 
  }

   
  
  
  

  clearFilters() {
   this.refresList();
    this.filtersModel = [];
    this.filterKeys = {};
   }
  applyFilter(filterValue: string) {
    
    localStorage.setItem('filterItem',filterValue);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  OnCategoryDDLChange(catagory){

// this.productSubCategories=[];

// this.productSubCategoryService.getAllProductInfo().snapshotChanges().subscribe(item=>{
//   item.forEach(element => {
//     var y = element.payload.toJSON();
//     y["key"] = element.key;

//     this.productSubCategories.push(y as ProductSubCategories);
//   })
  
//   let filterproductSubCategories = (catagory) ?
//    this.productSubCategories.filter(p => p.productCategoriesId==catagory):
//     this.productSubCategories;      
//     this.productSubCategories=filterproductSubCategories;
// });

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
        var y = element.payload.toJSON();

        y["key"] = element.key;
    //    console.log( (y["date"]))
    //    console.log( typeof(y["date"]))
        y["date"]=new Date(y["date"]).toDateString()
      //  console.log( (y["date"]))

      // let sortDate= y["date"].split("/");
      // sortDate=sortDate[0]+sortDate[1]+sortDate[2];
      // y["eDate"]=parseInt(sortDate);
      this.productInfos.push(y);
      
      });
    
     console.log(this.productInfos)
      //  this.productInfos.sort((a:any,b:any)=>{
      //     if(a.quantity>b.quantity) return 1;
      //     if(a.quantity>b.quantity) return 0;
          
      //   })
      this.productInfos.reverse();
  
      this.dataSource=new MatTableDataSource(this.productInfos);
   //   console.log(this.dataSource)
    //   this.exportToCsv(this.productInfos);
     
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  
      if((localStorage.getItem('filterItem')==null)||localStorage.getItem('filterItem')==undefined||localStorage.getItem('filterItem')==''){
       
      }else{
        this.applyFilter(localStorage.getItem('filterItem'))
      }
      
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
  onAddSeialNumbera(element){
    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "90%";
      dialogConfig.height = "70%";
      dialogConfig.data=element;
      //this.dialog.open(ShowTrimsItemFormComponent, dialogConfig);
      this.dialog.open(ProductSerialNumbersComponent, dialogConfig);

   // this.router.navigate(["/inventory/serial-number/",element.key])
    
  }
  productUpdateV2(element){
    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "80%";
      dialogConfig.height = "80%";
      dialogConfig.data=element;
      //this.dialog.open(ShowTrimsItemFormComponent, dialogConfig);
      this.dialog.open(ProductUpdateV2Component, dialogConfig);

   // this.router.navigate(["/inventory/serial-number/",element.key])
    
  }
  onAddQRcode(element){
    this.router.navigate(["/inventory/QR-code/",element.key])
    //this.router.navigate(["/serial-number/"]);
  }
  onAddBar(element){
    this.router.navigate(["/inventory/bar-code/",element.key])
    //this.router.navigate(["/serial-number/"]);
  }
  onDetails(obj){
    
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      dialogConfig.height = "60%";
      dialogConfig.data=obj;
     
      //this.dialog.open(ShowTrimsItemFormComponent, dialogConfig);
      this.dialog.open(ProductDetailsComponent, dialogConfig);
    
  }

  exportToCsv(): void {
    // const jsonData = [
    //   { name: 'John', age: 30, city: 'New York' },
    //   { name: 'Jane', age: 25, city: 'Los Angeles' },
    //   // ... other JSON data
    // ];
   //console.log(this.dataSource.data)

  //  const header = Object.keys(this.dataSource.data[0]);
  //  console.log(header)  
  //  const headerRow = header.join(','); 
  //  console.log(headerRow)  

 if (this.dataSource.data.length === 0) {
    this.toastrService.openSnackBarWarning('No data to export!','ok');
      return; // No data to export
    }
      // Define the desired column order

      const columnOrder = [
        'catagory','subCategory','name','serialNumber', 'productBuyingPrice',
        'cost', 'quantity','unit' ,'alertQuantity','supplier', 
         'discountPercent','discountAmount',
        'vatAmount', 'vatPercent',
        'brand', 'color',  'size', 'previousCost', 
        'imageLink',
        'shippingDay', 
        'Desc', 'additionDesc','warantyNgurenty','importedForm','remarks','key','date',
      ];
  
      const csvContent = this.dataSharingService.generateCSVContent(this.dataSource.data, columnOrder);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'data.csv');
    
  }
}
