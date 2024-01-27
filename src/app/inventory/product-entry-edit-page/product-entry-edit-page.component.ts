import { Component, OnDestroy, OnInit } from '@angular/core';
 
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { UnitService } from '../Unit/unit.service';
import { SuplierShopService } from '../supplier-shop/suplier-shop.service';
import { SupplierService } from '../Supplier/supplier.service';
import { NbToastrService } from '@nebular/theme';
import { ProductCategories } from '../../@core/data/marchanzider-model/product-categories';
import { ProductSubCategories } from '../../@core/data/marchanzider-model/product-sub-categories';
import { StockInfo } from '../../@core/data/marchanzider-model/stock-info';
import { ProductInfo } from '../../@core/data/ProductInfo';
import { Tostr } from '../../@core/data/tostr.model';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { ProductCategoryService } from '../../@core/mock/marchandizer/product-category.service';
import { ProductInfoService } from '../../@core/mock/marchandizer/product-info.service';
import { ProductSubCategoriesService } from '../../@core/mock/marchandizer/product-sub-categories.service';
import { StockInfoService } from '../../@core/mock/marchandizer/stock-info.service';
import { ToasterService } from '../../@core/mock/toaster.service';
import { DataSharingService } from '../E-commerce/data-sharing.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UploadImagesComponent } from '../upload-images/upload-images.component';
 
 
@Component({
  selector: 'ngx-product-entry-edit-page',
  templateUrl: './product-entry-edit-page.component.html',
  styleUrls: ['./product-entry-edit-page.component.scss']
})
export class ProductEntryEditPageComponent implements OnInit,OnDestroy {
  productInfos:ProductInfo[]=[];
  Product=new ProductInfo();
  productCategories:ProductCategories[]=[];
  productSubCategories:ProductSubCategories[]=[];
  productSubCategoriesFilterd:ProductSubCategories[]=[];
  Tostr=new Tostr();
  subscription:Subscription;
  stockInfos:StockInfo[]=[];
  productInfostwo:any[]=[];
  editkey;
  startDate = new Date();
  count=0;
  prdctList=[];
  UnitList: any[];
  suppliers: any[];
  constructor(public productInfoService:ProductInfoService,
    private toastrService:ToasterService,
    private productCategoriesService:ProductCategoryService,
    private stockinfoService:StockInfoService,
    private productSubCategoryService:ProductSubCategoriesService,
    private router:Router,
    private route:ActivatedRoute,
    private unitService:UnitService,
    private supplierService:SupplierService,
    public languageService:LanguageConverterService,
    public datSharingService:DataSharingService,
    private dialog:MatDialog) { 

      this.editkey = this.route.snapshot.paramMap.get('key');

     if(this.editkey!=null){
      this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
        this.productInfos=[];
         item.forEach(element => {
           var y = element.payload.toJSON();
           y["key"] = element.key;
   
        
           this.productInfos.push(y as ProductInfo);
         });
         this.Product=this.productInfos.find(f=>f.key==this.editkey);
        });
     }
    
     }

      ngOnDestroy(): void {
        this.datSharingService.imageLink=new BehaviorSubject<any>(0);
      }  
  ngOnInit() {
    this.datSharingService.getImageLink().subscribe(img=>{
      if(img!=0){
        this.Product.imageLink=img;
      
      }
      
    })
    this.Product.catagory='';
    this.Product.subCategory='';
    this.Product.name='';
    this.Product.quantity='';
    this.Product.unit='';
    this.Product.cost='';
    this.Product.unit='';
    this.Product.supplier='';
 
   // this.Product.unit='';
   
    
   this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
    this.prdctList=[];
     item.forEach(element => {
       var y = element.payload.toJSON();
       y["key"] = element.key;

    
       this.prdctList.push(y as StockInfo);
     });
      
    });
    
    this.productCategoriesService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
  
        this.productCategories.push(y as ProductCategories);
      })
  
    })
  
    this.productSubCategoryService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
  
        this.productSubCategories.push(y as ProductSubCategories);
      })
     
    })

    this.subscription= this.unitService.getAllUnitInfo().snapshotChanges().subscribe(item=>{
      this.UnitList=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
       
     
      this.UnitList.push(y as ProductInfo);
      });
   
   
  
    });
    this.subscription= this.supplierService.getAllMySupplierProfileInfo().snapshotChanges().subscribe(item=>{
      this.suppliers=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
       
     
      this.suppliers.push(y as ProductInfo);
      });
   
   
  
    });
  }
  save(element){
    
    
       let stockObjByelementId=  this.prdctList.filter(f=>f.catagory==element.catagory&&
        f.subCategory==element.subCategory&&f.name.trim()==element.name.trim());
        
        if(stockObjByelementId.length==0){
        
          if(JSON.stringify(element) !== '{}'){
      
        //     let Month=element.date._i.month + 1;
        //    let day=element.date._i.date;
        //   let year=element.date._i.year;
        //         if(Month<10){
        //           Month='0'+Month;
        //         }
        //         if(day<10){
        //           day='0'+day;
        //         }
               
        // let EntryDate =day+'/'+ Month + '/' + year;
        // element.date=EntryDate;
      
        
          this.productInfoService.addProductInfo(element).then(data=>{
           
         this.toastrService.saveMessage()
            
         //  this.ngOnInit();
           const stockInfo=new StockInfo();

           stockInfo.ProductName=element.catagory;
           stockInfo.BrandName=element.name;
           stockInfo.InStock=element.quantity;
           stockInfo.productKey=data.key;

            this.stockinfoService.addProductInfo(stockInfo).then();
           this.router.navigate(["/inventory/product-info"]);
          },(err) => {      this.toastrService.errorMessage()})
      
          }
        
        }
       else{
        this.toastrService.openSnackBarWarning('Product  is Already Exist! You Can Only Update..','Ok')
          
       }
        
      
   
  }
  vatAmountNDiscountCalculation(){
    this.Product.vatAmount=(this.Product.cost*this.Product.vatPercent)/100;
    this.Product.discountAmount=(this.Product.cost*this.Product.discountPercent)/100;
  }
  edit(element){
   if(localStorage.getItem('userType')=='Employee'){
    alert('Product Update Not Permited! Please Contract with Author.');
    return;
   };
    
  this.productInfoService.updateProductInfo(element.key,element).then(data=>{
   
  this.toastrService.updateMessage()
  //this.router.navigate(["/inventory/product-info"]);
  
    },(err) => { this.toastrService.errorMessage()})
  }



  OnCategoryDDLChange(catagory){
    
  
    this.productSubCategories=[];
    
    this.productSubCategoryService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
    
        this.productSubCategories.push(y as ProductSubCategories);
      })
      
      let filterproductSubCategories = (catagory) ?
       this.productSubCategories.filter(p => p.productCategoriesId==catagory):
        this.productSubCategories;      
        this.productSubCategories=filterproductSubCategories;

        
    });
  }
  backToProductInfo(){
    this.router.navigate(['/inventory/product-info']);
  }
  onLoadImageUpload(){
  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.height = "40%";
    //dialogConfig.data=obj;
    //this.dialog.open(ShowTrimsItemFormComponent, dialogConfig);
    this.dialog.open(UploadImagesComponent, dialogConfig);
  }
}
