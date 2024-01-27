import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductInfoService } from '../../@core/mock/marchandizer/product-info.service';
import { ItemCartTblService } from '../../@core/data/ClientDb/item-cart-tbl.service';
import { ProductInfo } from '../../@core/data/ProductInfo';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';

@Component({
  selector: 'ngx-single-product-details',
  templateUrl: './single-product-details.component.html',
  styleUrls: ['./single-product-details.component.scss']
})
export class SingleProductDetailsComponent implements OnInit {
  detailsKey;
 
    productInfos:any[]=[];
    product=new ProductInfo();
    cmny: string;
    currentUrl:string;
  constructor(  private route:ActivatedRoute,
    public productInfoService:ProductInfoService,
    public itemCartTblService:ItemCartTblService,
    private router: Router
    ) { }

  ngOnInit() {
    localStorage.setItem('cmpCode',this.route.snapshot.paramMap.get('cmny'))
    Company.cName=this.route.snapshot.paramMap.get('cmny');
   // console.log(this.route.snapshot.paramMap.get('cmny'))
    this.detailsKey= this.route.snapshot.paramMap.get('key');
   
    this.productInfoService.getByIdProductInfo(this.detailsKey).subscribe(res=>{
      this.product=res;
   //   console.log(this.product)
    })
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     const currentUrl = this.router.url;
    //     console.log('Current URL:', currentUrl);
    //   }
    // });
    // this.currentUrl='';
    // this.currentUrl= this.router.url;
    // console.log('Current URL:', this.currentUrl);
  }
 
}
