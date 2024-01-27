import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OthersShopService } from '../../@core/mock/marchandizer/others-shop.service';
 
@Component({
  selector: 'ngx-your-others-shop-display',
  templateUrl: './your-others-shop-display.component.html',
  styleUrls: ['./your-others-shop-display.component.scss']
})
export class YourOthersShopDisplayComponent implements OnInit {

  subscription:Subscription;
  OthersShop:any[]=[];
  constructor(private othersShopService:OthersShopService) { }

  ngOnInit() {
    this.subscription= this.othersShopService.getAllMyOthersShopInfo().snapshotChanges().subscribe(item=>{
      this.OthersShop=[];
      item.forEach(element => {
        var y = element.payload.toJSON();

        y["key"] = element.key;
      // let sortDate= y["date"].split("/");
      // sortDate=sortDate[0]+sortDate[1]+sortDate[2];
      // y["eDate"]=parseInt(sortDate);
      this.OthersShop.push(y);
      
      });
       
  }); 
  }

}

