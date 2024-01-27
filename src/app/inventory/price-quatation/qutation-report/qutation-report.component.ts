import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PriceQuotationService } from '../../../@core/mock/marchandizer/price-quotation.service';
import { UserService } from '../../../@core/mock/marchandizer/user.service';
import { CustomerService } from '../../Customer/customer.service';
import { InvoicEntryModel } from '../../invoice-entry/ivoiceEntryModel';

@Component({
  selector: 'ngx-qutation-report',
  templateUrl: './qutation-report.component.html',
  styleUrls: ['./qutation-report.component.scss']
})
export class QutationReportComponent implements OnInit {
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
  
    constructor(public invoiceDetailsService:PriceQuotationService,
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
       
      this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
       this.length=item.length;
        item.forEach(element => {
          var y = element.payload.toJSON();
          y["key"] = element.key;
           
             if(y['key']==this.key){
               y['SubTotal']=Math.round( y['SubTotal']);
               y['totalAmount']=Math.round( y['totalAmount']);
              // y['DueAmount']=Math.round( y['DueAmount']);
               this.invoiceDetails=y as InvoicEntryModel;
              // this.items= Object.keys(y['items']);
              // console.log(this.items) ;          
             }
        })
   
        for (let key in this.invoiceDetails.items) {
        //  console.log(key, this.invoiceDetails.items[key]);
          this.items.push(this.invoiceDetails.items[key]);
  
          
        }
        console.log(this.items)
   
  this.items.forEach(element => {
     
    element.serials='';
    for (let key in element.serialNumbers) {
     
      element.serials=element.serials+ element.serialNumbers[key].serialNumber+',';
  
        
      }
      element.serials= element.serials.slice(0, -1);
  });
  
   
      });
  
      
  
    }
     
  }
  