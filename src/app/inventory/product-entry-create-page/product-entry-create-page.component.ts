import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
 
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { UnitService } from '../Unit/unit.service';
import { SuplierShopService } from '../supplier-shop/suplier-shop.service';
import { SupplierService } from '../Supplier/supplier.service';
 
import { runInThisContext } from 'vm';
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
import { UploadImagesComponent } from '../upload-images/upload-images.component';
import { UploadImagesService } from '../../@core/mock/marchandizer/upload-images.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DataSharingService } from '../E-commerce/data-sharing.service';
import { DateResizerService } from '../../@core/mock/marchandizer/date-resizer.service';


 
@Component({
  selector: 'ngx-product-entry-create-page',
  templateUrl: './product-entry-create-page.component.html',
  styleUrls: ['./product-entry-create-page.component.scss'] ,
 
 
})
export class ProductEntryCreatePageComponent implements OnInit ,OnDestroy{
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
  isLoading = false;
  constructor(
    public productInfoService:ProductInfoService,
    private toastrService:ToasterService,
    private productCategoriesService:ProductCategoryService,
    private stockinfoService:StockInfoService,
    private productSubCategoryService:ProductSubCategoriesService,
    private router:Router,
    private route:ActivatedRoute,
    private unitService:UnitService,
    private supplierService:SupplierService,
    public languageService:LanguageConverterService,
    public uploadImagesService:UploadImagesService,
    private dialog:MatDialog,
    public datSharingService:DataSharingService,
    private dateResizerService:DateResizerService,
    ) 
    {
     

    }

    ngOnDestroy(): void {
     
      this.uploadImagesService.selectedImage=null;
      this.uploadImagesService.ImageUp.imageUrlFile=null;
    } 
    
   ngOnInit() {
    this.Product.date=this.dateResizerService.resize(new Date());

    this.Product.catagory='';
    this.Product.subCategory='';
    this.Product.name='';
    this.Product.quantity='';
    this.Product.unit='';
    this.Product.cost='';
    this.Product.unit='';
    this.Product.supplier='';
    this.Product.vatPercent=0;
    this.Product.vatAmount=0;
    this.Product.discountAmount=0;
    this.Product.discountPercent=0;
     
 
   // this.Product.unit='';
   
    this.editkey = this.route.snapshot.paramMap.get('key');
    
    this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.prdctList=[];
       item.forEach(element => {
         var y = element.payload.toJSON();
         y["key"] = element.key;
 
      
         this.prdctList.push(y);
       });
       console.log(this.prdctList)
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
       
     
      this.UnitList.push(y);
      });
     
  
  
    });
    this.subscription= this.supplierService.getAllMySupplierProfileInfo().snapshotChanges().subscribe(item=>{
      this.suppliers=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
       
     
      this.suppliers.push(y);
      });
   
  
  
    });
   }
  vatAmountNDiscountCalculation(){
    this.Product.vatAmount=(this.Product.cost*this.Product.vatPercent)/100;
    this.Product.discountAmount=(this.Product.cost*this.Product.discountPercent)/100;
  }
  
  save(element)
   {
    this.isLoading = true;
    //check product is exist or not
    let stockObjByelementId= this.prdctList.filter(f=>
      f.catagory==element.catagory&&
      f.subCategory==element.subCategory&&f.name.toLowerCase().trim()==element.name.toLowerCase().trim());
     //check product has image
    if(this.uploadImagesService.ImageUp.imageUrlFile!=null){
      this.uploadImagesService.saveImage('Product',this.uploadImagesService.ImageUp.imageUrlFile).then(
        t=>{
          element.imageLink=t;
          if(stockObjByelementId.length==0){
        
            if(JSON.stringify(element) !== '{}'){
              element.serialNumber= this.prdctList.length;
              //insert with image
            this.productInfoService.addProductInfo(element).then(data=>{
              this.isLoading = false;
              this.toastrService.saveMessage()
             
             //this.router.navigate(["/inventory/product-info"]);
            },(err) => {  
              this.isLoading = false;
              // this.toastrService.updateMessage()
              })
        
            }
          
          }
         else{
          this.isLoading = false;
          this.toastrService.openSnackBarWarning('Product  is Already Exist! You Can Only Update..','Ok')
           
         }
        }
      ); 
     }else{
      if(stockObjByelementId.length==0){
        
        if(JSON.stringify(element) !== '{}'){
          element.serialNumber= this.prdctList.length;
          //insert without image
        this.productInfoService.addProductInfo(element).then(data=>{
          this.isLoading = false;
          this.toastrService.saveMessage()
         
        // this.router.navigate(["/inventory/product-info"]);
        },(err) => {console.log(err)})
    
        }
      
      }
     else{
      this.isLoading = false;
      this.toastrService.openSnackBarWarning('Product  is Already Exist! You Can Only Update..','Ok')
       
      }
     } 
    
   
      
        
      
   
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
  // onLoadImageUpload(){
  
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = "40%";
  //   dialogConfig.height = "40%";
  //   this.dialog.open(UploadImagesComponent, dialogConfig);
  // }
 
}
