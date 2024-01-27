import { Component, OnInit, ViewChild } from '@angular/core';
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
import { DataSharingService } from '../../E-commerce/data-sharing.service';
 
import { PurchaseInvoiceDetailsService } from '../purchase-invoice-details.service';
import { DropdownValuesService } from '../../../@core/mock/marchandizer/dropdown-values.service';
 
@Component({
  selector: 'ngx-purchase-summary',
  templateUrl: './purchase-summary.component.html',
  styleUrls: ['./purchase-summary.component.scss']
})
export class PurchaseSummaryComponent implements OnInit {
  entryDate:string='';
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['key','memoNo','entryDate', 'clienName','totalAmount','PaidAmount','DueAmount','SpecialDiscount'];
  columns = [
    {field:"filter"},
    {field:"entryDate",header:"Date"},
    {field:"clienName",header:"Client Name"},
    {field:"totalAmount",header:"Total Amount"},
    {field:"PaidAmount",header:"Paid Amount"},
    {field:"DueAmount",header:"Due Amount"},
    {field:"SpecialDiscount",header:"Special Discount"}
    
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };
  
  productInfos:any[]=[];
  Tostr=new Tostr();
  subscription:Subscription;
  srsObj={entryDate:'',MonthId:0,entryBy:''}
  userInfos: any[];
  totalSales=0;
  totalEarn=0;
  totalDue=0;
  totalDiscount=0;

  constructor(  
    public purchaseInvoiceDetailsService:PurchaseInvoiceDetailsService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private dateResizerService: DateResizerService,
     private dropdownValuesService: DropdownValuesService,
     private router:Router,
     private monthService:MonthsService,
     public myShopEmpService:MyShopEmpService,
     public languageService:LanguageConverterService,
     public dataSharingService:DataSharingService,
     ) { }

  ngOnInit() {
    this.entryDate=this.dateResizerService.resize(new Date());
  this.dropdownValuesService.getDateRange();
 
//   this.subscription= this.myShopEmpService.getAllMyEmpProfileInfo().snapshotChanges().subscribe(item=>{
//     this.userInfos=[];
//     item.forEach(element => {
//       var y = element.payload.toJSON();

//       y["key"] = element.key;
   
//     this.userInfos.push(y);
    
//     });
   
// }); 
this.refresList();

  }
  onChangeDateRange(){
    this.dropdownValuesService.getDateRange();
    this.refresList();
 }

 applyFilter( ) {
   this.refresList();
 }
  

  AddNewInpurRow(){
    this.router.navigate(['/inventory/Invoice-entry']);
  }

 
 
  refreshDataSource(searchData){
    this.dataSource = new MatTableDataSource(searchData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  search(purchaseSummarySearchArry,searchIndex) {
    let emptyValue,entryDate,clienName,totalAmount,PaidAmount,DueAmount;
     [emptyValue,entryDate,clienName,totalAmount,PaidAmount,DueAmount]=purchaseSummarySearchArry;
    let result= this.dataSharingService.invoiceSearchByMultiColumn(
      this.productInfos,
      undefined,
      entryDate,
      clienName,
      totalAmount,
      PaidAmount,
      DueAmount,
      undefined)
    this.refreshDataSource(result)
   }
 
   refresList() {
    const fromDate = this.dropdownValuesService.fromDate;
    const toDate = this.dropdownValuesService.toDate;
  
    this.subscription = this.purchaseInvoiceDetailsService.getInvoiceByDateRangeWithSnap(fromDate, toDate)
      .subscribe(item => {
        this.productInfos = [];
        let totalSales = 0;
        let totalEarn = 0;
        let totalDue = 0;
        let totalDiscount = 0;
  
        item.forEach(element => {
          const y:any = element.payload.val();
          y["key"] = element.key;
          y["entryDate"] = new Date(y["entryDate"]).toDateString();
          this.productInfos.push(y);
  
          totalSales += y.totalAmount;
          totalEarn += parseFloat(y.PaidAmount);
          totalDue += y.DueAmount;
          totalDiscount += y.totalAddiDiscnt;
        });
  
        this.dataSource = new MatTableDataSource( this.productInfos.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
  
        if ( this.productInfos.length === 0) {
          this.toastrService.openSnackBarWarning('No Record Found!', 'ok');
        }
  
        this.totalSales = totalSales;
        this.totalEarn = totalEarn;
        this.totalDue = totalDue;
        this.totalDiscount = totalDiscount;
      });
  }
  
  clearFilters() {
    this.refresList();
     this.filtersModel = [];
     this.filterKeys = {};
    }
  printInvoice(element){
  
    this.router.navigate(['/inventory/purchase-print-v3/',element.key]);
  }

}
