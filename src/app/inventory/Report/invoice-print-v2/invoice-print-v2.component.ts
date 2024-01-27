import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../Customer/customer.service';
 
import { InvoicEntryModel } from '../../invoice-entry/ivoiceEntryModel';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../@core/mock/marchandizer/user.service';
import { InvoiceDetailsService } from '../../../@core/mock/marchandizer/invoice-details.service';
import { DataSharingService } from '../../E-commerce/data-sharing.service';
@Component({
  selector: 'ngx-invoice-print-v2',
  templateUrl: './invoice-print-v2.component.html',
  styleUrls: ['./invoice-print-v2.component.scss']
})
export class InvoicePrintV2Component implements OnInit {
  key:string;
  invoiceDetails=new InvoicEntryModel();
  items=[];
  filteredCustomer={name:'',phone:'',key:''};
  todayDate;
  customers=[];
  length=0;
  base64Image: any;
  constructor(public invoiceDetailsService:InvoiceDetailsService,
    private route:ActivatedRoute,
    public customerService:CustomerService,
    public userService:UserService,
    public router:Router,
    private domSanitizer: DomSanitizer,
    public dataSharingService:DataSharingService) {

      var today = new Date();

 this.todayDate= today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      // this.userService.getAllUserInfo().snapshotChanges().subscribe(item=>{
      //   item.forEach(element => {
      //     var y = element.payload.toJSON();
      //     y["key"] = element.key;
      //     this.ShopOwner.push(y);
      //   })

        
      //  if(localStorage.getItem('userType')=='Shop Owner'){
      //   this.user= this.ShopOwner.find(f=>f.phone== localStorage.getItem('phone'));
      //  }
      //  if(localStorage.getItem('userType')=='Employee'){
      //    console.log(this.ShopOwner)
      //   this.user= this.ShopOwner.find(f=>f.phone== localStorage.getItem('shopOwner'));
      //  }

        
       
        this.base64Image = domSanitizer.bypassSecurityTrustUrl(this.dataSharingService.companyInfo.value.ImageLink);
      // })
     
     }

  ngOnInit() {
    this.key=this.route.snapshot.paramMap.get('key');
     
    this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
     this.length=item.length;
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
         
           if(y['key']==this.key){
             y['SubTotal']=Math.round( y['SubTotal']);
             y['totalAmount']=Math.round( y['totalAmount']);
             y['DueAmount']=Math.round( y['DueAmount']);
             this.invoiceDetails=y as InvoicEntryModel;
            // this.items= Object.keys(y['items']);
            // console.log(this.items) ;          
           }
      })
 
      for (let key in this.invoiceDetails.items) {
      //  console.log(key, this.invoiceDetails.items[key]);
        this.items.push(this.invoiceDetails.items[key]);

        
      }
      
 
this.items.forEach(element => {
   
  element.serials='';
  for (let key in element.serialNumbers) {
   
    element.serials=element.serials+ element.serialNumbers[key].serialNumber+',';

      
    }
    element.serials= element.serials.slice(0, -1);
});

 
    });

    

  }
  captureScreen() {  
    var data = document.getElementById('content');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 395;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf.jsPDF('p', 'mm', [360, 210]); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Invoice.pdf'); // Generated PDF   
    });  
    
  } 
  toBack(){
    this.router.navigate(['/inventory/Invoice-Details']);
  }
}
