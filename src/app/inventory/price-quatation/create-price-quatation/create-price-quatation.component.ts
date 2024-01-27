 
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
 
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
 
import { Subscription, Observable } from 'rxjs';
 
import { NbToastrService } from '@nebular/theme';
 
import { Router } from '@angular/router';

 
 
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
 
 
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { ProductCategories } from '../../../@core/data/marchanzider-model/product-categories';
import { ProductSubCategories } from '../../../@core/data/marchanzider-model/product-sub-categories';
import { ProductInfo } from '../../../@core/data/ProductInfo';
import { invoice } from '../../../@core/data/marchanzider-model/invoice';
import { StockInfo } from '../../../@core/data/marchanzider-model/stock-info';
import { Tostr } from '../../../@core/data/tostr.model';
import { InvoicEntryModel } from '../../invoice-entry/ivoiceEntryModel';
import { InvoiceDetailsService } from '../../../@core/mock/marchandizer/invoice-details.service';
import { ProductCategoryService } from '../../../@core/mock/marchandizer/product-category.service';
import { DropdownValuesService } from '../../../@core/mock/marchandizer/dropdown-values.service';
import { ProductInfoService } from '../../../@core/mock/marchandizer/product-info.service';
import { ProductSubCategoriesService } from '../../../@core/mock/marchandizer/product-sub-categories.service';
import { CustomerService } from '../../Customer/customer.service';
import { DateResizerService } from '../../../@core/mock/marchandizer/date-resizer.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { UserInfoTblService } from '../../../@core/data/ClientDb/user-info-tbl.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
import { ProductSerialstblService } from '../../../@core/data/ClientDb/product-serialstbl.service';
import { ProductSeralNumbersService } from '../../product-serial-numbers/product-seral-numbers.service';
import { ProductSerialNumberModalComponent } from '../../product-serial-number-modal/product-serial-number-modal.component';
import { PriceQuotationService } from '../../../@core/mock/marchandizer/price-quotation.service';
  
 
@Component({
  selector: 'ngx-create-price-quatation',
  templateUrl: './create-price-quatation.component.html',
  styleUrls: ['./create-price-quatation.component.scss']
})
export class CreatePriceQuatationComponent implements OnInit,OnDestroy {
  isShow=false;
  myControlCustomer = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
   
  filteredOptionsCustomer: Observable<string[]>;
  productCategories:ProductCategories[]=[];
  productSubCategories:ProductSubCategories[]=[];
  customer:any[]=[];
  productBrands:ProductInfo[]=[];
  invoiceEntryForm: any = this.fb.array([]);
  invoicelist:any[]=[];
  productInfos:invoice[]=[];
  stockInfo:StockInfo[]=[];
  subscription:Subscription;
  Tostr=new Tostr();
  totalAmount:number=0;
  totalVat:number=0;
  totalDiscount:number=0;
  entryDate:any='';
  clinentName:string='';
  Mobile:string='';
  PaidAmount:number=0;
  InvoicEntryModel =new InvoicEntryModel();
   
  filterproductSubCategories1=[];
  isProductDefine:boolean=false;
  customers: any[];
  isShowCustomerAddBtn:boolean;
 // PreviousDue:number=0
  totalPayable:number=0
  additionalDiscount:number=0
  totalDueAmount:number=0
  totalCurrentDue:number=0
  SalesInvoices: any[];
  invoiceKey: any='';
  salesInvoiceNo=0;
  salesBy='';
  serialNumberStorage=[];
  customerobj:any;
  OriginalAmount: number=0;
  
  itemCount: number;
  constructor(public PriceQuotationService:PriceQuotationService,
    private productCategoriesService:ProductCategoryService,
   public dropdownValuesService: DropdownValuesService,
    private fb: FormBuilder,
    private router:Router ,
    private productInfosServicess:ProductInfoService,
    private productSubCategoriesService:ProductSubCategoriesService,
    private customerService:CustomerService,
    private dateResizerService:DateResizerService,
    public languageService:LanguageConverterService,
    private userInfoTblService:UserInfoTblService,
    private dialog:MatDialog,
   public elementRef: ElementRef,
    private toasterService:ToasterService,
    private productSerialstblService:ProductSerialstblService,
    public productSerialNumbersService:ProductSeralNumbersService,
    ) { 

      
 
    }

    
    private _filterCustomer(value: any): any[] {
      const filterValue = value.toLowerCase();
     this.isShowCustomerAddBtn= this.customers.some(f=>f.phone.trim()==this.myControlCustomer.value);
      return this.customers.filter(option => option.phone.toLowerCase().indexOf(filterValue) === 0);
    }
 
    
   
