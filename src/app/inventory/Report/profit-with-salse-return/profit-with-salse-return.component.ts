import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

import { Subscription } from 'rxjs';

import { NbToastrService } from '@nebular/theme';
 
import { Router } from '@angular/router';
import { Tostr } from '../../../@core/data/tostr.model';
import { DateResizerService } from '../../../@core/mock/marchandizer/date-resizer.service';
import { InvoiceDetailsService } from '../../../@core/mock/marchandizer/invoice-details.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { MyShopEmpService } from '../../../@core/mock/marchandizer/my-shop-emp.service';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';
import { MonthsService } from '../../../@core/mock/months.service';
import { SalesReturnService } from '../../Sales/sales-return.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
import { DropdownValuesService } from '../../../@core/mock/marchandizer/dropdown-values.service';
 
 

@Component({
  selector: 'ngx-profit-with-salse-return',
  templateUrl: './profit-with-salse-return.component.html',
  styleUrls: ['./profit-with-salse-return.component.scss']
})
export class ProfitWithSalseReturnComponent implements OnInit,OnDestroy {
  entryDate:string='';
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['key','entryDate', 'clienName','totalAmount','PaidAmount','DueAmount','SpecialDiscount'];
  productInfos:any[]=[];
  Tostr=new Tostr();
  subscription:Subscription;
  srsObj={entryDate:'',entryDates:'',MonthId:0,entryBy:''}
  userInfos: any[];
  totalSales=0;
  totalEarn=0;
  totalDue=0;
  totalDiscount=0;
  profitFromInvoice=0;

  srtotalSales=0;
  srtotalEarn=0;
  srtotalDue=0;
  srtotalDiscount=0;
  srprofitFromInvoice=0;
  salesReturnInfos: any[]=[];

  rsltotalSales=0;
  rsltotalEarn=0;
  rsltotalDue=0;
  rsltotalDiscount=0;
  rslprofitFromInvoice=0;

  constructor(public invoiceDetailsService:InvoiceDetailsService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private dateResizerService: DateResizerService,
     private dropdownValuesService: DropdownValuesService,
     private router:Router,
     public salesReturnService:SalesReturnService,
     private monthService:MonthsService,
     public myShopEmpService:MyShopEmpService,
     public languageService:LanguageConverterService
     ) { }

     ngOnDestroy(): void {
      this.subscription.unsubscribe();
     }
        ngOnInit() {
         this.dropdownValuesService.getDateRange();
        this.refresList();
       //this.loadData();
        
       }
       onChangeDateRange(){
         this.dropdownValuesService.getDateRange();
         this.refresList();
       }
      //  applyFilter(){
      //    this.refresList();
      //  }

