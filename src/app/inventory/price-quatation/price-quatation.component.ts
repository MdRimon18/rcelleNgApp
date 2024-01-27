import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StockInfo } from '../../@core/data/marchanzider-model/stock-info';
import { Tostr } from '../../@core/data/tostr.model';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { PriceQuotationService } from '../../@core/mock/marchandizer/price-quotation.service';
import { StockInfoService } from '../../@core/mock/marchandizer/stock-info.service';
import { MatDialogService } from '../../@core/mock/mat-dialog.service';
import { ToasterService } from '../../@core/mock/toaster.service';
import { DataSharingService } from '../E-commerce/data-sharing.service';

@Component({
  selector: 'ngx-price-quatation',
  templateUrl: './price-quatation.component.html',
  styleUrls: ['./price-quatation.component.scss']
})
export class PriceQuatationComponent implements  OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['key','memoNo', 
  'entryDate','clienName',
  'totalAmount','PaidAmount',
  'DueAmount','Products'];

  columns = [
    {field:"filter"},
    {field:"invoiceNo",header:`${this.languageService.SalesReturnInfo.QuotationNo}`},
    {field:"entryDate",header:`${this.languageService.SalesReturnInfo.Date}`},
    {field:"clienName",header:`${this.languageService.SalesReturnInfo.ClientName}`},
    {field:"totalAmount",header:`${this.languageService.SalesReturnInfo.TotalAmount}`},
    {field:"Products",header:"Action"}
    
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };
  productInfos:any[]=[];
  Tostr=new Tostr();
  subscription:Subscription;
  items:any[]=[];
  serialNumber: any=[];
  constructor(public priceQuotationService:PriceQuotationService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private router:Router,
     private dialog:MatDialog,
     private stockInfoService:StockInfoService,
     public languageService:LanguageConverterService,
     public dataSharingService:DataSharingService


     ) { }

  ngOnInit() {
   this.refresList();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  AddNewInpurRow(){
    this.router.navigate(['/inventory/Invoice-entry']);
  }

  save(element){
    
    this.priceQuotationService.addProductInfo(element).then(data=>{
      
      this.toastrService.saveMessage();
      this.refresList();
    },(err) => { 
      this.toastrService.errorMessage();
    })

  }

  edit(element){
    
    this.priceQuotationService.updateProductInfo(element.key,element).then(data=>{
      
      this.toastrService.updateMessage();
      this.refresList();
    },(err) => {
      this.toastrService.errorMessage();
      })
  }

  delete(element){
    
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
               .afterClosed().subscribe(res=>{
                if(res){
                  this.priceQuotationService.deleteProductInfo(element.key).then(res=>{
                    
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
    
    this.subscription= this.priceQuotationService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
        y["entryDate"]=new Date(y["entryDate"]).toDateString()
     
      this.productInfos.push(y);
      })
     
     this.productInfos.reverse();
      this.dataSource=new MatTableDataSource(this.productInfos);
      
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSharingService.setInvoiceDetailsFilterInfo(this.productInfos)
    })
   
  }
  refreshDataSource(searchData){
    this.dataSource = new MatTableDataSource(searchData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  search(priceQutationList,searchIndex) {
    let emptyValue,invoiceNo,entryDate,clienName,totalAmount;
    [emptyValue,invoiceNo,entryDate,clienName,totalAmount]=priceQutationList;
    let result= this.dataSharingService.invoiceSearchByMultiColumn(this.productInfos,
      invoiceNo,
      entryDate,
      clienName,totalAmount,undefined,undefined,undefined,undefined,undefined)
    this.refreshDataSource(result)
  
   }
  clearFilters() {
   this.refresList();
    this.filtersModel = [];
    this.filterKeys = {};
   }
  printInvoice(element){
     
    this.router.navigate(['/inventory/Quotation-print/',element.key]);
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
