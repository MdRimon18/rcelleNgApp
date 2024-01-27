import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductCategories } from '../../@core/data/marchanzider-model/product-categories';
import { ProductSubCategories } from '../../@core/data/marchanzider-model/product-sub-categories';
import { StockInfo } from '../../@core/data/marchanzider-model/stock-info';
import { ProductInfo } from '../../@core/data/ProductInfo';
import { Tostr } from '../../@core/data/tostr.model';
import { DropdownValuesService } from '../../@core/mock/marchandizer/dropdown-values.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { ProductCategoryService } from '../../@core/mock/marchandizer/product-category.service';
import { ProductInfoService } from '../../@core/mock/marchandizer/product-info.service';
import { ProductSubCategoriesService } from '../../@core/mock/marchandizer/product-sub-categories.service';
import { RemoveStockReasonService } from '../../@core/mock/marchandizer/remove-stock-reason.service';
import { StockInfoService } from '../../@core/mock/marchandizer/stock-info.service';
import { ToasterService } from '../../@core/mock/toaster.service';
 
import { ProductSerialNumberModalComponent } from '../product-serial-number-modal/product-serial-number-modal.component';
import { ProductSeralNumbersService } from '../product-serial-numbers/product-seral-numbers.service';
import { SupplierService } from '../Supplier/supplier.service';
import { UnitService } from '../Unit/unit.service';

@Component({
  selector: 'ngx-remove-purchase-stock',
  templateUrl: './remove-purchase-stock.component.html',
  styleUrls: ['./remove-purchase-stock.component.scss']
})
export class RemovePurchaseStockComponent implements OnInit {
  myControl = new FormControl();

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
  filteredOptions: any;
  damageRemark='';
  constructor(public productInfoService:ProductInfoService,
    private toastrService:ToasterService,
    private productCategoriesService:ProductCategoryService,
    public stockinfoService:StockInfoService,
    private productSubCategoryService:ProductSubCategoriesService,
    private router:Router,
    private route:ActivatedRoute,
    private unitService:UnitService,
    private dialog:MatDialog,
    public dropdownValuesService: DropdownValuesService,
    private supplierService:SupplierService,
    public languageService:LanguageConverterService,
    public removeStockReasonService:RemoveStockReasonService,
    public productSerialNumbersService:ProductSeralNumbersService,
    ) { 
      this.dropdownValuesService.initialization();
    }

private _filter(value: any): any[] {
      const filterValue = value.toLowerCase();
  
      return this.prdctList.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
    applyFilter() {
      //this.invoiceEntryForm= this.fb.array([]);
     this.myControl.reset('');
     // this.filteredOptions = this.myControl.valueChanges.pipe(
     //   startWith(''),
     //   map(value => this._filter(value))
     // );
     }
     vatAmountNDiscountCalculation(){}
     productSelection(key){
      let filterObj=this.prdctList.find(f=>f.key==key);
      this.Product=filterObj;
       
      
       
      }
      
  ngOnInit() {
    this.Product.catagory='';
    this.Product.name='';
    this.Product.newQty='';
    this.Product.unit='';
    this.Product.cost='';
    this.Product.supplier='';
  
 
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
   
    this.editkey = this.route.snapshot.paramMap.get('key');
    
    this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.prdctList=[];
       item.forEach(element => {
         var y = element.payload.toJSON();
         y["key"] = element.key;
 
      
         this.prdctList.push(y as StockInfo);
       });
      });

    if(this.editkey!=null){
    this.subscription= this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
       
     
      this.productInfos.push(y as ProductInfo);
      });
  this.Product= this.productInfos.find(f=>f.key==this.editkey);
  
  
    });
  }
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
 

  delete(element){
  
      element.quantity=(element.quantity-element.newQty);
       delete element.newQty;
       element.serialNumbers=this.productSerialNumbersService.ObjectReciever.value;
      this.productInfoService.updateProductInfo(element.key,element).then(data=>{
        element.damageOrRemovalReasons=this.damageRemark;
      this.removeStockReasonService.addReasonsOfRemovalStock(element).then(t=>{
        this.toastrService.openSnackBarSuccess('Item Remove from Inventory Successfull !','Ok')
      })
      
 
        },(err) => {  
      this.toastrService.errorMessage()
      }) 
 

  }

  onAddSeialNumbera(value){
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "60%";
   dialogConfig.data=value;
    //this.dialog.open(ShowTrimsItemFormComponent, dialogConfig);
    this.dialog.open(ProductSerialNumberModalComponent, dialogConfig);
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
    this.router.navigate(['/inventory/stock-info']);
  }
}
