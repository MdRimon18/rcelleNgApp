import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToasterService } from '../../mock/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class ItemCartTblService {
  public ObjectReciever = new BehaviorSubject<any>([]);
  ObjectTbl= this.ObjectReciever.asObservable();

  constructor(private toasterService:ToasterService,) {}
  
  initialLoad(objects:any){
    this.ObjectReciever.next(objects);
  }
  add(object:any){
    const newBookList=[
      ...this.ObjectReciever.value,object];
      this.ObjectReciever.next(newBookList);
  }

  Update(object:any){
    const index = this.ObjectReciever.value.findIndex(elmnt =>elmnt.key==object.key);
    if (index > -1) {
    this.ObjectReciever.value.splice(index, 1);
   
    const newBookList=[
      ...this.ObjectReciever.value,object];

      this.ObjectReciever.next(newBookList);
     
   }
  
  }
updateCartItem(object){
 this.ObjectReciever.value.map(obj => {
    if (obj.key ==object.key) {
      obj.shippingQnty++;
    }
    return obj;
  });
//console.log(this.ObjectReciever.value)
}
  delete(key:number){
    const index = this.ObjectReciever.value.findIndex(elmnt =>elmnt.key==key);
   if (index > -1) {
   this.ObjectReciever.value.splice(index, 1);
  }
    
  }
totalCount(){
 return this.ObjectReciever.value.reduce((sum, item) => {
    return sum + item.itemPriceWithDisCount;

  }, 0);
}
totalQty(){
  return this.ObjectReciever.value.reduce((sum, item) => {
     return sum + item.shippingQnty;
     
   }, 0);
 }
  getAll(){
  return  this.ObjectTbl;
  }

  addToCart(product){
  
    let itemExists = this.ObjectReciever.value.find(f=>f.key===product.key);
    if (itemExists) {
     if(itemExists.shippingQnty<itemExists.quantity){
       itemExists.shippingQnty++;
       console.log(itemExists)
       itemExists.itemPriceWithDisCount=itemExists.shippingQnty*(itemExists.cost-itemExists.discountAmount);
       this.totalCount();
     
     }else{
     this.toasterService.stockFinisMessage(itemExists.quantity);
     }
     
    } else {
     product.shippingQnty=1;
     product.itemPriceWithDisCount=1*(product.cost-product.discountAmount);
     this.add(product);
     console.log(this.ObjectReciever.value)
    }
   
   }
   incrementItem(product){
  
    let itemExists = this.ObjectReciever.value.find(f=>f.key===product.key);
    if (itemExists) {
     if(itemExists.shippingQnty<itemExists.quantity){
       itemExists.shippingQnty++;
       console.log(itemExists)
       itemExists.itemPriceWithDisCount=itemExists.shippingQnty*(itemExists.cost-itemExists.discountAmount);
     }else{
      this.toasterService.stockFinisMessage(itemExists.quantity);
      }
     
    }
  }
  decrementItem(product){
  
    let itemExists = this.ObjectReciever.value.find(f=>f.key===product.key);
    if (itemExists) {
    
       itemExists.shippingQnty--;
       if(itemExists.shippingQnty<0){
        this.toasterService.openSnackBarWarning('Quantity Less then 0 Not Allow','ok')
        itemExists.shippingQnty=0;
        return;
      }
       
       itemExists.itemPriceWithDisCount=itemExists.shippingQnty*(itemExists.cost-itemExists.discountAmount);
     
     
    } 
  }
   
  
  deleteItem(key){
    this.delete(key);
  }
}
