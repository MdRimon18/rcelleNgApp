import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateResizerService } from '../../../@core/mock/marchandizer/date-resizer.service';
import { InvoiceDetailsService } from '../../../@core/mock/marchandizer/invoice-details.service';
import { UserService } from '../../../@core/mock/marchandizer/user.service';
 
import { CustomerService } from '../../Customer/customer.service';
import { InvoicEntryModel } from '../../invoice-entry/ivoiceEntryModel';

@Component({
  selector: 'ngx-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.scss']
})
export class DailyReportComponent implements OnInit {
  key:string;
  invoiceDetails:any[]=[];
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

   OriginalAmount=0;
   totalVat=0
    totalDiscount=0
    PrevDue=0;
    SubTotal=0;
   totalAddiDiscnt=0;

  totalAmount=0;
  PaidAmount=0;
  DueAmount=0;
  entryDate1='';
  entryDate2='';
  invoiceNo='';
    constructor(public invoiceDetailsService:InvoiceDetailsService,
      private route:ActivatedRoute,
      private dateResizerService:DateResizerService,
      public customerService:CustomerService,
      public userService:UserService) {
        this.userService.getUserBycmpCode(localStorage.getItem('cmpCode')).snapshotChanges().subscribe(item=>{
        
          item.forEach(element => {
            var y = element.payload.toJSON();
            y["key"] = element.key;
            this.ShopOwner.push(y);
          })
         
         let user= this.ShopOwner.find(f=>f.cmpCode==localStorage.getItem('cmpCode')&&f.userType=='Shop Owner');
         this.user=user;
        // console.log(user)
        })
       
       }
  
    ngOnInit() {
      this.invoiceDetails=[];
      this.entryDate1= this.route.snapshot.paramMap.get('date1');
      this.entryDate2= this.route.snapshot.paramMap.get('date2');
      if(this.entryDate2==''&&this.entryDate1!=''){
        this.invoiceDetailsService.getInvoiceByDateRange(this.entryDate1,this.entryDate1).subscribe(item=>{
          //console.log(item)
        //  this.invoiceDetails=[];
          this.length=item.length;
           item.forEach((y:any)=> {
                this.invoiceNo=this.invoiceNo+y.invoiceNo+`, `;
   
                 this.OriginalAmount+=y['OriginalAmount'];
                 this.totalVat+=y['totalVat'];
                 this.totalDiscount+=y['totalDiscount'];
   
                 this.PrevDue+=y['PrevDue'];
                 this.SubTotal+=y['SubTotal'];
                 this.totalAddiDiscnt+=y['totalAddiDiscnt'];
                  
                 this.totalAmount+=y['totalAmount'];
                 this.PaidAmount+=y['PaidAmount'];
                 this.DueAmount+=y['DueAmount'];
   
                 //  y['SubTotal']=Math.round( y['SubTotal']);
                 //  y['totalAmount']=Math.round( y['totalAmount']);
                 //  y['DueAmount']=Math.round( y['DueAmount']);
   
                  this.invoiceDetails.push(y);
                //  this.items=[];
                  for (let key in y["items"]) {
                   this.items.push(y["items"][key]);
                 }
               
              
               
           })
      
        
     this.items.forEach(element => {
        
       element.serials='';
       for (let key in element.serialNumbers) {
        
         element.serials=element.serials+ element.serialNumbers[key].serialNumber+',';
     
           
         }
         element.serials= element.serials.slice(0, -1);
     });
     
      
         });
      }else{
        this.invoiceDetailsService.getInvoiceByDateRange(this.entryDate1,this.entryDate2).subscribe(item=>{
        //  console.log(item)
      //    this.invoiceDetails=[];
          this.length=item.length;
           item.forEach((y:any)=> {
                this.invoiceNo=this.invoiceNo+y.invoiceNo+`, `;
   
                 this.OriginalAmount+=y['OriginalAmount'];
                 this.totalVat+=y['totalVat'];
                 this.totalDiscount+=y['totalDiscount'];
   
                 this.PrevDue+=y['PrevDue'];
                 this.SubTotal+=y['SubTotal'];
                 this.totalAddiDiscnt+=y['totalAddiDiscnt'];
                  
                 this.totalAmount+=y['totalAmount'];
                 this.PaidAmount+=y['PaidAmount'];
                 this.DueAmount+=y['DueAmount'];
   
                 //  y['SubTotal']=Math.round( y['SubTotal']);
                 //  y['totalAmount']=Math.round( y['totalAmount']);
                 //  y['DueAmount']=Math.round( y['DueAmount']);
   
                  this.invoiceDetails.push(y);
                 // this.items=[];
                  for (let key in y["items"]) {
                   this.items.push(y["items"][key]);
                 }
               
              
               
           })
      
        
     this.items.forEach(element => {
        
       element.serials='';
       for (let key in element.serialNumbers) {
        
         element.serials=element.serials+ element.serialNumbers[key].serialNumber+',';
     
           
         }
         element.serials= element.serials.slice(0, -1);
     });
     
      
         });
      }
      // this.route.params.subscribe(params => {
      //   this.entryDate1 = params['date1'];
      //   this.entryDate2 = params['date2'];
      //   console.log(this.entryDate2)
        
      // });
  
     // this.entryDate=this.dateResizerService.resize(new Date());
//    this.entryDate='2023-03-03';
   
  
      
  
    }
     
  }
  