  ngOnInit() {
      this.entryDate=this.dateResizerService.resize(new Date());
      
      //this.productCategoriesDDL();
      this.productBrandDDL();
    //  this.productSubCategoryDDL();
      this.loadCustomer();
      this.loadSalesInvoiceDetails();
   
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.productSerialNumbersService.ObjectReciever.next([]);
  }
 
    loadSalesInvoiceDetails(){
    this.subscription= this.PriceQuotationService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      
      this.SalesInvoices=[];
      item.forEach(element => {
        var y = element.payload.toJSON();

        y["key"] = element.key;
   
      this.SalesInvoices.push(y);
      
      });
      this.salesInvoiceNo=this.SalesInvoices.length;

  }); 
   }
      // productCategoriesDDL(){
      //   this.subscription= this.productCategoriesService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      //     item.forEach(element => {
      //       var y = element.payload.toJSON();
      //       y["key"] = element.key;
      
      //       this.productCategories.push(y as ProductCategories);
      //     })
          
      //   })
      // }
      productBrandDDL(){
        
        //this is actualy product info information loaded
        this.subscription= this.productInfosServicess.getAllProductInfo().snapshotChanges().subscribe(item=>{
          item.forEach(element => {
            var y = element.payload.toJSON();
            y["key"] = element.key;
      
            this.productBrands.push(y as ProductInfo);
          })
      
        })
      }
      loadCustomer(){
        this.subscription= this.customerService.getAllMyCustomerProfileInfo().snapshotChanges().subscribe(item=>{
          this.customers=[];
          item.forEach(element => {
            var y = element.payload.toJSON();
    
            y["key"] = element.key;
       
          this.customers.push(y);
          
          });
          

          this.filteredOptionsCustomer = this.myControlCustomer.valueChanges.pipe(
            startWith(''),
            map(value => this._filterCustomer(value))
          );
      }); 
      }
      // productSubCategoryDDL(){
        
      //   //this is actualy product info information loaded
      //   this.productSubCategoriesService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      //     item.forEach(element => {
      //       var y = element.payload.toJSON();
      //       y["key"] = element.key;
      
      //       this.productSubCategories.push(y as ProductSubCategories);
      //     })
        
      //   })
      // }
      addInvoiceRecord() {
        this.invoiceEntryForm.push(this.fb.group({
          ProductCategory: [''],
          ProductSubCategory:[''],
          ProductBrand:[''],
          Quantity: [0],
          unit:[''],
          Rate: [0],
          Amount: [0],
          key:[''],
          vatPercent:[0],
          vatAmount:[0],
          discountPercent:[0],
          discuntAmount:[0],
          remarks:'',
          warantyNgurenty:'',
          customerKey:'',
       //   productSerials:this.fb.array([])
        }));
      }
     calculateAdditionalDiscount(){
        this.totalPayable=this.totalAmount-this.additionalDiscount;
        this.totalCurrentDue=this.totalPayable-(this.PaidAmount+this.additionalDiscount);
        this.totalDueAmount=this.totalPayable-(this.PaidAmount+this.additionalDiscount);
      }
      recordSubmit(fg: FormGroup) {
     
            // if(fg.value.Key=='')
            // {
            //   this.PriceQuotationService.addProductInfo(fg.value).then(
            //     (res: any) => {   
            //       console.log(res)   ;   
            //       fg.patchValue({ Key:res.key });
            //       this.Tostr.showToast('primary',"", "Saved Successfully", "",this.toastrService);
            //     });
            
            // } 
            // else
           // this.PriceQuotationService.updateProductInfo(fg.value.Key,fg.value).then(
              // (res: any) => {
              //   console.log(fg.value.Key);
              //   this.Tostr.showToast('primary',"", "Updated Successfully", "",this.toastrService);
           //   }
           //   );

           //   console.log(fg.value.Key);
      }

      CalculateTotal(){
        
      }

      onDelete(invoiceEntryForm,i) {
       
        this.serialNumberStorage= this.serialNumberStorage.filter(f=>f.productKey!=this.invoiceEntryForm.value[i].key);
       
      
        this.invoiceEntryForm.value.splice(i, 1);
       
     
       this.invoiceEntryForm.removeAt(i);
       this.OnChangeActions(invoiceEntryForm.value);
 
      }
      onUpdate(fg: FormGroup,invoiceEntryForm, i) {

for (var j = 0, l = invoiceEntryForm.value.length; j < l; j++) {
    if (invoiceEntryForm.value[j] === i) {
      invoiceEntryForm.value[j].ProductSubCategory = invoiceEntryForm.value.ProductSubCategory;
      invoiceEntryForm.value[j].Quantity = invoiceEntryForm.value.Quantity;
      invoiceEntryForm.value[j].Rate = invoiceEntryForm.value.Rate;
      invoiceEntryForm.value[j].Amount = invoiceEntryForm.value.Amount;
     // this.totalamnt=+invoiceEntryForm.value.amn;
        break;
    }
}
       }

