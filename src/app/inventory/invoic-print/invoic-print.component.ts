import { Component, OnInit } from '@angular/core';
 
import { ActivatedRoute } from '@angular/router';
 
import { InvoicEntryModel } from '../invoice-entry/ivoiceEntryModel';
import { CustomerService } from '../Customer/customer.service';
import { InvoiceDetailsService } from '../../@core/mock/marchandizer/invoice-details.service';
import { UserService } from '../../@core/mock/marchandizer/user.service';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';
import { DataSharingService } from '../E-commerce/data-sharing.service';
 
@Component({
  selector: 'ngx-invoic-print',
  templateUrl: './invoic-print.component.html',
  styleUrls: ['./invoic-print.component.scss']
})
export class InvoicPrintComponent implements OnInit {
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

  constructor(public invoiceDetailsService:InvoiceDetailsService,
    private route:ActivatedRoute,
    public customerService:CustomerService,
    public userService:UserService,
    public dataSharingService:DataSharingService) {

     }

  ngOnInit() {
    this.key=this.route.snapshot.paramMap.get('key');
    this.invoiceDetailsService.getByIdInvoiceDetails(this.key).snapshotChanges().subscribe(item=>{
     // console.log(item.payload.val())
        var y = item.payload.val();
          y["key"] = item.key;
          y['entryDate']=new Date( y['entryDate']).toDateString();
          //y["entryDate"]=new Date(y["entryDate"]).toLocaleString() 
              y['SubTotal']=Math.round( y['SubTotal']);
              y['totalAmount']=Math.round( y['totalAmount']);
              y['DueAmount']=Math.round( y['DueAmount']);
              this.invoiceDetails=y as InvoicEntryModel;
              this.items=y['items'];
      
          //  console.log(this.items)  

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
