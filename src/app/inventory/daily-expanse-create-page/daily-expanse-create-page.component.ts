import { Component, OnInit } from '@angular/core';
 
import { NbToastrService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Tostr } from '../../@core/data/tostr.model';
import { DailyIncomeExpanse } from '../../@core/data/marchanzider-model/DailyIncomeExpanse';
import { DailyIncomeExpanseService } from '../../@core/mock/marchandizer/daily-income-expanse.service';
import { DateResizerService } from '../../@core/mock/marchandizer/date-resizer.service';
import { ToasterService } from '../../@core/mock/toaster.service';
import { UserService } from '../../@core/mock/marchandizer/user.service';
 
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'ngx-daily-expanse-create-page',
  templateUrl: './daily-expanse-create-page.component.html',
  styleUrls: ['./daily-expanse-create-page.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ],
})


export class DailyExpanseCreatePageComponent implements OnInit {
  Tostr=new Tostr();
  dailyIncomeExpanse=new DailyIncomeExpanse();
  editkey;
  productInfos:DailyIncomeExpanse[]=[];
  columns = [
    {field:"filter"},
    {field:"invoiceNo",header:""},
    {field:"entryDate",header:""},
    {field:"clienName",header:""},
    {field:"totalAmount",header:""},
    {field:"PaidAmount",header:""},
    {field:"DueAmount",header:""},
    {field:"Profit",header:""}
    
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };
  startDate = new Date(2022, 0, 1);
  accountHeads=[];
  constructor(public incomeExpanse:DailyIncomeExpanseService,
    private toastrService:ToasterService,
    private router:Router,
    private dateResizerService:DateResizerService,
    private route:ActivatedRoute,
    private userService:UserService
    ) { 
      this.userService.getAllAccountHead().snapshotChanges().subscribe(item=>{
        this.accountHeads=[];
        item.forEach(element => {
          var y = element.payload.toJSON();
          y["key"] = element.key;
          this.accountHeads.push(y);
        })
    console.log(this.accountHeads)
      })

    }

  ngOnInit() {
    this.dailyIncomeExpanse.date=this.dateResizerService.resize(new Date());
    this.editkey = this.route.snapshot.paramMap.get('key');
    console.log( this.editkey);
    if(this.editkey!=null){
       this.incomeExpanse.getAllProductInfo().snapshotChanges().subscribe(item=>{
        this.productInfos=[];
         item.forEach(element => {
           var y = element.payload.toJSON();
           y["key"] = element.key;

         this.productInfos.push(y as DailyIncomeExpanse);
         console.log(this.productInfos);
         });

          this.dailyIncomeExpanse= this.productInfos.find(f=>f.key==this.editkey);
          console.log(this.dailyIncomeExpanse);
        });
      }   
  }
  save(element){
  // element.Odate=new Date(element.date._d).getTime();
  
  //   let Month=element.date._i.month + 1;
  //    let day=element.date._i.date;
  //   let year=element.date._i.year;
  //         if(Month<10){
  //           Month='0'+Month;
  //         }
  //         if(day<10){
  //           day='0'+day;
  //         }
         
  // let EntryDate =day+'/'+ Month + '/' + year;
  // element.date=EntryDate;

 

  //element.totalExpense=parseInt(element.totalExpense);
  //console.log(element)
    this.incomeExpanse.addProductInfo(element).then(data=>{
    
      this.toastrService.saveMessage()
     this.router.navigate(["/inventory/daily-Expense"])
    },(err) => { 
      this.toastrService.errorMessage()
    })

  }


  backToExpenseInfo(){
    this.router.navigate(['/inventory/daily-Expense']);
  }
  edit(element){
  //   var month;
  //   var day;
  //    var dateObj = new Date(element.date);
  //    var dObj=dateObj.toLocaleDateString().split('/');
  //     month=parseInt(dObj[0]);
  //     day=parseInt(dObj[1]);
  //         if(month<10){
  //           month='0'+month;
  //         }
  //         if(day<10){
  //           day='0'+day;
  //         }

  // let EntryDate =day+'/'+ month + '/' + dObj[2];
  // element.date=EntryDate;
//   if(element.date._i!=undefined){
//     let Month=element.date._i.month + 1;
//     let day=element.date._i.date;
//    let year=element.date._i.year;
//          if(Month<10){
//            Month='0'+Month;
//          }
//          if(day<10){
//            day='0'+day;
//          }
        
//  let EntryDate =day+'/'+ Month + '/' + year;
//  element.date=EntryDate;
//    }

     this.incomeExpanse.updateProductInfo(element.key,element).then(data=>{
       
       this.toastrService.updateMessage()
       this.router.navigate(["/inventory/daily-Expense"])
     },(err) => { 
      this.toastrService.errorMessage()
    })
   }

   onChangeAccountHead(){
  let account= this.accountHeads.find(f=>f.name==this.dailyIncomeExpanse.accountHead).Account;
  if (account){
    this.dailyIncomeExpanse.account=account;
  }
 


   }
}
