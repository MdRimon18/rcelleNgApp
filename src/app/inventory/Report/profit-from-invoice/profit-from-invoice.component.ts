import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

import { Subscription } from 'rxjs';

import { NbToastrService } from '@nebular/theme';
 
import { Router } from '@angular/router';
import { Tostr } from '../../../@core/data/tostr.model';
import { DateResizerService } from '../../../@core/mock/marchandizer/date-resizer.service';
import { InvoiceDetailsService } from '../../../@core/mock/marchandizer/invoice-details.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { MyShopEmpService } from '../../../@core/mock/marchandizer/my-shop-emp.service';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';
import { MonthsService } from '../../../@core/mock/months.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
import { DropdownValuesService } from '../../../@core/mock/marchandizer/dropdown-values.service';
 
 

@Component({
  selector: 'ngx-profit-from-invoice',
  templateUrl: './profit-from-invoice.component.html',
  styleUrls: ['./profit-from-invoice.component.scss']
})
export class ProfitFromInvoiceComponent implements OnInit,OnDestroy {
  entryDate:string='';
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
  profitFromInvoice=0;

  constructor(public invoiceDetailsService:InvoiceDetailsService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private dateResizerService: DateResizerService,
     public dropdownValuesService: DropdownValuesService,
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
    this.entryDate=this.dateResizerService.resize(new Date());
  this.refresList();
//   this.subscription= this.myShopEmpService.getAllMyEmpProfileInfo().snapshotChanges().subscribe(item=>{
//     this.userInfos=[];
//     item.forEach(element => {
//       var y = element.payload.toJSON();

//       y["key"] = element.key;
   
//     this.userInfos.push(y);
    
//     });
   
// }); 

  }


  onChangeDateRange(){
     this.dropdownValuesService.getDateRange();
     this.refresList();
  }

  applyFilter( ) {
    this.refresList();
  }
  RedirectToReport(){
    this.router.navigate(['/inventory/daily-report/',this.dropdownValuesService.fromDate,this.dropdownValuesService.toDate]);
  }
 
 
  AddNewInpurRow(){

    this.router.navigate(['/inventory/Invoice-entry']);
   
  }
 
  
  refresList(){ 

  this.subscription=this.invoiceDetailsService.getInvoiceByDateRangeWithSnapShot(this.dropdownValuesService.fromDate,this.dropdownValuesService.toDate).subscribe(items=>{
      //console.log(items)
      this.totalSales=0;
      this.totalEarn=0;
      this.totalDue=0;
      this.totalDiscount=0;
      let totalProfit=0;
      let TotalSubTotal=0;
      this.profitFromInvoice=0;

      this.dataSource=new MatTableDataSource(items.map((item:any)=> {
        const y :any= item.payload.val();
        y["key"] = item.key;
        y['entryDate']=new Date( y['entryDate']).toDateString();
        this.totalSales +=y.SubTotal;
        this.totalEarn +=parseFloat(y.PaidAmount);
        this.totalDue +=y.DueAmount;
        this.totalDiscount +=y.totalAddiDiscnt;
        TotalSubTotal+=y.SubTotal;
        totalProfit+=y.totalProfit;
        return y;
      }).reverse());

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    this.totalSales = Math.floor(this.totalSales);
    this.totalEarn = Math.floor(this.totalEarn);
    this.totalDue = Math.floor(this.totalDue);
   
    this.totalDiscount = Math.floor(this.totalDiscount);
    this.profitFromInvoice=(totalProfit-this.totalDiscount); 
    this.profitFromInvoice = Math.floor(this.profitFromInvoice);

    if(this.dataSource.data.length==0){
      this.toastrService.openSnackBarWarning(`No Sell's Found !`,'Ok')
     
    }
    });  

     
     
  }

  printInvoice(element){
   
    this.router.navigate(['/inventory/Invoice-print/',element.key]);
  }
//    getDaysArray(start, end) {
   
//     for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
//         arr.push(new Date(dt));
//     }
    
//    return arr;
// };

}
