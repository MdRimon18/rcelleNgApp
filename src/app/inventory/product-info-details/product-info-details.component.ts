import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemCartTblService } from '../../@core/data/ClientDb/item-cart-tbl.service';
import { PageMenuTblService } from '../../@core/data/ClientDb/page-menu-tbl.service';
import { UserInfoTblService } from '../../@core/data/ClientDb/user-info-tbl.service';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';
import { ProductInfo } from '../../@core/data/ProductInfo';
import { ProductCategoryService } from '../../@core/mock/marchandizer/product-category.service';
import { ProductInfoService } from '../../@core/mock/marchandizer/product-info.service';
import { UserService } from '../../@core/mock/marchandizer/user.service';
 
 
 

@Component({
  selector: 'ngx-product-info-details',
  templateUrl: './product-info-details.component.html',
  styleUrls: ['./product-info-details.component.scss']
})
export class ProductInfoDetailsComponent implements OnInit {
 
detailsKey;
subscription:Subscription;
  productInfos:any[]=[];
  product=new ProductInfo();
  cmny: string;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private productCategory:ProductCategoryService,
    private userService:UserService,
    private userInfoTblService:UserInfoTblService,
    public productInfoService:ProductInfoService,
    private pageMenuTblService:PageMenuTblService,
    public itemCartTblService:ItemCartTblService,
 
  ) { 
    // if(this.userInfoTblService.ObjectReciever.value.phone==undefined||
    //   this.userInfoTblService.ObjectReciever.value.phone==null||this.userInfoTblService.ObjectReciever.value.phone==''){
    //       this.pageMenuTblService.initialLoad(InitialPageMENU_ITEMS); 
               
    //     localStorage.setItem('returnUrl', this.router.url);
    //     alert('Please Sign in First !')
    // }else{
  
    // }
    
    
  }

  ngOnInit() {
    if(localStorage.getItem('userType')=='Customer'){

    }else{
      this.cmny= this.route.snapshot.paramMap.get('cmny');
      localStorage.setItem('customerCmny',this.cmny)
      Company.cName=this.cmny;
      this.userService.getUserByMobileNoNPassWord(Company.cName).valueChanges().subscribe((userObj:any)=>{
        //let userObj=res.find(f=>f.phone==this.cmny);
       
      this.userInfoTblService.initialLoad(userObj);
          })
    }
  
    
   this.detailsKey= this.route.snapshot.paramMap.get('key');
   this.productInfoService.getByIdProductInfo(this.detailsKey).subscribe(res=>{
     
     this.product=res;
   })
   
    
 // this.loadCustomerFetures();
  //  this.subscription= this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
  //   this.productInfos=[];
  //   item.forEach(element => {
  //     var y = element.payload.toJSON();

  //     y["key"] = element.key;
    
  //   this.productInfos.push(y);
    
  //   });
  //   let obj= this.productInfos.find(f=>f.key==this.detailsKey);
  //  this.product=obj;
  //  console.log(this.product)
   
   
//});
  }
  addToCart(product) {
  
const isItemExist=  this.itemCartTblService.ObjectReciever.value.find(f=>f.key==product.key);
if(isItemExist==undefined){
  this.itemCartTblService.add(product);
}
}
 
}
