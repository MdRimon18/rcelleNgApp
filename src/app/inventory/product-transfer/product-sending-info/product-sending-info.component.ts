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
 
import { ProductTransferService } from '../product-transfer.service';
 
@Component({
  selector: 'ngx-product-sending-info',
  templateUrl: './product-sending-info.component.html',
  styleUrls: ['./product-sending-info.component.scss']
})
export class ProductSendingInfoComponent implements  OnInit,OnDestroy {
  productInfos:any[]=[];
  Tostr=new Tostr();
  subscription:Subscription;
  stockInfos:any[]=[];
  productInfostwo:any[]=[];
  isBangla=false;
  rows: any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator; 
  dataSource = new MatTableDataSource();
  columns = [
    {field:"filter"},
    {field:"toCompanyName",header:"To Company Name"},
    {field:"toCompanyPhoneNo",header:"To Company ID"},
    {field:"transferDate",header:"Transfer Date"},
    {field:"transferBy",header:"Transfer By"},
    {field:"trackingNumber",header:"Tracking Number"},  
    {field:"transferVia",header:"Transfer Via"},
    {field:"expectedDeliveryDate",header:"Expected Delivery Date"},
    {field:"transferCost",header:"Transfer Cost"},
    {field:"remarksOrNotes",header:"Remarks/Notes"},
    
    ];
    headers: string[] = this.columns.map(x => x.field);
    headersFilters = this.headers.map((x, i) => x+'_'+i);
    filtersModel = [];
    filterKeys = {
    };
  items: any[];
  serialNumber: any[];
    
  
   
 
  constructor(public productTransferService:ProductTransferService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     private router:Router ,
     public languageService:LanguageConverterService,
     public dataSharingService:DataSharingService,
 
    // private recieveProductService:RecieveProductService
    ) { }

  ngOnInit() {
   this.refresList();
  }
  refreshDataSource(searchData){
    this.dataSource = new MatTableDataSource(searchData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  search(productSendingSearchArry,searchIndex) {
    console.log(productSendingSearchArry)
    let emptyArry,SendingCompanyPhone,SendingCompanyName,transferDate,transferBy,
    trackingNumber,transferVia,expectedDeliveryDate,transferCost,remarksOrNotes;

     [emptyArry,SendingCompanyPhone,SendingCompanyName,transferDate,transferBy,
      trackingNumber,transferVia,expectedDeliveryDate,transferCost,remarksOrNotes]=productSendingSearchArry;

    // console.log(SendingCompanyPhone)
    // console.log(SendingCompanyName)
    // console.log(transferDate)
    // console.log(transferBy)
    // console.log(trackingNumber)
    // console.log(transferVia)
    // console.log(expectedDeliveryDate)
    // console.log(transferCost)
    // console.log(remarksOrNotes)
    
    let result= this.dataSharingService.productRecieveSearchByMultiColumnV2(
      this.productInfos,
      SendingCompanyPhone,
      SendingCompanyName,
      transferDate,
      transferBy,
      trackingNumber,transferVia,expectedDeliveryDate,transferCost,remarksOrNotes
      )
    this.refreshDataSource(result)
   }
   clearFilters() {
    this.refresList();
     this.filtersModel = [];
     this.filterKeys = {};
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
                  this.productTransferService.deleteTransferInfo(element.key).then(res=>{

                    //then delete froms stock
                       
                   
                    this.refresList();
                    this.toastrService.deleteMessage()
                  },(err) => { this.toastrService.errorMessage()});
                }
               })
  }

  refresList(){
    
    this.subscription= this.productTransferService.getAllTransferInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.toJSON();

        y["key"] = element.key;
        y["transferDate"]=new Date(y["transferDate"]).toDateString();
        console.log(y["expectedDeliveryDate"])
        
          y["expectedDeliveryDate"]=new Date(y["expectedDeliveryDate"]).toDateString();
          if(y["expectedDeliveryDate"]=='Invalid Date'){y["expectedDeliveryDate"]=''}
        
      // let sortDate= y["date"].split("/");
      // sortDate=sortDate[0]+sortDate[1]+sortDate[2];
      // y["eDate"]=parseInt(sortDate);
      this.productInfos.push(y);
      
      });
      
      //console.log(this.productInfos)
      //  this.productInfos.sort((a:any,b:any)=>{
      //     if(a.quantity>b.quantity) return 1;
      //     if(a.quantity>b.quantity) return 0;
          
      //   })
      this.dataSource=new MatTableDataSource(this.productInfos.reverse());
    
     
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
   
  }
  onDetailsProduct(data) {

    console.log(data);
    this.items=[];
    for (let key in  data.items) {
     //  console.log(key, this.invoiceDetails.items[key]);
       this.items.push(data.items[key]);

     }

   // const dialogConfig = new MatDialogConfig();
   // dialogConfig.disableClose = true;
   // dialogConfig.autoFocus = true;
   // dialogConfig.width = "60%";
   // dialogConfig.height = "60%";
   // dialogConfig.data=obj;
   // //this.dialog.open(ShowTrimsItemFormComponent, dialogConfig);
    //this.dialog.open(InvoiceProductDetailsComponent, dialogConfig);
 }
 onDetailsSerial(data){
  this.serialNumber=[];
  if(data.serialNumbers!=undefined){
    for (let key in data.serialNumbers) {
      //  console.log(key, this.invoiceDetails.items[key]);
        this.serialNumber.push(data.serialNumbers[key]);
      }
    
  }
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
  printInvoicev1(element){
    
    this.router.navigate(['/inventory/sending-report-v1/',element.key]);
  } 
  printInvoicev2(element){
    
    this.router.navigate(['/inventory/sending-report-v3/',element.key]);
  }
}
