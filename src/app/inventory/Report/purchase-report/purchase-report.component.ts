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
import { DropdownValuesService } from '../../../@core/mock/marchandizer/dropdown-values.service';
 

@Component({
  selector: 'ngx-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.scss']
})
export class PurchaseReportComponent implements OnInit ,OnDestroy{
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
    public invoiceDetailsService:PurchaseInvoiceDetailsService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private dateResizerService: DateResizerService,
     private dropdownValuesService: DropdownValuesService,
     private router:Router,
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
    this.subscription= this.invoiceDetailsService.getInvoiceByDateRangeWithSnap(
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

  printInvoice(element){
  
    this.router.navigate(['/inventory/purchase-print-v3/',element.key]);
  }
 
}
