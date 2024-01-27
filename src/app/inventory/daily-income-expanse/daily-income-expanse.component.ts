import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

import { Subscription } from 'rxjs';
import { NbToastrService } from '@nebular/theme';
import { DailyIncomeExpanse } from '../../@core/data/marchanzider-model/DailyIncomeExpanse';
import { Tostr } from '../../@core/data/tostr.model';
import { DailyIncomeExpanseService } from '../../@core/mock/marchandizer/daily-income-expanse.service';
import { MatDialogService } from '../../@core/mock/mat-dialog.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../@core/mock/toaster.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { DataSharingService } from '../E-commerce/data-sharing.service';
import { DropdownValuesService } from '../../@core/mock/marchandizer/dropdown-values.service';

 

@Component({
  selector: 'ngx-daily-income-expanse',
  templateUrl: './daily-income-expanse.component.html',
  styleUrls: ['./daily-income-expanse.component.scss']
})
export class DailyIncomeExpanseComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();

  columns = [
    {field:"filter"},
    {field:"date",header:"Date"},
    {field:"accountHead",header:"Account Head"},
    {field:"totalExpense",header:"Amount"},
    {field:"account",header:"Account"},
    {field:"purpose",header:"Remarks"}
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };
  productInfos:DailyIncomeExpanse[]=[];
  Tostr=new Tostr();
  subscription:Subscription;
  totalCreadited:number=0;
  totalDebited:number=0;
  constructor(public dailyIncomeExpanseService:DailyIncomeExpanseService,
    private toastrService:ToasterService,
    private mathdialogService: MatDialogService,
    private router:Router,
    private dropdownValuesService:DropdownValuesService,
    private languageService:LanguageConverterService,
    private dataSharingService:DataSharingService,
    
    ) { }

    ngOnInit() {
      this.dropdownValuesService.getDateRange();
      this.refresList();
     }
   
  onChangeDateRange(){
    this.dropdownValuesService.getDateRange();
    this.refresList();
 }

 applyFilter( ) {
   this.refresList();
 }
     refreshDataSource(searchData){
      this.dataSource = new MatTableDataSource(searchData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
    search(dailyIncomeExpenseSearchArry,searchIndex) {
      let emptyValue,date,totalExpense,purpsose;
       [emptyValue,date,totalExpense,purpsose]=dailyIncomeExpenseSearchArry;
      let result= this.dataSharingService.invoiceSearchByMultiColumn(this.productInfos,
        undefined,
        date,
        undefined,undefined,undefined,undefined,undefined,undefined,
        undefined,undefined,undefined,undefined,undefined,undefined,
        undefined,undefined,totalExpense,purpsose
        )
      this.refreshDataSource(result)
     }
   
    clearFilters() {
      this.refresList();
      this.filtersModel = [];
      this.filterKeys = {};
     }
   
     AddNewInpurRow(){
   this.router.navigate(["/inventory/daily-Expense-create"]);
      
      //  this.productInfos=[];
      //  this.subscription=   this.dailyIncomeExpanseService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      //    item.forEach(element => {
      //      var y = element.payload.toJSON();
      //      y["key"] = element.key;
      //      var d=new Date(y["date"]);
      //      y["date"]=d;
      //      this.productInfos.push(y as DailyIncomeExpanse);
      //    })
        
      //    this.productInfos.unshift({key:'', date:'', totalExpense:0,purpose:''});
      //    this.dataSource=new MatTableDataSource(this.productInfos);
      //    console.log(this.productInfos);
      //  })
     }
   
     save(element){
      
   
     }
   
     edit(element){
    
  
   this.router.navigate(["/inventory/daily-Expense-create/",element.key])
     }
   
     delete(element){
       
       this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
                  .afterClosed().subscribe(res=>{
                   if(res){
                     this.dailyIncomeExpanseService.deleteProductInfo(element.key).then(res=>{
                       this.refresList();
                       this.toastrService.deleteMessage()
                     },(err) => {
                      this.toastrService.errorMessage()
                      });
                   }
                  })
     }
   
     refresList(){
       
       this.subscription= this.dailyIncomeExpanseService.getAccountsByDateRangeWithSnap(this.dropdownValuesService.fromDate,
        this.dropdownValuesService.toDate).subscribe(item=>{
        this.productInfos=[];
        this.totalCreadited=0;
        this.totalDebited=0;
         item.forEach(element => {
           var y = element.payload.toJSON();
           y["key"] = element.key;
           y["date"]=new Date(y["date"]).toDateString()
           if(y["account"]=='Credited'){
           this.totalCreadited+=parseFloat(y["totalExpense"]);
           }else{
            this.totalDebited+=parseFloat(y["totalExpense"]);
           }
         this.productInfos.push(y as any);
         })
         this.totalCreadited=Math.floor(this.totalCreadited);
         this.totalDebited=Math.floor(this.totalDebited);
       // console.log(this.productInfos);
         this.dataSource=new MatTableDataSource(this.productInfos.reverse());
       //  console.log(this.productInfos);
         this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
       })
      
     }

}