allSubmit(){
   
  //this.loadSalesInvoiceDetails();
  let mobile=this.myControlCustomer.value;
  if(mobile==null||mobile==''){
    this.toasterService.openSnackBarWarning('Client Mobile Number is Requird !','Ok');
    
    return;
  }
  if(this.clinentName==null||this.clinentName==''){
    this.toasterService.openSnackBarWarning('Client Name is Requird !','Ok');
    
    return;
  }
  if(this.invoiceEntryForm.value.length<=0){
    this.toasterService.openSnackBarWarning('Please Choose Item to Sale !','Ok');
   
    return;
  }
 const checkQuantiy= this.invoiceEntryForm.value.find(f=>f.Quantity==null||f.Quantity==undefined||f.Quantity==''||f.Quantity<=0);
 if(checkQuantiy!=undefined){
  this.toasterService.openSnackBarWarning('Quantity is Requird !','Ok');
  
  return;
 }

//  if(this.PaidAmount<=0){
//   this.Tostr.showToast('danger',"","Please Receive Minimum Amount!", "",this.toastrService);
//   return;
//  }
  // this.CalculateTotal();

   
 let invoiceEntryDetails=new InvoicEntryModel();
 
 invoiceEntryDetails.items=this.invoiceEntryForm.value;
 invoiceEntryDetails.OriginalAmount=this.OriginalAmount
 invoiceEntryDetails.totalAmount=this.totalPayable;
 invoiceEntryDetails.SubTotal=this.totalAmount;
 invoiceEntryDetails.entryDate=this.entryDate;
 invoiceEntryDetails.salesBy=this.salesBy;
 invoiceEntryDetails.PaidAmount=0;
 invoiceEntryDetails.clienName=this.clinentName;
 invoiceEntryDetails.DueAmount=0;
 invoiceEntryDetails.totalVat=this.totalVat;
 invoiceEntryDetails.totalDiscount=this.totalDiscount;
 invoiceEntryDetails.totalAddiDiscnt=this.additionalDiscount==null?0:this.additionalDiscount;
 invoiceEntryDetails.TotalBuyingPrice=0;
 invoiceEntryDetails.totalProfit=0;
 invoiceEntryDetails.invoiceNo=this.SalesInvoices.length;
 invoiceEntryDetails.PrevDue=0;
 
  invoiceEntryDetails.mobile=this.myControlCustomer.value;
  invoiceEntryDetails.entryBy=this.userInfoTblService.ObjectReciever.value.phone;
this.PriceQuotationService.addProductInfo(invoiceEntryDetails).then(t=>{
  this.invoiceKey=t.key;
  this.toasterService.openSnackBarSuccess('Quotation Created Successfully','Ok');
 
  this.reset();
  this.serialNumberStorage=[];
},err=>{
  this.toasterService.errorMessage();
});


}

 
  backToInvoiceInfo(){
    //this.router.navigate(['/inventory/Invoice-Details']);
  }
  finalPayableCalculation(){
  this.totalPayable=this.totalPayable-this.PaidAmount;
  }
  OnChangeActions(arry){
    this.totalAmount=0;
    this.totalVat=0;
    this.totalDiscount=0;
    this.totalPayable=0;
    this.additionalDiscount=0;
    this.PaidAmount=0;
    this.totalCurrentDue=0;
    this.OriginalAmount=0;
    this.invoiceEntryForm= this.fb.array([]);
   arry.forEach(element => {
     
      let productObj=this.productBrands.find(f=>f.key==element.key);
      //  if(productObj.quantity<element.Quantity){
      //   this.toasterService.stockFinisMessage(productObj.quantity);
        
      //   element.Quantity=0;
      //  }
        element.Quantity=element.Quantity==null?0:element.Quantity; 
        //element.Quantity=element.Quantity==undefined?0:element.Quantity; 
        let vatAmount=(element.vatAmount*element.Quantity);
        let discountAmount=(((element.Rate*element.discountPercent)/100)*element.Quantity);
        let amount= (element.Quantity*element.Rate);
         this.OriginalAmount+=amount;
         this.totalAmount+=(amount+vatAmount)-discountAmount;
         this.totalVat+=vatAmount ;
         this.totalDiscount+=discountAmount;
         this.invoiceEntryForm.push(this.fb.group({
          ProductCategory: element.ProductCategory,
          ProductSubCategory: element.ProductSubCategory,
          ProductBrand: element.ProductBrand,
          Quantity: element.Quantity,
          unit:element.unit,
          Rate: element.Rate,
          productBuyingPrice:element.productBuyingPrice,
          Amount:((amount+vatAmount)-discountAmount),
          key:element.key,
          vatPercent:element.vatPercent,
          discountPercent:element.discountPercent,
          vatAmount:vatAmount,
          discuntAmount:discountAmount,
          remarks:element.remarks,
          warantyNgurenty:element.warantyNgurenty,
         // productSerials:element.productSerials
         }
         ));
      });
 
      this.totalPayable=this.totalAmount;
      this.totalCurrentDue=this.totalPayable-(this.PaidAmount+this.additionalDiscount);
      this.totalDueAmount=this.totalPayable-(this.PaidAmount+this.additionalDiscount);
     //  });

  
      
}
customerSelection(obj){
 
  //this.PreviousDue=0;
  this.clinentName=obj.name;
  //this.PreviousDue=obj.DueAmount;
  // let customerDues=this.SalesInvoices.filter(f=>f.mobile==obj.phone);
  
  // customerDues.forEach(element => {
  //   this.PreviousDue+=element.DueAmount;
  // });
 //this.customerService.
}
currentDueClcltn(){
 this.totalCurrentDue= this.totalPayable-this.PaidAmount;
}
addNewCustomer(){
   
  if(this.myControlCustomer.value==undefined||
    this.myControlCustomer.value==null||
    this.myControlCustomer.value==''){
      this.toasterService.openSnackBarWarning(`Add Customer Phone Number !`,'ok')
   // this.Tostr.showToast('danger',"", ""+" ", "",this.toastrService);
    return;
  }
  if(this.clinentName==undefined||
    this.clinentName==null||
    this.clinentName==''){
      this.clinentName='No Name'
  }
  
  let obj={name:this.clinentName,phone:this.myControlCustomer.value};
  this.customerService.addMyCustomerProfileInfo(obj).then(t=>{
    this.toasterService.openSnackBarSuccess(`Save Successfull !`,'ok')
  })
   
}

