 
import { Component, OnDestroy, OnInit } from '@angular/core';
 
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
 
 
import { Subscription, Observable } from 'rxjs';
 
import { NbToastrService } from '@nebular/theme';
 
import { Router } from '@angular/router';

  
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
 
import { ProductSeralNumbersService } from '../../product-serial-numbers/product-seral-numbers.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ProductSerialNumberModalComponent } from '../../product-serial-number-modal/product-serial-number-modal.component';
import { UserInfoTblService } from '../../../@core/data/ClientDb/user-info-tbl.service';
import { invoice } from '../../../@core/data/marchanzider-model/invoice';
import { ProductCategories } from '../../../@core/data/marchanzider-model/product-categories';
import { ProductSubCategories } from '../../../@core/data/marchanzider-model/product-sub-categories';
import { StockInfo } from '../../../@core/data/marchanzider-model/stock-info';
import { ProductInfo } from '../../../@core/data/ProductInfo';
import { Tostr } from '../../../@core/data/tostr.model';
import { DateResizerService } from '../../../@core/mock/marchandizer/date-resizer.service';
import { DropdownValuesService } from '../../../@core/mock/marchandizer/dropdown-values.service';
import { InvoiceDetailsService } from '../../../@core/mock/marchandizer/invoice-details.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { ProductCategoryService } from '../../../@core/mock/marchandizer/product-category.service';
import { ProductInfoService } from '../../../@core/mock/marchandizer/product-info.service';
import { ProductSubCategoriesService } from '../../../@core/mock/marchandizer/product-sub-categories.service';
import { CustomerService } from '../../Customer/customer.service';
import { InvoicEntryModel } from '../../invoice-entry/ivoiceEntryModel';
import { SalesReturnService } from '../sales-return.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
import { DailyIncomeExpanseOrAccount, DailyIncomeExpanseService } from '../../../@core/mock/marchandizer/daily-income-expanse.service';
 
 
@Component({
  selector: 'ngx-sales-return',
  templateUrl: './sales-return.component.html',
  styleUrls: ['./sales-return.component.scss']
})
export class SalesReturnComponent implements OnInit,OnDestroy {
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

  memoNo='';
  invoiceKey: string;
  salesBy='';
  serialNumberStorage=[];
  OriginalAmount: number=0;
  dailyIncomeExpanseOrAccount=new  DailyIncomeExpanseOrAccount()
   
