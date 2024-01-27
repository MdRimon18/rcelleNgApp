import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { Tostr } from '../../../@core/data/tostr.model';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
import { DataSharingService } from '../../E-commerce/data-sharing.service';
 
import { PurchaseInvoiceDetailsService } from '../purchase-invoice-details.service';
import { PurchaseReturnService } from '../purchase-return.service';
import { DropdownValuesService } from '../../../@core/mock/marchandizer/dropdown-values.service';

@Component({
  selector: 'ngx-purchase-info',
  templateUrl: './purchase-info.component.html',
  styleUrls: ['./purchase-info.component.scss']
})
export class PurchaseInfoComponent implements  OnInit,OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   
  dataSource = new MatTableDataSource();
  displayedColumns = ['key',
  'InvoiceNo',
  'memoNo','entryDate', 'clienName',
   'totalAmount','DueAmount',
   'PaidAmount','totalAddiDiscnt'];
  productInfos:any[]=[];
  columns = [
    {field:"filter"},
    {field:"invoiceNo",header:`${this.languageService.SalesReturnInfo.invoiceNo}`},
    {field:"memoNo",header:`${this.languageService.SalesReturnInfo.MemoNo}`},
    {field:"entryDate",header:`${this.languageService.SalesReturnInfo.Date}`},
    {field:"clienName",header:`${this.languageService.SalesReturnInfo.SupplierName}`},
    {field:"totalAmount",header:`${this.languageService.SalesReturnInfo.TotalAmount}`},
    {field:"PaidAmount",header:`${this.languageService.SalesReturnInfo.PaidAmount}`},
    {field:"DueAmount",header:`${this.languageService.SalesReturnInfo.DueAmount}`},
    {field:"totalAddiDiscnt",header:`${this.languageService.SalesReturnInfo.AdditionalDiscount}`}
    
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };
   
  Tostr=new Tostr();
  subscription:Subscription;
  stockInfos:any[]=[];
  productInfostwo:any[]=[];
 
  isBangla=false;
  rows: any;
  
  constructor(public purchaseInvoiceDetailsService:PurchaseInvoiceDetailsService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private dropdownValuesService: DropdownValuesService,
     private router:Router ,
     public languageService:LanguageConverterService,
     public dataSharingService:DataSharingService,
    ) { }

  ngOnInit() {
    this.dropdownValuesService.getDateRange();
   this.refresList();
   
  }
  onChangeDateRange(){
    this.dropdownValuesService.getDateRange();
    this.refresList();
 }

 applyFilter( ) {
   this.refresList();
 }
  refreshDataSource(searchData){
    this.dataSource = new MatTableDataSource(searchData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  search(salesReturnList,searchIndex) {
    let emptyValue,invoiceNo,memoNo,entryDate,clienName,totalAmount,PaidAmount,DueAmount,totalAddiDiscnt;
    [emptyValue,invoiceNo,memoNo,entryDate,clienName,totalAmount,PaidAmount,DueAmount,totalAddiDiscnt]=salesReturnList;
    console.log(entryDate);
    let result= this.dataSharingService.invoiceSearchByMultiColumn(this.productInfos,
      invoiceNo,
      entryDate,
      clienName,totalAmount,PaidAmount,DueAmount,totalAddiDiscnt,undefined,memoNo)
    this.refreshDataSource(result)
  
   }
  clearFilters() {
    this.refresList();
    this.filtersModel = [];
    this.filterKeys = {};
   }

  
  AddNewInpurRow(){
    this.router.navigate(["/inventory/new-purchase"]);
    
  }


  edit(element){
this.router.navigate(["/inventory/product-info-create/",element.key])
  }

  delete(element){
  
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
               .afterClosed().subscribe(res=>{
                if(res){
                  this.purchaseInvoiceDetailsService.deletepurchaseInvDtlsInfo(element.key).then(res=>{

                    //then delete froms stock
                       
                   
                    this.refresList();
                    this.toastrService.deleteMessage()
                  },(err) => {   this.toastrService.errorMessage()});
                }
               })
  }

  refresList(){
    
    this.subscription= this.purchaseInvoiceDetailsService.getInvoiceByDateRangeWithSnap(this.dropdownValuesService.fromDate,
      this.dropdownValuesService.toDate).subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.val();
        y["key"] = element.key;
        y["entryDate"]=new Date(y["entryDate"]).toDateString()
        this.productInfos.push(y);
      });
 
      this.dataSource=new MatTableDataSource(this.productInfos.reverse());
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
   
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
   
  } 
  printInvoice(element){
   
    this.router.navigate(['/inventory/purchase-print/',element.key]);
  }
  printInvoicev2(element){
   
    this.router.navigate(['/inventory/purchase-print-v2/',element.key]);
  }
  printInvoicev3(element){
   
    this.router.navigate(['/inventory/purchase-print-v3/',element.key]);
  }
}
