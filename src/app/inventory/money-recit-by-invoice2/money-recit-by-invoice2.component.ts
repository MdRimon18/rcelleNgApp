import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
 
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';
import { DomSanitizer } from '@angular/platform-browser';
import { Tostr } from '../../@core/data/tostr.model';
import { InvoiceDetailsService } from '../../@core/mock/marchandizer/invoice-details.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { MatDialogService } from '../../@core/mock/mat-dialog.service';
import { UserService } from '../../@core/mock/marchandizer/user.service';
import { UserInfoTblService } from '../../@core/data/ClientDb/user-info-tbl.service';
import { MoneyRecitService } from '../../@core/mock/marchandizer/money-recit.service';
import { ToasterService } from '../../@core/mock/toaster.service';
@Component({
  selector: 'ngx-money-recit-by-invoice2',
  templateUrl: './money-recit-by-invoice2.component.html',
  styleUrls: ['./money-recit-by-invoice2.component.scss']
})
export class MoneyRecitByInvoice2Component implements OnInit {
  invoiceNo:string='';
  entryDate:string='';
   
  productInfos:any[]=[];
  Tostr=new Tostr();
  subscription:Subscription;
  moneyRecits: any[];
  headerInfo={mobile:'',clienName:'',invoiceNo:'',invoicEntryDate:''};
  ShopOwner: any[]=[];
  user: any;
  todayDate: string;
  base64Image: any;
  constructor(public productInfoService:InvoiceDetailsService,
     private toastrService:ToasterService,
     public languageService:LanguageConverterService,
     private mathdialogService: MatDialogService,
     private router:Router,
     private route:ActivatedRoute,
     public invoiceDetailsService:InvoiceDetailsService,
     public moneyRecitService:MoneyRecitService,
     public userService:UserService,
     private domSanitizer: DomSanitizer,
     public userInfoTblService:UserInfoTblService,
     ) { 
      var today = new Date();

      this.todayDate= today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      this.userService.getAllUserInfo().snapshotChanges().subscribe(item=>{
        item.forEach(element => {
          var y = element.payload.toJSON();
          y["key"] = element.key;
          this.ShopOwner.push(y);
        })
       let user= this.ShopOwner.find(f=>f.key== localStorage.getItem('key'));
       
       this.user=user;
       this.base64Image = domSanitizer.bypassSecurityTrustUrl( this.user.ImageLink);
      });

      this.moneyRecitService.getAllMoneyRecit().snapshotChanges().subscribe(item=>{
        this.productInfos=[];
        item.forEach(element => {
          var y = element.payload.toJSON();
          y["key"] = element.key;
      
        this.productInfos.push(y);
        });
       
        this.invoiceNo = this.route.snapshot.paramMap.get('key');
     
        let   filteredObj = (this.invoiceNo) ?
        this.productInfos.filter(p =>p.invoiceNo==
        this.invoiceNo) :
         this.productInfos;     
         
         let obj=filteredObj.find(f=>f.invoiceNo==this.invoiceNo);
         this.headerInfo=obj;
          
     this.moneyRecits=filteredObj;
     
          });
   
     }

  ngOnInit() {
   this.refresList();
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
    //   console.log(this.productInfos);
    // })
  }
  Refresh(){
 
  }
  payment(mobile){

    this.router.navigate(['/inventory/payment/',mobile]);
  
  }
  save(element){
 
    this.productInfoService.addProductInfo(element).then(data=>{
    
      this.toastrService.saveMessage()
      this.refresList();
    },(err) => { 
      this.toastrService.errorMessage()
    })

  }

  edit(element){
    
    this.productInfoService.updateProductInfo(element.key,element).then(data=>{
      
      this.toastrService.updateMessage()
      this.refresList();
    },(err) => { 
      this.toastrService.errorMessage()
    })
  }

  delete(element){
    
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
               .afterClosed().subscribe(res=>{
                if(res){
                  this.productInfoService.deleteProductInfo(element.key).then(res=>{
                    this.refresList();
                    this.toastrService.deleteMessage()
                  },(err) => { 
                    this.toastrService.errorMessage()
                  });
                }
               })
  }


  refresList(){
    
   
    
    
   
  }

  printInvoice(element){
    
    this.router.navigate(['/inventory/Invoice-print/',element.key]);
  }
  backToInvoiceInfo(){
    this.router.navigate(['/inventory/Deu-Payment-Details/']);
  }

  captureScreen() {  
    var data = document.getElementById('content');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Invoice.pdf'); // Generated PDF   
    });  
  } 
  toBack(){
    this.router.navigate(['/inventory/Deu-Payment-Details']);
  }
}
