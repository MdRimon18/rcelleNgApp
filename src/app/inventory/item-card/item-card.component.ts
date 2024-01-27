 
import { Component, OnDestroy, OnInit } from '@angular/core';
 
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
 
 
import { Subscription, Observable } from 'rxjs';
 
import { NbToastrService } from '@nebular/theme';
 
 
import { Router } from '@angular/router';
 
  
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { CustomerService } from '../Customer/customer.service';
 
import { InvoicEntryModel } from '../invoice-entry/ivoiceEntryModel';
import { Tostr } from '../../@core/data/tostr.model';
import { StockInfo } from '../../@core/data/marchanzider-model/stock-info';
import { ItemCartTblService } from '../../@core/data/ClientDb/item-cart-tbl.service';
import { invoice } from '../../@core/data/marchanzider-model/invoice';
import { ProductCategories } from '../../@core/data/marchanzider-model/product-categories';
import { ProductSubCategories } from '../../@core/data/marchanzider-model/product-sub-categories';
import { ProductInfo } from '../../@core/data/ProductInfo';
import { CustomerOrderService } from '../../@core/mock/marchandizer/customer-order.service';
import { DateResizerService } from '../../@core/mock/marchandizer/date-resizer.service';
import { DropdownValuesService } from '../../@core/mock/marchandizer/dropdown-values.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { ProductCategoryService } from '../../@core/mock/marchandizer/product-category.service';
import { ProductInfoService } from '../../@core/mock/marchandizer/product-info.service';
import { ProductSubCategoriesService } from '../../@core/mock/marchandizer/product-sub-categories.service';
import { ToasterService } from '../../@core/mock/toaster.service';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';
 

@Component({
  selector: 'ngx-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements  OnInit{
 
 
  entryDate:any='';
 

  totalPrice:number=0;
  constructor( 
    
    private toastrService:ToasterService,
    private router:Router ,
    private dateResizerService:DateResizerService,
    public languageService:LanguageConverterService,
    private itemCartTblService:ItemCartTblService,
    
    ) {
      console.log(this.itemCartTblService.ObjectReciever.value)
      this.totalPrice = this.itemCartTblService.ObjectReciever.value.reduce((acc, item) => {
        return acc + item.itemPriceWithDisCount;
      }, 0)

     }

   
  ngOnInit() {
      this.entryDate=this.dateResizerService.resize(new Date());
 
  }
  incrementItem(product){
  
    let itemExists = this.itemCartTblService.ObjectReciever.value.find(f=>f.key===product.key);
    if (itemExists) {
     if(itemExists.shippingQnty<itemExists.quantity){
       itemExists.shippingQnty++;
       console.log(itemExists)
       itemExists.itemPriceWithDisCount=itemExists.shippingQnty*(itemExists.cost-itemExists.discountAmount);
     }else{
      this.toastrService.stockFinisMessage(itemExists.quantity);
      }
     
    }
  }
  decrementItem(product){
  
    let itemExists = this.itemCartTblService.ObjectReciever.value.find(f=>f.key===product.key);
    if (itemExists) {
    
       itemExists.shippingQnty--;
       if(itemExists.shippingQnty<0){
        this.toastrService.openSnackBarWarning('Quantity Less then 0 Not Allow','ok')
        itemExists.shippingQnty=0;
        return;
      }
       
       itemExists.itemPriceWithDisCount=itemExists.shippingQnty*(itemExists.cost-itemExists.discountAmount);
     
     
    } 
  }
  deleteItem(key){
    this.itemCartTblService.delete(key);
  }
  ContinueShipping(){
    this.router.navigate(["/inventory/product-display",Company.cName]);
  }
  checkout(){
    this.router.navigate(["/inventory/shipping-address"]);
    }
}

