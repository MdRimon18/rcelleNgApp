 
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
 
import { Subscription } from 'rxjs';
 
import { NbToastrService } from '@nebular/theme';
 
import { Router } from '@angular/router';
 
import { InvoiceDetailsService } from '../../@core/mock/marchandizer/invoice-details.service';
import { MatDialogService } from '../../@core/mock/mat-dialog.service';
import { DateResizerService } from '../../@core/mock/marchandizer/date-resizer.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { ToasterService } from '../../@core/mock/toaster.service';
import { DataSharingService } from '../E-commerce/data-sharing.service';
 
 

@Component({
  selector: 'ngx-daily-income',
  templateUrl: './daily-income.component.html',
  styleUrls: ['./daily-income.component.scss']
})
export class DailyIncomeComponent implements OnInit {
  entryDate:string='';
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['key','entryDate', 
  'clienName','totalAmount','PaidAmount',
  'DueAmount','Profit'];

  columns = [
    {field:"filter"},
    {field:"invoiceNo",header:`${this.languageService.SalesReturnInfo.invoiceNo}`},
    {field:"entryDate",header:`${this.languageService.SalesReturnInfo.Date}`},
    {field:"clienName",header:`${this.languageService.SalesReturnInfo.ClientName}`},
    {field:"totalAmount",header:`${this.languageService.SalesReturnInfo.TotalAmount}`},
    {field:"PaidAmount",header:`${this.languageService.SalesReturnInfo.PaidAmount}`},
    {field:"DueAmount",header:`${this.languageService.SalesReturnInfo.DueAmount}`},
    {field:"Profit",header:`${this.languageService.SalesReturnInfo.profit}`}
    
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };
  productInfos:any[]=[];
 
  subscription:Subscription;
  TotalEarning=0;
  totalDiscount=0;
  profitFromInvoice=0;
  constructor(public invoiceDetailsService:InvoiceDetailsService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private dateResizerService: DateResizerService,
     private router:Router,
     public languageService:LanguageConverterService,
     public dataSharingService:DataSharingService,
     ) { }

  ngOnInit() {
    this.entryDate=this.dateResizerService.resize(new Date());
   // this.entryDate='2023-03-03';
    
  this.refresList();
  }
  refreshDataSource(searchData){
    this.dataSource = new MatTableDataSource(searchData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  search(dailyIncomeSearchArry,searchIndex) {
    let emptyValue,invoiceNo,entryDate,clienName,totalAmount,PaidAmount,DueAmount,Profit;
     [emptyValue,invoiceNo,entryDate,clienName,totalAmount,PaidAmount,DueAmount,Profit]=dailyIncomeSearchArry;
    let result= this.dataSharingService.invoiceSearchByMultiColumnV2(this.productInfos,
      invoiceNo,
      entryDate,
      clienName,totalAmount,PaidAmount,DueAmount,Profit)
   
      this.refreshDataSource(result)
    let totalProfit=0;
    let TotalSubTotal=0;
    this.TotalEarning=0;
    this.profitFromInvoice=0;
    this.totalDiscount=0;
    result.forEach(element => {
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
  applyFilter() {
    this.subscription= this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
        
     
      this.productInfos.push(y);
      })
    
      let filteredProducts =
      this.productInfos.filter(p => p.entryDate.toLowerCase()==
      this.entryDate.toLowerCase());    
       let totalProfit=0;
       let TotalSubTotal=0;
       this.TotalEarning=0;
       this.profitFromInvoice=0;
       this.totalDiscount=0;
       filteredProducts.forEach(element => {
        this.totalDiscount +=element.totalAddiDiscnt;
        TotalSubTotal+=element.SubTotal;
        totalProfit+=element.totalProfit;
       
       });
       this.profitFromInvoice=(totalProfit-this.totalDiscount); 
       filteredProducts.reverse();
      this.dataSource=new MatTableDataSource(filteredProducts);
     
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      if(filteredProducts.length==0){
      //  this.Tostr.showToast('danger',"", "No Sell's Found !", "",this.toastrService);
      }
    })
  }

  AddNewInpurRow(){

    this.router.navigate(['/inventory/Invoice-entry']);
  
  }

  save(element){
     
    this.invoiceDetailsService.addProductInfo(element).then(data=>{
      
   this.toastrService.saveMessage()
      this.refresList();
    },(err) => {
      this.toastrService.errorMessage()
      })

  }

  edit(element){
   
    this.invoiceDetailsService.updateProductInfo(element.key,element).then(data=>{
     
      this.toastrService.updateMessage()
      this.refresList();
    },(err) => {
      this.toastrService.errorMessage()
      })
  }

  delete(element){
   
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
               .afterClosed().subscribe(res=>{
                if(res){
                  this.invoiceDetailsService.deleteProductInfo(element.key).then(res=>{
                    this.refresList();
                    this.toastrService.deleteMessage()
                  },(err) => {
                    this.toastrService.errorMessage()
                    });
                }
               })
  }
  refresList(){
    this.subscription= this.invoiceDetailsService.getInvoiceByDateWithSnapsoot(this.entryDate).snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      let filterData=[];
      item.forEach(element=> {
         var y = element.payload.toJSON();
          y["key"] = element.key;
        
         this.productInfos.push(y);
          y["entryDate"]=new Date(y["entryDate"]).toDateString()
          filterData.push(y);
      
     
      })
    
      // let filteredProducts = (this.entryDate) ?
      // this.productInfos.filter(p => p.entryDate.toLowerCase()==
      // this.entryDate.toLowerCase()) :
      //  this.productInfos;      
       let totalProfit=0;
       let TotalSubTotal=0;
       this.TotalEarning=0;
       this.profitFromInvoice=0;
       this.totalDiscount=0;
       filterData.forEach(element => {
        this.totalDiscount +=element.totalAddiDiscnt;
        TotalSubTotal+=element.SubTotal;
        totalProfit+=element.totalProfit;
       
       });
       this.profitFromInvoice=(totalProfit-this.totalDiscount); 
     
      this.dataSource=new MatTableDataSource(filterData.reverse());
     
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      if(filterData.length==0){
      //  this.Tostr.showToast('danger',"", "No Sell's Found !", "",this.toastrService);
      }
    })  
     
  }
  
  printInvoice(element){
    
    this.router.navigate(['/inventory/invoice-print-v2/',element.key]);
  }
  RedirectToReport(){
    this.router.navigate(['/inventory/daily-report/',this.entryDate,'']);
  }
}
