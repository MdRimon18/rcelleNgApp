import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
import { CustomerService } from '../../Customer/customer.service';
import { InvoicEntryModel } from '../../invoice-entry/ivoiceEntryModel';
 
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 
import { RepairService } from '../repair.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../@core/mock/marchandizer/user.service';
@Component({
  selector: 'ngx-repair-print-v2',
  templateUrl: './repair-print-v2.component.html',
  styleUrls: ['./repair-print-v2.component.scss']
})
export class RepairPrintV2Component implements OnInit {
  key:string;
  invoiceDetails=new InvoicEntryModel();
  items=[];
  filteredCustomer={name:'',phone:'',key:''};
    customers=[];
  ShopOwner=[];
  
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
  
    constructor(public repairService:RepairService,
      private route:ActivatedRoute,
      public customerService:CustomerService,
      public userService:UserService) {
        this.userService.getAllUserInfo().snapshotChanges().subscribe(item=>{
          item.forEach(element => {
            var y = element.payload.toJSON();
            y["key"] = element.key;
            this.ShopOwner.push(y);
          })
         let user= this.ShopOwner.find(f=>f.key== localStorage.getItem('key'));
          
         this.user=user;
        })
       
       }
  
    ngOnInit() {
      this.key=this.route.snapshot.paramMap.get('key');
       
      this.repairService.getByIdRepairInfo(this.key).subscribe(element=>{
        console.log(element);
         
               this.invoiceDetails=element as InvoicEntryModel;
              // this.items= Object.keys(y['items']);
              // console.log(this.items) ;          

   
        for (let key in  element.items) {
        //  console.log(key, this.invoiceDetails.items[key]);
          this.items.push(this.invoiceDetails.items[key]);
  
          
        }
       
 
   
      });
  
      
  
    }
     
  }
  