import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { Tostr } from '../../../@core/data/tostr.model';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
import { DataSharingService } from '../../E-commerce/data-sharing.service';
 
import { PurchaseReturnService } from '../purchase-return.service';

@Component({
  selector: 'ngx-purchase-return-list',
  templateUrl: './purchase-return-list.component.html',
  styleUrls: ['./purchase-return-list.component.scss']
})
export class PurchaseReturnListComponent implements  OnInit,OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   
  dataSource = new MatTableDataSource();
  displayedColumns = ['key','memoNo','entryDate', 
  'clienName', 'totalAmount','DueAmount','PaidAmount','totalAddiDiscnt'];
  productInfos:any[]=[];
 
  columns = [
    {field:"filter"},
    {field:"memoNo",header:`${this.languageService.PurchaseRetureInfo.MemoNo}`},
    {field:"entryDate",header:`${this.languageService.PurchaseRetureInfo.Date}`},
    {field:"clienName",header:`${this.languageService.PurchaseRetureInfo.supplierName}`},
    {field:"totalAmount",header:`${this.languageService.PurchaseRetureInfo.TotalAmount}`},
    {field:"PaidAmount",header:`${this.languageService.PurchaseRetureInfo.PaidAmount}`},
    {field:"DueAmount",header:`${this.languageService.PurchaseRetureInfo.DueAmount}`},
    {field:"totalAddiDiscnt",header:`${this.languageService.PurchaseRetureInfo.AdditionalDiscount}`}
    
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };
  Tostr=new Tostr();
  subscription:Subscription;
  stockInfos:any[]=[];
  productInfostwo:any[]=[];
 
  isBangla=false;
  rows: any;
  
  constructor(public purchaseReturnService:PurchaseReturnService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private router:Router ,
     public languageService:LanguageConverterService,
     public dataSharingService:DataSharingService,
     
    ) { }

  ngOnInit() {
   this.refresList();
  }
  refreshDataSource(searchData){
    this.dataSource = new MatTableDataSource(searchData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  search(invoicDetailArry,searchIndex) {
    let emptyValue,memoNo,invoiceNo,entryDate,clienName,totalAmount,PaidAmount,DueAmount,totalAddiDiscnt;
    [emptyValue,invoiceNo,entryDate,clienName,totalAmount,PaidAmount,DueAmount,totalAddiDiscnt]=invoicDetailArry;
    let result= this.dataSharingService.invoiceSearchByMultiColumn(this.productInfos,
      undefined,
      entryDate,
      clienName,totalAmount,PaidAmount,DueAmount,undefined,undefined,memoNo,
      undefined,undefined,undefined,undefined,undefined,undefined,totalAddiDiscnt)
    this.refreshDataSource(result)
  
   }
  // search(value,searchIndex){
  //   if(searchIndex==1){
  //       let searchMemoNo =this.productInfos.filter(  
  //         (res:any) =>res.memoNo.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ',''))
  //       );
  //       this.dataSource = new MatTableDataSource(searchMemoNo);
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
    
  //       if(searchMemoNo.length==0){
  //         this.toastrService.searchNotFoundMessage();
  //       }
      
  //   }
  //   if(searchIndex==2){
  // let searchDateWiseProductInfoList=this.productInfos.filter(f=>f.entryDate.match(value))
  // this.dataSource=new MatTableDataSource(searchDateWiseProductInfoList);
  // this.dataSource.sort = this.sort;
  // this.dataSource.paginator = this.paginator;  
  // if(searchDateWiseProductInfoList.length==0){
  //   this.toastrService.searchNotFoundMessage();
  // } 
  //    }
  //    if(searchIndex==3){
  //     let searchClientName=this.productInfos.filter(f=>f.clienName.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ','')))
  //     this.dataSource=new MatTableDataSource(searchClientName);
  //     this.dataSource.sort = this.sort;
  //     this.dataSource.paginator = this.paginator;  
  //     if(searchClientName.length==0){
  //       this.toastrService.searchNotFoundMessage();
  //     } 
  //        }
  //        if(searchIndex==4){
  //         let searchtotalAmount=this.productInfos.filter(f=>f.totalAmount.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ','')))
  //         this.dataSource=new MatTableDataSource(searchtotalAmount);
  //         this.dataSource.sort = this.sort;
  //         this.dataSource.paginator = this.paginator;  
  //         if(searchtotalAmount.length==0){
  //           this.toastrService.searchNotFoundMessage();
  //         } 
  //            }
  // }
  clearFilters() {
    this.refresList();
    this.filtersModel = [];
    this.filterKeys = {};
   }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  AddNewInpurRow(){
    this.router.navigate(["/inventory/purchase-return"]);
  }

//   edit(element){
// this.router.navigate(["/inventory/product-info-create/",element.key])   
//   }

  delete(element){
  
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
               .afterClosed().subscribe(res=>{
                if(res){
                  this.purchaseReturnService.deletePurchaseReturn(element.key).then(res=>{

                    //then delete froms stock
                       
                   
                    this.refresList();
                  this.toastrService.deleteMessage()
                  },(err) => {this.toastrService.deleteMessage()});
                }
               })
  }

  refresList(){
    
    this.subscription= this.purchaseReturnService.getAllPurchaseReturn().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.toJSON();

        y["key"] = element.key;
      // let sortDate= y["date"].split("/");
      // sortDate=sortDate[0]+sortDate[1]+sortDate[2];
      // y["eDate"]=parseInt(sortDate);
      y["entryDate"]=new Date(y["entryDate"]).toDateString()
      this.productInfos.push(y);
      
      });
      
      //  this.productInfos.sort((a:any,b:any)=>{
      //     if(a.quantity>b.quantity) return 1;
      //     if(a.quantity>b.quantity) return 0;
          
      //   })
      this.dataSource=new MatTableDataSource(this.productInfos);
    
     
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
   
  }
  // ngAfterViewInit() {
  //   /**
  //    * Set the "data-column-name" attribute for every body row cell, either on
  //    * thead row changes (e.g. language changes) or tbody rows changes (add, delete).
  //    */
  //   combineLatest([this.theadChanged$, this.tbodyChanged$])
  //     .pipe(
  //       mapTo([this.thead.rows.item(0), this.tbody.rows]),
  //       map(
  //         ([headRow, bodyRows]: [
  //           HTMLTableRowElement,
  //           HTMLCollectionOf<HTMLTableRowElement>
  //         ]) => [
  //           [...headRow.children].map(headerCell => headerCell.textContent),
  //           [...bodyRows].map(row => [...row.children])
  //         ]
  //       ),
  //       takeUntil(this.onDestroy$)
  //     )
  //     .subscribe(([columnNames, rows]: [string[], HTMLTableCellElement[][]]) =>
  //       rows.forEach(rowCells =>
  //         rowCells.forEach(cell =>
  //           this.renderer.setAttribute(
  //             cell,
  //             'data-column-name',
  //             columnNames[cell.cellIndex]
  //           )
  //         )
  //       )
  //     );
  // }
  ngOnDestroy(): void {
    
   
  } 
  printInvoice(element){
    
    this.router.navigate(['/inventory/purchaseReturn-print/',element.key]);
  } 
  printInvoicev2(element){
    
    this.router.navigate(['/inventory/purchase-return-print-v2/',element.key]);
  } 
  printInvoicev3(element){
    
    this.router.navigate(['/inventory/purchase-return-print-v3/',element.key]);
  } 
}
