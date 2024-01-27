 
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
 
import { Observable, Subscription } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

import { Router, ActivatedRoute } from '@angular/router';
 
import { InvoiceProductDetailsComponent } from './invoice-product-details/invoice-product-details.component';
import { Tostr } from '../../@core/data/tostr.model';
import { InvoiceDetailsService } from '../../@core/mock/marchandizer/invoice-details.service';
import { MatDialogService } from '../../@core/mock/mat-dialog.service';
import { StockInfoService } from '../../@core/mock/marchandizer/stock-info.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { StockInfo } from '../../@core/data/marchanzider-model/stock-info';
import { ToasterService } from '../../@core/mock/toaster.service';
import { DataSharingService } from '../E-commerce/data-sharing.service';
import { map } from 'rxjs/operators';
import { DateResizerService } from '../../@core/mock/marchandizer/date-resizer.service';
import { DropdownValuesService } from '../../@core/mock/marchandizer/dropdown-values.service';
 

@Component({
  selector: 'ngx-invoic-detailss',
  templateUrl: './invoic-detailss.component.html',
  styleUrls: ['./invoic-detailss.component.scss']
})
export class InvoicDetailssComponent implements OnInit,OnDestroy {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['key','memoNo', 
  'entryDate','clienName',
  'totalAmount','PaidAmount',
  'DueAmount','Products'];

  columns = [
    {field:"filter"},
    {field:"invoiceNo",header:`${this.languageService.SalesReturnInfo.invoiceNo}`},
    {field:"entryDate",header:`${this.languageService.SalesReturnInfo.Date}`},
    {field:"clienName",header:`${this.languageService.SalesReturnInfo.ClientName}`},
    {field:"totalAmount",header:`${this.languageService.SalesReturnInfo.TotalAmount}`},
    {field:"PaidAmount",header:`${this.languageService.SalesReturnInfo.PaidAmount}`},
    {field:"DueAmount",header:`${this.languageService.SalesReturnInfo.DueAmount}`},
    {field:"Products",header:"Action"}
    
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };

  productInfos:any[]=[];
  Tostr=new Tostr();
  private subscription:Subscription= new Subscription();

  items:any[]=[];
  serialNumber: any=[];
 

