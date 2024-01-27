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
import { PurchaseInvoiceDetailsService } from '../../Perchase/purchase-invoice-details.service';
 
@Component({
  selector: 'ngx-supplier-ledger',
  templateUrl: './supplier-ledger.component.html',
  styleUrls: ['./supplier-ledger.component.scss']
})
export class SupplierLedgerComponent implements OnInit {
  mobileNo:string='';
  entryDate:string='';
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['Recit','InvoiceNo', 'memoNo','clienName','mobile','totalAmount','PaidAmount','DueAmount'];
  productInfos:any[]=[];
  Tostr=new Tostr();
  subscription:Subscription;
  constructor(public purchaseInvoiceDetailsService:PurchaseInvoiceDetailsService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private purchaseMoneyRecitService: PurchaseMoneyRecitService,
     private router:Router,
     public languageService:LanguageConverterService
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
    },(err) => { this.toastrService.errorMessage()})

  }

  edit(element){
    
    this.purchaseInvoiceDetailsService.updatepurchaseInvDtlsInfo(element.key,element).then(data=>{
      
      this.toastrService.updateMessage()
      this.refresList();
    },(err) => { this.toastrService.errorMessage()})
  }

  delete(element){
    
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
               .afterClosed().subscribe(res=>{
                if(res){
                  this.purchaseInvoiceDetailsService.deletepurchaseInvDtlsInfo(element.key).then(res=>{
                    this.refresList();
                    this.toastrService.deleteMessage()
                  },(err) => { this.toastrService.errorMessage()});
                }
               })
  }


  refresList(){
    
   this.subscription= this.purchaseInvoiceDetailsService.getAllpurchaseInvDtlsInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
        
     
      this.productInfos.push(y);
     
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
