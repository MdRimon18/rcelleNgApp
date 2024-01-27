import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InvoiceDetailsService } from '../@core/mock/marchandizer/invoice-details.service';
import { ProductCategoryService } from '../@core/mock/marchandizer/product-category.service';
import { ProductInfoService } from '../@core/mock/marchandizer/product-info.service';
import { ProductSubCategoriesService } from '../@core/mock/marchandizer/product-sub-categories.service';
import { CustomerService } from '../inventory/Customer/customer.service';
import { PurchaseInvoiceDetailsService } from '../inventory/Perchase/purchase-invoice-details.service';
import { SupplierService } from '../inventory/Supplier/supplier.service';
import * as Chart from 'chart.js';
import { DateResizerService } from '../@core/mock/marchandizer/date-resizer.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',  
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {

 // @ViewChild('chartContainer',{static:true}) chartContainer: ElementRef<HTMLElement>;
 showDetails:boolean;
    salesChart: any;
    PurchaseChart: any;

    countCustomer:number=0;
  countSupplier:number=0;
  countProducts:number=0;
  countInvoice:number=0;
  countProductCategories:number=0;
  countProductSubCategories:number=0;
  countPurchaseInvoice:number=0;
  invoiceList=[];
  totalItemSale:number=0;
  todaysInvoices=[];
  todayInvoiceCount:number=0;
  todayItemSale:number=0;
  yesterdayInvoices=[];
  yesterdayInvoiceCount:number=0;
  yesterdayItemSale:number=0;
  totalDueAmount:number=0;
    constructor(
      public invoiceDetailsService:InvoiceDetailsService,
      private customerService:CustomerService,
      public supplierService:SupplierService,
      public dateResizerService:DateResizerService,
      private productInfosServices:ProductInfoService,
      private productCategoriesService:ProductCategoryService,
      private productSubCategoriesService:ProductSubCategoriesService,
      public purchaseInvoiceDetailsService:PurchaseInvoiceDetailsService,
    ) {
    
    }
  
 
  ngOnInit(): void {
    var today = new Date();
 
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
var yyyy = today.getFullYear();

 let endDate =  yyyy+ '-' +mm + '-'+ dd ;
    

 var sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
var dd = String(sevenDaysAgo.getDate()).padStart(2, '0');
var mm = String(sevenDaysAgo.getMonth() + 1).padStart(2, '0'); // January is 0!
var yyyy = sevenDaysAgo.getFullYear();
let startDate = yyyy+ '-' +mm + '-'+ dd ;
 
  this.invoiceDetailsService.getInvoiceByDateRange(startDate,endDate ).subscribe((data:any)=>{
   let groupedData = data.reduce((acc, curr) => {
    let date = curr.entryDate;
    if (!acc[date]) {
      acc[date] = {entryDate: date, totalAmount: 0};
    }
    acc[date].totalAmount += curr.totalAmount;
    return acc;
  }, {});
  
  let result = Object.values(groupedData);
  let shortDayNames = result.map((item:any) => {
    let date = new Date(item.entryDate);
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getUTCDay()];
  });
let totalAmounts = result.map((item:any) => item.totalAmount);
  this.salesChart = new Chart('salesChart', {
    type: 'line',
    data: {
      labels:shortDayNames,
      datasets: [{
          label: 'Sales',
          data: totalAmounts,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
       
          borderColor: 'rgba(84, 230, 157)',
          borderWidth: 4
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  
  });
  })

  this.purchaseInvoiceDetailsService.getInvoiceByDateRange(startDate,endDate ).subscribe((data:any)=>{
   
    let groupedData = data.reduce((acc, curr) => {
     let date = curr.entryDate;
     if (!acc[date]) {
       acc[date] = {entryDate: date, totalAmount: 0};
     }
     acc[date].totalAmount += curr.totalAmount;
     return acc;
   }, {});
   
   let result = Object.values(groupedData);
   let shortDayNames = result.map((item:any) => {
     let date = new Date(item.entryDate);
     let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
     return days[date.getUTCDay()];
   });
 let totalAmounts = result.map((item:any) => item.totalAmount);
 this.PurchaseChart = new Chart('PurchaseChart', {
  type: 'bar',
     data: {
       labels:shortDayNames,
       datasets: [{
           label: 'Purchase',
           data: totalAmounts,
           backgroundColor: 'rgba(84,230,157)',
           borderColor: 'rgba(121,106,238)',
           borderWidth: 4
       }]
     },
     options: {
       scales: {
         y: {
           beginAtZero: true
         }
       }
     }
   
   });
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
yesterdayFormatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + (d.getDate()-1),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}
showOnOff(){
  //this.showDetails=!this.showDetails;
  this.showDetails = !this.showDetails;
  if(this.showDetails){

    this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      //  console.log('Invoice',item);
        let items=[];
        item.forEach(element => {
          var y = element.payload.toJSON();
          
          var size = Object.keys(y['items']).length;
          this.totalItemSale+=size;
        //  console.log(size)
        //   for (let key in  y['items']) {
          
        //     //  console.log(key, this.invoiceDetails.items[key]);
        //        items.push(y['items'][key]);
      
        //  }
       this.totalDueAmount+= y['DueAmount']
          //this.invoiceList.push(y);
          if(y['entryDate']==this.formatDate(new Date())){
            this.todaysInvoices.push(y);
            
          }
          if(y['entryDate']==this.yesterdayFormatDate(new Date())){
            this.yesterdayInvoices.push(y);
         
          }

        });
        this.todayInvoiceCount=this.todaysInvoices.length;
        this.yesterdayInvoiceCount=this.yesterdayInvoices.length;
        this.todaysInvoices.forEach(element => {
          var size = Object.keys(element['items']).length;
          this.todayItemSale+=size;
        
        })
        this.yesterdayInvoices.forEach(element => {
          var size = Object.keys(element['items']).length;
          this.yesterdayItemSale+=size;
        
        })
          
      this.countInvoice=item.length;
    });
    this.customerService.getAllMyCustomerProfileInfo().snapshotChanges().subscribe(item=>{
      this.countCustomer=item.length;
    });
    this.supplierService.getAllMySupplierProfileInfo().snapshotChanges().subscribe(item=>{
      this.countSupplier=item.length;
    });
    this.productInfosServices.getAllProductInfo().snapshotChanges().subscribe(item=>{
      item.forEach(element => {
        var y = element.payload.toJSON();
        this.countProducts+=y['quantity'];
      });
    });
    this.productCategoriesService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.countProductCategories=item.length;
    });
    this.productSubCategoriesService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.countProductSubCategories=item.length;
    });
    this.purchaseInvoiceDetailsService.getAllpurchaseInvDtlsInfo().snapshotChanges().subscribe(item=>{
      this.countPurchaseInvoice=item.length;
    });
  }
}
}
