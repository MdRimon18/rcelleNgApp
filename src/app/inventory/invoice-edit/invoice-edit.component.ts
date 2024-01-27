 
import { Component, OnDestroy, OnInit } from '@angular/core';
 
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
 
import { Subscription, Observable } from 'rxjs';
 
import { NbToastrService } from '@nebular/theme';
 
 
import { ActivatedRoute, Router } from '@angular/router';

  
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { CustomerService } from '../Customer/customer.service';
 
import { SalesReturnService } from '../Sales/sales-return.service';
import { ProductCategories } from '../../@core/data/marchanzider-model/product-categories';
import { invoice } from '../../@core/data/marchanzider-model/invoice';
import { ProductSubCategories } from '../../@core/data/marchanzider-model/product-sub-categories';
import { StockInfo } from '../../@core/data/marchanzider-model/stock-info';
import { ProductInfo } from '../../@core/data/ProductInfo';
import { Tostr } from '../../@core/data/tostr.model';
import { DateResizerService } from '../../@core/mock/marchandizer/date-resizer.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { ProductCategoryService } from '../../@core/mock/marchandizer/product-category.service';
import { ProductInfoService } from '../../@core/mock/marchandizer/product-info.service';
import { ProductSubCategoriesService } from '../../@core/mock/marchandizer/product-sub-categories.service';
import { InvoicEntryModel } from '../invoice-entry/ivoiceEntryModel';
import { ToasterService } from '../../@core/mock/toaster.service';

 
@Component({
  selector: 'ngx-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent implements  OnInit,OnDestroy {
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
  PreviousDue:number=0
  totalPayable:number=0
  additionalDiscount:number=0
  totalDueAmount:number=0
  totalCurrentDue:number=0
  SalesInvoices: any[];
  invoiceKey: any='';
  salesInvoiceNo=0;
  Category='';
  SubCategory='';
  editkey;
  items: any[]=[];
  constructor(public invoiceService:SalesReturnService,
    private productCategoriesService:ProductCategoryService,
     
    private fb: FormBuilder,
    private salesReturnService:SalesReturnService,
    private toastrService:ToasterService,
    private router:Router ,
    private productInfosServicess:ProductInfoService,
    private productSubCategoriesService:ProductSubCategoriesService,
    private customerService:CustomerService,
    private dateResizerService:DateResizerService,
    public languageService:LanguageConverterService,
    public route:ActivatedRoute,

    ) { 
      

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
      this.entryDate=this.dateResizerService.resize(new Date());
      console.log(this.entryDate)
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
    this.editkey = this.route.snapshot.paramMap.get('key');
    this.subscription= this.salesReturnService.getAllSalesReturn().snapshotChanges().subscribe(item=>{
      
      this.SalesInvoices=[];
      item.forEach(element => {
        var y = element.payload.toJSON();

        y["key"] = element.key;

         if(element.key==this.editkey){
          this.SalesInvoices.push(y);
         }
       
       
     
      
      });
      this.salesInvoiceNo=this.SalesInvoices.length;

    
       
      console.log(this.editkey);
      console.log(typeof(this.SalesInvoices[0].items) );
      for (let key in this.SalesInvoices[0].items) {
        //  console.log(key, this.invoiceDetails.items[key]);
          this.items.push(this.SalesInvoices[0].items[key]);
        }
    
  this.items.forEach(elm => {
    
    this.invoiceEntryForm.push(this.fb.group({
     ProductCategory: elm.ProductCategory,
     ProductSubCategory:elm.ProductSubCategory,
     ProductBrand:elm.ProductBrand,
     Quantity: elm.Quantity,
     unit:elm.unit,
     Rate: elm.Rate,
     Amount:elm.Amount,
     key:elm.key,
     vatPercent:elm.vatPercent,
     vatAmount:elm.vatAmount,
     discountPercent:elm.discountPercent,
     discuntAmount:elm.discuntAmount,
     moreDtls:elm.moreDtls,
     customerKey:elm.customerKey
     
   }));
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
          console.log(this.customers);

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
        this.totalPayable=this.totalPayable-this.additionalDiscount;
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

      CalculateTotal(invoiceEntryForm){
        this.totalAmount=0;
        this.totalVat=0;
        this.totalDiscount=0;
        this.totalPayable=0;
        
        (invoiceEntryForm.value).forEach((invoiceDetails: any) => {
        
         this.totalAmount+= parseFloat(invoiceDetails.Amount) ;
         this.totalVat+=parseFloat(invoiceDetails.vatAmount) ;
         this.totalDiscount+= parseFloat(invoiceDetails.discuntAmount);
    
        });
      
        this.totalPayable=Math.round((this.totalAmount+this.totalVat+this.PreviousDue)-this.totalDiscount);

        this.totalDueAmount=(this.totalPayable-this.PaidAmount)-this.additionalDiscount;
       
      }

      onDelete(invoiceEntryForm,i) {
        this.invoiceEntryForm
       invoiceEntryForm.value.splice(i, 1);
       this.invoiceEntryForm.removeAt(i);
       this.CalculateTotal(invoiceEntryForm);
      
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
  this.loadSalesInvoiceDetails();
  let mobile=this.myControlCustomer.value;
  if(mobile==null||mobile==''){
    alert('Client Mobile Number is Requird !');
    return;
  }
  if(this.clinentName==null||this.clinentName==''){
    alert('Client Name is Requird !');
    return;
  }
  if(invoiceEntryForm.value.length<=0){
    alert('Please Choose Item to Sale !');
    return;
  }
   this.CalculateTotal(invoiceEntryForm);

 let invoiceEntryDetails=new InvoicEntryModel();
 
 invoiceEntryDetails.items=invoiceEntryForm.value;

 invoiceEntryDetails.totalAmount=this.totalPayable;
 invoiceEntryDetails.SubTotal=this.totalAmount;
 invoiceEntryDetails.entryDate=this.entryDate;
 invoiceEntryDetails.PaidAmount=this.PaidAmount;
 invoiceEntryDetails.clienName=this.clinentName;
 invoiceEntryDetails.DueAmount=this.totalDueAmount;
 invoiceEntryDetails.totalVat=this.totalVat;
 invoiceEntryDetails.totalDiscount=this.totalDiscount;
 invoiceEntryDetails.totalAddiDiscnt=this.additionalDiscount;
 invoiceEntryDetails.totalProfit=0;
 invoiceEntryDetails.invoiceNo=this.salesInvoiceNo;
 invoiceEntryDetails.PrevDue=this.PreviousDue;
 
  invoiceEntryDetails.mobile=this.myControlCustomer.value;
  (invoiceEntryDetails.items).forEach((invoiceDetails: any) => {
     
   
   let filteredProductObj= this.productBrands.find(f=>f.key==invoiceDetails.key);
   filteredProductObj.quantity=(filteredProductObj.quantity-invoiceDetails.Quantity);
   let profitProductWise=(filteredProductObj.cost-filteredProductObj.productBuyingPrice);
   invoiceEntryDetails.totalProfit+=profitProductWise;
   console.log(filteredProductObj)
   console.log(invoiceDetails)
    this.productInfosServicess.updateProductInfo(invoiceDetails.key,filteredProductObj).then(t=>{},err=>{console.log(err)})
    });

this.invoiceService.addSalesReturn(invoiceEntryDetails).then(t=>{
  this.invoiceKey=t.key;
  this.toastrService.saveMessage()

});

}


       onQuantityChange(invoiceEntryForm){
        this.OnChangeActions(invoiceEntryForm);
    }
    onRateChange(invoiceEntryForm){

      this.OnChangeActions(invoiceEntryForm);
     
  }

  backToInvoiceInfo(){
    this.router.navigate(['/inventory/sales-return-list']);
  }
  finalPayableCalculation(){
  this.totalPayable=this.totalPayable-this.PaidAmount;
  }
  OnChangeActions(invoiceEntryForm){

      invoiceEntryForm.value.forEach(element => {
        element.Quantity=element.Quantity==null?0:element.Quantity; 
        // element.vatPercent=element.vatPercent==''?0:element.vatPercent; 
        // element.discountPercent=element.discountPercent==''?0:element.discountPercent; 

      let vatAmount=(parseFloat(element.Rate)*parseFloat(element.vatPercent) *element.Quantity)/100;
      let discountAmount=(parseFloat(element.Rate)*parseFloat(element.discountPercent) *element.Quantity)/100;
      let amount= parseFloat(element.Quantity)*parseFloat( element.Rate);
   
          element.ProductCategory= element.ProductCategory;
          element.ProductSubCategory= element.ProductSubCategory;
          element.ProductBrand= element.ProductBrand;
          element.Quantity= element.Quantity;
          element.unit=element.unit;
          element.Rate= element.Rate;
          element.Amount=Math.round((amount+vatAmount)-discountAmount);
          element.key=element.key;
          element.vatPercent=element.vatPercent; 
          element.discountPercent=element.discountPercent;
          element.vatAmount=vatAmount;
          element.discuntAmount=discountAmount;
          element.moreDtls=element.moreDtls;

       });

       this.CalculateTotal(invoiceEntryForm);
}
customerSelection(obj){
 
  this.PreviousDue=0;
  this.clinentName=obj.name;
  let customerDues=this.SalesInvoices.filter(f=>f.mobile==obj.phone);
  console.log(customerDues);
  customerDues.forEach(element => {
    this.PreviousDue+=element.DueAmount;
  });
console.log(this.totalDueAmount);
}
currentDueClcltn(){
 this.totalCurrentDue= this.totalPayable-this.PaidAmount;
}
addNewCustomer(){
  console.log(this.myControlCustomer.value)
  console.log(this.clinentName)
  let obj={name:this.clinentName,phone:this.myControlCustomer.value};
  this.customerService.addMyCustomerProfileInfo(obj).then(t=>{
    alert('Customer Saved !')
  })
   
}

productSelection(key){
let filterObj=this.productBrands.find(f=>f.key==key);
this.Category=filterObj.catagory;
this.SubCategory=filterObj.subCategory;

console.log(filterObj);
let dtlsInfo=`
${filterObj.catagory},
${filterObj.subCategory},
${filterObj.remarks}
`
 

if(filterObj.quantity<=0){
 // this.Tostr.showToast('danger',"", ""+filterObj.name+" Stock is Already Finished !", "",this.toastrService);
  this.toastrService.stockFinisMessage(filterObj.quantity)
}else{
  this.invoiceEntryForm.push(this.fb.group({
    ProductCategory:filterObj.catagory ,
    ProductSubCategory:filterObj.subCategory,
    ProductBrand:filterObj.name,
    Quantity: [0],
    unit:filterObj.unit,
    Rate: filterObj.cost,
    Amount: [0],
    key:filterObj.key,
    vatPercent:filterObj.vatPercent==undefined?0:filterObj.vatPercent,
    discountPercent:filterObj.discountPercent==undefined?0:filterObj.discountPercent,

    vatAmount:filterObj.vatAmount==undefined?0:filterObj.vatAmount,
    discuntAmount:filterObj.discountAmount==undefined?0:filterObj.discountAmount,
    moreDtls:dtlsInfo
    
  }));
}



}
printPreviw(){
  if(this.invoiceKey!=''){
    this.router.navigate(['/inventory/Invoice-print/',this.invoiceKey])
  }else{
    this.toastrService.saveFirstMessage()
  }
 
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
    this.myControl.reset('');
this.invoiceEntryForm= this.fb.array([]);
}


}

