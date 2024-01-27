import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserInfoTblService } from '../../../@core/data/ClientDb/user-info-tbl.service';
import { invoice } from '../../../@core/data/marchanzider-model/invoice';
import { ProductCategories } from '../../../@core/data/marchanzider-model/product-categories';
import { ProductSubCategories } from '../../../@core/data/marchanzider-model/product-sub-categories';
import { ProductInfo } from '../../../@core/data/ProductInfo';
import { Tostr } from '../../../@core/data/tostr.model';
import { DailyIncomeExpanseOrAccount, DailyIncomeExpanseService } from '../../../@core/mock/marchandizer/daily-income-expanse.service';
import { DateResizerService } from '../../../@core/mock/marchandizer/date-resizer.service';
import { DropdownValuesService } from '../../../@core/mock/marchandizer/dropdown-values.service';
import { InvoiceDetailsService } from '../../../@core/mock/marchandizer/invoice-details.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { ProductCategoryService } from '../../../@core/mock/marchandizer/product-category.service';
import { ProductInfoService } from '../../../@core/mock/marchandizer/product-info.service';
import { ProductSubCategoriesService } from '../../../@core/mock/marchandizer/product-sub-categories.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
 
import { CustomerService } from '../../Customer/customer.service';
import { InvoicEntryModel } from '../../invoice-entry/ivoiceEntryModel';
import { ProductSerialNumbersComponent } from '../../product-serial-numbers/product-serial-numbers.component';
import { SuplierShopService } from '../../supplier-shop/suplier-shop.service';
import { SupplierProfileComponent } from '../../Supplier/supplier-profile/supplier-profile.component';
import { SupplierService } from '../../Supplier/supplier.service';
import { PurchaseInvoiceDetailsService } from '../purchase-invoice-details.service';
import { ProductSeralNumbersService } from '../../product-serial-numbers/product-seral-numbers.service';

@Component({
  selector: 'ngx-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.scss']
})
export class NewPurchaseComponent  implements OnInit,OnDestroy {
  myControl = new FormControl();
  myControlCustomer = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  filteredOptionsCustomer: Observable<string[]>;




