import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductInfoService } from '../../@core/mock/marchandizer/product-info.service';
 
@Component({
  selector: 'ngx-supplier-shop-display',
  templateUrl: './supplier-shop-display.component.html',
  styleUrls: ['./supplier-shop-display.component.scss']
})
export class SupplierShopDisplayComponent implements OnInit {
  subscription:Subscription;
  productInfos:any[]=[];
  constructor(private productInfoService:ProductInfoService) { }

  ngOnInit() {
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
      console.log(this.productInfos);
  }); 
  }

}

