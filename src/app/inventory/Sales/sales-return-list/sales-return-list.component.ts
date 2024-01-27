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
import { SalesReturnService } from '../sales-return.service';
import { DropdownValuesService } from '../../../@core/mock/marchandizer/dropdown-values.service';
 
@Component({
  selector: 'ngx-sales-return-list',
  templateUrl: './sales-return-list.component.html',
  styleUrls: ['./sales-return-list.component.scss']
})
export class SalesReturnListComponent implements  OnInit,OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  productInfos:any[]=[];
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
  Tostr=new Tostr();
  subscription:Subscription;
  stockInfos:any[]=[];
  productInfostwo:any[]=[];
 
  //isBangla=false;
  rows: any;
  
  constructor(public salesReturnService:SalesReturnService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private router:Router,
     private dropdownValuesService:DropdownValuesService,
     public languageService:LanguageConverterService,
     public dataSharingService:DataSharingService
    ) { }

  ngOnInit() {
    this.dropdownValuesService.getDateRange();
   this.refresList();
  
  }
  onChangeDateRange(){
    this.dropdownValuesService.getDateRange();
    this.refresList();
  }
  applyFilter(){
    this.refresList();
  }
  AddNewInpurRow(){
    this.router.navigate(["/inventory/sales-return"]);
  }
  edit(element){
this.router.navigate(["/inventory/invoice-edit/",element.key])
  }

  delete(element){
  
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
               .afterClosed().subscribe(res=>{
                if(res){
                  this.salesReturnService.deleteSalesReturn(element.key).then(res=>{

                    //then delete froms stock
                       
                   
                    this.refresList();
                    this.toastrService.deleteMessage()
                  },(err) => { this.toastrService.errorMessage()});
                }
               })
  }

  refresList(){
    
    this.subscription= this.salesReturnService.getSalesReturnByDateRangeWithSnapShot(this.dropdownValuesService.fromDate,
      this.dropdownValuesService.toDate).subscribe(items=>{
        this.productInfos=[];
        this.dataSource=new MatTableDataSource(items.map(item => {
        const y = item.payload.val();
        y["key"] = item.key;
        y['entryDate']=new Date( y['entryDate']).toDateString();
        return y;
      }).reverse());

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.productInfos=this.dataSource.data;
    })
   
  }
  refreshDataSource(searchData){
    this.dataSource = new MatTableDataSource(searchData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  search(salesReturnList,searchIndex) {
    let emptyValue,memoNo,entryDate,clienName,totalAmount,PaidAmount,DueAmount,totalAddiDiscnt;
    [emptyValue,memoNo,entryDate,clienName,totalAmount,PaidAmount,DueAmount,totalAddiDiscnt]=salesReturnList;
    console.log(entryDate);
    let result= this.dataSharingService.invoiceSearchByMultiColumn(this.productInfos,
      undefined,
      entryDate,
      clienName,totalAmount,PaidAmount,DueAmount,undefined,undefined,memoNo)
    this.refreshDataSource(result)
  
   }
  
  clearFilters() {
    this.refresList();
    this.filtersModel = [];
    this.filterKeys = {};
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
    
    this.router.navigate(['/inventory/salesReturn-print/',element.key]);
  }
  printInvoicev2(element){
    
    this.router.navigate(['/inventory/sales-return-print-v2/',element.key]);
  }
  printInvoicev3(element){
    
    this.router.navigate(['/inventory/sales-return-print-v3/',element.key]);
  }
}
