import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { Tostr } from '../../../@core/data/tostr.model';
import { DateResizerService } from '../../../@core/mock/marchandizer/date-resizer.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { MyShopEmpService } from '../../../@core/mock/marchandizer/my-shop-emp.service';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';
import { MonthsService } from '../../../@core/mock/months.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
 
import { PurchaseInvoiceDetailsService } from '../../Perchase/purchase-invoice-details.service';
import { SalesReturnService } from '../../Sales/sales-return.service';
import { DropdownValuesService } from '../../../@core/mock/marchandizer/dropdown-values.service';

@Component({
  selector: 'ngx-sales-return-report',
  templateUrl: './sales-return-report.component.html',
  styleUrls: ['./sales-return-report.component.scss']
})
export class SalesReturnReportComponent implements OnInit,OnDestroy {

  entryDate:string='';
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['key','memoNo','entryDate', 'clienName','totalAmount','PaidAmount','DueAmount','SpecialDiscount'];
  productInfos:any[]=[];
  Tostr=new Tostr();
  subscription:Subscription;
  srsObj={entryDate:'',entryDates:'',MonthId:0,entryBy:''}
  userInfos: any[];
  totalSales=0;
  totalEarn=0;
  totalDue=0;
  totalDiscount=0;

  constructor(  
    public salesReturnService:SalesReturnService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private dateResizerService: DateResizerService,
     private router:Router,
     private dropdownValuesService:DropdownValuesService,
     private monthService:MonthsService,
     public myShopEmpService:MyShopEmpService,
     public languageService:LanguageConverterService
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
    
     refresList(){
       this.subscription= this.salesReturnService.getSalesReturnByDateRangeWithSnapShot(
         this.dropdownValuesService.fromDate,this.dropdownValuesService.toDate
       ).subscribe(items=>{
         this.totalSales=0;
         this.totalEarn=0;
         this.totalDue=0;
         this.totalDiscount=0;
         this.productInfos=[];
         this.dataSource=new MatTableDataSource(items.map(item => {
           const y:any = item.payload.val();
           y["key"] = item.key;
           this.totalSales +=y.totalAmount;
           this.totalEarn +=parseFloat(y.PaidAmount);
           this.totalDue +=y.DueAmount;
           this.totalDiscount +=y.totalAddiDiscnt;
         //  y['entryDate']=new Date( y['entryDate']).toDateString();
           return y;
         }).reverse());
   
         this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
         this.productInfos=this.dataSource.data;
       })  
        
     }
   
 
  // refresList(){
  //   this.subscription= this.salesReturnService.getAllSalesReturn().snapshotChanges().subscribe(item=>{
  //     this.productInfos=[];
  //     item.forEach(element => {
  //       var y = element.payload.toJSON();
  //       y["key"] = element.key;
        
     
  //     this.productInfos.push(y);
  //     })
   
  //     let filteredProducts = (this.entryDate) ?
  //     this.productInfos.filter(p => p.entryDate.toLowerCase()==
  //     this.entryDate.toLowerCase()) :
  //      this.productInfos;      
       
       
    
  //     this.dataSource=new MatTableDataSource(filteredProducts);
  //     this.totalSales=0;
  //     this.totalEarn=0;
  //     this.totalDue=0;
  //     this.totalDiscount=0;
  //     filteredProducts.forEach(element => {
  //       this.totalSales +=element.totalAmount;
  //       this.totalEarn +=parseFloat(element.PaidAmount);
  //       this.totalDue +=element.DueAmount;
  //       this.totalDiscount +=element.totalAddiDiscnt;
  //   });
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;

  //     if(filteredProducts.length==0){
  //     //  this.Tostr.showToast('danger',"", "No Sell's Found !", "",this.toastrService);
  //     }
  //   })  
     
  // }

  printInvoice(element){
  
    this.router.navigate(['/inventory/sales-return-print-v3/',element.key]);
  }
 
}
 
