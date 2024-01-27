import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { Tostr } from '../../../@core/data/tostr.model';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { PurchaseMoneyRecitService } from '../../../@core/mock/marchandizer/purchase-money-recit.service';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
import { DataSharingService } from '../../E-commerce/data-sharing.service';
 
import { PurchaseInvoiceDetailsService } from '../purchase-invoice-details.service';
import { FormArray, FormBuilder } from '@angular/forms';
import { DailyIncomeExpanseOrAccount, DailyIncomeExpanseService } from '../../../@core/mock/marchandizer/daily-income-expanse.service';
import { UserInfoTblService } from '../../../@core/data/ClientDb/user-info-tbl.service';
import { DateResizerService } from '../../../@core/mock/marchandizer/date-resizer.service';

@Component({
  selector: 'ngx-purchase-due-payment-detls',
  templateUrl: './purchase-due-payment-detls.component.html',
  styleUrls: ['./purchase-due-payment-detls.component.scss']
})
export class PurchaseDuePaymentDetlsComponent implements OnInit {
  mobileNo:string='';
  entryDate:string='';
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  productInfos:any[]=[];
  Tostr=new Tostr();
  subscription:Subscription;

  columns = [
    {field:"filter"},
    {field:"invoiceNo",header:`${this.languageService.SalesReturnInfo.invoiceNo}`},
    {field:"mobile",header:`${this.languageService.SalesReturnInfo.mobile}`},
    {field:"memoNo",header:`${this.languageService.SalesReturnInfo.MemoNo}`},
    {field:"entryDate",header:`${this.languageService.SalesReturnInfo.Date}`},
    {field:"clienName",header:`${this.languageService.SalesReturnInfo.ClientName}`},
    {field:"totalAmount",header:`${this.languageService.SalesReturnInfo.TotalAmount}`},
    {field:"PaidAmount",header:`${this.languageService.SalesReturnInfo.PaidAmount}`},
    {field:"DueAmount",header:`${this.languageService.SalesReturnInfo.DueAmount}`},
    {field:"Recit",header:`Recit`}
    
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };
  


       
  afterSubmitproductInfos:any[]=[];
  key:any;
  paymentForm: FormArray = this.fb.array([]);
  paidAmount:any=0;
  DueAmount=0;
  dailyIncomeExpanseOrAccount=new  DailyIncomeExpanseOrAccount()
  paymentMessage: string='';
  constructor(public purchaseInvoiceDetailsService:PurchaseInvoiceDetailsService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private purchaseMoneyRecitService: PurchaseMoneyRecitService,
     private router:Router,
     public languageService:LanguageConverterService,
     public dataSharingService:DataSharingService,

      
    private route:ActivatedRoute,
    private fb: FormBuilder,
    private userInfoTblService:UserInfoTblService,
    private dateResizerService:DateResizerService,
    public accountService:DailyIncomeExpanseService,
     ) { }