  productCategories:ProductCategories[]=[];
  productSubCategories:ProductSubCategories[]=[];
  productBrands:ProductInfo[]=[];
  invoiceEntryForm: FormArray = this.fb.array([]);
  invoicelist:any[]=[];
  productInfos:invoice[]=[];
   
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
  PreviousDue:number=0
  totalPayable:number=0
  additionalDiscount:number=0
  totalDueAmount:number=0
  totalCurrentDue:number=0
  SalesInvoices: any[];
  Suppliers: any;
  PurchaseInvoices: any[];
  salesInvoiceNo=0; 
  invoiceKey: string;
  Category='';
  SubCategory=''; 
  memoNo='';
  OriginalAmount: number=0;
  editkey;
  dailyIncomeExpanseOrAccount=new  DailyIncomeExpanseOrAccount()
  serialNumberStorage=[];
  isInvoiceSubmitted: boolean=false;
  constructor(public invoiceService:InvoiceDetailsService,
   // private productCategoriesService:ProductCategoryService,
    public languageService:LanguageConverterService,
    private fb: FormBuilder,
    public invoiceDetailsService:InvoiceDetailsService,
    private toastrService:ToasterService,
    private router:Router ,
    public productInfosServicess:ProductInfoService,
   // private productSubCategoriesService:ProductSubCategoriesService,
   // private customerService:CustomerService,
    private dateResizerService:DateResizerService,
    private mySupplier:SupplierService,
    private userInfoTblService:UserInfoTblService,
    public purchaseInvoiceDetailsService:PurchaseInvoiceDetailsService,
    public dropdownValuesService: DropdownValuesService,
    private dialog:MatDialog,
    private route:ActivatedRoute,
    public accountService:DailyIncomeExpanseService,
    public productSerialNumbersService:ProductSeralNumbersService,
    ) { 
      this.productSerialNumbersService.ObjectTbl.subscribe(res=>{
   
    
         
        if(res!=0){
          
          res.forEach((element) => {
            this.serialNumberStorage.push({key:element.key,productKey:element.productKey,
              productName:element.productName,rate:element.rate,serialNumber:element.serialNumber,
              suplierOrgName:element.suplierOrgName});
          });
  
        
        }
      });
 
    }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.serialNumberStorage=[];
  }

    private _filter(value: any): any[] {
      const filterValue = value.toLowerCase();
  
      return this.productBrands.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
    private _filterCustomer(value: any): any[] {
      const filterValue = value.toLowerCase();
   //  this.isShowCustomerAddBtn= this.customers.some(f=>f.phone.trim()==this.myControlCustomer.value);
      return this.Suppliers.filter(option => option.phone.toLowerCase().indexOf(filterValue) === 0);
    }
  ngOnInit() {
      this.entryDate=this.dateResizerService.resize(new Date());
       
      
      this.productBrandDDL();
      
      this.loadCustomer();  
      this.loadPurchaseInvoiceDetails();
      
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
   
    
   

  }
  applyFilter() {
  this.myControl.reset('');
  }
   loadPurchaseInvoiceDetails(){
    this.subscription= this.purchaseInvoiceDetailsService.getAllpurchaseInvDtlsInfo().snapshotChanges().subscribe(item=>{
      this.PurchaseInvoices=[];
      item.forEach(element => {
        var y = element.payload.toJSON();

        y["key"] = element.key;
   
      this.PurchaseInvoices.push(y);
      
      });
      this.salesInvoiceNo=this.PurchaseInvoices.length;
  }); 
   }
   onDeleteSerial(j){

    this.serialNumberStorage.splice(j, 1);
  }
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
        this.subscription= this.mySupplier.getAllMySupplierProfileInfo().snapshotChanges().subscribe(item=>{
          this.Suppliers=[];
          item.forEach(element => {
            var y = element.payload.toJSON();
    
            y["key"] = element.key;
       
          this.Suppliers.push(y);
          
          });
         

          this.filteredOptionsCustomer = this.myControlCustomer.valueChanges.pipe(
            startWith(''),
            map(value => this._filterCustomer(value))
          );
      }); 
      }
      
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
          moreDtls:'',
          customerKey:''
          
        }));
      }
     calculateAdditionalDiscount(){
        this.totalPayable=(this.totalAmount-this.additionalDiscount);
        this.totalCurrentDue=this.totalPayable-(this.PaidAmount+this.additionalDiscount);
      }
      recordSubmit(fg: FormGroup) {
     
            // if(fg.value.Key=='')
            // {
            //   this.invoiceService.addProductInfo(fg.value).then(
            //     (res: any) => {   
             
            //       fg.patchValue({ Key:res.key });
            //       this.Tostr.showToast('primary',"", "Saved Successfully", "",this.toastrService);
            //     });
            
            // } 
            // else
           // this.invoiceService.updateProductInfo(fg.value.Key,fg.value).then(
              // (res: any) => {
               
              //   this.Tostr.showToast('primary',"", "Updated Successfully", "",this.toastrService);
           //   }
           //   );

            
      }

       
      redirectForCreateNewSupplier(){
        this.router.navigate(["/inventory/my-supplier-profile"]);
      }
      onDelete(invoiceEntryForm,i) {
        this.serialNumberStorage= this.serialNumberStorage.filter(f=>f.productKey!=this.invoiceEntryForm.value[i].key);
      //  this.invoiceEntryForm
       invoiceEntryForm.value.splice(i, 1);
       this.invoiceEntryForm.removeAt(i);
       this.OnChangeActions();
      
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
  this.loadPurchaseInvoiceDetails();
  let mobile=this.myControlCustomer.value;
  if(mobile==null||mobile==''){
    this.toastrService.openSnackBarWarning('Supplier Mobile Number is Requird !','Ok')
     
    return;
  }
  if(this.clinentName==null||this.clinentName==''){
    this.toastrService.openSnackBarWarning('Supplier Name is Requird !','Ok')
     
    return;
  }
  if(this.invoiceEntryForm.value.length<=0){
    this.toastrService.openSnackBarWarning('Please Choose Item to Purchase !','Ok')
     
    return;
  }
  const checkQuantiy= this.invoiceEntryForm.value.find(f=>f.Quantity==null||f.Quantity==undefined||f.Quantity==''||f.Quantity<=0);
 if(checkQuantiy!=undefined){
  this.toastrService.openSnackBarWarning('Quantity is Requird !','Ok')
 
          return;
 }
 
 this.isInvoiceSubmitted=true;
 let entryDateTime=this.dropdownValuesService.dateNdTimeFormat(this.entryDate); 

 let invoiceEntryDetails=new InvoicEntryModel();
 
 invoiceEntryDetails.items=this.invoiceEntryForm.value;
 
 invoiceEntryDetails.OriginalAmount=this.OriginalAmount
 invoiceEntryDetails.totalAmount=this.totalPayable;
 invoiceEntryDetails.SubTotal=this.totalAmount;
 invoiceEntryDetails.entryDate=this.entryDate;
 invoiceEntryDetails.entryDateTime=entryDateTime;
 invoiceEntryDetails.PaidAmount=this.PaidAmount;
 invoiceEntryDetails.clienName=this.clinentName;
 invoiceEntryDetails.DueAmount=this.totalCurrentDue;
 invoiceEntryDetails.totalVat=this.totalVat;
 invoiceEntryDetails.totalDiscount=this.totalDiscount;
 invoiceEntryDetails.totalAddiDiscnt=this.additionalDiscount;
 invoiceEntryDetails.invoiceNo=this.salesInvoiceNo;
 invoiceEntryDetails.PrevDue=0;
 invoiceEntryDetails.memoNo=this.memoNo;
  invoiceEntryDetails.mobile=this.myControlCustomer.value;
  invoiceEntryDetails.entryBy=this.userInfoTblService.ObjectReciever.value.phone;

  this.dailyIncomeExpanseOrAccount.account='Debited';
  this.dailyIncomeExpanseOrAccount.accountHead='Purchase';
  this.dailyIncomeExpanseOrAccount.date=this.entryDate;
  this.dailyIncomeExpanseOrAccount.entryDateTime=entryDateTime;

  if(invoiceEntryDetails.PaidAmount>0){
    this.dailyIncomeExpanseOrAccount.totalExpense=invoiceEntryDetails.PaidAmount;
    this.dailyIncomeExpanseOrAccount.purpose=`Purchase From ${this.clinentName}`;
    this.accountService.addProductInfov2(this.dailyIncomeExpanseOrAccount).subscribe(res=>{});
  }

  (invoiceEntryDetails.items).forEach((invoiceDetails: any) => {
    invoiceDetails.moreDtls='';
   

    invoiceDetails.serialNumbers=this.serialNumberStorage.filter(f=>f.productKey==invoiceDetails.key);

   let filteredProductObj= this.productBrands.find(f=>f.key==invoiceDetails.key);
   filteredProductObj.quantity=(filteredProductObj.quantity+invoiceDetails.Quantity);
   filteredProductObj.productBuyingPrice=invoiceDetails.Rate;
 
    this.productInfosServicess.updateProductInfo(invoiceDetails.key,filteredProductObj).then(t=>{},err=>{console.log(err)})
    });

this.purchaseInvoiceDetailsService.addpurchaseInvDtlsInfo(invoiceEntryDetails).then(t=>{
  this.invoiceKey=t.key;
  this.reset();
  this.toastrService.saveMessage();
  this.isInvoiceSubmitted=false;
 
},err=>{
  this.isInvoiceSubmitted=false;
  this.toastrService.errorMessage();
});

}

 

  backToInvoiceInfo(){
    this.router.navigate(['/inventory/purchase-info']);
  }
  finalPayableCalculation(){
  this.totalPayable=this.totalPayable-this.PaidAmount;
  this.totalCurrentDue=this.totalPayable-(this.PaidAmount+this.additionalDiscount);
  }
  OnChangeActions(){
    this.totalAmount=0;
    this.totalVat=0;
    this.totalDiscount=0;
    this.totalPayable=0;
    this.additionalDiscount=0;
    this.PaidAmount=0;
    this.totalCurrentDue=0;
    this.OriginalAmount=0;
    this.invoiceEntryForm.value.forEach(element => {
      
        element.Quantity=element.Quantity==null?0:element.Quantity; 
        let vatAmount=(((element.Rate*element.vatPercent)/100)*element.Quantity);
        let discountAmount=(((element.Rate*element.discountPercent)/100)*element.Quantity);
        let amount= (element.Quantity*element.Rate);
        this.OriginalAmount+=amount;
         this.totalAmount+=(amount+vatAmount)-discountAmount;
         this.totalVat+=vatAmount ;
         this.totalDiscount+=discountAmount;
  
            element.ProductCategory= element.ProductCategory;
            element.ProductSubCategory= element.ProductSubCategory;
            element.ProductBrand= element.ProductBrand;
            element.Quantity= element.Quantity;
            element.unit=element.unit;
            element.Rate= element.Rate;
            element.Amount=((amount+vatAmount)-discountAmount);
            element.key=element.key;
            element.vatPercent=element.vatPercent; 
            element.discountPercent=element.discountPercent;
            element.vatAmount=vatAmount;
            element.discuntAmount=discountAmount;
            element.remarks=element.remarks==undefined?'':element.remarks;
            element.warantyNgurenty=element.warantyNgurenty==undefined?'':element.warantyNgurenty;
        
      });
      this.totalPayable=this.totalAmount;
       this.totalCurrentDue=this.totalPayable-(this.PaidAmount+this.additionalDiscount);
  //    this.totalDueAmount=this.totalPayable-(this.PaidAmount+this.additionalDiscount);
      
}
customerSelection(obj){
 
  this.PreviousDue=0;
  this.clinentName=obj.name;
  let supplierDues=this.PurchaseInvoices.filter(f=>f.mobile==obj.phone);
   
  supplierDues.forEach(element => {
    this.PreviousDue+=element.DueAmount;
  });
 
}
currentDueClcltn(){
  this.totalCurrentDue=this.totalPayable-(this.PaidAmount+this.additionalDiscount);
}
addNewCustomer(){
 
   
}

