import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { StockInfo } from '../../@core/data/marchanzider-model/stock-info';
import { Tostr } from '../../@core/data/tostr.model';
import { CustomerOrderService } from '../../@core/mock/marchandizer/customer-order.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { StockInfoService } from '../../@core/mock/marchandizer/stock-info.service';
import { MatDialogService } from '../../@core/mock/mat-dialog.service';
import { ToasterService } from '../../@core/mock/toaster.service';
import { DataSharingService } from '../E-commerce/data-sharing.service';
import { DropdownValuesService } from '../../@core/mock/marchandizer/dropdown-values.service';
  

@Component({
  selector: 'ngx-customer-order-display',
  templateUrl: './customer-order-display.component.html',
  styleUrls: ['./customer-order-display.component.scss']
})
export class CustomerOrderDisplayComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  columns = [
    {field:"filter"},
    {field:"OrderNo",header:`${this.languageService.SalesReturnInfo.OrderNo}`},
    {field:"EntryDate",header:`${this.languageService.SalesReturnInfo.Date}`},
    {field:"ClientName",header:`${this.languageService.SalesReturnInfo.ClientName}`},
    {field:"Mobile",header:`${this.languageService.productEntry.mobile}`},
    {field:"TotalCost",header:`${this.languageService.SalesReturnInfo.TotalAmount}`},
    {field:"TotalQty",header:`${this.languageService.SalesReturnInfo.TotalItem}`},
 
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };
  
  productInfos:any[]=[];
  Tostr=new Tostr();
  subscription:Subscription;
  constructor(public customerOrderService:CustomerOrderService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private router:Router,
     private dropdownValuesService:DropdownValuesService,
     private stockInfoService:StockInfoService,
     public languageService:LanguageConverterService,
     public dataSharingService:DataSharingService,
     ) { }

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
  AddNewInpurRow(){

    this.router.navigate(['/inventory/Invoice-entry']);
  }

  save(element){
   
    this.customerOrderService.addOrder(element).then(data=>{
     
      this.toastrService.saveMessage();
      this.refresList();
    },(err) => { 
      this.toastrService.errorMessage();
    })

  }

  edit(element){
    
    this.customerOrderService.updateOrder(element.key,element).then(data=>{
     
      this.toastrService.updateMessage();
      this.refresList();
    },(err) => { 
      this.toastrService.errorMessage()
    })
  }

  delete(element){
    
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
               .afterClosed().subscribe(res=>{
                if(res){
                  this.customerOrderService.deleteOrder(element.key).then(res=>{
                    
            //then delete froms stock
            this.stockInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
              let stockInfo=[];
              item.forEach(element => {
                var y = element.payload.toJSON();
                y["key"] = element.key;

              
                stockInfo.push(y as StockInfo);
              });
            
          let stockListByelementId=  stockInfo.filter(f=>f.invoiceKey==element.key);

            stockListByelementId.forEach(e => {
              this.stockInfoService.deleteProductInfo(e.key).then(t=>console.log(t));
            });
          



          });

                    this.refresList();
                    this.toastrService.deleteMessage()
                  },(err) => { 
                    this.toastrService.errorMessage()
                  });
                }
               })
  }
  refreshDataSource(searchData){
    this.dataSource = new MatTableDataSource(searchData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  search(customerOrderSearchArry,searchIndex) {
    let emptyValue,invoiceNo,entryDate,clienName,totalAmount,PaidAmount,DueAmount;
     [emptyValue,invoiceNo,entryDate,clienName,totalAmount,PaidAmount,DueAmount]=customerOrderSearchArry;
    let result= this.dataSharingService.invoiceSearchByMultiColumn(
      this.productInfos,
      invoiceNo,
      entryDate,
      clienName,
      totalAmount,
      PaidAmount,
      DueAmount,
      undefined)
    this.refreshDataSource(result)
   }
  refresList(){
    
    this.subscription= this.customerOrderService.getOrdersByDateRangeWithSnapShot(
      this.dropdownValuesService.fromDate,this.dropdownValuesService.toDate
    ).subscribe(items=>{
      this.productInfos=[];
      this.dataSource=new MatTableDataSource(items.map(item => {
        console.log(item)
        const y = item.payload.val();
        y["key"] = item.key;
        y["EntryDate"]=new Date(y["EntryDate"]).toLocaleString()
        y["ClientName"]=y["ShippingDtls"].name;
        y["Mobile"]=y["ShippingDtls"].mobile;
        return y;
      }).reverse());

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.productInfos=this.dataSource.data;
    });
   
  }
 
  clearFilters() {
    this.refresList();
    this.filtersModel = [];
    this.filterKeys = {};
   }
  printInvoicev1(element){
    
    this.router.navigate(['/inventory/customer-order-v1/',element.key]);
  }
  printInvoicev2(element){
    
    this.router.navigate(['/inventory/customer-order-v2/',element.key]);
  }
  CancelOrder(element){
    element.OrderStatus=2
    this.customerOrderService.updateOrder(element.key,element).then(t=>{
      console.log(t)
      this.toastrService.openSnackBarWarning('Order Canceled','ok')
    }).catch(c=>{
      this.toastrService.errorMessage();
    })
    
  }
  ConfirmOrder(element){
//0 means  Order from Customer (set OrderStatus=0)
//1 means Order Confirmed and Invoice done (set OrderStatus=1)
// 2 means Order Cancel then update object set OrderStatus=2

this.router.navigate(['/inventory/e-com-invoice/',element.key]);

// element.OrderStatus=1
// this.customerOrderService.updateOrder(element.key,element).then(t=>{
//   console.log(t)
//   this.toastrService.openSnackBarSuccess('Order Confirmed','ok')
// }).catch(c=>{
//   this.toastrService.errorMessage();
// })

  }
  CanceledOrder(element){
    element.OrderStatus=0
    this.customerOrderService.updateOrder(element.key,element).then(t=>{
      console.log(t)
      this.toastrService.openSnackBarSuccess('Order Re-Active','ok')
    }).catch(c=>{
      this.toastrService.errorMessage();
    })
  }
}