  applyFilter( ) {
   
//this.getDaysArray(this.srsObj.entryDate,this.srsObj.entryDates);
var daylist = this.getDaysArray(new Date(this.srsObj.entryDate),new Date(this.srsObj.entryDates));
//daylist.map((v)=>v.toISOString().split('T')[0])
 

 
   this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
       //  const entrydate=new Date(y["entryDate"]);
       //  let month = entrydate.getMonth()+1;
       //  y['MonthId']=month;
        
      this.productInfos.push(y);
  
      })
      let finalFilterValues=[];
      if(this.srsObj.entryDate!=''&&this.srsObj.entryDates!='')
      {
       
  
       
        daylist.forEach(element => {
   
          let entryDate=this.formatDate(element);
          let tempArray=[];
          
          tempArray=
          this.productInfos.filter(p => p.entryDate.toLowerCase()==
          entryDate.toLowerCase());
          finalFilterValues.push(...tempArray);
    
          
        });
      }
      this.totalSales=0;
      this.totalEarn=0;
      this.totalDue=0;
      this.totalDiscount=0;
      let totalProfit=0;
      let TotalSubTotal=0;
      this.profitFromInvoice=0;
      finalFilterValues.forEach(element => {
        this.totalSales +=element.SubTotal;
        this.totalEarn +=parseFloat(element.PaidAmount);
        this.totalDue +=element.DueAmount;
        this.totalDiscount +=element.totalAddiDiscnt;
        TotalSubTotal+=element.SubTotal;
        totalProfit+=element.totalProfit;
      });

      this.profitFromInvoice=(totalProfit-this.totalDiscount); 

   
   
   

    var daylist2 = this.getDaysArray(new Date(this.srsObj.entryDate),new Date(this.srsObj.entryDates));
    //daylist.map((v)=>v.toISOString().split('T')[0])
     
  //let obj={profitFromInvoice:0,totalSales:0,totalEarn:0,totalDue:0,totalDiscount:0};
     
       this.salesReturnService.getAllSalesReturn().snapshotChanges().subscribe(item=>{
          this.salesReturnInfos=[];
          item.forEach(element => {
            var y = element.payload.toJSON();
            y["key"] = element.key;
           //  const entrydate=new Date(y["entryDate"]);
           //  let month = entrydate.getMonth()+1;
           //  y['MonthId']=month;
            
           this.salesReturnInfos.push(y);
      
          })
          
          let finalFilterValues2=[];
         
          if(this.srsObj.entryDate!=''&&this.srsObj.entryDates!='')
          {
           
      
           
            daylist2.forEach(element => {
       
              let entryDate=this.formatDate(element);
              let tempArray=[];
              
              tempArray=
              this.salesReturnInfos.filter(p => p.entryDate.toLowerCase()==
              entryDate.toLowerCase());
              finalFilterValues2.push(...tempArray);
        
              
            });
          }
       
          this.srtotalSales=0;
      this.srtotalEarn=0;
      this.srtotalDue=0;
      this.srtotalDiscount=0;
      let srtotalProfit=0;
      let srTotalSubTotal=0;
      let srtotalAmount=0;
      let srTotalOriginalAmount=0;
      
      finalFilterValues2.forEach(element => {
        srTotalOriginalAmount+=element.OriginalAmount;
        srtotalAmount+=element.totalAmount;
        this.srtotalSales +=element.SubTotal;
        this.srtotalEarn +=parseFloat(element.PaidAmount);
        this.srtotalDue +=element.DueAmount;
        this.srtotalDiscount +=element.totalAddiDiscnt;
        srTotalSubTotal+=element.SubTotal;
        srtotalProfit+=element.totalProfit;
      });
      
     
    let discountProfit=(srTotalOriginalAmount-srtotalAmount)
    let supposeTobeProfit=(srtotalProfit-this.srtotalDiscount);
     // this.srprofitFromInvoice=(discountProfit-supposeTobeProfit); 

        this.rslprofitFromInvoice=(this.profitFromInvoice+discountProfit)-supposeTobeProfit;
       this.rsltotalSales=this.totalSales-this.srtotalSales;
       this.rsltotalEarn=this.totalEarn-this.srtotalEarn;
       this.rsltotalDue=this.totalDue-this.srtotalDue;
       this.rsltotalDiscount=this.totalDiscount-this.srtotalDiscount;
      })
   

  });

     
      
  }
  applyFilterSalesReturn( ) {
    //this.getDaysArray(this.srsObj.entryDate,this.srsObj.entryDates);
    var daylist = this.getDaysArray(new Date(this.srsObj.entryDate),new Date(this.srsObj.entryDates));
    //daylist.map((v)=>v.toISOString().split('T')[0])
     
  //let obj={profitFromInvoice:0,totalSales:0,totalEarn:0,totalDue:0,totalDiscount:0};
     
       this.salesReturnService.getAllSalesReturn().snapshotChanges().subscribe(item=>{
          this.salesReturnInfos=[];
          item.forEach(element => {
            var y = element.payload.toJSON();
            y["key"] = element.key;
           //  const entrydate=new Date(y["entryDate"]);
           //  let month = entrydate.getMonth()+1;
           //  y['MonthId']=month;
            
           this.salesReturnInfos.push(y);
      
          })
          
          let finalFilterValues=[];
         
          if(this.srsObj.entryDate!=''&&this.srsObj.entryDates!='')
          {
           
      
           
            daylist.forEach(element => {
       
              let entryDate=this.formatDate(element);
              let tempArray=[];
              
              tempArray=
              this.salesReturnInfos.filter(p => p.entryDate.toLowerCase()==
              entryDate.toLowerCase());
              finalFilterValues.push(...tempArray);
        
              
            });
          }
       
          this.srtotalSales=0;
          this.srtotalEarn=0;
          this.srtotalDue=0;
          this.srtotalDiscount=0;
          let TotalBuyingPrice=0;
          let TotalSubTotal=0;
          let totalVat=0;
          let totalDis=0;
          console.log(finalFilterValues)
          finalFilterValues.forEach(element => {
            this.srtotalSales +=element.totalAmount;
            this.srtotalEarn +=parseFloat(element.PaidAmount);
            this.srtotalDue +=element.DueAmount;
            this.srtotalDiscount +=element.totalAddiDiscnt;
            TotalSubTotal+=element.SubTotal;
            TotalBuyingPrice+=element.TotalBuyingPrice;
            totalVat+=element.totalVat;
            totalDis+=element.totalDiscount;
        });
        let minusAmount=(TotalBuyingPrice+this.totalDiscount+totalDis);
       
        this.srprofitFromInvoice=(TotalSubTotal+totalVat)-minusAmount;
        console.log(this.srprofitFromInvoice)
        console.log(this.srtotalSales)
        console.log(this.srtotalEarn)
        console.log(this.srtotalDue)
        console.log(this.srtotalDiscount)
         
        })
      }
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
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
    
    // })
  }
