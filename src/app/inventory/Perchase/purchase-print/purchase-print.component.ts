import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../@core/mock/marchandizer/user.service';
 
import { CustomerService } from '../../Customer/customer.service';
import { InvoicEntryModel } from '../../invoice-entry/ivoiceEntryModel';
import { PurchaseInvoiceDetailsService } from '../purchase-invoice-details.service';

@Component({
  selector: 'ngx-purchase-print',
  templateUrl: './purchase-print.component.html',
  styleUrls: ['./purchase-print.component.scss']
})
export class PurchasePrintComponent implements OnInit {
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
  
    constructor(public purchaseInvoiceDetailsService:PurchaseInvoiceDetailsService,
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
    
      this.purchaseInvoiceDetailsService.getByIdpurchaseInvDtlsInfo(this.key).snapshotChanges().subscribe(item=>{
       
       var y = item.payload.val();
       y["key"] = item.key;
       y['entryDate']=new Date( y['entryDate']).toDateString();
       //y["entryDate"]=new Date(y["entryDate"]).toLocaleString() 
           y['SubTotal']=Math.round( y['SubTotal']);
           y['totalAmount']=Math.round( y['totalAmount']);
           y['DueAmount']=Math.round( y['DueAmount']);
           this.invoiceDetails=y as InvoicEntryModel;
           this.items=y['items'];
  
   
           this.items.forEach((element:any)=> {
      
            element.serials='';
            if(element.serialNumbers!=undefined&&element.serialNumbers.length>0){
              element.serialNumbers.forEach(el => {
                element.serials=element.serials+el.serialNumber+',';
              });
            
            }
           // console.log(element)
          element.serials= element.serials.slice(0, -1);
          });
    
      });
  
      
  
    }
     
  }
  