  ngOnInit() {
   this.refresList();
  }
  refreshDataSource(searchData){
    this.dataSource = new MatTableDataSource(searchData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  search(purchaseDueSearchArry,searchIndex) {
    let emptyValue,invoiceNo,mobile,memoNo,entryDate,clienName,totalAmount,PaidAmount,DueAmount;
     [emptyValue,invoiceNo,mobile,memoNo,entryDate,clienName,totalAmount,PaidAmount,DueAmount]=purchaseDueSearchArry;
    let result= this.dataSharingService.invoiceSearchByMultiColumn(this.productInfos,
      invoiceNo,
      entryDate,
      clienName,totalAmount,PaidAmount,DueAmount,undefined,mobile,memoNo)
    this.refreshDataSource(result)
   }
//   search(value,searchIndex){
//     if(searchIndex==1){
//         let searchInvoiceNo =this.productInfos.filter(  
//           (res:any) =>res.invoiceNo.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ',''))
//         );
//         this.dataSource = new MatTableDataSource(searchInvoiceNo);
//         this.dataSource.sort = this.sort;
//         this.dataSource.paginator = this.paginator;
    
//         if(searchInvoiceNo.length==0){
//           this.toastrService.searchNotFoundMessage();
//         }
      
//     }
//     if(searchIndex==2){
//       let searchMobileNo=this.productInfos.filter(f=>f.mobile.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ','')))
//       this.dataSource=new MatTableDataSource(searchMobileNo);
//       this.dataSource.sort = this.sort;
//       this.dataSource.paginator = this.paginator;  
//       if(searchMobileNo.length==0){
//         this.toastrService.searchNotFoundMessage();
//       } 
//      if(searchIndex==3){
//       let searchClientName=this.productInfos.filter(f=>f.clienName.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ','')))
//       this.dataSource=new MatTableDataSource(searchClientName);
//       this.dataSource.sort = this.sort;
//       this.dataSource.paginator = this.paginator;  
//       if(searchClientName.length==0){
//         this.toastrService.searchNotFoundMessage();
//       } 
//          }
//          if(searchIndex==4){
//           let searchtotalAmount=this.productInfos.filter(f=>f.totalAmount.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ','')))
//           this.dataSource=new MatTableDataSource(searchtotalAmount);
//           this.dataSource.sort = this.sort;
//           this.dataSource.paginator = this.paginator;  
//           if(searchtotalAmount.length==0){
//             this.toastrService.searchNotFoundMessage();
//           } 
//              }
//   }
//     if(searchIndex==3){
//   let searchMemoNo=this.productInfos.filter(f=>f.memoNo.match(value))
//   this.dataSource=new MatTableDataSource(searchMemoNo);
//   this.dataSource.sort = this.sort;
//   this.dataSource.paginator = this.paginator;  
//   if(searchMemoNo.length==0){
//     this.toastrService.searchNotFoundMessage();
//   } 
//      }
//     if(searchIndex==4){
//   let searchdateWiseProductInfoList=this.productInfos.filter(f=>f.entryDate.match(value))
//   this.dataSource=new MatTableDataSource(searchdateWiseProductInfoList);
//   this.dataSource.sort = this.sort;
//   this.dataSource.paginator = this.paginator;  
//   if(searchdateWiseProductInfoList.length==0){
//     this.toastrService.searchNotFoundMessage();
//   } 
//      }
//      if(searchIndex==5){
//       let searchClientName=this.productInfos.filter(f=>f.clienName.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ','')))
//       this.dataSource=new MatTableDataSource(searchClientName);
//       this.dataSource.sort = this.sort;
//       this.dataSource.paginator = this.paginator;  
//       if(searchClientName.length==0){
//         this.toastrService.searchNotFoundMessage();
//       } 
//          }
//          if(searchIndex==6){
//           let searchtotalAmount=this.productInfos.filter(f=>f.totalAmount.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ','')))
//           this.dataSource=new MatTableDataSource(searchtotalAmount);
//           this.dataSource.sort = this.sort;
//           this.dataSource.paginator = this.paginator;  
//           if(searchtotalAmount.length==0){
//             this.toastrService.searchNotFoundMessage();
//           } 
//              }
  
// }
  clearFilters() {
    this.refresList();
    this.filtersModel = [];
    this.filterKeys = {};
   }
  applyFilter(filterValue: string) {
  
       this.subscription= this.purchaseInvoiceDetailsService.getAllpurchaseInvDtlsInfo().snapshotChanges().subscribe(item=>{
         this.productInfos=[];
         item.forEach(element => {
           var y = element.payload.toJSON();
           y["key"] = element.key;
         this.productInfos.push(y);
          
         })
       let filterdDeuDetails=  this.productInfos.filter(f=>f.mobile.trim().toLowerCase()
       .replace(/\s/g, '') ==this.mobileNo.trim().toLowerCase().replace(/\s/g, ''))
       this.dataSource=new MatTableDataSource(filterdDeuDetails);
     
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
 
       })
  
  }

  AddNewInpurRow(){

    this.router.navigate(['/inventory/Invoice-entry']);
    // this.productInfos=[];
    // this.subscription=   this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
    //   item.forEach(element => {
    //     var y = element.payload.toJSON();
    //     y["key"] = element.key;

    //     this.productInfos.push(y as InvoiceDetails);
    //   })
     
    //   this.productInfos.unshift({ key: '', CustomerName: '', Product: '',quantity:0,date:'',totalPrice:0,paidPrice:0});
    //   this.dataSource=new MatTableDataSource(this.productInfos);
     
    // })
  }
  Refresh(){
    this.refresList();
  }
  payment(elm){
    this.paymentMessage='';
     this.key=elm.key;
      let   filteredObj = (elm.key) ?
      this.productInfos.find(p =>p.key.toLowerCase()==
      elm.key.toLowerCase()) :
       this.productInfos;     
      
       this.paymentForm=this.fb.array([]);
        this.paymentForm.push(this.fb.group({
          PaidAmount: filteredObj.PaidAmount,      
          entryDate:filteredObj.entryDate,
          totalAmount: filteredObj.totalAmount,
          key: filteredObj.key,
          
        
        }));
        this.paidAmount=0;
      this.DueAmount=filteredObj.DueAmount;
   // this.router.navigate(['/inventory/purchase-payment/',elm.key]);
  
  }
  onSubmit(){
   
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
   
     invoicObj.invoicEntryBy=invoicObj.entryBy;
     invoicObj.invoicEntryDate=invoicObj.entryDate;
     invoicObj.invoicKey=invoicObj.key;
     delete invoicObj.items;
     delete invoicObj.key;
     invoicObj.entryBy=this.userInfoTblService.ObjectReciever.value.phone;
     invoicObj.entryDate=this.dateResizerService.resize(new Date());
     //money recit save here..
     this.purchaseMoneyRecitService.addMoneyRecitPurchase(invoicObj).then(t=>{
      this.paymentMessage='Payment Succesfull !'
      // this.router.navigate(["/inventory/purchase-due-payment-detls"]);
     });
     
    });
   
  }
  