// searchBymultplValues(entryDate:string,entryBy:string,result:[]){
//  finalFilterValues= (this.srsObj.entryDate&&this.srsObj.entryBy)?
//       this.productInfos.filter(p => p.entryDate.toLowerCase()==
//       this.srsObj.entryDate.toLowerCase()&&p.entryBy.toLowerCase()==
//       this.srsObj.entryBy.toLowerCase()) :
//        this.productInfos;  
// }
  save(element){
    
    this.invoiceDetailsService.addProductInfo(element).then(data=>{
     
      this.toastrService.saveMessage()
      this.refresList();
    },(err) => {       this.toastrService.saveMessage()})

  }

  edit(element){
    
    this.invoiceDetailsService.updateProductInfo(element.key,element).then(data=>{
    
      this.toastrService.saveMessage()
      this.refresList();
    },(err) => {       this.toastrService.errorMessage()})
  }

  delete(element){
   
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
               .afterClosed().subscribe(res=>{
                if(res){
                  this.invoiceDetailsService.deleteProductInfo(element.key).then(res=>{
                    this.refresList();
                    this.toastrService.deleteMessage()
                  },(err) => {      this.toastrService.saveMessage()});
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
   
      let filteredProducts = (this.entryDate) ?
      this.productInfos.filter(p => p.entryDate.toLowerCase()==
      this.entryDate.toLowerCase()) :
       this.productInfos;   
       
       
      
       filteredProducts.reverse();
      this.dataSource=new MatTableDataSource(filteredProducts);
      this.totalSales=0;
      this.totalEarn=0;
      this.totalDue=0;
      this.totalDiscount=0;
      filteredProducts.forEach(element => {
        this.totalSales +=element.totalAmount;
        this.totalEarn +=parseFloat(element.PaidAmount);
        this.totalDue +=element.DueAmount;
        this.totalDiscount +=element.totalAddiDiscnt;
    });
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      if(filteredProducts.length==0){
      //  this.Tostr.showToast('danger',"", "No Sell's Found !", "",this.toastrService);
      }
    })  
     
  }

  printInvoice(element){
   
    this.router.navigate(['/inventory/Invoice-print/',element.key]);
  }
   getDaysArray(start, end) {
   
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    
   return arr;
};

}