productSelection(key){

  let result=this.invoiceEntryForm.value.filter(f=>f.key==key);
  if(result.length>0){
    this.toasterService.openSnackBarWarning(`Already this Product Added in the Invoice!`,'ok')
    
  return;
  } 
let filterObj=this.productBrands.find(f=>f.key==key);
console.log(filterObj)
this.dropdownValuesService.Category=filterObj.catagory;
this.dropdownValuesService.SubCategory=filterObj.subCategory; 
 
 if(this.myControlCustomer.value==undefined||
  this.myControlCustomer.value==null||
  this.myControlCustomer.value==''){
    this.toasterService.openSnackBarWarning(`Add Customer First !`,'ok')
 // this.Tostr.showToast('danger',"", ""+" ", "",this.toastrService);
  return;
}

  this.invoiceEntryForm.push(this.fb.group({
    ProductCategory:filterObj.catagory ,
    ProductSubCategory:filterObj.subCategory,
    ProductBrand:filterObj.name,
    Quantity: [0],
    unit:filterObj.unit,
    Rate: filterObj.cost,
    productBuyingPrice:filterObj.productBuyingPrice,
    Amount: [0],
    key:filterObj.key,
    vatPercent:filterObj.vatPercent==undefined?0:filterObj.vatPercent,
    discountPercent:filterObj.discountPercent==undefined?0:filterObj.discountPercent,

    vatAmount:filterObj.vatAmount==undefined?0:filterObj.vatAmount,
    discuntAmount:filterObj.discountAmount==undefined?0:filterObj.discountAmount,
    warantyNgurenty:filterObj.warantyNgurenty ,
    remarks:filterObj.remarks ,
   // productSerials:this.fb.array([])
  }));
 

 

}
productSelectionWithSerialNumber(option){
let result=this.invoiceEntryForm.value.filter(f=>f.key==option.productKey);
if(result.length>0){
  this.toasterService.openSnackBarWarning(' Already this Product Added in the Invoice!','')
  //this.Tostr.showToast('danger',"", ""+"", "",this.toastrService);
return;
}
 this.serialNumberStorage.push(option);
  let filterObj=this.productBrands.find(f=>f.key==option.productKey);
 let buyingprice=0;
  if(option.rate!=null&&option.rate!=undefined&&option.rate!=null&&option.rate>0){
    buyingprice=option.rate;
  }else{
 let  buyingprice=filterObj.productBuyingPrice;
 }
 
  this.dropdownValuesService.Category=filterObj.catagory;
  this.dropdownValuesService.SubCategory=filterObj.subCategory; 
   
   if(this.myControlCustomer.value==undefined||
    this.myControlCustomer.value==null||
    this.myControlCustomer.value==''){
      this.toasterService.openSnackBarAlerming('Add Customer First !','ok')
    
    return;
  }
  
  if(filterObj.quantity<=0){
    this.toasterService.openSnackBarAlerming('Stock is Already Finished !','ok')
    
   return;
  }else{
    this.invoiceEntryForm.push(this.fb.group({
      ProductCategory:filterObj.catagory ,
      ProductSubCategory:filterObj.subCategory,
      ProductBrand:filterObj.name,
      Quantity: [0],
      unit:filterObj.unit,
      Rate: filterObj.cost,
      productBuyingPrice:buyingprice,
      Amount: [0],
      key:filterObj.key,
      vatPercent:filterObj.vatPercent==undefined?0:filterObj.vatPercent,
      discountPercent:filterObj.discountPercent==undefined?0:filterObj.discountPercent,
  
      vatAmount:filterObj.vatAmount==undefined?0:filterObj.vatAmount,
      discuntAmount:filterObj.discountAmount==undefined?0:filterObj.discountAmount,
      warantyNgurenty:filterObj.warantyNgurenty ,
      remarks:filterObj.remarks ,
     // productSerials:entries
    }));
  }
  
   
  
  //console.log(typeof(this.invoiceEntryForm.value[0].ProductSerials))
  }
