import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { Tostr } from '../../../@core/data/tostr.model';
import { InvoiceDetailsService } from '../../../@core/mock/marchandizer/invoice-details.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
import { DataSharingService } from '../../E-commerce/data-sharing.service';
 
@Component({
  selector: 'ngx-customer-ledger-v2',
  templateUrl: './customer-ledger-v2.component.html',
  styleUrls: ['./customer-ledger-v2.component.scss']
})
export class CustomerLedgerV2Component implements OnInit {
  filtersModel = [];
  filterKeys = {};
  mobileNo:string='';
  entryDate:string='';
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  columns = [
    {field:"filter"},
    {field:"clienName",header:"Client Name"},
    {field:"mobile",header:"Mobile"},
    {field:"totalAmount",header:"Total Amount"},
    {field:"PaidAmount",header:"Paid Amount"},
    {field:"DueAmount",header:"Due Amount"}
    
    ];
    headers: string[] = this.columns.map(x => x.field);
    headersFilters = this.headers.map((x, i) => x+'_'+i);
  productInfos:any[]=[];
  Tostr=new Tostr();
  subscription:Subscription;
  constructor(public invoiceDetailsService:InvoiceDetailsService,
    private toastrService:ToasterService,
    private mathdialogService: MatDialogService,
    private router:Router,
    public languageService:LanguageConverterService,
    public dataSharingService:DataSharingService,
    ) { }

  ngOnInit() {
  this.refresList();
  }

  applyFilter(filterValue: string) {
 
      this.subscription= this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
        this.productInfos=[];
        item.forEach(element => {
          var y = element.payload.toJSON();
          y["key"] = element.key;
        this.productInfos.push(y);
          
        })

        var helper = {};
 
        var result = this.productInfos
        .reduce((r, o)=> {
          var key =o.mobile;
          
          if(!helper[key]) {
        
            helper[key] = Object.assign({}, o); // create a copy of o
            r.push(helper[key]);
          } else {
            helper[key].DueAmount += o.DueAmount;
            helper[key].PaidAmount += o.PaidAmount;
            helper[key].totalAmount += o.totalAmount;
          }
        
          return r;
        }, []);
        

      let filterdDeuDetails=result.filter(f=>f.mobile.trim().toLowerCase()
      .replace(/\s/g, '') ==this.mobileNo.trim().toLowerCase().replace(/\s/g, ''))
      this.dataSource=new MatTableDataSource(filterdDeuDetails);
    
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      })
  
  }
  refreshDataSource(searchByThree){
    this.dataSource = new MatTableDataSource(searchByThree);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  search(customerLadgerArray,searchIndex) {
    var helper = {};
    var groupBy = this.productInfos

.reduce((r, o)=> {
var key =o.mobile;

if(!helper[key]) {

  helper[key] = Object.assign({}, o); // create a copy of o
  r.push(helper[key]);
} else {
  helper[key].DueAmount += o.DueAmount;
  helper[key].PaidAmount += o.PaidAmount;
  helper[key].totalAmount += o.totalAmount;
}

return r;
}, []);
    let emptyValue,clienName,mobile,totalAmount,PaidAmount;
     [emptyValue,clienName,mobile,totalAmount,PaidAmount]=customerLadgerArray;
  let   result= this.dataSharingService.invoiceSearchByMultiColumn(
      groupBy,
      undefined,
      undefined,
      clienName,
      totalAmount,
      PaidAmount,
      undefined,
      undefined,
      mobile
      )
  
    this.refreshDataSource(result)
   }
 
   clearFilters() {
    this.refresList();
     this.filtersModel = [];
     this.filterKeys = {};
    }
  AddNewInpurRow(){

    this.router.navigate(['/inventory/Invoice-entry']);
  
  }
  Refresh(){
    this.refresList();
  }
  payment(elm){
   
    this.router.navigate(['/inventory/payment/',elm.key]);
  
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
    
      this.toastrService.saveMessage()
      this.refresList();
    },(err) => {  this.toastrService.errorMessage()})

  }

  edit(element){
    
    this.invoiceDetailsService.updateProductInfo(element.key,element).then(data=>{
      
      this.toastrService.updateMessage()
      this.refresList();
    },(err) => { this.toastrService.errorMessage()})
  }

  delete(element){
    
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
              .afterClosed().subscribe(res=>{
                if(res){
                  this.invoiceDetailsService.deleteProductInfo(element.key).then(res=>{
                    this.refresList();
                    this.toastrService.deleteMessage()
                  },(err) => { this.toastrService.errorMessage()});
                }
              })
  }


  refresList(){
    
  this.subscription= this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
        
    
      this.productInfos.push(y);
    
      })
      
       
 var helper = {};
 
var result = this.productInfos
.reduce((r, o)=> {
  var key =o.mobile;
  
  if(!helper[key]) {

    helper[key] = Object.assign({}, o); // create a copy of o
    r.push(helper[key]);
  } else {
    helper[key].DueAmount += o.DueAmount;
    helper[key].PaidAmount += o.PaidAmount;
    helper[key].totalAmount += o.totalAmount;
  }

  return r;
}, []);


console.log(result)
      this.dataSource=new MatTableDataSource(result);
    
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      
    })
  
  }

  printInvoice(element){
    
    this.router.navigate(['/inventory/Invoice-print/',element.key]);
  }

}

