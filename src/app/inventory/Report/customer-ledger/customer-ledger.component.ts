import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { Tostr } from '../../../@core/data/tostr.model';
import { InvoiceDetailsService } from '../../../@core/mock/marchandizer/invoice-details.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
 
@Component({
  selector: 'ngx-customer-ledger',
  templateUrl: './customer-ledger.component.html',
  styleUrls: ['./customer-ledger.component.scss']
})
export class CustomerLedgerComponent implements OnInit {
  mobileNo:string='';
  entryDate:string='';
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['Action', 'memoNo','clienName','mobile','totalAmount','PaidAmount','DueAmount'];
  productInfos:any[]=[];
  Tostr=new Tostr();
  subscription:Subscription;
  constructor(public invoiceDetailsService:InvoiceDetailsService,
    private toastrService:ToasterService,
    private mathdialogService: MatDialogService,
    private router:Router,
    public languageService:LanguageConverterService
    ) { }

  ngOnInit() {
  this.refresList();
  }

  applyFilter(filterValue: string) {
 
      this.subscription= this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
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
    // this.subscription=   this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
    //   item.forEach(element => {
    //     var y = element.payload.toJSON();
    //     y["key"] = element.key;

    //     this.productInfos.push(y as InvoiceDetails);
    //   })
    
    //   this.productInfos.unshift({ key: '', CustomerName: '', Product: '',quantity:0,date:'',totalPrice:0,paidPrice:0});
    //   this.dataSource=new MatTableDataSource(this.productInfos);
    //   console.log(this.productInfos);
    // })
  }
  Refresh(){
    this.refresList();
  }
  payment(elm){
   
    this.router.navigate(['/inventory/payment/',elm.key]);
  
  }
  moneyRecitHistry(mobile){

    this.router.navigate(['/inventory/money-recit/',mobile]);
  
  }
  moneyRecitHistry2(mobile){

    this.router.navigate(['/inventory/money-recit-display-v2/',mobile]);
  
  }
  moneyRecitByInvoice(invoiceNo){

    this.router.navigate(['/inventory/money-recit-by-invoice/',invoiceNo]);
  
  }
  moneyRecitByInvoice2(invoiceNo){

    this.router.navigate(['/inventory/money-recit-invoice-v2/',invoiceNo]);
  
  }
  save(element){

    this.invoiceDetailsService.addProductInfo(element).then(data=>{
    
      this.toastrService.saveMessage()
      this.refresList();
    },(err) => {  this.toastrService.saveMessage()})

  }

  edit(element){
    
    this.invoiceDetailsService.updateProductInfo(element.key,element).then(data=>{
      
      this.toastrService.updateMessage()
      this.refresList();
    },(err) => {  this.toastrService.errorMessage()})
  }

  delete(element){
    
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
              .afterClosed().subscribe(res=>{
                if(res){
                  this.invoiceDetailsService.deleteProductInfo(element.key).then(res=>{
                    this.refresList();
                    this.toastrService.deleteMessage()
                  },(err) => {this.toastrService.deleteMessage()});
                }
              })
  }


  refresList(){
    
  this.subscription= this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
        
    
      this.productInfos.push(y);
    
      })
      
this.productInfos.reverse();
      this.dataSource=new MatTableDataSource(this.productInfos);
    
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      
    })
  
  }

  printInvoice(element){
    
    this.router.navigate(['/inventory/Invoice-print/',element.key]);
  }

}

