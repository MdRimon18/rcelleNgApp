import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

import { Subscription } from 'rxjs';

import { NbToastrService } from '@nebular/theme';
 
import { Router } from '@angular/router';
import { Tostr } from '../../../@core/data/tostr.model';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';
import { DateResizerService } from '../../../@core/mock/marchandizer/date-resizer.service';
import { InvoiceDetailsService } from '../../../@core/mock/marchandizer/invoice-details.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { MyShopEmpService } from '../../../@core/mock/marchandizer/my-shop-emp.service';
import { MonthsService } from '../../../@core/mock/months.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
import { DropdownValuesService } from '../../../@core/mock/marchandizer/dropdown-values.service';
 
 

@Component({
  selector: 'ngx-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements  OnInit {
  //entryDate:string='';
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['key','entryDate', 'clienName','totalAmount','PaidAmount','DueAmount','SpecialDiscount'];
  productInfos:any[]=[];
  Tostr=new Tostr();
  subscription:Subscription;
  srsObj={entryDate:'',entryDates:'',MonthId:0,entryBy:''}
  userInfos: any[];
  totalSales=0;
  totalEarn=0;
  totalDue=0;
  totalDiscount=0;
  totalProfit=0;
 
  constructor(public invoiceDetailsService:InvoiceDetailsService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private dropdownValuesService: DropdownValuesService,
     private dateResizerService: DateResizerService,
     private router:Router,
     private monthService:MonthsService,
     public myShopEmpService:MyShopEmpService,
     public languageService:LanguageConverterService,
     ) { }

  ngOnInit() {
    this.dropdownValuesService.getDateRange();
  this.refresList();
  this.subscription= this.myShopEmpService.getAllMyEmpProfileInfo().snapshotChanges().subscribe(item=>{
    this.userInfos=[];
    item.forEach(element => {
      var y = element.payload.toJSON();

      y["key"] = element.key;
   
    this.userInfos.push(y);
    
    });
   
}); 

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
 
 
  refresList(){

    this.invoiceDetailsService.getInvoiceByDateRangeWithSnapShot(this.dropdownValuesService.fromDate,this.dropdownValuesService.toDate).subscribe(items=>{
      //console.log(items)
      this.dataSource=new MatTableDataSource(items.map(item => {
        const y = item.payload.val();
        y["key"] = item.key;
        y['entryDate']=new Date( y['entryDate']).toDateString();
        return y;
      }).reverse());

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
   //   console.log(this.dataSource.data)
      let finalFilterValues:any=this.dataSource.data;

       this.totalSales=0;
      this.totalEarn=0;
      this.totalDue=0;
      this.totalDiscount=0;
     
      let TotalSubTotal=0;
      this.totalProfit=0;

      finalFilterValues.forEach(element => {
        this.totalSales +=element.SubTotal;
        this.totalEarn +=parseFloat(element.PaidAmount);
        this.totalDue +=element.DueAmount;
        this.totalDiscount +=element.totalAddiDiscnt;
        TotalSubTotal+=element.SubTotal;
        this.totalProfit+=element.totalProfit;
    });
    

    this.totalSales = Math.floor(this.totalSales);
    this.totalEarn = Math.floor(this.totalEarn);
    this.totalDue = Math.floor(this.totalDue);
   
    this.totalDiscount = Math.floor(this.totalDiscount);

    this.totalProfit=(this.totalProfit-this.totalDiscount); 
    this.totalProfit = Math.floor(this.totalProfit);

    if(finalFilterValues.length==0){
      this.toastrService.openSnackBarWarning(`No Sell's Found !`,'Ok')
     
    }
    });  

  }
  printInvoice(element){
    
    this.router.navigate(['/inventory/invoice-print-v3/',element.key]);
  }
 

}
