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
import { PurchaseReturnService } from '../../Perchase/purchase-return.service';
import { DropdownValuesService } from '../../../@core/mock/marchandizer/dropdown-values.service';

@Component({
  selector: 'ngx-savings-with-purchase-return',
  templateUrl: './savings-with-purchase-return.component.html',
  styleUrls: ['./savings-with-purchase-return.component.scss']
})
export class SavingsWithPurchaseReturnComponent implements OnInit,OnDestroy {
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

  prtotalSales=0;
  prtotalEarn=0;
  prtotalDue=0;
  prtotalDiscount=0;
  purchaseReturnInfo: any[]=[];
  profitFromInvoice: number=0;
  savingsAmount: number=0;

  constructor(  
    public purchaseReturnService:PurchaseReturnService,
    public invoiceDetailsService:PurchaseInvoiceDetailsService,
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

  applyFilter( ) {
    var daylist = this.getDaysArray(new Date(this.srsObj.entryDate),new Date(this.srsObj.entryDates));
    this.subscription= this.invoiceDetailsService.getAllpurchaseInvDtlsInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
       
        
      this.productInfos.push(y);
      })
      let finalFilterValues=[];
      if(this.srsObj.entryDate!=''&&this.srsObj.entryDates!='')
      {

        daylist.forEach(element => {
          
          let entryDate=this.formatDate(element);
          let tempArray=[];
          
          tempArray=
          this.productInfos.filter(p => p.entryDate.toLowerCase()==
          entryDate.toLowerCase());
          finalFilterValues.push(...tempArray);
        });
      }
      
     
      this.totalSales=0;
      this.totalEarn=0;
      this.totalDue=0;
      this.totalDiscount=0;
      let totalProfit=0;
      finalFilterValues.forEach(element => {
        this.totalSales +=element.SubTotal;
      //  totalProfit +=element.totalProfit;
        this.totalEarn +=parseFloat(element.PaidAmount);
        this.totalDue +=element.DueAmount;
        this.totalDiscount +=element.totalAddiDiscnt;
    });
    // console.log(this.totalSales)
    // console.log(this.totalEarn)
    // console.log(this.totalDue)
    // console.log(this.totalDiscount)
   // this.profitFromInvoice=totalProfit-this.totalDiscount; 
    var daylist2 = this.getDaysArray(new Date(this.srsObj.entryDate),new Date(this.srsObj.entryDates));
    this.subscription= this.purchaseReturnService.getAllPurchaseReturn().snapshotChanges().subscribe(item=>{
      this.purchaseReturnInfo=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
       
        
        this.purchaseReturnInfo.push(y);
      })
      let finalFilterValues2=[];
      if(this.srsObj.entryDate!=''&&this.srsObj.entryDates!='')
      {

        daylist2.forEach(element => {
          
          let entryDate=this.formatDate(element);
          let tempArray2=[];
          
          tempArray2=
          this.purchaseReturnInfo.filter(p => p.entryDate.toLowerCase()==
          entryDate.toLowerCase());
          finalFilterValues2.push(...tempArray2);
        });
      }
      
     
      this.prtotalSales=0;
      this.prtotalEarn=0;
      this.prtotalDue=0;
      this.prtotalDiscount=0;
      let prOrginalAmount=0;
      let prtotalProfit=0;
      let prtotalAmount=0;
      finalFilterValues2.forEach(element => {
       // prOrginalAmount+=element.OriginalAmount;
      //  prtotalAmount+=element.totalDiscount;
     //   prtotalProfit+=element.totalProfit;
        this.prtotalSales +=element.SubTotal;
        this.prtotalEarn +=parseFloat(element.PaidAmount);
        this.prtotalDue +=element.DueAmount;
        this.prtotalDiscount +=element.totalAddiDiscnt;
    });
     
     
   // let discountProfit=(prOrginalAmount-prtotalAmount);
   // let supposeProfit=(prtotalProfit-this.prtotalDiscount);
  //this.savingsAmount=(this.profitFromInvoice+discountProfit)-supposeProfit;
    this.totalSales=this.totalSales-this.prtotalSales
    this.totalEarn=this.totalEarn-this.prtotalEarn
    this.totalDue=this.totalDue-this.prtotalDue
    this.totalDiscount=this.totalDiscount-this.prtotalDiscount
      
    })
      
    })
  }
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
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
     
    // })
  }

  save(element){
    
    this.invoiceDetailsService.addpurchaseInvDtlsInfo(element).then(data=>{
     
      this.toastrService.saveMessage()
      this.refresList();
    },(err) => {this.toastrService.errorMessage()})

  }

  edit(element){
    
    this.invoiceDetailsService.updatepurchaseInvDtlsInfo(element.key,element).then(data=>{
    
      this.toastrService.updateMessage()
      this.refresList();
    },(err) => { this.toastrService.errorMessage()})
  }

  delete(element){
    
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
               .afterClosed().subscribe(res=>{
                if(res){
                  this.invoiceDetailsService.deletepurchaseInvDtlsInfo(element.key).then(res=>{
                    this.refresList();
                    this.toastrService.deleteMessage()
                  },(err) => { this.toastrService.errorMessage()});
                }
               })
  }
  refresList(){
    this.subscription= this.invoiceDetailsService.getAllpurchaseInvDtlsInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
        
     
      this.productInfos.push(y);
      })
   
      let filteredProducts = (this.entryDate) ?
      this.productInfos.filter(p => p.entryDate.toLowerCase()==
      this.entryDate.toLowerCase()) :
       this.productInfos;      
       
       
    
      this.dataSource=new MatTableDataSource(filteredProducts);
      this.totalSales=0;
      this.totalEarn=0;
      this.totalDue=0;
      this.totalDiscount=0;
      filteredProducts.forEach(element => {
        this.totalSales +=element.totalAmount;
        this.totalEarn +=parseFloat(element.PaidAmount);
        this.totalDue +=element.DueAmount;
        this.totalDiscount +=element.totalAddiDiscnt;
    });
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      if(filteredProducts.length==0){
      //  this.Tostr.showToast('danger',"", "No Sell's Found !", "",this.toastrService);
      }
    })  
     
  }

  printInvoice(element){
  
    this.router.navigate(['/inventory/purchase-print-v3/',element.key]);
  }
  getDaysArray(start, end) {
   
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    
   return arr;
};
}
