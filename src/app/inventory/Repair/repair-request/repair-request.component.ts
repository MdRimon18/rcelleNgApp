import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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
import { ToasterService } from '../../../@core/mock/toaster.service';
  
import { CustomerService } from '../../Customer/customer.service';
import { InvoicEntryModel } from '../../invoice-entry/ivoiceEntryModel';
import { ProductSerialNumberModalComponent } from '../../product-serial-number-modal/product-serial-number-modal.component';
import { ProductSeralNumbersService } from '../../product-serial-numbers/product-seral-numbers.service';
import { RepairService } from '../repair.service';

@Component({
  selector: 'ngx-repair-request',
  templateUrl: './repair-request.component.html',
  styleUrls: ['./repair-request.component.scss']
})
export class RepairRequestComponent implements OnInit,OnDestroy {
  
  myControlCustomer = new FormControl();
  options: string[] = ['One', 'Two', 'Three']; 
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
  receivedBy='';
  serialNumberStorage=[];
  memoNo: any;
  constructor(public invoiceService:RepairService,
    private productCategoriesService:ProductCategoryService,
   public dropdownValuesService: DropdownValuesService,
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
    private dialog:MatDialog,
    public productSerialNumbersService:ProductSeralNumbersService,
    ) { 
      this.dropdownValuesService.initialization();
this.productSerialNumbersService.ObjectTbl.subscribe(res=>{
   
  if(res!=0){
    res.forEach(element => {
      this.serialNumberStorage.push(element);
    });
   
 // res.forEach(element => {
   // delete element.isSelected;
  //   let index=  this.invoiceEntryForm.value.findIndex(f=>f.key==res[0].productKey);
  
  // this.invoiceEntryForm.value[index].serialNumbers=res;
  // this.invoiceEntryForm.value.forEach(element => {
    
  // });
 // });
  
  }
});

    }

    
    private _filterCustomer(value: any): any[] {
      const filterValue = value.toLowerCase();
     this.isShowCustomerAddBtn= this.customers.some(f=>f.phone.trim()==this.myControlCustomer.value);
      return this.customers.filter(option => option.phone.toLowerCase().indexOf(filterValue) === 0);
    }
  ngOnInit() {
      this.entryDate=this.dateResizerService.resize(new Date());
      
      this.productCategoriesDDL();
      this.productBrandDDL();
      this.productSubCategoryDDL();
      this.loadCustomer();
      this.loadSalesInvoiceDetails();
    
  }
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
        this.totalCurrentDue= this.totalCurrentDue-this.totalPayable;
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

    

      onDelete(invoiceEntryForm,i) {
       
        this.serialNumberStorage= this.serialNumberStorage.filter(f=>f.productKey!=this.invoiceEntryForm.value[i].key);
       
      
        this.invoiceEntryForm.value.splice(i, 1);
       
     
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
  
  
  let mobile=this.myControlCustomer.value;
  if(mobile==null||mobile==''){
    alert('Client Mobile Number is Requird !');
    return;
  }
  if(this.clinentName==null||this.clinentName==''){
    alert('Client Name is Requird !');
    return;
  }
  if(this.invoiceEntryForm.value.length<=0){
    alert('Please Choose Item to Sale !');
    return;
  }
 const checkQuantiy= this.invoiceEntryForm.value.find(f=>f.Quantity==null||f.Quantity==undefined||f.Quantity==''||f.Quantity<=0);
 if(checkQuantiy!=undefined){
  this.toastrService.openSnackBarWarning(`Quantity is Requird !`,'')
  
   return;
 }
    

 let invoiceEntryDetails=new InvoicEntryModel();
 
 invoiceEntryDetails.items=this.invoiceEntryForm.value;
  
 
 invoiceEntryDetails.totalAmount=this.totalPayable;
 invoiceEntryDetails.SubTotal=this.totalAmount;
 invoiceEntryDetails.entryDate=this.entryDate;
 invoiceEntryDetails.receivedBy=this.receivedBy;
 invoiceEntryDetails.PaidAmount=this.PaidAmount;
 invoiceEntryDetails.clienName=this.clinentName;
 invoiceEntryDetails.DueAmount=this.totalDueAmount;
 invoiceEntryDetails.totalVat=this.totalVat;
 invoiceEntryDetails.totalDiscount=this.totalDiscount;
 invoiceEntryDetails.totalAddiDiscnt=this.additionalDiscount;
 invoiceEntryDetails.TotalBuyingPrice=0;
 invoiceEntryDetails.totalProfit=0;
 invoiceEntryDetails.invoiceNo=this.memoNo;
 invoiceEntryDetails.PrevDue=this.PreviousDue;
 
  invoiceEntryDetails.mobile=this.myControlCustomer.value;
  invoiceEntryDetails.entryBy=this.userInfoTblService.ObjectReciever.value.phone;

  (invoiceEntryDetails.items).forEach((invoiceDetails: any) => {
   
      // if(invoiceDetails.Quantity==null||invoiceDetails.Quantity==undefined||
      //   invoiceDetails.Quantity <=0){
      //      this.Tostr.showToast('danger',"","Quantity is Requird !", "",this.toastrService);
      //    return;
      //   }
      invoiceDetails.serialNumbers=this.serialNumberStorage.filter(f=>f.productKey==invoiceDetails.key);
     
   
   let filteredProductObj= this.productBrands.find(f=>f.key==invoiceDetails.key);
   filteredProductObj.quantity=(filteredProductObj.quantity-invoiceDetails.Quantity);
   let profitProductWise=(filteredProductObj.cost-filteredProductObj.productBuyingPrice);
   invoiceEntryDetails.TotalBuyingPrice+=(filteredProductObj.productBuyingPrice*invoiceDetails.Quantity);
   invoiceEntryDetails.totalProfit+=profitProductWise;
    
  //  this.productInfosServicess.updateProductInfo(invoiceDetails.key,filteredProductObj).then(t=>{},err=>{console.log(err)})
    });

this.invoiceService.addRepairInfo(invoiceEntryDetails).then(t=>{
  this.invoiceKey=t.key;
  this.toastrService.saveMessage()
  this.reset();
  this.serialNumberStorage=[];

});

}

 

