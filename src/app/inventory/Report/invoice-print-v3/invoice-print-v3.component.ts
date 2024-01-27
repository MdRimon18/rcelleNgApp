import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../Customer/customer.service';
import { DomSanitizer } from '@angular/platform-browser';
import { InvoicEntryModel } from '../../invoice-entry/ivoiceEntryModel';
import { InvoiceDetailsService } from '../../../@core/mock/marchandizer/invoice-details.service';
import { UserService } from '../../../@core/mock/marchandizer/user.service';
import { DataSharingService } from '../../E-commerce/data-sharing.service';
 
@Component({
  selector: 'ngx-invoice-print-v3',
  templateUrl: './invoice-print-v3.component.html',
  styleUrls: ['./invoice-print-v3.component.scss']
})
export class InvoicePrintV3Component implements OnInit {
  key:string;
  invoiceDetails=new InvoicEntryModel();
  items=[];
  filteredCustomer={name:'',phone:'',key:''};
    customers=[];
  ShopOwner=[];
  length=0;
  todayDate;
  
  base64Image: any;
  constructor(public invoiceDetailsService:InvoiceDetailsService,
    private route:ActivatedRoute,
    public customerService:CustomerService,
    public userService:UserService,
    private router:Router,
    private domSanitizer: DomSanitizer,
    public dataSharingService:DataSharingService
    ) {
      
      var today = new Date();

      this.todayDate= today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
      // this.userService.getAllUserInfo().snapshotChanges().subscribe(item=>{
      //   item.forEach(element => {
      //     var y = element.payload.toJSON();
      //     y["key"] = element.key;
      //     this.ShopOwner.push(y);
      //   })
      //  let user= this.ShopOwner.find(f=>f.key== localStorage.getItem('key'));
        
      //  this.user=user;
        
        this.base64Image =domSanitizer.bypassSecurityTrustUrl(this.dataSharingService.companyInfo.value.ImageLink);
      
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
    this.router.navigate(['/inventory/Invoice-Details']);
  }
}
