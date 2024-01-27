import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { UserInfoTblService } from '../../../@core/data/ClientDb/user-info-tbl.service';
import { Tostr } from '../../../@core/data/tostr.model';
import { InvoiceDetailsService } from '../../../@core/mock/marchandizer/invoice-details.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { PurchaseMoneyRecitService } from '../../../@core/mock/marchandizer/purchase-money-recit.service';
import { UserService } from '../../../@core/mock/marchandizer/user.service';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
  

@Component({
  selector: 'ngx-money-recit-purchase',
  templateUrl: './money-recit-purchase.component.html',
  styleUrls: ['./money-recit-purchase.component.scss']
})
export class MoneyRecitPurchaseComponent implements OnInit {
  mobileNo:string='';
  entryDate:string='';
  todayDate;  
  productInfos:any[]=[];
  Tostr=new Tostr();
  subscription:Subscription;
  moneyRecits: any[];
  headerInfo={mobile:'',clienName:'',invoiceNo:'',invoicEntryDate:''};
  ShopOwner: any[]=[];
  user: any;
  base64Image: any;
  constructor(public productInfoService:InvoiceDetailsService,
     private toastrService:ToasterService,
     public languageService:LanguageConverterService,
     private mathdialogService: MatDialogService,
     private router:Router,
     private route:ActivatedRoute,
     public invoiceDetailsService:InvoiceDetailsService,
     public moneyRecitService:PurchaseMoneyRecitService,
     public userService:UserService,
     private domSanitizer: DomSanitizer,
     public userInfoTblService:UserInfoTblService,
     ) { 

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

      this.moneyRecitService.getAllMoneyRecitPurchase().snapshotChanges().subscribe(item=>{
        this.productInfos=[];
        item.forEach(element => {
          var y = element.payload.toJSON();
          y["key"] = element.key;
      
        this.productInfos.push(y);
        });
        this.mobileNo = this.route.snapshot.paramMap.get('key');
   
        let   filteredObj = (this.mobileNo) ?
        this.productInfos.filter(p =>p.mobile.toLowerCase()==
        this.mobileNo.toLowerCase()) :
         this.productInfos;     
        
         let obj=filteredObj.find(f=>f.mobile==this.mobileNo);
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
    },(err) => {this.toastrService.errorMessage()})
  }

  delete(element){
    
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
               .afterClosed().subscribe(res=>{
                if(res){
                  this.productInfoService.deleteProductInfo(element.key).then(res=>{
                    this.refresList();
                    this.toastrService.deleteMessage()
                  },(err) => { this.toastrService.errorMessage()});
                }
               })
  }


  refresList(){
    
   
    
    
   
  }
  captureScreen(){
    
  }
  printInvoice(element){
    
    this.router.navigate(['/inventory/Invoice-print/',element.key]);
  }
  backToInvoiceInfo(){
    this.router.navigate(['/inventory/purchase-due-payment-detls/']);
  }
  toBack(){

  }
}