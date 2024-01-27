
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
 
import { Subscription } from 'rxjs';
 
import { NbToastrService } from '@nebular/theme';
 
import { Router } from '@angular/router';
import { Tostr } from '../../@core/data/tostr.model';
import { InvoiceDetailsService } from '../../@core/mock/marchandizer/invoice-details.service';
import { MatDialogService } from '../../@core/mock/mat-dialog.service';
import { ToasterService } from '../../@core/mock/toaster.service';
 
@Component({
  selector: 'ngx-monthly-income-due',
  templateUrl: './monthly-income-due.component.html',
  styleUrls: ['./monthly-income-due.component.scss']
})
export class MonthlyIncomeDueComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['date', 'totalIncome','totalDue'];
  productInfos:any[]=[];
  Tostr=new Tostr();
  subscription:Subscription;
  entryDate:string='';
  constructor(public productInfoService:InvoiceDetailsService,
    private toastrService:ToasterService,
    private mathdialogService: MatDialogService,
    private router:Router) { }

  ngOnInit() {
    var month;
    var day;
     var dateObj = new Date();
     var dObj=dateObj.toLocaleDateString().split('/');
      month=parseInt(dObj[0]);
      day=parseInt(dObj[1]);
          if(month<10){
            month='0'+month;
          }
          if(day<10){
            day='0'+day;
          }

  let todayDate =month + '/' + dObj[2];

    this.subscription= this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
       item.forEach(element => {
         var y = element.payload.toJSON();
         y["key"] = element.key;
 
        // var d=new Date(y["date"]);
      //   y["date"]=d;
       this.productInfos.push(y);
       });
       


      this.productInfos.forEach(f=>{

        f.entryDate=f.entryDate.substring(3);
        
      });

      let filteredProducts = (todayDate) ?
      this.productInfos.filter(p => p.entryDate.toLowerCase()==
      todayDate.toLowerCase()) :
       this.productInfos;    
    
      
      var result = [];
     filteredProducts.reduce(function(res, value) {
         if (!res[value.entryDate]) {
           res[value.entryDate] = { entryDate: value.entryDate,PaidAmount:0,DueAmount:0};
           result.push(res[value.entryDate])
         }
         res[value.entryDate].PaidAmount +=parseInt(value.PaidAmount);
         res[value.entryDate].DueAmount +=parseInt(value.totalAmount)-parseInt(value.PaidAmount);
         return res;
       }, {});
 
  
       

       this.dataSource=new MatTableDataSource(result);
     //  console.log(this.productInfos);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
      });
    }


    applyFilter(filterValue: string) {
      var month;
    var day;
     var dateObj = new Date(this.entryDate);
     var dObj=dateObj.toLocaleDateString().split('/');
      month=parseInt(dObj[0]);
      day=parseInt(dObj[1]);
          if(month<10){
            month='0'+month;
          }
          if(day<10){
            day='0'+day;
          }

  let EntryDate =month + '/' + dObj[2];

  this.subscription= this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
    this.productInfos=[];
     item.forEach(element => {
       var y = element.payload.toJSON();
       y["key"] = element.key;

      // var d=new Date(y["date"]);
    //   y["date"]=d;
     this.productInfos.push(y);
     });
 


    this.productInfos.forEach(f=>{

      f.entryDate=f.entryDate.substring(3);
      
    });

    let filteredProducts = (EntryDate) ?
    this.productInfos.filter(p => p.entryDate.toLowerCase()==
    EntryDate.toLowerCase()) :
     this.productInfos;    
  
    
    var result = [];
   filteredProducts.reduce(function(res, value) {
       if (!res[value.entryDate]) {
         res[value.entryDate] = { entryDate: value.entryDate,PaidAmount:0,DueAmount:0};
         result.push(res[value.entryDate])
       }
       res[value.entryDate].PaidAmount +=parseInt(value.PaidAmount);
       res[value.entryDate].DueAmount +=parseInt(value.totalAmount)-parseInt(value.PaidAmount);
       return res;
     }, {});


     

     this.dataSource=new MatTableDataSource(result);
   //  console.log(this.productInfos);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;

     if(filteredProducts.length==0){
      this.toastrService.openSnackBarAlerming('No Details Found in this Month!','Ok')
 
          }
    });

    }
    AddNewInpurRow(){}
    save(element){}
  
    edit(element){}
    delete(element){}
}