  constructor(public salesReturnService:SalesReturnService,
    private productCategoriesService:ProductCategoryService,
     
    private fb: FormBuilder,
    private invoiceDetailsService:InvoiceDetailsService,
    private toastrService:ToasterService,
    private router:Router ,
    private productInfosServicess:ProductInfoService,
    private productSubCategoriesService:ProductSubCategoriesService,
    private customerService:CustomerService,
    private dateResizerService:DateResizerService,
    public languageService:LanguageConverterService,
    private userInfoTblService:UserInfoTblService,
    public dropdownValuesService: DropdownValuesService,
    private dialog:MatDialog,
    public productSerialNumbersService:ProductSeralNumbersService,
    public accountService:DailyIncomeExpanseService) { 
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

    private _filter(value: any): any[] {
      const filterValue = value.toLowerCase();
  
      return this.productBrands.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
    private _filterCustomer(value: any): any[] {
      const filterValue = value.toLowerCase();
     this.isShowCustomerAddBtn= this.customers.some(f=>f.phone.trim()==this.myControlCustomer.value);
      return this.customers.filter(option => option.phone.toLowerCase().indexOf(filterValue) === 0);
    }
  ngOnInit() {
    this.dropdownValuesService.initialization();
      this.entryDate=this.dateResizerService.resize(new Date());
      
      this.productCategoriesDDL();
      this.productBrandDDL();
      this.productSubCategoryDDL();
      this.loadCustomer();
      this.loadSalesInvoiceDetails();
      
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
   
    
   

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  applyFilter() {
  this.myControl.reset('');
  }
   loadSalesInvoiceDetails(){
    this.subscription= this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.SalesInvoices=[];
      item.forEach(element => {
        var y = element.payload.toJSON();

        y["key"] = element.key;
   
      this.SalesInvoices.push(y);
      
      });
      
  }); 
   }
      productCategoriesDDL(){
        this.subscription= this.productCategoriesService.getAllProductInfo().snapshotChanges().subscribe(item=>{
          item.forEach(element => {
            var y = element.payload.toJSON();
            y["key"] = element.key;
      
            this.productCategories.push(y as ProductCategories);
          })
          
        })
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
      productSubCategoryDDL(){
        
        //this is actualy product info information loaded
        this.productSubCategoriesService.getAllProductInfo().snapshotChanges().subscribe(item=>{
          item.forEach(element => {
            var y = element.payload.toJSON();
            y["key"] = element.key;
      
            this.productSubCategories.push(y as ProductSubCategories);
          })
        
        })
      }
      addInvoiceRecord() {
        this.invoiceEntryForm.push(this.fb.group({
          ProductCategory: [''],
          ProductSubCategory:[''],
          ProductBrand:[''],
          Quantity: [0],
          unit:[''],
          productBuyingPrice:[0],
          Rate: [0],
          Amount: [0],
          key:[''],
          vatPercent:[0],
          vatAmount:[0],
          discountPercent:[0],
          discuntAmount:[0],
          remarks:'',
          customerKey:''
          
        }));
      }
     calculateAdditionalDiscount(){
      this.totalPayable=this.totalAmount-this.additionalDiscount;
      }
      recordSubmit(fg: FormGroup) {
     
            // if(fg.value.Key=='')
            // {
            //   this.salesReturnService.addProductInfo(fg.value).then(
            //     (res: any) => {   
               
            //       fg.patchValue({ Key:res.key });
            //       this.Tostr.showToast('primary',"", "Saved Successfully", "",this.toastrService);
            //     });
            
            // } 
            // else
           // this.salesReturnService.updateProductInfo(fg.value.Key,fg.value).then(
              // (res: any) => {
             
              //   this.Tostr.showToast('primary',"", "Updated Successfully", "",this.toastrService);
           //   }
           //   );

            
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

allSubmit(invoiceEntryForm){

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  const date = new Date(this.entryDate);
  const taketime = new Date();
  
  // Get the individual date and time components
  const day = date.toLocaleString('en-US', { day: '2-digit' });
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.toLocaleString('en-US', { year: 'numeric' });
  const time = taketime.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone });
  
  const EntryDateTime = `${day} ${month} ${year} ${time}`;

  let mobile=this.myControlCustomer.value;
  if(mobile==null||mobile==''){
    this.toastrService.openSnackBarWarning('Client Mobile Number is Requird !','Ok')
     
    return;
  }
  if(this.clinentName==null||this.clinentName==''){
    this.toastrService.openSnackBarWarning('Client Name is Requird !','Ok')
     
    return;
  }
  if(invoiceEntryForm.value.length<=0){
    this.toastrService.openSnackBarWarning('Please Choose Item to Sale !','Ok')
 
    return;
  }
  const checkQuantiy= invoiceEntryForm.value.find(f=>f.Quantity==null||f.Quantity==undefined||f.Quantity==''||f.Quantity<=0);
 if(checkQuantiy!=undefined){
  this.toastrService.openSnackBarWarning('Quantity is Requird !','Ok')
   
          return;
 }
  

 let invoiceEntryDetails=new InvoicEntryModel();
 
 invoiceEntryDetails.items=invoiceEntryForm.value;

 invoiceEntryDetails.OriginalAmount=this.OriginalAmount

 invoiceEntryDetails.totalAmount=this.totalPayable;
 invoiceEntryDetails.SubTotal=this.totalAmount;

 invoiceEntryDetails.entryDate=this.entryDate;
 invoiceEntryDetails.entryDateTime=EntryDateTime;

 invoiceEntryDetails.salesBy=this.salesBy;
 invoiceEntryDetails.PaidAmount=this.PaidAmount;
 invoiceEntryDetails.clienName=this.clinentName;
 invoiceEntryDetails.DueAmount=this.totalCurrentDue;
 invoiceEntryDetails.totalVat=this.totalVat;
 invoiceEntryDetails.totalDiscount=this.totalDiscount;
 invoiceEntryDetails.memoNo=this.memoNo;
 invoiceEntryDetails.totalAddiDiscnt=this.additionalDiscount;
 invoiceEntryDetails.totalProfit=0;
 invoiceEntryDetails.TotalBuyingPrice=0;
 invoiceEntryDetails.PrevDue=0;
  invoiceEntryDetails.mobile=this.myControlCustomer.value;
  invoiceEntryDetails.entryBy=this.userInfoTblService.ObjectReciever.value.phone;

  this.dailyIncomeExpanseOrAccount.account='Debited';
 this.dailyIncomeExpanseOrAccount.accountHead='Sales Return';
 this.dailyIncomeExpanseOrAccount.date=this.entryDate;
 this.dailyIncomeExpanseOrAccount.totalExpense=invoiceEntryDetails.PaidAmount;
 this.dailyIncomeExpanseOrAccount.purpose='Sales  Return';
 this.accountService.addProductInfov2(this.dailyIncomeExpanseOrAccount).subscribe(res=>{});

  (invoiceEntryDetails.items).forEach((invoiceDetails: any) => {
    
    invoiceDetails.serialNumbers=this.serialNumberStorage.filter(f=>f.productKey==invoiceDetails.key);
    if(invoiceDetails.serialNumbers!=null&&invoiceDetails.serialNumbers.length>0){
      invoiceDetails.serialNumbers.forEach(elm => {
       delete elm.isSelected
       elm.isSell='No';
       this.productSerialNumbersService.updateProductSerialNumber(elm.key,elm).then(t=>{});
     });
    }
   
    let filteredProductObj= this.productBrands.find(f=>f.key==invoiceDetails.key);
    filteredProductObj.quantity=(filteredProductObj.quantity+invoiceDetails.Quantity);
    let profitProductWise=(invoiceDetails.Rate-invoiceDetails.productBuyingPrice);
    invoiceEntryDetails.TotalBuyingPrice+=(invoiceDetails.productBuyingPrice*invoiceDetails.Quantity);
    invoiceEntryDetails.totalProfit+=(profitProductWise*invoiceDetails.Quantity);
     
    this.productInfosServicess.updateProductInfo(invoiceDetails.key,filteredProductObj).then(t=>{},err=>{console.log(err)})
    });

this.salesReturnService.addSalesReturn(invoiceEntryDetails).then(t=>{
  this.invoiceKey=t.key;
  this.reset();
  this.toastrService.saveMessage()

});

}


       

  backToInvoiceInfo(){
    this.router.navigate(['/inventory/sales-return-list']);
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
    // this.productInfosServicess.getAllProductInfo().snapshotChanges().subscribe(res=>{
    //   res.forEach(element => {
    //     var y = element.payload.toJSON();
    //     y["key"] = element.key;
  
    //     this.productBrands.push(y as ProductInfo);
    //   })
   // console.log(this.productBrands)
   arry.forEach(element => {
     
      //let productObj=this.productBrands.find(f=>f.key==element.key);
      //  if(productObj.quantity<element.Quantity){
      //   this.toastrService.stockFinisMessage(productObj.quantity)
         
      //  }else{
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
         }));
           
      // }
      });
      this.totalPayable=this.totalAmount;
      this.totalDueAmount=this.totalPayable-(this.PaidAmount+this.additionalDiscount);
     //  });

      
      
}
customerSelection(obj){
 
 // this.PreviousDue=0;
  this.clinentName=obj.name;
  // let customerDues=this.SalesInvoices.filter(f=>f.mobile==obj.phone);
   
  // customerDues.forEach(element => {
  //   this.PreviousDue+=element.DueAmount;
  // });
 
}
currentDueClcltn(){
 this.totalCurrentDue= this.totalPayable-this.PaidAmount;
}
addNewCustomer(){
 
   
}

