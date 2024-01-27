import { Component, OnInit } from '@angular/core';
import { InvoiceDetailsService } from '../../@core/mock/marchandizer/invoice-details.service';
import * as Chart from 'chart.js';
@Component({
  selector: 'ngx-best-selling-product',
  templateUrl: './best-selling-product.component.html',
  styleUrls: ['./best-selling-product.component.scss']
})
export class BestSellingProductComponent implements OnInit {

  salesChart: any;
 
  constructor(
    public invoiceDetailsService:InvoiceDetailsService,
     
  ) {
  
  }

  ngOnInit() {
    
    var today = new Date();
   var ThirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
   var dd2 = String(ThirtyDaysAgo.getDate()).padStart(2, '0');
   var mm2 = String(ThirtyDaysAgo.getMonth() + 1).padStart(2, '0'); // January is 0!
   var yyyy2 = ThirtyDaysAgo.getFullYear();
   let ThirtyDaysAgoStartDate = yyyy2+ '-' +mm2+ '-'+ dd2 ;


   var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
var yyyy = today.getFullYear();

 let endDate =  yyyy+ '-' +mm + '-'+ dd ;
 
   this.invoiceDetailsService.getInvoiceByDateRange(ThirtyDaysAgoStartDate,endDate ).subscribe((data:any)=>{
    //  data.reduce((acc, val) => console.log(val.entryDate));
     const mergedArray = data.reduce((acc, val) => acc.concat(val.items), []);
     const groupedItems = mergedArray.reduce((acc, item) => {
       const key = `${item.ProductCategory}-${item.ProductSubCategory}-${item.ProductBrand}`;
       if (!acc[key]) {
         acc[key] = {
           ProductCategory: item.ProductCategory,
           ProductSubCategory: item.ProductSubCategory,
           ProductBrand: item.ProductBrand,
           Quantity: 0
         };
       }
       acc[key].Quantity += item.Quantity;
       return acc;
     }, {});
     
     const resultrr:any = Object.values(groupedItems);
     resultrr.sort((a, b) => b.Quantity - a.Quantity);
 const top15 = resultrr.slice(0, 15);
 
 let top15BestSellingproducts = top15.map((item:any) => item.ProductBrand);
 let top15BestSellingproductsQty = top15.map((item:any) => item.Quantity);
   
 this.salesChart = new Chart('bestSellingProduct', {
     type: 'bar',
     data: {
       labels:top15BestSellingproducts,
       datasets: [{
           label: 'Best Selling Products Last 30 days',
           data: top15BestSellingproductsQty,
           backgroundColor: 'rgba(84,230,157)',
           borderColor: 'rgba(121,106,238)',
           borderWidth: 1
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

}
