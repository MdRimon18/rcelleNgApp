import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
 
import { Observable, Subscription } from 'rxjs';
import { UserInfoTblService } from '../../../@core/data/ClientDb/user-info-tbl.service';
import { ProductInfo } from '../../../@core/data/ProductInfo';
import { invoice } from '../../../@core/data/marchanzider-model/invoice';
import { ProductCategories } from '../../../@core/data/marchanzider-model/product-categories';
import { ProductSubCategories } from '../../../@core/data/marchanzider-model/product-sub-categories';
 
import { DailyIncomeExpanseOrAccount, DailyIncomeExpanseService } from '../../../@core/mock/marchandizer/daily-income-expanse.service';
import { DateResizerService } from '../../../@core/mock/marchandizer/date-resizer.service';
import { DropdownValuesService } from '../../../@core/mock/marchandizer/dropdown-values.service';
import { InvoiceDetailsService } from '../../../@core/mock/marchandizer/invoice-details.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { ProductInfoService } from '../../../@core/mock/marchandizer/product-info.service';
import { SupplierService } from '../../Supplier/supplier.service';
import { InvoicEntryModel } from '../../invoice-entry/ivoiceEntryModel';
import { ProductSeralNumbersService } from '../../product-serial-numbers/product-seral-numbers.service';
import { PurchaseInvoiceDetailsService } from '../purchase-invoice-details.service';
import { ToasterService } from '../../../@core/mock/toaster.service';

@Component({
  selector: 'ngx-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.scss']
})
export class PurchaseDetailsComponent implements OnInit {
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
  constructor(
    //public invoiceService:InvoiceDetailsService,
   // private productCategoriesService:ProductCategoryService,
    public languageService:LanguageConverterService,
    private fb: FormBuilder,
   // public invoiceDetailsService:InvoiceDetailsService,
    private toastrService:ToasterService,
    private router:Router ,
   // public productInfosServicess:ProductInfoService,
   // private productSubCategoriesService:ProductSubCategoriesService,
   // private customerService:CustomerService,
    private dateResizerService:DateResizerService,
   private mySupplier:SupplierService,
    //private userInfoTblService:UserInfoTblService,
    public purchaseInvoiceDetailsService:PurchaseInvoiceDetailsService,
    public dropdownValuesService: DropdownValuesService,
    private dialog:MatDialog,
    private route:ActivatedRoute,
   // public accountService:DailyIncomeExpanseService,
   // public productSerialNumbersService:ProductSeralNumbersService,
    ) { }

  ngOnInit() {
    this.subscription=this.route.paramMap.subscribe((params: ParamMap) => {
      // You can access and handle the route parameter here
      const key = params.get('key');
      if (key !== null) {
        // Route parameter 'key' has changed, do something with it
      //  console.log(`Route parameter 'key' has changed to: ${key}`);

      this.purchaseInvoiceDetailsService.getByIdpurchaseInvDtlsInfo(key).valueChanges().subscribe(
        (res:any) =>{
         console.log(res)
          this.entryDate=res.entryDate;
           this.clinentName=res.clienName;
           this.memoNo=res.memoNo;
            this.myControlCustomer.setValue(res.mobile )

            this.invoiceEntryForm=this.fb.array([]);
           if(res.items!=undefined&&res.items.length>0){
             res.items.forEach(element => {
           //    element.shippingQnty=element.shippingQnty==null?0:element.shippingQnty; 
              
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
  backToInvoiceInfo(){
    this.router.navigate(['/inventory/purchase-info']);
  }
}
