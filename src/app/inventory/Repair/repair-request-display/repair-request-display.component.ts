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
 
import { SalesReturnService } from '../../Sales/sales-return.service';
import { RepairService } from '../repair.service';

@Component({
  selector: 'ngx-repair-request-display',
  templateUrl: './repair-request-display.component.html',
  styleUrls: ['./repair-request-display.component.scss']
})
export class RepairRequestDisplayComponent implements OnInit,OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
   
  dataSource = new MatTableDataSource();
  displayedColumns = ['key','memoNo',
  'entryDate', 'clienName','totalAmount',
  'PaidAmount','DueAmount','totalAddiDiscnt'];
  columns = [
    {field:"filter"},
    {field:"memoNo",header:`${this.languageService.SalesReturnInfo.MemoNo}`},
    {field:"entryDate",header:`${this.languageService.SalesReturnInfo.Date}`},
    {field:"clienName",header:`${this.languageService.SalesReturnInfo.ClientName}`},
    {field:"totalAmount",header:`${this.languageService.SalesReturnInfo.TotalAmount}`},
    {field:"PaidAmount",header:`${this.languageService.SalesReturnInfo.PaidAmount}`},
    {field:"DueAmount",header:`${this.languageService.SalesReturnInfo.DueAmount}`},
    {field:"totalAddiDiscnt",header:`${this.languageService.SalesReturnInfo.AdditionalDiscount}`}
    
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };
  productInfos:any[]=[];
 
   
  Tostr=new Tostr();
  subscription:Subscription;
  stockInfos:any[]=[];
  productInfostwo:any[]=[];
 
  isBangla=false;
  rows: any;
  
  constructor(public salesReturnService:RepairService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private router:Router ,
     public languageService:LanguageConverterService,
     public dataSharingService:DataSharingService,
  
    ) { }

  ngOnInit() {
     

   if(localStorage.getItem("Language")=='Bangla'){
    this.isBangla=true;
   }
   this.refresList();
   

  
  }
  refreshDataSource(searchData){
    this.dataSource = new MatTableDataSource(searchData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  search(repairrqstArry,searchIndex) {
    let emptyValue,memoNo,invoiceNo,entryDate,clienName,totalAmount,PaidAmount,DueAmount,totalAddiDiscnt;
    [emptyValue,invoiceNo,entryDate,clienName,totalAmount,PaidAmount,DueAmount,totalAddiDiscnt]=repairrqstArry;
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
    this.router.navigate(["/inventory/sales-return"]);
    // this.productInfos=[];
    // this.subscription=   this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
    //   item.forEach(element => {
    //     var y = element.payload.toJSON();
    //     y["key"] = element.key;

    //     this.productInfos.push(y as ProductInfo);
    //   })
     
    //   this.productInfos.unshift({ key: '', catagory: '',subCategory:'', name: '',quantity:0,date:'',importedForm:'',cost:0});
    //   this.dataSource=new MatTableDataSource(this.productInfos);
    
    // })
  }

  edit(element){
this.router.navigate(["/inventory/invoice-edit/",element.key])
    // this.productInfoService.updateProductInfo(element.key,element).then(data=>{
   
    //   this.Tostr.showToast('primary',"", "Updated Successfully", "",this.toastrService);
    //   this.refresList();
    //   this.ngOnInit();
    // },(err) => { this.Tostr.showToast("danger","", err.statusText, "",this.toastrService);})
  }

  delete(element){
  
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
               .afterClosed().subscribe(res=>{
                if(res){
                  this.salesReturnService.deleteRepairInfo(element.key).then(res=>{

                    //then delete froms stock
                       
                   
                    this.refresList();
                    this.toastrService.deleteMessage()
                  },(err) => {this.toastrService.errorMessage()});
                }
               })
  }

  refresList(){
    
    this.subscription= this.salesReturnService.getAllRepairInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.toJSON();

        y["key"] = element.key;
        y["entryDate"]=new Date(y["entryDate"]).toDateString()
      // let sortDate= y["date"].split("/");
      // sortDate=sortDate[0]+sortDate[1]+sortDate[2];
      // y["eDate"]=parseInt(sortDate);
      this.productInfos.push(y);
      
      });
     

      //  this.productInfos.sort((a:any,b:any)=>{
      //     if(a.quantity>b.quantity) return 1;
      //     if(a.quantity>b.quantity) return 0;
          
      //   })
      this.productInfos.reverse();
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
  printInvoicev2(element){
   
    this.router.navigate(['/inventory/repair-print-v2/',element.key]);
  }
  printInvoicev3(element){
   
    this.router.navigate(['/inventory/repair-print-v3/',element.key]);
  }
}

