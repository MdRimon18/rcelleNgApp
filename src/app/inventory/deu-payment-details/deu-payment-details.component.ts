 
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
 
import { Subscription } from 'rxjs';
import { NbToastrService } from '@nebular/theme';
 
import { InvoicEntryModel } from '../invoice-entry/ivoiceEntryModel';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { Tostr } from '../../@core/data/tostr.model';
import { InvoiceDetailsService } from '../../@core/mock/marchandizer/invoice-details.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { MatDialogService } from '../../@core/mock/mat-dialog.service';
import { ToasterService } from '../../@core/mock/toaster.service';
import { DataSharingService } from '../E-commerce/data-sharing.service';
import { FormArray, FormBuilder } from '@angular/forms';
import { DailyIncomeExpanseOrAccount, DailyIncomeExpanseService } from '../../@core/mock/marchandizer/daily-income-expanse.service';
import { UserInfoTblService } from '../../@core/data/ClientDb/user-info-tbl.service';
import { DateResizerService } from '../../@core/mock/marchandizer/date-resizer.service';
import { MoneyRecitService } from '../../@core/mock/marchandizer/money-recit.service';
import { DropdownValuesService } from '../../@core/mock/marchandizer/dropdown-values.service';
 

@Component({
  selector: 'ngx-deu-payment-details',
  templateUrl: './deu-payment-details.component.html',
  styleUrls: ['./deu-payment-details.component.scss']
})
  export class DeuPaymentDetailsComponent implements OnInit {
    mobileNo:string='';
    entryDate:string='';
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    dataSource = new MatTableDataSource();
    displayedColumns = [ 'memoNo','clienName','mobile','totalAmount','PaidAmount','DueAmount','Recit'];
    columns = [
      {field:"filter"},
      {field:"mobile",header:`${this.languageService.SalesReturnInfo.mobile}`},
      {field:"invoiceNo",header:`${this.languageService.SalesReturnInfo.invoiceNo}`},
      {field:"entryDate",header:`${this.languageService.SalesReturnInfo.Date}`},
      {field:"clienName",header:`${this.languageService.SalesReturnInfo.ClientName}`},
      {field:"totalAmount",header:`${this.languageService.SalesReturnInfo.TotalAmount}`},
      {field:"PaidAmount",header:`${this.languageService.SalesReturnInfo.PaidAmount}`},
      {field:"DueAmount",header:`${this.languageService.SalesReturnInfo.DueAmount}`},
      {field:"Products",header:'Action'}
      
      ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };
    productInfos:any[]=[];
    Tostr=new Tostr();
    subscription:Subscription;
    isPaidOrUnpaid=false;


    
    afterSubmitproductInfos:any[]=[];
    key:any;
    paymentForm: FormArray = this.fb.array([]);
    paidAmount:any=0;
    DueAmount=0;
    dailyIncomeExpanseOrAccount=new  DailyIncomeExpanseOrAccount()
 
    paymentMessage='';
    isPaymentSubmitted:boolean=false;
    constructor(
      public invoiceDetailsService:InvoiceDetailsService,
      private toastrService:ToasterService,
      private mathdialogService: MatDialogService,
      private router:Router,
      public languageService:LanguageConverterService,
      public dataSharingService:DataSharingService,
      public dropdownValuesService:DropdownValuesService,


      
    private route:ActivatedRoute,private fb: FormBuilder, 
    private userInfoTblService:UserInfoTblService,
    private dateResizerService:DateResizerService,
    private moneyRecitService:MoneyRecitService,
    public accountService:DailyIncomeExpanseService,
      ) { }

      ngOnInit() {
        this.dropdownValuesService.getDateRange();
       this.refresList();
      //this.loadData();
       
      }
      onChangeDateRange(){
        this.dropdownValuesService.getDateRange();
        this.refresList();
      }
      applyFilter(){
        this.refresList();
      }

    // applyFilter(filterValue: string) {
   
    //     this.subscription= this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
    //       this.productInfos=[];
    //       item.forEach(element => {
    //         var y = element.payload.toJSON();
    //         y["key"] = element.key;
    //       this.productInfos.push(y);
            
    //       })
    //     let filterdDeuDetails=  this.productInfos.filter(f=>f.mobile.trim().toLowerCase()
    //     .replace(/\s/g, '') ==this.mobileNo.trim().toLowerCase().replace(/\s/g, ''))
    //     this.dataSource=new MatTableDataSource(filterdDeuDetails);
      
    //     this.dataSource.sort = this.sort;
    //     this.dataSource.paginator = this.paginator;
  
    //     })
    
    // }
    refreshDataSource(searchData){
      this.dataSource = new MatTableDataSource(searchData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    search(duePaymentArray,searchIndex) {
      let emptyValue,mobile,invoiceNo,entryDate,clienName,totalAmount,PaidAmount,DueAmount;
      [emptyValue,mobile,invoiceNo,entryDate,clienName,totalAmount,PaidAmount,DueAmount]=duePaymentArray;
      let result= this.dataSharingService.invoiceSearchByMultiColumn(this.productInfos,
        invoiceNo,
        entryDate,
        clienName,totalAmount,PaidAmount,DueAmount,undefined,mobile)
      // let result= this.dataSharingService.invoiceSearchByMultiColumn(this.productInfos,value[2],value[3],
      //   value[4],value[5],value[6],value[7],undefined,value[1])
      //   console.log(result)
      this.refreshDataSource(result)
    
     }
  //   search(value,searchIndex) {
  //     if(searchIndex==1){
     
  //       let searchmobile =this.productInfos.filter(  
  //         (res:any) =>res.mobile.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ',''))
  //       );
  //       this.dataSource = new MatTableDataSource(searchmobile);
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
    
  //       if(searchmobile.length==0){
  //         this.toastrService.searchNotFoundMessage();
  //       }
      
  //   }
  //     if(searchIndex==2){
  //       let searchInvoiceNo =this.productInfos.filter(  
  //         (res:any) =>res.invoiceNo.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ',''))
  //       );
  //       console.log(searchInvoiceNo)
  //       this.dataSource = new MatTableDataSource(searchInvoiceNo);
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
    
  //       if(searchInvoiceNo.length==0){
  //         this.toastrService.searchNotFoundMessage();
  //       }
      
  //   }
  //   if(searchIndex==3){
  // let searchdateWiseProductInfoList=this.productInfos.filter(f=>f.entryDate.match(value))
  // this.dataSource=new MatTableDataSource(searchdateWiseProductInfoList);
  // this.dataSource.sort = this.sort;
  // this.dataSource.paginator = this.paginator;  
  // if(searchdateWiseProductInfoList.length==0){
  //   this.toastrService.searchNotFoundMessage();
  // } 
  //    }
  //    if(searchIndex==4){
  //     let searchClientName=this.productInfos.filter(f=>f.clienName.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ','')))
  //     this.dataSource=new MatTableDataSource(searchClientName);
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;  
  //     if(searchClientName.length==0){
  //       this.toastrService.searchNotFoundMessage();
  //     } 
  //        }
  //        if(searchIndex==5){
  //         let searchtotalAmount=this.productInfos.filter(f=>f.totalAmount.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ','')))
  //         this.dataSource=new MatTableDataSource(searchtotalAmount);
  //         this.dataSource.sort = this.sort;
  //         this.dataSource.paginator = this.paginator;  
  //         if(searchtotalAmount.length==0){
  //           this.toastrService.searchNotFoundMessage();
  //         } 
  //            }
   
  //   }
    clearFilters() {
     this.refresList();
      this.filtersModel = [];
      this.filterKeys = {};
     }


    AddNewInpurRow(){

      this.router.navigate(['/inventory/Invoice-entry']);
      // this.productInfos=[];
      // this.subscription=   this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      //   item.forEach(element => {
      //     var y = element.payload.toJSON();
      //     y["key"] = element.key;

      //     this.productInfos.push(y as InvoiceDetails);
      //   })
      
      //   this.productInfos.unshift({ key: '', CustomerName: '', Product: '',quantity:0,date:'',totalPrice:0,paidPrice:0});
      //   this.dataSource=new MatTableDataSource(this.productInfos);
      //   console.log(this.productInfos);
      // })
    }
    Refresh(){
      this.refresList();
    }
    payment(key){
    this.paymentMessage='';
     this.key=key;
      let   filteredObj = (key) ?
      this.productInfos.find(p =>p.key.toLowerCase()==
      key.toLowerCase()) :
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
    //  this.router.navigate(['/inventory/payment/',elm.key]);
    
    }
    onSubmit(){
      this.isPaymentSubmitted=true;  
    let invoicObj= this.productInfos.find(f=>f.key==this.key); 
    // console.log(this.productInfos);
    // console.log(invoicObj);
    if(this.paidAmount>0){
      this.dailyIncomeExpanseOrAccount.account='Credited';
     this.dailyIncomeExpanseOrAccount.accountHead='Sales';
     this.dailyIncomeExpanseOrAccount.date=this.dateResizerService.resize(new Date());
     this.dailyIncomeExpanseOrAccount.entryDateTime=this.dropdownValuesService.dateNdTimeFormat(invoicObj.entryDate);
     this.dailyIncomeExpanseOrAccount.totalExpense=this.paidAmount;
     this.dailyIncomeExpanseOrAccount.purpose='Due Received';
     this.accountService.addProductInfov2(this.dailyIncomeExpanseOrAccount).subscribe(res=>{});
    }
 
    invoicObj.PaidAmount=parseFloat(invoicObj.PaidAmount)+parseFloat(this.paidAmount);
    if(invoicObj.payingAmount==undefined){invoicObj.payingAmount=0}
    invoicObj.payingAmount= parseFloat(invoicObj.payingAmount)+parseFloat(this.paidAmount);
    invoicObj.DueAmount=(invoicObj.DueAmount-this.paidAmount);
 //  invoicObj.PrevDue=(invoicObj.PrevDue-this.paidAmount);
     invoicObj.entryDate=this.dateResizerService.resize(invoicObj.entryDate);
     this.invoiceDetailsService.updateProductInfo(invoicObj.key,invoicObj).then(t=>{
    //   this.productInfos=[];
    let moneyRecitObj:any={}
    //moneyRecitObj.invoicEntryBy=invoicObj.entryBy;
    //moneyRecitObj.invoicEntryDate=invoicObj.entryDate;
   
      //  delete invoicObj.items;
      //  delete invoicObj.key;
      moneyRecitObj.invoicKey=invoicObj.key;
       moneyRecitObj.entryBy=this.userInfoTblService.ObjectReciever.value.phone;
       moneyRecitObj.entryDate=this.dateResizerService.resize(new Date());
       moneyRecitObj.entryDateTime=this.dropdownValuesService.dateNdTimeFormat(invoicObj.entryDate);
       //money recit save here..
       this.moneyRecitService.addMoneyRecit(moneyRecitObj).then(t=>{
        this.paymentMessage='Payment Succesfull !'
        this.isPaymentSubmitted=false;
         //this.router.navigate(["/inventory/Deu-Payment-Details"]);
       });
      });
    
    
     
    }
    moneyRecitHistry(mobile){

      this.router.navigate(['/inventory/money-recit/',mobile]);
    
    }
    moneyRecitHistry2(mobile){

      this.router.navigate(['/inventory/money-recit-display-v2/',mobile]);
    
    }
    moneyRecitByInvoice(invoiceNo){

      this.router.navigate(['/inventory/money-recit-by-invoice/',invoiceNo]);
    
    }
    moneyRecitByInvoice2(invoiceNo){

      this.router.navigate(['/inventory/money-recit-invoice-v2/',invoiceNo]);
    
    }
    save(element){
  
      this.invoiceDetailsService.addProductInfo(element).then(data=>{
      
        this.toastrService.saveMessage();
        this.refresList();
      },(err) => { 
        this.toastrService.errorMessage()
      })

    }

    edit(element){
      
      this.invoiceDetailsService.updateProductInfo(element.key,element).then(data=>{
        
        this.toastrService.updateMessage();
        this.refresList();
      },(err) => { 
        this.toastrService.errorMessage()
      })
    }

    delete(element){
      
      this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
                .afterClosed().subscribe(res=>{
                  if(res){
                    this.invoiceDetailsService.deleteProductInfo(element.key).then(res=>{
                      this.refresList();
                      this.toastrService.deleteMessage();
                    },(err) => { 
                      this.toastrService.errorMessage()
                    });
                  }
                })
    }


    refresList(){
      this.productInfos=[]
      this.subscription = this.invoiceDetailsService
      .getInvoiceByDateRangeWithSnapShot(this.dropdownValuesService.fromDate, this.dropdownValuesService.toDate)
      .subscribe(snapshot => {
        const items = [];
        snapshot.forEach(item => {
          const data:any = item.payload.val();
          if (data.DueAmount > 0) {
            data["key"] = item.key;
            data['entryDate']=new Date( data['entryDate']).toDateString();
            items.push(data);
          }
        });
    //  console.log(items)
        this.dataSource = new MatTableDataSource(items.reverse());
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.productInfos=this.dataSource.data;
   
      });
    
       
      
    
    }

    printInvoice(element){
      
      this.router.navigate(['/inventory/Invoice-print/',element.key]);
    }
    onChangePaidUnpaid(){
      this.subscription= this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
        this.productInfos=[];
        item.forEach(element => {
          var y = element.payload.toJSON();
          y["key"] = element.key;
          if(this.isPaidOrUnpaid){
            if(y["DueAmount"]>0){
              this.productInfos.push(y);
            }
          }else{
            if(y["DueAmount"]==0){
              this.productInfos.push(y);
            }
          }
          
    
          
        })
      
      this.dataSource=new MatTableDataSource(this.productInfos);
    
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      })
    }
  }
