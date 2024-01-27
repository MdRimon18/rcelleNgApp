import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
import { CustomerService } from '../../Customer/customer.service';
import { InvoicEntryModel } from '../../invoice-entry/ivoiceEntryModel';
 
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';
 
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../@core/mock/marchandizer/user.service';
import { CustomerOrderService } from '../../../@core/mock/marchandizer/customer-order.service';
import { DataSharingService } from '../../E-commerce/data-sharing.service';

@Component({
  selector: 'ngx-customer-order-report-v1',
  templateUrl: './customer-order-report-v1.component.html',
  styleUrls: ['./customer-order-report-v1.component.scss']
})
export class CustomerOrderReportV1Component implements OnInit {
  key:string;
  invoiceDetails:any;
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
  
    constructor(public OrderService:CustomerOrderService,
      private route:ActivatedRoute,
      public customerService:CustomerService,
      public userService:UserService,
      public dataSharingService:DataSharingService) {
  
       }
  
    ngOnInit() {
      this.key=this.route.snapshot.paramMap.get('key');
  
       
        this.OrderService.getAllOrder().snapshotChanges().subscribe(items=>{
         this.length=items.length;
     let item=items.find(f=>f.key==this.key);
        if(item!=undefined){
       
      var y = item.payload.toJSON();
             y["key"] = item.key;
             y["EntryDate"]=new Date(y["EntryDate"]).toLocaleString()
             this.invoiceDetails=y;
          //    console.log( this.invoiceDetails)
 
     }
      
   
        for (let key in this.invoiceDetails.OrderDetails) {
        //  console.log(key, this.invoiceDetails.items[key]);
          this.items.push(this.invoiceDetails.OrderDetails[key]);
  
          
        }
       // console.log(this.items)
   
 
   
      });
  
      
  
    }
     
  }
  