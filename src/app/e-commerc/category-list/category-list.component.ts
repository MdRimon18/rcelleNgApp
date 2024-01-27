import { Component, OnInit } from '@angular/core';
import { ProductInfoService } from '../../@core/mock/marchandizer/product-info.service';
import { Router } from '@angular/router';
import { ItemCartTblService } from '../../@core/data/ClientDb/item-cart-tbl.service';
import { ToasterService } from '../../@core/mock/toaster.service';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';

@Component({
  selector: 'ngx-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  myControlProduct = new FormControl();
  filteredOptionsProduct: Observable<string[]>;
  productInfosFiltered:any[]=[];
  
  cmpnyName=''

  subscription:Subscription;
  productInfos:any[]=[];
  productCollections:any[]=[];
  constructor(
    public productInfoService:ProductInfoService,
    private router:Router,
    public itemCartTblService:ItemCartTblService,
    private toasterService:ToasterService,
  ) { }

  ngOnInit() {
   // Company.cName= localStorage.getItem('cmpCode');
    this.cmpnyName=Company.cName;

    this.subscription= this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.toJSON();

        y["key"] = element.key;
      // let sortDate= y["date"].split("/");
      // sortDate=sortDate[0]+sortDate[1]+sortDate[2];
      // y["eDate"]=parseInt(sortDate);
      if(y['imageLink']!=undefined&&y['imageLink']!=''){
        this.productInfos.push(y);
      
      }
     
      });
      console.log(this.productInfos)
      this.productInfosFiltered=this.productInfos;
      // this.dataSource=new MatTableDataSource(this.productInfosFiltered);
      // this.dataSource.paginator = this.paginator;
     
     
  }); 

  }
  Details(key){
    this.router.navigate(['/e-commerce/single-product/', Company.cName,key]);
 
  }
  itemCardExpand(){
    this.router.navigate(['/inventory/item-card/']);
  }
  
  
}
