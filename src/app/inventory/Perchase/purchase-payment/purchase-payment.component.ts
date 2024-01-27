import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoTblService } from '../../../@core/data/ClientDb/user-info-tbl.service';
import { DailyIncomeExpanseOrAccount, DailyIncomeExpanseService } from '../../../@core/mock/marchandizer/daily-income-expanse.service';
import { DateResizerService } from '../../../@core/mock/marchandizer/date-resizer.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { PurchaseMoneyRecitService } from '../../../@core/mock/marchandizer/purchase-money-recit.service';
 
import { PurchaseInvoiceDetailsService } from '../purchase-invoice-details.service';

@Component({
  selector: 'ngx-purchase-payment',
  templateUrl: './purchase-payment.component.html',
  styleUrls: ['./purchase-payment.component.scss']
})
export class PurchasePaymentComponent implements  OnInit {
  productInfos:any[]=[];
  afterSubmitproductInfos:any[]=[];
  key:any;
  paymentForm: FormArray = this.fb.array([]);
  paidAmount:any;
  DueAmount=0;
  dailyIncomeExpanseOrAccount=new  DailyIncomeExpanseOrAccount()
  constructor(public purchaseInvoiceDetailsService:PurchaseInvoiceDetailsService,
    private route:ActivatedRoute,
    private fb: FormBuilder,
    private router:Router,
    private userInfoTblService:UserInfoTblService,
    private dateResizerService:DateResizerService,
    public languageService:LanguageConverterService,
    private purchaseMoneyRecitService:PurchaseMoneyRecitService,
    public accountService:DailyIncomeExpanseService,
    
    ) { 
      // this.paymentForm.push(this.fb.group({
      //   PaidAmount: [0],      
      //   entryDate:[0],
      //   totalAmount: [0],
      //   DueAmount: [0],
      //   key: [0],
        
       
      // }));
    }

  ngOnInit() {
    this.purchaseInvoiceDetailsService.getAllpurchaseInvDtlsInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
    //    y['DueAmount']=y['totalAmount']-y['PaidAmount'];
     
      this.productInfos.push(y);
      });
      this.key = this.route.snapshot.paramMap.get('key');
  
  
 
      let   filteredObj = (this.key) ?
      this.productInfos.find(p =>p.key.toLowerCase()==
      this.key.toLowerCase()) :
       this.productInfos;     
      
  
        this.paymentForm.push(this.fb.group({
          PaidAmount: filteredObj.PaidAmount,      
          entryDate:filteredObj.entryDate,
          totalAmount: filteredObj.totalAmount,
          key: filteredObj.key,
          
        
        }));
      this.DueAmount=filteredObj.DueAmount;

 
        });
  }
  // onDelete(paymentForm,i) {
  //   paymentForm.value.splice(i, 1);
  //  this.paymentForm= this.fb.array([]);
  //      this.paymentForm= this.fb.array([]);
  //      (paymentForm.value).forEach((invoiceDetails: any) => {
  //        this.paymentForm.push(this.fb.group({
  //          ProductCategory: invoiceDetails.ProductCategory,
  //          ProductBrand: invoiceDetails.ProductBrand,
  //          ProductSubCategory: invoiceDetails.ProductSubCategory,
  //          Quantity: invoiceDetails.Quantity,
  //          Rate: invoiceDetails.Rate,
  //          Amount: invoiceDetails.Amount
         
  //        }));
  //      });
     
  //  }
onSubmit(){
  this.key = this.route.snapshot.paramMap.get('key');
let invoicObj= this.productInfos.find(f=>f.key==this.key); 
invoicObj.payingAmount=this.paidAmount;
let pAmount=parseFloat(invoicObj.PaidAmount)+parseFloat(this.paidAmount);
invoicObj.PaidAmount=pAmount;

if(this.paidAmount>0){
  this.dailyIncomeExpanseOrAccount.account='Debited';
 this.dailyIncomeExpanseOrAccount.accountHead='Purchase';
 this.dailyIncomeExpanseOrAccount.date=this.dateResizerService.resize(new Date());
 this.dailyIncomeExpanseOrAccount.totalExpense=this.paidAmount;
 this.dailyIncomeExpanseOrAccount.purpose='Purchase Due Given';
 this.accountService.addProductInfov2(this.dailyIncomeExpanseOrAccount).subscribe(res=>{});
}

invoicObj.DueAmount=(invoicObj.DueAmount-this.paidAmount);
 this.purchaseInvoiceDetailsService.updatepurchaseInvDtlsInfo(invoicObj.key,invoicObj).then(t=>{
   this.productInfos=[];
   invoicObj.invoicEntryBy=invoicObj.entryBy;
   invoicObj.invoicEntryDate=invoicObj.entryDate;
   invoicObj.invoicKey=invoicObj.key;
   delete invoicObj.items;
   delete invoicObj.key;
   invoicObj.entryBy=this.userInfoTblService.ObjectReciever.value.phone;
   invoicObj.entryDate=this.dateResizerService.resize(new Date());
   //money recit save here..
   this.purchaseMoneyRecitService.addMoneyRecitPurchase(invoicObj).then(t=>{
     this.router.navigate(["/inventory/purchase-due-payment-detls"]);
   });
   
  });
 
}
backToInvoiceInfo(){
  this.router.navigate(["/inventory/purchase-due-payment-detls"]);
}
//    onSubmit(paymentForm,givenAmount){
// let paidAmount=parseInt(givenAmount);
 
//  let invoicObj= this.productInfos.find(f=>f.key==paymentForm.value[0].key);
//  if(paidAmount>=0){
//   let dueAmount= invoicObj.totalAmount-parseInt(invoicObj.PaidAmount);
//   if(dueAmount<=paidAmount){

//     invoicObj.PaidAmount= parseInt(invoicObj.PaidAmount)+dueAmount ;
//     paidAmount=paidAmount-dueAmount;
//   } 
 
  
//    if(dueAmount>paidAmount){
    
//     invoicObj.PaidAmount=parseInt(invoicObj.PaidAmount)+paidAmount;
//     paidAmount=paidAmount-dueAmount;
//    } 
//  }
 
//  this.invoiceDetailsService.updateProductInfo(invoicObj.key,invoicObj).then(t=>{
//    this.productInfos=[];
//   // this.router.navigate(["/inventory/Deu-Payment-Details"]);
  
  
//   });




 
// //});



//    }
}
