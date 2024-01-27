import { Component, OnInit } from '@angular/core';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { ProductInfoService } from '../../../@core/mock/marchandizer/product-info.service';
import { Subscription } from 'rxjs';
import { InvoiceDetailsService } from '../../../@core/mock/marchandizer/invoice-details.service';
 
@Component({
  selector: 'ngx-total-productamount',
  templateUrl: './total-productamount.component.html',
  styleUrls: ['./total-productamount.component.scss']
})
export class TotalProductamountComponent implements OnInit {
TotalAmount:number=0;
TotalQty:number=0;
subscription:Subscription;
  totalSales: number;
  totalEarn: number;
  remainingSales: number;
  totalRemainingQty: number;
  constructor(
    public productInfoService:ProductInfoService,
    public invoiceDetailsService:InvoiceDetailsService,
    public languageService:LanguageConverterService
  ) { }

  ngOnInit() {
    this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.TotalAmount=0;
      this.TotalQty=0;
      item.forEach(element => {
        var y = element.payload.toJSON();

        y["key"] = element.key;
        if(y["productBuyingPrice"]==0){
      //    console.log(y)
        }
        
        this.TotalAmount+=y["productBuyingPrice"]*y["quantity"];
        this.TotalQty+=y["quantity"]
          
      });

      this.subscription=this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(items=>{
        this.totalSales=0;
        this.totalRemainingQty=0;
       items.map((item:any)=> {
          const y :any= item.payload.val();
          this.totalSales +=y.SubTotal;
          const itemQuantityCount = this.itemQuantityCount(y.items);
          this.totalRemainingQty=this.totalRemainingQty+itemQuantityCount;
          return y;
        });
  
       
      this.totalSales = Math.floor(this.totalSales);
     this.remainingSales=this.TotalAmount- this.totalSales;

      });  
  
    })
   
     
  }

   itemQuantityCount(arry){
    const itemQuantityCount =arry.reduce((acc, item) => {
      item.Quantity++;
    return item.Quantity;
   },{});

   return itemQuantityCount;
   }
}
