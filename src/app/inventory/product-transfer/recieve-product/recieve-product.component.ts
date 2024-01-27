import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductSerialstblService } from '../../../@core/data/ClientDb/product-serialstbl.service';
import { UserInfoTblService } from '../../../@core/data/ClientDb/user-info-tbl.service';
import { Company } from '../../../@core/data/marchanzider-model/assignCompanyName';
import { invoice } from '../../../@core/data/marchanzider-model/invoice';
import { ProductCategories } from '../../../@core/data/marchanzider-model/product-categories';
import { ProductSeralNumbersService } from '../../../@core/data/marchanzider-model/product-seral-numbers.service';
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
import { UserService } from '../../../@core/mock/marchandizer/user.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
import { CustomerService } from '../../Customer/customer.service';
import { InvoicEntryModel } from '../../invoice-entry/ivoiceEntryModel';
import { ProductSerialNumberModalComponent } from '../../product-serial-number-modal/product-serial-number-modal.component';
import { ProductTransferService } from '../product-transfer.service';
import { RecieveProductService } from '../recieve-product.service';

@Component({
  selector: 'ngx-recieve-product',
  templateUrl: './recieve-product.component.html',
  styleUrls: ['./recieve-product.component.scss']
})
export class RecieveProductComponent implements OnInit,OnDestroy {
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
  serialNumbers: any[];
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

  key:string='';
  toCompanyName='';
  transferDate:any='';
  expectedDeliveryDate:any='';
  transferBy:string='';
  trackingNumber:string='';
  transferVia:string='';
  remarksOrNotes:string='';
  transferCost:number=0;
  
