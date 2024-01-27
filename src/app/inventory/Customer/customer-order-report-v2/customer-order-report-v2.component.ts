import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
import { CustomerService } from '../../Customer/customer.service';
import { InvoicEntryModel } from '../../invoice-entry/ivoiceEntryModel';
 
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';
 
import { DomSanitizer } from '@angular/platform-browser';
import { CustomerOrderService } from '../../../@core/mock/marchandizer/customer-order.service';
import { UserService } from '../../../@core/mock/marchandizer/user.service';

@Component({
  selector: 'ngx-customer-order-report-v2',
  templateUrl: './customer-order-report-v2.component.html',
  styleUrls: ['./customer-order-report-v2.component.scss']
})
export class CustomerOrderReportV2Component implements OnInit {

  
  key:string;
  invoiceDetails=new InvoicEntryModel();
  items=[];
  filteredCustomer={name:'',phone:'',key:''};
    customers=[];
  ShopOwner=[];
  length=0;
  user={ActiveStatus: 1,
    AddressLineOne: "",
    AddressLineTwo: "",
    ImageLink: "",
    State: "",
    agree_term: true,
    countryCode: "",
    designation: "",
    email: "",
    key: "",
    name: "",
    offDayName: "",
    orgName: "",
    pass: "",
    phone: "",
    startEndTime: "",
    storeType: "",
    userType: ""}
  todayDate: string;
  base64Image: any;
  
    constructor(public customerOrderService:CustomerOrderService,
      private route:ActivatedRoute,
      public customerService:CustomerService,
      public userService:UserService,
      private router:Router,
      private domSanitizer: DomSanitizer) {
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
        })
       
       }
  
    ngOnInit() {
      this.key=this.route.snapshot.paramMap.get('key');
    
      this.customerOrderService.getAllOrder().snapshotChanges().subscribe(item=>{
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
               
             }
        })
   
        for (let key in this.invoiceDetails.items) {
         
          this.items.push(this.invoiceDetails.items[key]);
        }
  
  
    
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
      this.router.navigate(['/inventory/customer-order-display']);
    } 
  }
  