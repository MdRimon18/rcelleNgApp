import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { Tostr } from '../../../@core/data/tostr.model';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { PurchaseMoneyRecitService } from '../../../@core/mock/marchandizer/purchase-money-recit.service';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
import { DataSharingService } from '../../E-commerce/data-sharing.service';
 
import { PurchaseInvoiceDetailsService } from '../../Perchase/purchase-invoice-details.service';

@Component({
  selector: 'ngx-payable-due',
  templateUrl: './payable-due.component.html',
  styleUrls: ['./payable-due.component.scss']
})
export class PayableDueComponent implements OnInit {
  mobileNo:string='';
  entryDate:string='';
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['InvoiceNo', 'memoNo','clienName','mobile','totalAmount','PaidAmount','DueAmount','Recit'];
  
  columns = [
    {field:"filter"},
    {field:"invoiceNo",header:`${this.languageService.SalesReturnInfo.invoiceNo}`},
    {field:"memoNo",header:`${this.languageService.InvoiceEntry.memoNo}`},
    {field:"clienName",header:`${this.languageService.SalesReturnInfo.ClientName}`},
    {field:"mobile",header:`${this.languageService.SalesReturnInfo.mobile}`},
    {field:"totalAmount",header:`${this.languageService.SalesReturnInfo.TotalAmount}`},
    {field:"PaidAmount",header:`${this.languageService.SalesReturnInfo.PaidAmount}`},
    {field:"DueAmount",header:`${this.languageService.SalesReturnInfo.DueAmount}`},
    {field:"Recit",header:"Recit"}
    
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };
  productInfos:any[]=[];
  Tostr=new Tostr();
  subscription:Subscription;

  totalAmount:number=0;
  totalPaidAmount:number=0;
  totalDueAmount:number=0;

  constructor(public purchaseInvoiceDetailsService:PurchaseInvoiceDetailsService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private purchaseMoneyRecitService: PurchaseMoneyRecitService,
     private router:Router,
     public languageService:LanguageConverterService,
     public dataSharingService:DataSharingService,
     ) { }

  ngOnInit() {
   this.refresList();
  }

  applyFilter(filterValue: string) {
  
       this.subscription= this.purchaseInvoiceDetailsService.getAllpurchaseInvDtlsInfo().snapshotChanges().subscribe(item=>{
         this.productInfos=[];
         item.forEach(element => {
           var y = element.payload.toJSON();
           y["key"] = element.key;
         this.productInfos.push(y);
          
         })
       let filterdDeuDetails=  this.productInfos.filter(f=>f.mobile.trim().toLowerCase()
       .replace(/\s/g, '') ==this.mobileNo.trim().toLowerCase().replace(/\s/g, ''))
       this.dataSource=new MatTableDataSource(filterdDeuDetails);
     
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
 
       })
  
  }

  AddNewInpurRow(){

    this.router.navigate(['/inventory/Invoice-entry']);
    // this.productInfos=[];
    // this.subscription=   this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
    //   item.forEach(element => {
    //     var y = element.payload.toJSON();
    //     y["key"] = element.key;

    //     this.productInfos.push(y as InvoiceDetails);
    //   })
     
    //   this.productInfos.unshift({ key: '', CustomerName: '', Product: '',quantity:0,date:'',totalPrice:0,paidPrice:0});
    //   this.dataSource=new MatTableDataSource(this.productInfos);
     
    // })
  }
  Refresh(){
    this.refresList();
  }
  payment(elm){
   
    this.router.navigate(['/inventory/purchase-payment/',elm.key]);
  
  }
  moneyRecit(mobile){
    
     this.router.navigate(['/inventory/money-recit-purchase/',mobile]);
   
   }
   moneyRecitv2(mobile,invoiceNo){
    
    this.router.navigate(['/inventory/money-recit-puchase-v2/',mobile,invoiceNo]);
  
  }
  save(element){
 
    this.purchaseInvoiceDetailsService.addpurchaseInvDtlsInfo(element).then(data=>{
    
      this.toastrService.saveMessage()
      this.refresList();
    },(err) => {  this.toastrService.saveMessage()})

  }

  edit(element){
    
    this.purchaseInvoiceDetailsService.updatepurchaseInvDtlsInfo(element.key,element).then(data=>{
      
      this.toastrService.updateMessage()
      this.refresList();
    },(err) => {  this.toastrService.errorMessage()})
  }

  delete(element){
    
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
               .afterClosed().subscribe(res=>{
                if(res){
                  this.purchaseInvoiceDetailsService.deletepurchaseInvDtlsInfo(element.key).then(res=>{
                    this.refresList();
                    this.toastrService.deleteMessage()
                  },(err) => {  this.toastrService.errorMessage()});
                }
               })
  }

  refreshDataSource(searchData){
    this.dataSource = new MatTableDataSource(searchData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  search(invoicDetailArry,searchIndex) {
    let emptyValue,invoiceNo,memoNo,clienName,mobile,totalAmount,PaidAmount,DueAmount;
    [emptyValue,invoiceNo,memoNo,clienName,mobile,totalAmount,PaidAmount,DueAmount]=invoicDetailArry;
    let result= this.dataSharingService.invoiceSearchByMultiColumn(this.productInfos,
      invoiceNo,
      undefined,
      clienName,totalAmount,PaidAmount,DueAmount,undefined,mobile,memoNo)
    this.refreshDataSource(result)
    }
    clearFilters() {
      this.refresList();
       this.filtersModel = [];
       this.filterKeys = {};
      }
  refresList(){
    
   this.subscription= this.purchaseInvoiceDetailsService.getAllpurchaseInvDtlsInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      this.totalAmount=0;
      this.totalPaidAmount=0;
      this.totalDueAmount=0;
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
        
    if( y['DueAmount']>0){
      this.totalAmount+=y['totalAmount'];
      this.totalPaidAmount+=y['PaidAmount'];
      this.totalDueAmount+=y['DueAmount'];
      this.productInfos.push(y);
    }
     
     
      })
    

// var result = [];
// this.productInfos.reduce(function(res, value) {
//    if (!res[value.mobile]) {
//      res[value.mobile] = {entryDate:value.entryDate,clienName:value.clienName,mobile:value.mobile, tAmount:0, PAmount: 0, DAmount:0};
//      result.push(res[value.mobile])
//    }
//    res[value.mobile].tAmount +=value.totalAmount;
//    res[value.mobile].PAmount +=parseInt(value.PaidAmount) ;
//    res[value.mobile].DAmount +=value.DueAmount;
//    return res;
//  }, {});

      this.dataSource=new MatTableDataSource(this.productInfos);
     
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      
    })
   
  }

  printInvoice(element){
    
    this.router.navigate(['/inventory/Invoice-print/',element.key]);
  }

}
