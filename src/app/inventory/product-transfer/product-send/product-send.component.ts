 
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
 
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
 
import { Subscription, Observable } from 'rxjs';
 
import { NbToastrService } from '@nebular/theme';
 
import { Router } from '@angular/router';

 
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
 
import { MatDialog, MatDialogConfig } from '@angular/material';
 
import { InvoicEntryModel } from '../../invoice-entry/ivoiceEntryModel';
  
import { ProductSeralNumbersService } from '../../product-serial-numbers/product-seral-numbers.service';
import { ProductSerialNumberModalComponent } from '../../product-serial-number-modal/product-serial-number-modal.component';
import { ProductTransferService } from '../product-transfer.service';
 
  
import { ProductCategories } from '../../../@core/data/marchanzider-model/product-categories';
import { StockInfo } from '../../../@core/data/marchanzider-model/stock-info';
import { Tostr } from '../../../@core/data/tostr.model';
import { invoice } from '../../../@core/data/marchanzider-model/invoice';
import { UserInfoTblService } from '../../../@core/data/ClientDb/user-info-tbl.service';
import { ProductSubCategories } from '../../../@core/data/marchanzider-model/product-sub-categories';
import { ProductInfo } from '../../../@core/data/ProductInfo';
import { DateResizerService } from '../../../@core/mock/marchandizer/date-resizer.service';
import { DropdownValuesService } from '../../../@core/mock/marchandizer/dropdown-values.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { ProductCategoryService } from '../../../@core/mock/marchandizer/product-category.service';
import { ProductInfoService } from '../../../@core/mock/marchandizer/product-info.service';
import { ProductSubCategoriesService } from '../../../@core/mock/marchandizer/product-sub-categories.service';
 
import { CustomerService } from '../../Customer/customer.service';
import { UserService } from '../../../@core/mock/marchandizer/user.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
import { InvoiceDetailsService } from '../../../@core/mock/marchandizer/invoice-details.service';
import { ProductSerialstblService } from '../../../@core/data/ClientDb/product-serialstbl.service';
import { RecieveProductService } from '../recieve-product.service';
import { Company } from '../../../@core/data/marchanzider-model/assignCompanyName';
import { DailyIncomeExpanseOrAccount, DailyIncomeExpanseService } from '../../../@core/mock/marchandizer/daily-income-expanse.service';
 
 
@Component({
  selector: 'ngx-product-send',
  templateUrl: './product-send.component.html',
  styleUrls: ['./product-send.component.scss']
})
export class ProductSendComponent     implements OnInit,OnDestroy {
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

  toCompanyName='';
  transferDate:any='';
  expectedDeliveryDate:any='';
  transferBy:string='';
  trackingNumber:string='';
  transferVia:string='';
  remarksOrNotes:string='';
  transferCost:number=0;

  isProductSendSubmitted:boolean=false;

  dailyIncomeExpanseOrAccount=new  DailyIncomeExpanseOrAccount()
 
  constructor(public invoiceService:InvoiceDetailsService,
    private productCategoriesService:ProductCategoryService,
   public dropdownValuesService: DropdownValuesService,
    private fb: FormBuilder,
    private invoiceDetailsService:InvoiceDetailsService,
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
    private userService:UserService,
    private productTransferService:ProductTransferService,
   private recieveProductService:RecieveProductService,
   public accountService:DailyIncomeExpanseService,
    ) { 

    
    this.transferDate=this.dateResizerService.resize(new Date());
//above practicing code
 
this.productSerialNumbersService.ObjectTbl.subscribe(res=>{
   
  //  if(res!=0){
  //   res.forEach(elm => {
  //     this.serialNumberStorage.forEach(elll => {
  //       const index = this.serialNumberStorage.findIndex(elmnt =>elmnt.productKey==elm.productKey);
  //      if (index > -1) {
  //       this.serialNumberStorage.splice(index, 1);
  //     }
  //    });
  //    });
   
  //  }

   let givenBuyingRate=0;
  if(res!=0){
    
    res.forEach((element) => {
      if(element.rate!=null||element.rate!=undefined||element.rate!=''||element.rate>0){
        givenBuyingRate+=element.rate;
      }

       element.name=this.invoiceEntryForm.value.find(f=>f.key==element.productKey).name;
      
    this.serialNumberStorage.push(element);
    });
 
  //  if(givenBuyingRate>0){
  //   let avgRate=(givenBuyingRate/res.length);
  //   this.invoiceEntryForm.value[res.index].productBuyingPrice=avgRate;
  //  }
  
  // this.OnChangeActions(this.invoiceEntryForm.value)
  
  }
});
 
    }

    
    private _filterCustomer(value: any): any[] {
      const filterValue = value.toLowerCase();
     // console.log(this.customers)
      return this.customers.filter(option => option.searchOrg.toLowerCase().indexOf(filterValue) === 0);
    }
 
    
   