productSelection(key){

  let result=this.invoiceEntryForm.value.filter(f=>f.key==key);
  if(result.length>0){
    this.toastrService.openSnackBarWarning(`Already this Product Added in the Purchase!`,'ok')
  return;
  } 

  if(this.myControlCustomer.value==undefined||
    this.myControlCustomer.value==null||
    this.myControlCustomer.value==''){
      this.toastrService.openSnackBarWarning(`Add Supplier First !`,'ok')
   // this.Tostr.showToast('danger',"", ""+" ", "",this.toastrService);
    return;
  }

let filterObj=this.productBrands.find(f=>f.key==key);
this.Category=filterObj.catagory;
this.SubCategory=filterObj.subCategory;
if(filterObj.Desc!=undefined){
  filterObj.Desc=filterObj.Desc;
}else{
  filterObj.Desc='';
}
let dtlsInfo=`
Category: ${filterObj.catagory}
Sub Category: ${filterObj.subCategory}
item Desc: ${filterObj.Desc}
 
`
 

// if(filterObj.quantity<=0){
//   this.Tostr.showToast('danger',"", ""+filterObj.name+" Stock is Already Finished !", "",this.toastrService);

// }else{
  this.invoiceEntryForm.push(this.fb.group({
    ProductCategory:filterObj.catagory ,
    ProductSubCategory:filterObj.subCategory,
    ProductBrand:filterObj.name,
    Quantity: [0],
    unit:filterObj.unit,
    Rate: filterObj.productBuyingPrice,
    Amount: [0],
    key:filterObj.key,
    //vatPercent:filterObj.vatPercent==undefined?0:filterObj.vatPercent,
    vatPercent:filterObj.vatPercent=0,
   // discountPercent:filterObj.discountPercent==undefined?0:filterObj.discountPercent,
    discountPercent:filterObj.discountPercent=0,

   // vatAmount:filterObj.vatAmount==undefined?0:filterObj.vatAmount,
    vatAmount:filterObj.vatAmount=0,
    //discuntAmount:filterObj.discountAmount==undefined?0:filterObj.discountAmount,
    discuntAmount:filterObj.discountAmount=0,
    moreDtls:dtlsInfo
    
  }));
// }



}

