import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
 
 
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserInfoTblService } from '../../@core/data/ClientDb/user-info-tbl.service';
import { ProductInfo } from '../../@core/data/ProductInfo';
import { invoice } from '../../@core/data/marchanzider-model/invoice';
import { ProductCategories } from '../../@core/data/marchanzider-model/product-categories';
import { ProductSubCategories } from '../../@core/data/marchanzider-model/product-sub-categories';
import { StockInfo } from '../../@core/data/marchanzider-model/stock-info';
import { Tostr } from '../../@core/data/tostr.model';
import { CustomerOrderService } from '../../@core/mock/marchandizer/customer-order.service';
import { DailyIncomeExpanseOrAccount, DailyIncomeExpanseService } from '../../@core/mock/marchandizer/daily-income-expanse.service';
import { DateResizerService } from '../../@core/mock/marchandizer/date-resizer.service';
import { DropdownValuesService } from '../../@core/mock/marchandizer/dropdown-values.service';
import { InvoiceDetailsService } from '../../@core/mock/marchandizer/invoice-details.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { ProductInfoService } from '../../@core/mock/marchandizer/product-info.service';
 
import { CustomerService } from '../Customer/customer.service';
import { InvoicEntryModel } from '../invoice-entry/ivoiceEntryModel';
import { ProductSerialNumberModalComponent } from '../product-serial-number-modal/product-serial-number-modal.component';
import { ProductSeralNumbersService } from '../product-serial-numbers/product-seral-numbers.service';
import { ToasterService } from '../../@core/mock/toaster.service';
import { UserService } from '../../@core/mock/marchandizer/user.service';

