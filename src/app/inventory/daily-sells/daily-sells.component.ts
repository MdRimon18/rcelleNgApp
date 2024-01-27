import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

import { Subscription } from 'rxjs';

import { NbToastrService } from '@nebular/theme';
import { Tostr } from '../../@core/data/tostr.model';
import { Router } from '@angular/router';
import { DateResizerService } from '../../@core/mock/marchandizer/date-resizer.service';
import { InvoiceDetailsService } from '../../@core/mock/marchandizer/invoice-details.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { MyShopEmpService } from '../../@core/mock/marchandizer/my-shop-emp.service';
import { MatDialogService } from '../../@core/mock/mat-dialog.service';
import { MonthsService } from '../../@core/mock/months.service';
import { ToasterService } from '../../@core/mock/toaster.service';
import { DataSharingService } from '../E-commerce/data-sharing.service';
   




@Component({
  selector: 'ngx-daily-sells',
  templateUrl: './daily-sells.component.html',
  styleUrls: ['./daily-sells.component.scss']
})
export class DailySellsComponent implements OnInit {
  entryDate:string='';  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
 
  columns = [
    {field:"filter"},
    {field:"entryDate",header:`${this.languageService.SalesReturnInfo.Date}`},
    {field:"clienName",header:`${this.languageService.SalesReturnInfo.ClientName}`},
    {field:"totalAmount",header:`${this.languageService.SalesReturnInfo.TotalAmount}`},
    {field:"PaidAmount",header:`${this.languageService.SalesReturnInfo.PaidAmount}`},
    {field:"DueAmount",header:`${this.languageService.SalesReturnInfo.DueAmount}`},
    {field:"SpecialDiscount",header:`${this.languageService.SalesReturnInfo.AdditionalDiscount}`}
    
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };
  