reset(){
  this.totalAmount=0;
  this.totalVat=0;
  this.totalDiscount=0;
  this.additionalDiscount=0;
  this.PreviousDue=0;
  this.PaidAmount=0;
  this.totalPayable=0;
  this.totalCurrentDue=0;
  this.clinentName='';
  this.Category='';
  this.SubCategory='';
  this.myControlCustomer.reset('');
 
this.invoiceEntryForm= this.fb.array([]);

this.dropdownValuesService.myControlSerialNumber.reset('');
this.dropdownValuesService.myControl.reset('');
this.dropdownValuesService.filterProductName();
this.dropdownValuesService.filterSerialNumber();
this.serialNumberStorage=[];
}

printPreviw(){
  if(this.invoiceKey==undefined){
   this.toastrService.saveFirstMessage()
    return;
  }
  if(this.invoiceKey!=''){
    this.router.navigate(['/inventory/purchase-print/',this.invoiceKey])
  }else{
    this.toastrService.saveFirstMessage()
  }
 
}
 
createNewSerialProductWise(element,i){
  const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.height = "70%";
    // element.catagory=element.ProductCategory;
    // element.subCategory=element.ProductSubCategory;
    // element.name=element.ProductBrand;
    element.index=i;  
    element.addItemVisibilty=true;
    dialogConfig.data=element;
    //this.dialog.open(ShowTrimsItemFormComponent, dialogConfig);
    this.dialog.open(ProductSerialNumbersComponent, dialogConfig);

 // this.router.navigate(["/inventory/serial-number/",element.key])
  
}
clearInputSupplier(){
  this.myControlCustomer.reset('');
}
clearInputChooseProduct(){
  
  this.dropdownValuesService.myControl.reset('');

}
clearSerialInputNumber(){
  this.dropdownValuesService.myControlSerialNumber.reset('');
  
}
}