  selectAll:boolean;
  reciveObject:any={};
  isRecieveSubmitted: boolean=false;
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
   private route:ActivatedRoute,
   public productCategoryService:ProductCategoryService,
   private productSubCategoryService:ProductSubCategoriesService,
    ) { 
  

    this.transferDate=this.dateResizerService.resize(new Date());
 
 
this.productSerialNumbersService.ObjectTbl.subscribe(res=>{
 
   let givenBuyingRate=0;
   this.serialNumberStorage=[];
  if(res!=0){
    
    res.forEach((element) => {
      if(element.rate!=null||element.rate!=undefined||element.rate!=''||element.rate>0){
        givenBuyingRate+=element.rate;
      }

       element.name=this.invoiceEntryForm.value.find(f=>f.key==element.productKey).name;
      
    this.serialNumberStorage.push(element);
    });
  console.log(this.serialNumberStorage)
  //  if(givenBuyingRate>0){
  //   let avgRate=(givenBuyingRate/res.length);
  //   this.invoiceEntryForm.value[res.index].productBuyingPrice=avgRate;
  //  }
  
  // this.OnChangeActions(this.invoiceEntryForm.value)
  
  }
});
 
    }

    loadRecieve(res:any){
      this.invoiceEntryForm= this.fb.array([]);
      res.items.forEach(filterObj => {
       
       if(filterObj.isReceive!=true){
        if(filterObj.serialNumbers&&filterObj.serialNumbers.length>0){
          this.serialNumberStorage.push(...filterObj.serialNumbers);
        }
       this.invoiceEntryForm.push(this.fb.group({
            alertQuantity:filterObj.alertQuantity,
            catagory:filterObj.catagory,
            cost:filterObj.cost,
            date:filterObj.date,
            discountAmount:filterObj.discountAmount,
            discountPercent:filterObj.discountPercent,
            key:filterObj.key,
            name:filterObj.name,
            productBuyingPrice:filterObj.productBuyingPrice,
            quantity:filterObj.quantity,
            serialNumber:filterObj.serialNumber,
            subCategory:filterObj.subCategory,
            supplier:filterObj.supplier,
            unit:filterObj.unit,
            vatAmount:filterObj.vatAmount,
            vatPercent:filterObj.vatPercent,
            warantyNgurenty:filterObj.warantyNgurenty,
            isReceive:filterObj.isReceive==undefined?false:filterObj.isReceive
            }));

       }
        
      
       });
    }
    private _filterCustomer(value: any): any[] {
      const filterValue = value.toLowerCase();
      return this.customers.filter(option => option.phone.toLowerCase().indexOf(filterValue) === 0);
    }
 
 
   
  ngOnInit() {
    this.key=this.route.snapshot.paramMap.get('key');
    this.reciveObject={};
   this.recieveProductService.getByIdRecieveInfo(this.key)
   .subscribe(res=>{
    this.reciveObject=res;
  
     this.myControlCustomer = new FormControl(res.SendingCompanyPhone);
     this.toCompanyName=res.SendingCompanyName;
     this.transferDate=res.transferDate;
     this.expectedDeliveryDate=res.expectedDeliveryDate;
     this.transferBy=res.transferBy;
     this.trackingNumber=res.trackingNumber;
     this.transferVia=res.transferVia;
     this.remarksOrNotes=res.remarksOrNotes;
     this.transferCost=res.transferCost;
     this.loadRecieve(res);
    })

    this.productSerialNumbersService.getAllProductSerialNumber().snapshotChanges().subscribe(res=>{
      this.serialNumbers=[];
      res.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
          this.serialNumbers.push(y);
      });
    }) 
  //  this.reciveObject$.subscribe(res=>{console.log})
      this.entryDate=this.dateResizerService.resize(new Date());
     // console.log(this.entryDate)
     
     this.productCategoriesService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.productCategories=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
  
        this.productCategories.push(y as ProductCategories);
      })
  
    });
    this.productSubCategoryService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.productSubCategories=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
  
        this.productSubCategories.push(y as ProductSubCategories);
      })
     
    });
    
      this.productBrandDDL();
    //  this.productSubCategoryDDL();
      this.loadCustomer();
      this.loadSalesInvoiceDetails();
    
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
   const checkQuantiy= this.invoiceEntryForm.value.find(f=>f.quantity==null||f.quantity==undefined||f.quantity==''||f.quantity<=0);
   if(checkQuantiy!=undefined&&checkQuantiy.quantity!=0){
    this.toasterService.openSnackBarWarning('Quantity is Requird !','Ok');
    
   return;
   }
  
  // this.isRecieveSubmitted=true;
 
 let countProductRecieve=0;
      this.invoiceEntryForm.value.forEach(element => {
        if(element.isReceive==true){
          countProductRecieve =countProductRecieve+1;
        }
        const foundItem =  this.reciveObject.items.find(item => item.key === element.key);
        if (foundItem) {
          foundItem.isReceive = element.isReceive;
        }
      });
      console.log(this.reciveObject)

      this.recieveProductService.updateRecieveInfo(this.key,this.reciveObject).then(t=>{
        this.toasterService.openSnackBarSuccess(`${countProductRecieve} Item's Recieve Successfull!`,'Ok')
      },err=>{
       this.toasterService.errorMessage();
     });


      this.reciveObject.items.forEach(element => {

        if(element.isReceive==true){
          let filteredProductObj= this.productBrands.find(f=>
            f.catagory.toLocaleLowerCase().trim().replace(/\s/g, "")==element.catagory.toLocaleLowerCase().trim().replace(/\s/g, "")&&
            f.subCategory.toLocaleLowerCase().trim().replace(/\s/g, "")==element.subCategory.toLocaleLowerCase().trim().replace(/\s/g, "")&&
            f.name.toLocaleLowerCase().trim().replace(/\s/g, "")==element.name.toLocaleLowerCase().trim().replace(/\s/g, "")
            );
            delete element.itemDtls;
           // delete element.serialNumbers;
           
           // if existing product then update
            if(filteredProductObj!=undefined){
              
              filteredProductObj.quantity=filteredProductObj.quantity+element.quantity;
            this.productInfosServicess.updateProductInfo(filteredProductObj.key,filteredProductObj).then(t=>{
              console.log(t);
              if(element.serialNumbers!=null&&element.serialNumbers.length>0){
              
                element.serialNumbers.forEach(elm => {
                  elm.productKey=filteredProductObj.key;
                  elm.isSell='No';
                   this.productSerialNumbersService.addProductSerialNumber(elm).then(t=>{});  
                });
               }

            },err=>{console.log(err)})
           
            }else{
             //if Category Not Exist then insert New Category
       
           let productCtgry=this.productCategories.find(f=>f.ProductName.trim().toLowerCase()==element.catagory.trim().toLowerCase());
          let pSubCategory=this.productSubCategories.find(f=>f.SubCategoreisName.trim().toLowerCase()==element.subCategory.trim().toLowerCase()
          &&f.productCategoriesId.trim().toLowerCase()==element.catagory.trim().toLowerCase());
     
          if(productCtgry==undefined){
            this.productCategories.push({key:'',ProductName:element.catagory});
            this.productCategoryService.addProductInfo({key:'',ProductName:element.catagory}).then(data=>{},(err) => {});
           }
             //if sub Category Not Exist then insert New sub Category
           if(pSubCategory==undefined){
            this.productSubCategories.push({key:'',productCategoriesId:element.catagory,SubCategoreisName:element.subCategory});
            this.productSubCategoryService.addProductInfo({key:'',productCategoriesId:element.catagory,SubCategoreisName:element.subCategory}).then(t=>{});
           }
            //if Product not exist then new insertion
             this.productInfosServicess.addProductInfo(element).then(t=>{
            
              if(element.serialNumbers!=null&&element.serialNumbers.length>0){
              element.serialNumbers.forEach(elm => {
              elm.productKey=t.key;
              elm.isSell='No';
              this.productSerialNumbersService.addProductSerialNumber(elm).then(t=>{});
       
              });
             }
          },err=>{console.log(err)});
            }
        }
                 

     });
    
     this.serialNumberStorage=[];

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

            y["key"] = element.key;
            if(y['userType']=='Shop Owner'){
              this.customers.push({phone: y["phone"],key: y["key"],orgName:y['orgName']});
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

backTo(){
    this.router.navigate(['/inventory/product-receiving-list']);
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
       if(productObj.quantity<element.quantity){
        this.toasterService.stockFinisMessage(productObj.quantity);
        
        element.quantity=0;
       }
        element.quantity=element.quantity==null?0:element.quantity; 
        //element.Quantity=element.Quantity==undefined?0:element.Quantity; 
        let vatAmount=(element.vatAmount*element.quantity);
        let discountAmount=(((element.Rate*element.discountPercent)/100)*element.quantity);
        let amount= (element.quantity*element.Rate);
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
          isReceive:false
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
 console.log(value)
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
  if(this.selectAll){
    this.invoiceEntryForm.value.forEach((element,indx) => {
      this.invoiceEntryForm.at(indx).get('isReceive').patchValue(true);
    });
  }else{
    this.invoiceEntryForm.value.forEach((element,indx) => {
      this.invoiceEntryForm.at(indx).get('isReceive').patchValue(false);
    });
  }

  
}
}

