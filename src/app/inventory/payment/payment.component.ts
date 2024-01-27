import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { UserInfoTblService } from '../../@core/data/ClientDb/user-info-tbl.service';
import { DateResizerService } from '../../@core/mock/marchandizer/date-resizer.service';
import { InvoiceDetailsService } from '../../@core/mock/marchandizer/invoice-details.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { MoneyRecitService } from '../../@core/mock/marchandizer/money-recit.service';
import { DailyIncomeExpanseOrAccount, DailyIncomeExpanseService } from '../../@core/mock/marchandizer/daily-income-expanse.service';
 
@Component({
  selector: 'ngx-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  productInfos:any[]=[];
  afterSubmitproductInfos:any[]=[];
  key:any;
  paymentForm: FormArray = this.fb.array([]);
  paidAmount:any=0;
  DueAmount=0;
  dailyIncomeExpanseOrAccount=new  DailyIncomeExpanseOrAccount()
  constructor(public invoiceDetailsService:InvoiceDetailsService,
    private route:ActivatedRoute,private fb: FormBuilder,private router:Router,
    private userInfoTblService:UserInfoTblService,
    private dateResizerService:DateResizerService,
    private moneyRecitService:MoneyRecitService,
    public languageService:LanguageConverterService,
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
    this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
    //    y['DueAmount']=y['totalAmount']-y['PaidAmount'];
     
      this.productInfos.push(y);
      });
      this.key = this.route.snapshot.paramMap.get('key');
  
    if(this.key!=null){}
 
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
   
onSubmit(){
  this.key= this.route.snapshot.paramMap.get('key');
let invoicObj= this.productInfos.find(f=>f.key==this.key); 
if(this.paidAmount>0){
  this.dailyIncomeExpanseOrAccount.account='Credited';
 this.dailyIncomeExpanseOrAccount.accountHead='Sales';
 this.dailyIncomeExpanseOrAccount.date=this.dateResizerService.resize(new Date());
 this.dailyIncomeExpanseOrAccount.totalExpense=this.paidAmount;
 this.dailyIncomeExpanseOrAccount.purpose='Due Received';
 this.accountService.addProductInfov2(this.dailyIncomeExpanseOrAccount).subscribe(res=>{});
}
let pAmount=parseFloat(invoicObj.PaidAmount)+parseFloat(this.paidAmount);
invoicObj.PaidAmount=pAmount;
invoicObj.payingAmount=this.paidAmount;
invoicObj.DueAmount=(invoicObj.DueAmount-this.paidAmount);
invoicObj.PrevDue=(invoicObj.PrevDue-this.paidAmount);
 this.invoiceDetailsService.updateProductInfo(invoicObj.key,invoicObj).then(t=>{
   this.productInfos=[];
   invoicObj.invoicEntryBy=invoicObj.entryBy;
   invoicObj.invoicEntryDate=invoicObj.entryDate;
   invoicObj.invoicKey=invoicObj.key;
   delete invoicObj.items;
   delete invoicObj.key;
   invoicObj.entryBy=this.userInfoTblService.ObjectReciever.value.phone;
   invoicObj.entryDate=this.dateResizerService.resize(new Date());
   //money recit save here..
   this.moneyRecitService.addMoneyRecit(invoicObj).then(t=>{
     this.router.navigate(["/inventory/Deu-Payment-Details"]);
   });
  });


 
}
backToInvoiceInfo(){
  this.router.navigate(["/inventory/Deu-Payment-Details"]);
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