  ngOnInit() {
      this.entryDate=this.dateResizerService.resize(new Date());
     // console.log(this.entryDate)
      //this.productCategoriesDDL();
      this.productBrandDDL();
    //  this.productSubCategoryDDL();
      this.loadCustomer();
      this.loadSalesInvoiceDetails();
    
  }
  // deleteFromSerialStorage(key:number){   
  //   const index = this.serialNumberStorage.findIndex(elmnt =>elmnt.key==key);
  //  if (index > -1) {
  //   this.serialNumberStorage.splice(index, 1);
  // }
    
  //}
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.productSerialNumbersService.ObjectReciever.next([]);
  }
 
    loadSalesInvoiceDetails(){
    this.subscription= this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      
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
        this.subscription= this.userService.getAllUserInfo().snapshotChanges().subscribe(item=>{
        
          this.customers=[];
          item.forEach(element => {
            var y = element.payload.toJSON();
           if(y['orgName']==undefined){y['orgName']='Org Name Not Set'}
            y["key"] = element.key;
            if(y['userType']=='Shop Owner'&&y['cmpCode']!=localStorage.getItem('cmpCode')){
              this.customers.push({phone: y["cmpCode"],key: y["key"],orgName:y['orgName'],searchOrg:y["cmpCode"]+'-'+y['orgName']});
            }
 
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
            //   this.invoiceService.addProductInfo(fg.value).then(
            //     (res: any) => {   
            //       console.log(res)   ;   
            //       fg.patchValue({ Key:res.key });
            //       this.Tostr.showToast('primary',"", "Saved Successfully", "",this.toastrService);
            //     });
            
            // } 
            // else
           // this.invoiceService.updateProductInfo(fg.value.Key,fg.value).then(
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
onChangeQnty(obj,i){

   
    let productObj=this.productBrands.find(f=>f.key==obj.key);
   if(productObj.quantity<obj.quantity){
    this.toasterService.openSnackBarWarning(`${obj.name} Stock is Finised Available Quantity ${productObj.quantity}`,'ok');
    //element.quantity=0;
     
    this.invoiceEntryForm.at(i).get('quantity').patchValue(0)
    return;
   }
  
 
  
  }
allSubmit(){
 
  let mobile=this.myControlCustomer.value;
  if(mobile==null||mobile==''){
    this.toasterService.openSnackBarWarning('Client Mobile Number is Requird !','Ok');
    
    return;
  }
  if(this.toCompanyName==null||this.toCompanyName==''){
    this.toasterService.openSnackBarWarning('Client Name is Requird !','Ok');
    
    return;
  }
  if(this.invoiceEntryForm.value.length<=0){
    this.toasterService.openSnackBarWarning('Please Choose Item to Sale !','Ok');
   
    return;
  }
   
 const checkQuantiy= this.invoiceEntryForm.value.find(f=>f.quantity==null||f.quantity==undefined||f.quantity=='');
 
 if(checkQuantiy!=undefined&&checkQuantiy.quantity!=0){
  this.toasterService.openSnackBarWarning('Quantity is Requird !','Ok');
   
 return;
 }
 this.isProductSendSubmitted=true;
  
//  if(this.PaidAmount<=0){
//   this.Tostr.showToast('danger',"","Please Receive Minimum Amount!", "",this.toastrService);
//   return;
//  }
  // this.CalculateTotal();

 let productTransferObj:any={items:[]};
 productTransferObj.items=this.invoiceEntryForm.value;
 productTransferObj.toCompanyPhoneNo=mobile;
 productTransferObj.toCompanyName=this.toCompanyName;
 productTransferObj.transferDate=this.transferDate;
 productTransferObj.transferBy=this.transferBy;
 productTransferObj.trackingNumber=this.trackingNumber;
 productTransferObj.transferVia=this.transferVia;
 productTransferObj.expectedDeliveryDate=this.expectedDeliveryDate;
 productTransferObj.transferCost=this.transferCost;
 productTransferObj.remarksOrNotes=this.remarksOrNotes;

 this.dailyIncomeExpanseOrAccount.account='Debited';
 this.dailyIncomeExpanseOrAccount.accountHead='Transport Cost';
 this.dailyIncomeExpanseOrAccount.date=this.entryDate;
 if(productTransferObj.transferCost>0){
  this.dailyIncomeExpanseOrAccount.totalExpense=productTransferObj.transferCost;
  this.dailyIncomeExpanseOrAccount.purpose=`Products Send to ${this.toCompanyName}`;
  this.accountService.addProductInfov2(this.dailyIncomeExpanseOrAccount).subscribe(res=>{});
}
  (productTransferObj.items).forEach((invoiceDetails: any) => {
   
       
      invoiceDetails.serialNumbers=this.serialNumberStorage.filter(f=>f.productKey==invoiceDetails.key);
      if(invoiceDetails.serialNumbers!=null&&invoiceDetails.serialNumbers.length>0){
        invoiceDetails.serialNumbers.forEach(elm => {
         delete elm.isSelected
         //elm.isSell='Yes';
        // this.productSerialNumbersService.updateProductSerialNumber(elm.key,elm).then(t=>{});
       });
      }
   
   let filteredProductObj= this.productBrands.find(f=>f.key==invoiceDetails.key);
   filteredProductObj.quantity=(filteredProductObj.quantity-invoiceDetails.quantity);
    this.productInfosServicess.updateProductInfo(filteredProductObj.key,filteredProductObj).then(t=>{},err=>{console.log(err)})
  
    })
 productTransferObj.SendingCompanyPhone=Company.cName;
 productTransferObj.SendingCompanyName=this.userInfoTblService.ObjectReciever.value.orgName;

 this.recieveProductService.recieveProduct(productTransferObj,productTransferObj.toCompanyPhoneNo).then(t=>{
 delete productTransferObj.SendingCompanyName;

  this.productTransferService.addSendingProduct(productTransferObj).then(t=>{
    this.invoiceKey=t.key;
    this.toasterService.openSnackBarSuccess('Product Send Successfully','Ok');
    this.isProductSendSubmitted=false;
    this.reset();
    this.serialNumberStorage=[];
  },err=>{
    this.toasterService.errorMessage();
  });
 },err=>{
  this.toasterService.errorMessage();
  this.isProductSendSubmitted=false;
});

//console.log(productTransferObj)
}
 
  backToInvoiceInfo(){
    this.router.navigate(['/inventory/Invoice-Details']);
  }
  finalPayableCalculation(){
  this.totalPayable=this.totalPayable-this.PaidAmount;
  }
  OnChangeActions(arry){
    this.invoiceEntryForm= this.fb.array([]);
      arry.forEach(element => {
       this.invoiceEntryForm.push(this.fb.group(element));
      });
 
   
     //  });

  
      
}
customerSelection(obj){
  
  //this.PreviousDue=0;
  this.toCompanyName=obj.orgName;
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
console.log(filterObj);
this.dropdownValuesService.Category=filterObj.catagory;
this.dropdownValuesService.SubCategory=filterObj.subCategory; 
 
 if(this.myControlCustomer.value==undefined||
  this.myControlCustomer.value==null||
  this.myControlCustomer.value==''){
    this.toasterService.openSnackBarWarning(`to Company Phone is Requird !`,'ok')
 // this.Tostr.showToast('danger',"", ""+" ", "",this.toastrService);
  return;
}

if(filterObj.quantity<=0){
  this.toasterService.openSnackBarWarning(`${filterObj.name} Stock is Already Finished !`,'ok')
  //this.Tostr.showToast('danger',"", ""+filterObj.name+" ", "",this.toastrService);
 return;
}else{
  this.invoiceEntryForm.push(this.fb.group({
    // catagory:filterObj.catagory ,
    // subCategory:filterObj.subCategory,
    // name:filterObj.name,
    // quantity: [0],
    // unit:filterObj.unit,
    // cost:filterObj.cost,
    // date:filterObj.date,
    // //Rate: filterObj.cost,
    // productBuyingPrice:filterObj.productBuyingPrice,
    // Amount: [0],
    // key:filterObj.key,
    // Desc:filterObj.Desc,
    // alertQuantity:filterObj.alertQuantity,
    // vatPercent:filterObj.vatPercent==undefined?0:filterObj.vatPercent,
    // discountPercent:filterObj.discountPercent==undefined?0:filterObj.discountPercent,

    // vatAmount:filterObj.vatAmount==undefined?0:filterObj.vatAmount,
    // discuntAmount:filterObj.discountAmount==undefined?0:filterObj.discountAmount,
    // warantyNgurenty:filterObj.warantyNgurenty ,
    // remarks:filterObj.remarks,
    // supplier:"",
    // serialNumber:filterObj.serialNumber
   // productSerials:this.fb.array([])


   
  alertQuantity:filterObj.alertQuantity,
  catagory:filterObj.catagory,
  cost:filterObj.cost,
  date:filterObj.date,
  discountAmount:filterObj.discountAmount,
  discountPercent:filterObj.discountPercent,
  key:filterObj.key,
  name:filterObj.name,
  productBuyingPrice:filterObj.productBuyingPrice,
  quantity:0,
  serialNumber:filterObj.serialNumber,
  subCategory:filterObj.subCategory,
  supplier:filterObj.supplier,
  unit:filterObj.unit,
  vatAmount:filterObj.vatAmount,
  vatPercent:filterObj.vatPercent,
  warantyNgurenty:filterObj.warantyNgurenty


   
  }));
}

 

}

printPreviw(){
  if(this.invoiceKey==undefined){

   this.toasterService.saveFirstMessage();
    return;
  }
  if(this.invoiceKey!=''){
   // this.router.navigate(['/inventory/invoice-print-v2/',this.invoiceKey])
    this.router.navigate(['/inventory/Invoice-print/',this.invoiceKey])
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
  dialogConfig.width = "70%";
  dialogConfig.height = "70%";
  value.index=index;
 dialogConfig.data=value;
  //this.dialog.open(ShowTrimsItemFormComponent, dialogConfig);
  this.dialog.open(ProductSerialNumberModalComponent, dialogConfig);
}

  
onDeleteSerial(j){

  this.serialNumberStorage.splice(j, 1);
}
 
}