  invoicesInfos:any[]=[];
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
     private router:Router,
     private monthService:MonthsService,
     public myShopEmpService:MyShopEmpService,
     public languageService:LanguageConverterService,
     public dataSharingService:DataSharingService,
     ) { }

  ngOnInit() {
    this.entryDate=this.dateResizerService.resize(new Date());
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

  applyFilter( ) {
 
 
    this.subscription= this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.invoicesInfos=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
       //  const entrydate=new Date(y["entryDate"]);
       //  let month = entrydate.getMonth()+1;
       //  y['MonthId']=month;
        
      this.invoicesInfos.push(y);
      })
      let finalFilterValues=[];
     
      if(this.srsObj.entryDate!='')
      {
        finalFilterValues=
        this.invoicesInfos.filter(p => p.entryDate.toLowerCase()==
        this.srsObj.entryDate.toLowerCase());
      }
       

 
      
      this.dataSource=new MatTableDataSource(finalFilterValues);
      this.totalSales=0;
      this.totalEarn=0;
      this.totalDue=0;
      this.totalDiscount=0;
      let totalProfit=0;
      let TotalSubTotal=0;
      
      finalFilterValues.forEach(element => {
        this.totalSales +=element.SubTotal;
        this.totalEarn +=parseFloat(element.PaidAmount);
        this.totalDue +=element.DueAmount;
        this.totalDiscount +=element.totalAddiDiscnt;
        TotalSubTotal+=element.SubTotal;
        totalProfit+=element.totalProfit;

      });

    this.profitFromInvoice=(totalProfit-this.totalDiscount); 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      if(finalFilterValues.length==0){
      //  this.Tostr.showToast('danger',"", "No Sell's Found !", "",this.toastrService);
      }
    })
  }
  refreshDataSource(searchData){
    this.dataSource = new MatTableDataSource(searchData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  search(dailySellsSearchArry,searchIndex) {
    let emptyValue,entryDate,clienName,totalAmount,DueAmount;
     [emptyValue,entryDate,clienName,totalAmount,DueAmount]=dailySellsSearchArry;
    let result= this.dataSharingService.invoiceSearchByMultiColumnV2(
      this.invoicesInfos,
      undefined,
      entryDate,
      clienName,
      totalAmount,
      undefined,
      DueAmount,
      undefined);
      
    this.refreshDataSource(result)
    this.totalSales=0;
    this.totalEarn=0;
    this.totalDue=0;
    this.totalDiscount=0;
    let totalProfit=0;
    let TotalSubTotal=0;
    
    result.forEach(element => {
      this.totalSales +=element.SubTotal;
      this.totalEarn +=parseFloat(element.PaidAmount);
      this.totalDue +=element.DueAmount;
      this.totalDiscount +=element.totalAddiDiscnt;
      TotalSubTotal+=element.SubTotal;
      totalProfit+=element.totalProfit;
    });

    this.profitFromInvoice=(totalProfit-this.totalDiscount); 

     
   }
   clearFilters() {
    this.refresList();
     this.filtersModel = [];
     this.filterKeys = {};
    }
  AddNewInpurRow(){

    this.router.navigate(['/inventory/Invoice-entry']);
    // this.invoicesInfos=[];
    // this.subscription=   this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
    //   item.forEach(element => {
    //     var y = element.payload.toJSON();
    //     y["key"] = element.key;

    //     this.invoicesInfos.push(y as InvoiceDetails);
    //   })
     
    //   this.invoicesInfos.unshift({ key: '', CustomerName: '', Product: '',quantity:0,date:'',totalPrice:0,paidPrice:0});
    //   this.dataSource=new MatTableDataSource(this.invoicesInfos);
    //   console.log(this.invoicesInfos);
    // })
  }
// searchBymultplValues(entryDate:string,entryBy:string,result:[]){
//  finalFilterValues= (this.srsObj.entryDate&&this.srsObj.entryBy)?
//       this.invoicesInfos.filter(p => p.entryDate.toLowerCase()==
//       this.srsObj.entryDate.toLowerCase()&&p.entryBy.toLowerCase()==
//       this.srsObj.entryBy.toLowerCase()) :
//        this.invoicesInfos;  
// }
  save(element){
    
    this.invoiceDetailsService.addProductInfo(element).then(data=>{
       
    //  this.Tostr.showToast('primary',"", "Saved Successfully", "",this.toastrService);
      this.refresList();
    },(err) => { 
     // this.Tostr.showToast("danger","", err.statusText, "",this.toastrService);
    })

  }

  edit(element){
     
    this.invoiceDetailsService.updateProductInfo(element.key,element).then(data=>{
      
      //this.Tostr.showToast('primary',"", "Updated Successfully", "",this.toastrService);
      this.refresList();
    },(err) => { 
     // this.Tostr.showToast("danger","", err.statusText, "",this.toastrService);
    })
  }

  delete(element){
     
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
               .afterClosed().subscribe(res=>{
                if(res){
                  this.invoiceDetailsService.deleteProductInfo(element.key).then(res=>{
                    this.refresList();
               //     this.Tostr.showToast("primary","", "Deleleted", "Successfully",this.toastrService);
                  },(err) => {
                  //   this.Tostr.showToast("danger","", err.statusText, "",this.toastrService);
                    });
                }
               })
  }
  refresList(){
    this.subscription= this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
   //this.entryDate=this.dateResizerService.resize(new Date());
  
      this.invoicesInfos=[];
      let filterInvoice=[]
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
        this.invoicesInfos.push(y);
      
        if(y['entryDate'].toLowerCase()==this.entryDate.toLowerCase()){
          y["entryDate"]=new Date(y["entryDate"]).toDateString()
          filterInvoice.push(y);
        } 
       
      })
   
      // let filteredProducts = (this.entryDate) ?
      // this.invoicesInfos.filter(p => p.entryDate.toLowerCase()==
      // this.entryDate.toLowerCase()) :
      //  this.invoicesInfos; 
       
  
      // filteredProducts.map(m=>{
      //   m.entryDate=new Date(m.entryDate).toDateString()})
      
      filterInvoice.reverse();
      this.dataSource=new MatTableDataSource(filterInvoice);
      this.totalSales=0;
      this.totalEarn=0;
      this.totalDue=0;
      this.totalDiscount=0;
      let totalProfit=0;
      let TotalSubTotal=0;
      
      filterInvoice.forEach(element => {
        this.totalSales +=element.SubTotal;
        this.totalEarn +=parseFloat(element.PaidAmount);
        this.totalDue +=element.DueAmount;
        this.totalDiscount +=element.totalAddiDiscnt;
        TotalSubTotal+=element.SubTotal;
        totalProfit+=element.totalProfit;
      });

      this.profitFromInvoice=(totalProfit-this.totalDiscount); 

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      if(filterInvoice.length==0){
      //  this.Tostr.showToast('danger',"", "No Sell's Found !", "",this.toastrService);
      }
    })  
     
  }

  printInvoice(element){
   
    this.router.navigate(['/inventory/invoice-print-v2/',element.key]);
  }
   getDaysArray(start, end) {
   
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    
   return arr;
};
RedirectToReport(){
  this.router.navigate(['/inventory/daily-report/',this.entryDate,'']);
}
}
