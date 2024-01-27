import { Component, OnInit } from '@angular/core';
import { StockInfoService } from '../../../@core/mock/marchandizer/stock-info.service';
import * as Chart from 'chart.js';
import { ProductInfoService } from '../../../@core/mock/marchandizer/product-info.service';
@Component({
  selector: 'ngx-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})
export class StockChartComponent implements OnInit {
stockChart:any
  constructor(public productInfoService:ProductInfoService,) { }

  ngOnInit() {

    this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      let stockInfo=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
        stockInfo.push(y);
      });
      console.log(stockInfo)
      let stockAlarm=stockInfo.filter(f=>f.quantity<1);
      console.log(stockAlarm)
      let itemNames = stockAlarm.map((item:any) => item.name);
      let stockQtys = stockAlarm.map((item:any) => item.quantity);
   
   this.stockChart = new Chart('stockChart', {
    type: 'bar',
       data: {
         labels:itemNames,
         datasets: [{
             label: 'Purchase',
             data: stockQtys,
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

}
