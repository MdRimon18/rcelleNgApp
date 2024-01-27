import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ItemCartTblService } from '../../@core/data/ClientDb/item-cart-tbl.service';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';
import { ProductInfoService } from '../../@core/mock/marchandizer/product-info.service';
import { ToasterService } from '../../@core/mock/toaster.service';
 
@Component({
  selector: 'ngx-product-info-display',
  templateUrl: './product-info-display.component.html',
  styleUrls: ['./product-info-display.component.scss']
})
export class ProductInfoDisplayComponent implements OnInit {
  myControlProduct = new FormControl();
  filteredOptionsProduct: Observable<string[]>;
  productInfosFiltered:any[]=[];
  
 

  subscription:Subscription;
  productInfos:any[]=[];
  productCollections:any[]=[];
 
  constructor(
    public productInfoService:ProductInfoService,
    private router:Router,
    public itemCartTblService:ItemCartTblService,
    private toasterService:ToasterService,
    ) { }
  // onKey(event){
   
  //   let productName=event.target.value
  //   this.filteredOptionsProduct = this.myControlProduct.valueChanges.pipe(
  //     startWith(''),
  //     map(value => this._filterProduct(value))
  //   );
  //   // this. productInfosFiltered = (productName) ?
  //   //   this.productInfos.filter(p => p.name.toLowerCase()==
  //   //   productName.toLowerCase()) :
  //   //    this.productInfos;     
  // }
  ngOnInit() {
    Company.cName= localStorage.getItem('cmpCode');
    this.subscription= this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.toJSON();

        y["key"] = element.key;
      // let sortDate= y["date"].split("/");
      // sortDate=sortDate[0]+sortDate[1]+sortDate[2];
      // y["eDate"]=parseInt(sortDate);
      this.productInfos.push(y);
      
      });
      this.productInfosFiltered=this.productInfos;
      // this.dataSource=new MatTableDataSource(this.productInfosFiltered);
      // this.dataSource.paginator = this.paginator;
      this.filteredOptionsProduct = this.myControlProduct.valueChanges.pipe(
        startWith(''),
        map(value => this._filterProduct(value))
      );
     
  }); 
  }
  private _filterProduct(value: any): any[] {
    const filterValue = value.toLowerCase();
    
    return this.productInfos.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  productSelection(option){
    
    this.productInfosFiltered= this.productInfos.filter(f=>f.key==option.key);
   
  }
  applyFilter(){
    this.myControlProduct.reset('');
    this.productInfosFiltered=this.productInfos;
  }
  Details(key){
    this.router.navigate(['/inventory/product-info-Details/', Company.cName,key]);
 
  }
  itemCardExpand(){
    this.router.navigate(['/inventory/item-card/']);
  }
  addToCart(product){
  
   let itemExists = this.itemCartTblService.ObjectReciever.value.find(f=>f.key===product.key);
   if (itemExists) {
    if(itemExists.shippingQnty<itemExists.quantity){
      itemExists.shippingQnty++;
      console.log(itemExists)
      itemExists.itemPriceWithDisCount=itemExists.shippingQnty*(itemExists.cost-itemExists.discountAmount);
    }else{
    this.toasterService.stockFinisMessage(itemExists.quantity);
    }
    
   } else {
    product.shippingQnty=1;
    product.itemPriceWithDisCount=1*(product.cost-product.discountAmount);
    this.itemCartTblService.add(product);
   }
 
//    console.log(arr);

//  product.shippingQnty=1;
//  const isItemExist=  this.itemCartTblService.ObjectReciever.value.find(f=>f.key==product.key);
//  if(isItemExist==undefined){
//    this.itemCartTblService.add(product);
//  }else{
//   console.log(isItemExist)
//   this.itemCartTblService.updateCartItem(isItemExist);
//  }
 //  console.log(this.itemCartTblService.ObjectReciever.value)
   
  }
  

 
}
