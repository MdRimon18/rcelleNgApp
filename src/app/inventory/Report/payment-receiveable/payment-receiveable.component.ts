import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { Tostr } from '../../../@core/data/tostr.model';
import { InvoiceDetailsService } from '../../../@core/mock/marchandizer/invoice-details.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
import { DataSharingService } from '../../E-commerce/data-sharing.service';
 
@Component({
  selector: 'ngx-payment-receiveable',
  templateUrl: './payment-receiveable.component.html',
  styleUrls: ['./payment-receiveable.component.scss']
})
export class PaymentReceiveableComponent implements OnInit,OnDestroy {
  mobileNo:string='';
  entryDate:string='';
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = [ 'memoNo','clienName','mobile','totalAmount','PaidAmount','DueAmount','Recit'];
 columns = [
    {field:"filter"},
    {field:"invoiceNo",header:`${this.languageService.SalesReturnInfo.invoiceNo}`},
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
 
      public totalAmount = 0;
      public totalPaidAmount = 0;
      public totalDueAmount = 0;
      public productInfos: any[] = [];
    Tostr=new Tostr();
     subscription:Subscription;

 
  constructor(public invoiceDetailsService:InvoiceDetailsService,
    private toastrService:ToasterService,
    private mathdialogService: MatDialogService,
    private router:Router,
    public languageService:LanguageConverterService,
    public dataSharingService:DataSharingService,
    ) { }

  ngOnInit() {
  this.loadInvoiceData();
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
    this.loadInvoiceData();
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
      this.loadInvoiceData();
    },(err) => { this.toastrService.errorMessage()})

  }

  edit(element){
    
    this.invoiceDetailsService.updateProductInfo(element.key,element).then(data=>{
      
      this.toastrService.updateMessage()
      this.loadInvoiceData();
    },(err) => { this.toastrService.errorMessage()})
  }

  delete(element){
    
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
              .afterClosed().subscribe(res=>{
                if(res){
                  this.invoiceDetailsService.deleteProductInfo(element.key).then(res=>{
                    this.loadInvoiceData();
                    this.toastrService.deleteMessage()
                  },(err) => { this.toastrService.errorMessage()});
                }
              })
  }

  private loadInvoiceData() {
    this.subscription = this.invoiceDetailsService
      .getAllGreaterThanZeroDueAmount()
      .snapshotChanges()
      .subscribe((snapshot) => {
        this.dataSource=new MatTableDataSource(snapshot.map((element) => {
          const y = element.payload.val();
          y['key'] = element.key;
          return y;
        }).reverse());
        this.productInfos=this.dataSource.data;
        this.calculateTotalAmounts();
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       
      });
  }

  private calculateTotalAmounts() {
    this.totalAmount = Math.floor(
      this.productInfos.reduce((acc, curr) => acc + curr.totalAmount, 0)
    );
    this.totalPaidAmount = Math.floor(
      this.productInfos.reduce((acc, curr) => acc + curr.PaidAmount, 0)
    );
    this.totalDueAmount = Math.floor(
      this.productInfos.reduce((acc, curr) => acc + curr.DueAmount, 0)
    );
  }
  
  // loadInvoiceData(){
    
  // this.subscription= this.invoiceDetailsService.getAllGreaterThanZeroDueAmount().snapshotChanges().subscribe(item=>{
  //     this.productInfos=[];
  //     this.totalAmount=0;
  //     this.totalPaidAmount=0;
  //     this.totalDueAmount=0;
  //     item.forEach(element => {
  //       var y = element.payload.val();
  //       y["key"] = element.key;
  //       this.totalAmount+=y['totalAmount'];
  //       this.totalPaidAmount+=y['PaidAmount'];
  //       this.totalDueAmount+=y['DueAmount'];
  //         this.productInfos.push(y);
  //     })

  //     this.totalAmount = Math.floor(this.totalAmount);
  //     this.totalPaidAmount = Math.floor(this.totalPaidAmount);
  //     this.totalDueAmount = Math.floor(this.totalDueAmount);
  //    // console.log(this.productInfos);
  //       this.productInfos.reverse();
  //     this.dataSource=new MatTableDataSource(this.productInfos);
    
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;

      
  //   })
  
  // }
  refreshDataSource(searchData){
    this.dataSource = new MatTableDataSource(searchData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  search(invoicDetailArry,searchIndex) {
    let emptyValue,invoiceNo,clienName,mobile,totalAmount,PaidAmount,DueAmount;
    [emptyValue,invoiceNo,clienName,mobile,totalAmount,PaidAmount,DueAmount]=invoicDetailArry;
    let result= this.dataSharingService.invoiceSearchByMultiColumn(this.productInfos,
      invoiceNo,
      undefined,
      clienName,totalAmount,PaidAmount,DueAmount,undefined,mobile)
    this.refreshDataSource(result)
    }
    clearFilters() {
      this.loadInvoiceData();
       this.filtersModel = [];
       this.filterKeys = {};
      }
  printInvoice(element){
    
    this.router.navigate(['/inventory/Invoice-print/',element.key]);
  }

}