  backToInvoiceInfo(){
    this.router.navigate(['/inventory/repair-summary']);
  }
  finalPayableCalculation(){
  this.totalPayable=this.totalPayable-this.PaidAmount;
  }
  OnChangeActions(){
    this.totalAmount=0;
    this.totalVat=0;
    this.totalDiscount=0;
    this.totalPayable=0;
    this.additionalDiscount=0;
    this.PaidAmount=0;
    this.totalCurrentDue=0;
     
    this.invoiceEntryForm.value.forEach(element => {
//console.log(element)
        element.Quantity=element.Quantity==null?0:element.Quantity; 
        element.Amount=element.Amount==null?0:element.Amount; 
        
         this.totalAmount+=(element.Quantity*element.Amount);
        
            element.ProductCategory= element.ProductCategory;
            element.ProductSubCategory= element.ProductSubCategory;
            element.ProductBrand= element.ProductBrand;
            element.Quantity= element.Quantity;
            element.unit=element.unit;
            element.Rate= element.Rate;
            element.Amount=element.Amount;
            element.key=element.key;
            element.vatPercent=element.vatPercent; 
            element.discountPercent=element.discountPercent;
            element.vatAmount=0;
            element.discuntAmount=0;
            element.remarks=element.remarks;
            element.warantyNgurenty=element.warantyNgurenty==undefined?'':element.warantyNgurenty;
       //}
      });
      this.totalPayable=this.totalAmount;
      
      this.totalCurrentDue=this.totalPayable-(this.PaidAmount+this.additionalDiscount);
     //  });

      
      
}
customerSelection(obj){
 
  this.PreviousDue=0;
  this.clinentName=obj.name;
   
 
}
currentDueClcltn(){
 this.totalCurrentDue= this.totalPayable-this.PaidAmount;
}
addNewCustomer(){
   
 
  let obj={name:this.clinentName,phone:this.myControlCustomer.value};
  this.customerService.addMyCustomerProfileInfo(obj).then(t=>{
    alert('Customer Saved !')
  })
   
}

productSelection(key){
let filterObj=this.productBrands.find(f=>f.key==key);
this.dropdownValuesService.Category=filterObj.catagory;
this.dropdownValuesService.SubCategory=filterObj.subCategory; 
console.log(filterObj)
 
// let dtlsInfo=`
// ${filterObj.catagory},
// ${filterObj.subCategory},
// ${filterObj.remarks}
// `
 

// if(filterObj.quantity<=0){
//   this.Tostr.showToast('danger',"", ""+filterObj.name+" Stock is Already Finished !", "",this.toastrService);

// }else{
  this.invoiceEntryForm.push(this.fb.group({
    ProductCategory:filterObj.catagory ,
    ProductSubCategory:filterObj.subCategory,
    ProductBrand:filterObj.name,
    Quantity: [0],
    unit:filterObj.unit,
    Rate: 0,
    Amount: [0],
    key:filterObj.key,
    vatPercent:filterObj.vatPercent,
    discountPercent:filterObj.discountPercent,
    warantyNgurenty:filterObj.warantyNgurenty,
    vatAmount:filterObj.vatAmount,
    discuntAmount:filterObj.discountAmount,
    remarks:'',
   
  }));
//}



}
printPreviw(){
  if(this.invoiceKey==undefined){
    alert('Please Save First !')
    return;
  }
  if(this.invoiceKey!=''){
    this.router.navigate(['/inventory/Invoice-print/',this.invoiceKey])
  }else{
    alert('Please Save First !')
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

  
  
 
}