productSelection(key){
  let result=this.invoiceEntryForm.value.filter(f=>f.key==key);
  if(result.length>0){
    this.toastrService.openSnackBarWarning('Already this Product Added In Invoice!','Ok')
     
  return;
  } 
let filterObj=this.productBrands.find(f=>f.key==key);
this.dropdownValuesService.Category=filterObj.catagory;
this.dropdownValuesService.SubCategory=filterObj.subCategory; 
 
 if(this.myControlCustomer.value==undefined||
  this.myControlCustomer.value==null||
  this.myControlCustomer.value==''){
    this.toastrService.openSnackBarWarning('Add Customer First !','Ok')
 
  return;
}

// if(filterObj.quantity<=0){
//   this.toastrService.openSnackBarWarning(`${filterObj.name} Stock is Already Finished !`,'Ok')
   
//  return;
// }else{
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
//}

 

}
productSelectionWithSerialNumber(option){
let result=this.invoiceEntryForm.value.filter(f=>f.key==option.productKey);
if(result.length>0){
  this.toastrService.openSnackBarWarning('Already this Product Added In Invoice!','Ok')
return;
}
 //this.serialNumberStorage.push(option);
  let filterObj=this.productBrands.find(f=>f.key==option.productKey);
  let buyingprice=0;
  if(option.rate!=null&&option.rate!=undefined&&option.rate!=null&&option.rate>0){
    buyingprice=option.rate;
  }else{
    buyingprice=filterObj.productBuyingPrice;
  }
 
  this.dropdownValuesService.Category=filterObj.catagory;
  this.dropdownValuesService.SubCategory=filterObj.subCategory; 
   
   if(this.myControlCustomer.value==undefined||
    this.myControlCustomer.value==null||
    this.myControlCustomer.value==''){
      this.toastrService.openSnackBarWarning('Add Customer First !','Ok')
    return;
  }
  
  // if(filterObj.quantity<=0){
  //   this.toastrService.openSnackBarWarning(`${filterObj.name} Stock is Already Finished !`,'Ok')
  //  return;
  // }else{
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
  //}
  
   
  
  //console.log(typeof(this.invoiceEntryForm.value[0].ProductSerials))
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

this.invoiceEntryForm= this.fb.array([]);
this.dropdownValuesService.myControlSerialNumber.reset('');
this.dropdownValuesService.myControl.reset('');
this.dropdownValuesService.filterProductName();
this.dropdownValuesService.filterSerialNumber();
this.serialNumberStorage=[];
}

printPreviw(){
  if(this.invoiceKey==undefined){
    alert('Please Save First !')
    return;
  }
  if(this.invoiceKey!=''){
    this.router.navigate(['/inventory/sales-return-print-v2/',this.invoiceKey])
  }else{
    alert('Please Save First !')
  }
 
}
onAddSeialNumber(value,index){
 
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