printPreviw(){
  if(this.invoiceKey==undefined){

   this.toasterService.saveFirstMessage();
    return;
  }
  if(this.invoiceKey!=''){
   // this.router.navigate(['/inventory/invoice-print-v2/',this.invoiceKey])
    this.router.navigate(['/inventory/Quotation-print/',this.invoiceKey])
  }else{
    this.toasterService.saveFirstMessage();
  }
 
}
reset(){
  this.totalAmount=0;
  this.totalVat=0;
  this.totalDiscount=0;
  this.additionalDiscount=0;
 //this.PreviousDue=0;
  this.PaidAmount=0;
  this.totalPayable=0;
  this.totalCurrentDue=0;
  this.clinentName='';
    this.dropdownValuesService.Category='';
    this.dropdownValuesService.SubCategory='';
    this.myControlCustomer.reset('');
    
    this.serialNumberStorage=[];
   
    
this.invoiceEntryForm= this.fb.array([]);
this.dropdownValuesService.myControlSerialNumber.reset('');
this.dropdownValuesService.myControl.reset('');
this.dropdownValuesService.filterProductName();
this.dropdownValuesService.filterSerialNumber();
}

onAddSeialNumbera(value,index){
 
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  dialogConfig.height = "60%";
  value.index=index;
 dialogConfig.data=value;
  //this.dialog.open(ShowTrimsItemFormComponent, dialogConfig);
  this.dialog.open(ProductSerialNumberModalComponent, dialogConfig);
}

  
onDeleteSerial(j){

  this.serialNumberStorage.splice(j, 1);
}
 
clearInputCustomer(){
  this.myControlCustomer.reset('');
}
clearInputChooseProduct(){
  
  this.dropdownValuesService.myControl.reset('');

}
clearSerialInputNumber(){
  this.dropdownValuesService.myControlSerialNumber.reset('');
  
}
}