@Component({
  selector: 'ngx-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent  implements OnInit,OnDestroy {
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
  isCompanyInvoice:boolean=false;
  dailyIncomeExpanseOrAccount=new  DailyIncomeExpanseOrAccount()
  Order:any;
 
  constructor(
    public customerOrderService:CustomerOrderService,
    public invoiceService:InvoiceDetailsService,
   // private productCategoriesService:ProductCategoryService,
   public dropdownValuesService: DropdownValuesService,
    private fb: FormBuilder,
    private invoiceDetailsService:InvoiceDetailsService,
    private router:Router ,
    private productInfosServicess:ProductInfoService,
  //  private productSubCategoriesService:ProductSubCategoriesService,
    private customerService:CustomerService,
    private dateResizerService:DateResizerService,
    public languageService:LanguageConverterService,
    private userInfoTblService:UserInfoTblService,
    private dialog:MatDialog,
   public elementRef: ElementRef,
    private toasterService:ToasterService,
  //  private productSerialstblService:ProductSerialstblService,
    public productSerialNumbersService:ProductSeralNumbersService,
    private userService:UserService,
    public accountService:DailyIncomeExpanseService,
    public route :ActivatedRoute,
    
    ) { 
    
   
 
 
    }

    
    private _filterCustomer(value: any): any[] {
      const filterValue = value.toLowerCase();
     this.isShowCustomerAddBtn= this.customers.some(f=>f.phone.trim()==this.myControlCustomer.value);
      return this.customers.filter(option => option.phone.toLowerCase().indexOf(filterValue) === 0);
    }
    private _filterCompany(value: any): any[] {
      const filterValue = value.toLowerCase();
     this.isShowCustomerAddBtn= this.customers.some(f=>f.phone.trim()==this.myControlCustomer.value);
      return this.customers.filter(option => option.cmpCode.toLowerCase().indexOf(filterValue) === 0);
    }
    
   
  ngOnInit() {
      this.entryDate=this.dateResizerService.resize(new Date());
     // console.log(this.entryDate)
      //this.productCategoriesDDL();
      this.productBrandDDL();
    //  this.productSubCategoryDDL();
      this.loadCustomer();
   //   this.loadSalesInvoiceDetails();

      this.subscription=this.route.paramMap.subscribe((params: ParamMap) => {
        // You can access and handle the route parameter here
        const key = params.get('key');
        if (key !== null) {
          // Route parameter 'key' has changed, do something with it
        //  console.log(`Route parameter 'key' has changed to: ${key}`);

        this.invoiceDetailsService.getByIdInvoiceDetails(key).valueChanges().subscribe(
          (res:any) =>{
           console.log(res)
            // this.Order=res;
             this.clinentName=res.clienName;
              this.myControlCustomer.setValue(res.mobile )
              this.invoiceEntryForm=this.fb.array([]);
             if(res.items!=undefined&&res.items.length>0){
               res.items.forEach(element => {
                 element.shippingQnty=element.shippingQnty==null?0:element.shippingQnty; 
                 //element.Quantity=element.Quantity==undefined?0:element.Quantity; 
                 let vatAmount=(element.vatAmount*element.Quantity);
                 let discountAmount=(((element.Rate*element.discountPercent)/100)*element.Quantity);
                 let amount= (element.Quantity*element.Rate);
                  this.OriginalAmount+=amount;
                  this.totalAmount+=(amount+vatAmount)-discountAmount;
                  this.totalVat+=vatAmount ;
                  this.totalDiscount+=discountAmount;
     
     
                 this.invoiceEntryForm.push(this.fb.group({
                   ProductCategory:element.ProductCategory ,
                   ProductSubCategory:element.ProductSubCategory,
                   ProductBrand:element.ProductBrand,
                   Quantity: element.Quantity,
                   unit:element.unit,
                   Rate: element.Rate,
                   productBuyingPrice:element.productBuyingPrice,
                   Amount: element.Amount,
                   key:element.key,
                   vatPercent:element.vatPercent==undefined?0:element.vatPercent,
                   discountPercent:element.discountPercent==undefined?0:element.discountPercent,
               
                   vatAmount:element.vatAmount==undefined?0:element.vatAmount,
                   discuntAmount:element.discuntAmount==undefined?0:element.discuntAmount,
                   warantyNgurenty:element.warantyNgurenty ,
                   remarks:element.remarks ,
                  // productSerials:this.fb.array([])
                 }));
                 this.serialNumberStorage=[];
                if(element.serialNumbers!=undefined&&element.serialNumbers.length>0){
                 element.serialNumbers.forEach(el => {
                   this.serialNumberStorage.push(el);
                 });
                 
                }
             
              });
             }
            
             
             this.totalPayable=this.totalAmount;
             this.totalCurrentDue=this.totalPayable-(this.PaidAmount+this.additionalDiscount);
             this.totalDueAmount=this.totalPayable-(this.PaidAmount+this.additionalDiscount);
           }
         );
    
        }
      });
    
    
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
      loadCompany(){
        this.subscription= this.userService.getAllUserInfo().snapshotChanges().subscribe(item=>{
        
          this.customers=[];
          item.forEach(element => {
            var y = element.payload.toJSON();

            y["key"] = element.key;
            if(y['userType']=='Shop Owner'&&y['cmpCode']!=localStorage.getItem('cmpCode')){
              this.customers.push({phone: y["cmpCode"],key: y["key"],name:y['orgName']});
            }
 
          });
         

          this.filteredOptionsCustomer= this.myControlCustomer.valueChanges.pipe(
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
       

      CalculateTotal(){
        
      }
 

 
  backToInvoiceInfo(){
    this.router.navigate(['/inventory/Invoice-Details']);
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
       if(productObj.quantity<element.Quantity){
        this.toasterService.stockFinisMessage(productObj.quantity);
        
        element.Quantity=0;
       }
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
this.dropdownValuesService.Category=filterObj.catagory;
this.dropdownValuesService.SubCategory=filterObj.subCategory; 
 
 if(this.myControlCustomer.value==undefined||
  this.myControlCustomer.value==null||
  this.myControlCustomer.value==''){
    this.toasterService.openSnackBarWarning(`Add Customer First !`,'ok')
 // this.Tostr.showToast('danger',"", ""+" ", "",this.toastrService);
  return;
}

if(filterObj.quantity<=0){
  this.toasterService.openSnackBarWarning(`${filterObj.name} Stock is Already Finished !`,'ok')
  //this.Tostr.showToast('danger',"", ""+filterObj.name+" ", "",this.toastrService);
 return;
}else{
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
onCheckboxChanged(){
this.myControlCustomer.reset('');
this.clinentName='';
if(this.isCompanyInvoice){
  this.loadCompany();
}else{
  this.loadCustomer();
}
}
}