  moneyRecit(mobile){
    
     this.router.navigate(['/inventory/inventory/money-recit-purchase/',mobile]);
   
   }
   moneyRecitv2(mobile,invoiceNo){
    
    this.router.navigate(['/inventory/money-recit-puchase-v2/',mobile,invoiceNo]);
  
  }
  save(element){
 
    this.purchaseInvoiceDetailsService.addpurchaseInvDtlsInfo(element).then(data=>{
    
      this.toastrService.saveMessage()
      this.refresList();
    },(err) => { this.toastrService.errorMessage()})

  }

  edit(element){
    
    this.purchaseInvoiceDetailsService.updatepurchaseInvDtlsInfo(element.key,element).then(data=>{
      
      this.toastrService.updateMessage()
      this.refresList();
    },(err) => { this.toastrService.errorMessage()})
  }

  delete(element){
    
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
               .afterClosed().subscribe(res=>{
                if(res){
                  this.purchaseInvoiceDetailsService.deletepurchaseInvDtlsInfo(element.key).then(res=>{
                    this.refresList();
                    this.toastrService.deleteMessage()
                  },(err) => { this.toastrService.errorMessage()});
                }
               })
  }


  refresList(){
    
   this.subscription= this.purchaseInvoiceDetailsService.getAllpurchaseInvDtlsInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.val();
        y["key"] = element.key;
        y["entryDate"]=new Date(y["entryDate"]).toDateString()
     
      this.productInfos.push(y);
     
      })
      

// var result = [];
// this.productInfos.reduce(function(res, value) {
//    if (!res[value.mobile]) {
//      res[value.mobile] = {entryDate:value.entryDate,clienName:value.clienName,mobile:value.mobile, tAmount:0, PAmount: 0, DAmount:0};
//      result.push(res[value.mobile])
//    }
//    res[value.mobile].tAmount +=value.totalAmount;
//    res[value.mobile].PAmount +=parseInt(value.PaidAmount) ;
//    res[value.mobile].DAmount +=value.DueAmount;
//    return res;
//  }, {});

      this.dataSource=new MatTableDataSource(this.productInfos.reverse());
     
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      
    })
   
  }

  printInvoice(element){
    
    this.router.navigate(['/inventory/Invoice-print/',element.key]);
  }

}