  constructor(public invoiceDetailsService:InvoiceDetailsService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private router:Router,
     private dialog:MatDialog,
     private stockInfoService:StockInfoService,
     public dateResizerService:DateResizerService,
     public dropdownValuesService:DropdownValuesService,
     public languageService:LanguageConverterService,
     public dataSharingService:DataSharingService


     ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.dropdownValuesService.getDateRange();
   this.refresList();
  //this.loadData();
   
  }
  onChangeDateRange(){
    this.dropdownValuesService.getDateRange();
    this.refresList();
  }
  applyFilter(){
    this.refresList();
  }
  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }

  AddNewInpurRow(){
    this.router.navigate(['/inventory/Invoice-entry']);
  }

  save(element){
    
    this.invoiceDetailsService.addProductInfo(element).then(data=>{
      
      this.toastrService.saveMessage();
      this.refresList();
    },(err) => { 
      this.toastrService.errorMessage();
    })

  }

  edit(element){
    element.entryDate=this.dateResizerService.resize(element.entryDate);
    this.invoiceDetailsService.updateProductInfo(element.key,element).then(data=>{
      
      this.toastrService.updateMessage();
     // this.refresList();
    },(err) => {
      this.toastrService.errorMessage();
      })
  }

  delete(element){
    
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
               .afterClosed().subscribe(res=>{
                if(res){
                  this.invoiceDetailsService.deleteProductInfo(element.key).then(res=>{
                    
            //then delete froms stock
            this.stockInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
              let stockInfo=[];
              item.forEach(element => {
                var y = element.payload.toJSON();
                y["key"] = element.key;

              
                stockInfo.push(y as StockInfo);
              });
             
          let stockListByelementId=  stockInfo.filter(f=>f.invoiceKey==element.key);

            stockListByelementId.forEach(e => {
              this.stockInfoService.deleteProductInfo(e.key).then(t=>console.log(t));
            });
          



          });

                    this.refresList();
                   this.toastrService.deleteMessage();
                  },(err) => {
                    this.toastrService.errorMessage();
                    });
                }
               })
  }
  
 
  refresList(){
    

    this.subscription =   this.invoiceDetailsService.getInvoiceByDateRangeWithSnapShot(this.dropdownValuesService.fromDate,this.dropdownValuesService.toDate).subscribe(items=>{
      this.productInfos=[];
      this.dataSource=new MatTableDataSource(items.map(item => {
        const y = item.payload.val();
        y["key"] = item.key;
        y['entryDate']=new Date( y['entryDate']).toDateString();
        return y;
      }).reverse());
      //this.dataSharingService.exportToCsv(this.dataSource.data,'json')

       
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.productInfos=this.dataSource.data;
    });
     // this.dataSharingService.setInvoiceDetailsFilterInfo(this.productInfos)


  }
  refreshDataSource(searchData){
    this.dataSource = new MatTableDataSource(searchData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  search(invoicDetailArry,searchIndex) {
    let emptyValue,invoiceNo,entryDate,clienName,totalAmount,PaidAmount,DueAmount;
    [emptyValue,invoiceNo,entryDate,clienName,totalAmount,PaidAmount,DueAmount]=invoicDetailArry;
    let result= this.dataSharingService.invoiceSearchByMultiColumn(this.productInfos,
      invoiceNo,
      entryDate,
      clienName,totalAmount,PaidAmount,DueAmount)
    this.refreshDataSource(result)
  
   }
//  search(value,searchIndex) {
   
   
   
//     if(searchIndex==1){
//       let searchInvoiceNo =this.productInfos.filter(  
//         (res:any) =>res.invoiceNo.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ',''))
//       );
//       console.log(searchInvoiceNo)
//       this.dataSource = new MatTableDataSource(searchInvoiceNo);
//       this.dataSource.sort = this.sort;
//       this.dataSource.paginator = this.paginator;
  
//       if(searchInvoiceNo.length==0){
//         this.toastrService.searchNotFoundMessage();
//       }
    
//   }
//   if(searchIndex==2){
// let searchdateWiseProductInfoList=this.productInfos.filter(f=>f.entryDate.match(value))
// this.dataSource=new MatTableDataSource(searchdateWiseProductInfoList);
// this.dataSource.sort = this.sort;
// this.dataSource.paginator = this.paginator;  
// if(searchdateWiseProductInfoList.length==0){
//   this.toastrService.searchNotFoundMessage();
// } 
//    }
//    if(searchIndex==3){
//     let searchClientName=this.productInfos.filter(f=>f.clienName.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ','')))
//     this.dataSource=new MatTableDataSource(searchClientName);
//     this.dataSource.sort = this.sort;
//     this.dataSource.paginator = this.paginator;  
//     if(searchClientName.length==0){
//       this.toastrService.searchNotFoundMessage();
//     } 
//        }
//        if(searchIndex==4){
//         let searchtotalAmount=this.productInfos.filter(f=>f.totalAmount.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ','')))
//         this.dataSource=new MatTableDataSource(searchtotalAmount);
//         this.dataSource.sort = this.sort;
//         this.dataSource.paginator = this.paginator;  
//         if(searchtotalAmount.length==0){
//           this.toastrService.searchNotFoundMessage();
//         } 
//            }
 
 // }
  clearFilters() {
   this.refresList();
    this.filtersModel = [];
    this.filterKeys = {};
   }
  printInvoice(element){
     
    this.router.navigate(['/inventory/Invoice-print/',element.key]);
  }
  printInvoicev2(element){
     
    this.router.navigate(['/inventory/invoice-print-v2/',element.key]);
  }
  printInvoicev3(element){
     
    this.router.navigate(['/inventory/invoice-print-v3/',element.key]);
  }
  onDetailsProduct(data) {

     //console.log(data);
     this.items=[];
     for (let key in  data.items) {
      //  console.log(key, this.invoiceDetails.items[key]);
        this.items.push(data.items[key]);

      }
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "60%";
    // dialogConfig.height = "60%";
    // dialogConfig.data=obj;
    // //this.dialog.open(ShowTrimsItemFormComponent, dialogConfig);
     //this.dialog.open(InvoiceProductDetailsComponent, dialogConfig);
  }
  onDetailsSerial(data){
    this.serialNumber=[];
    if(data.serialNumbers!=undefined){
      for (let key in data.serialNumbers) {
        //  console.log(key, this.invoiceDetails.items[key]);
          this.serialNumber.push(data.serialNumbers[key]);
        }
      
    }
  }
 
}
