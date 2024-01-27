import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

import { Subscription } from 'rxjs';

import { NbToastrService } from '@nebular/theme';
 
import { Router } from '@angular/router';
 
import { PurchaseReturnService } from '../../Perchase/purchase-return.service';
import { Tostr } from '../../../@core/data/tostr.model';
import { MyShopEmpService } from '../../../@core/mock/marchandizer/my-shop-emp.service';
import { DateResizerService } from '../../../@core/mock/marchandizer/date-resizer.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';
import { MonthsService } from '../../../@core/mock/months.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
import { DropdownValuesService } from '../../../@core/mock/marchandizer/dropdown-values.service';
 
@Component({
  selector: 'ngx-purchase-return-report',
  templateUrl: './purchase-return-report.component.html',
  styleUrls: ['./purchase-return-report.component.scss']
})
export class PurchaseReturnReportComponent implements OnInit,OnDestroy {
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
  totalProfit=0;
  constructor(public purchaseReturnService:PurchaseReturnService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private dateResizerService: DateResizerService,
     private router:Router,
     private monthService:MonthsService,
     private dropdownValuesService:DropdownValuesService,
     public myShopEmpService:MyShopEmpService,
     public languageService:LanguageConverterService,
     ) { }

     ngOnDestroy(): void {
      this.subscription.unsubscribe();
     }
    ngOnInit() {
     this.dropdownValuesService.getDateRange();
     this.refresList();
    }
    onChangeDateRange(){
     this.dropdownValuesService.getDateRange();
     this.refresList();
    }
   applyFilter(){
         this.refresList();
     }
  
 
 
  AddNewInpurRow(){

    this.router.navigate(['/inventory/Invoice-entry']);
     
  }
   
  refresList(){
    this.subscription= this.purchaseReturnService.getPurchaseReturnByDateRangeWithSnapShot(
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
  //   this.subscription= this.purchaseReturnService.getAllPurchaseReturn().snapshotChanges().subscribe(item=>{
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
        
       
      
  //      filteredProducts.reverse();
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
    
    this.router.navigate(['/inventory/purchase-return-print-v3/',element.key]);
  }
   

}
