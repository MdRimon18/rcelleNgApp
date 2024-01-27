import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
 
import { CustomerService } from '../customer.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';

@Component({
  selector: 'ngx-customer-display',
  templateUrl: './customer-display.component.html',
  styleUrls: ['./customer-display.component.scss']
})
export class CustomerDisplayComponent implements OnInit {
 
  
  
  subscription:Subscription;
  customers:any[]=[];

  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['key', 
  'name','phone',
  'email','occupation',
  'AddressLineOne','countryCode'];

  columns = [
    {field:"filter"},
    
    {field:"name",header:`${this.languageService.UserInfo.name}`},
    {field:"phone",header:`${this.languageService.UserInfo.mobile}`},
    {field:"email",header:`${this.languageService.UserInfo.gmail}`},
    {field:"occupation",header:`${this.languageService.UserInfo.occupation}`},
    {field:"AddressLineOne",header:`${this.languageService.UserInfo.address1}`},
    {field:"countryCode",header:`${this.languageService.UserInfo.Country}`},
     
   
    
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };
      
  constructor( public customerService:CustomerService,
    private router:Router,
    public languageService:LanguageConverterService,
    private toasterService:ToasterService,
    private mathdialogService: MatDialogService) { }

  ngOnInit() {
    this.subscription= this.customerService.getAllMyCustomerProfileInfo().snapshotChanges().subscribe(item=>{
      this.customers=[];
      item.forEach(element => {
        var y = element.payload.toJSON();

        y["key"] = element.key;
   
      this.customers.push(y);
      
      });
 
      this.dataSource=new MatTableDataSource(this.customers.reverse());
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
   
  }); 
  }
   
 
  onEdit(key){
    this.router.navigate(['inventory/edit-customer',key]);
    
  }
  redirectToAdd(){
    this.router.navigate(['inventory/my-customer']);
  }
  onDelete(key){
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res=>{
     if(res){
       this.customerService.deleteMyCustomerProfileInfo(key).then(res=>{
 
         this.ngOnInit();
         this.toasterService.deleteMessage()
       },(err) => {   this.toasterService.errorMessage()});
     }
    })
 
  }
  search(userInfoArray,searchIndex) {
    let emptyValue,name,phone,email,occupation,AddressLineOne,countryCode;
    [emptyValue,name,phone,email,occupation,AddressLineOne,countryCode]=userInfoArray;
     console.log(userInfoArray)
     console.log(this.customers)
    const customersCopy = [...this.customers];

    const filteredDatas = customersCopy.filter(item =>
      (name ? (item.name ? item.name.toString().toLowerCase().replaceAll(' ', '').match(name.toString().toLowerCase().replaceAll(' ', '')) : false) : true)&&
      (phone ? (item.phone ? item.phone.toString().toLowerCase().replaceAll(' ', '').match(phone.toString().toLowerCase().replaceAll(' ', '')) : false) : true)&&
      (email ? (item.email ? item.email.toString().toLowerCase().replaceAll(' ', '').match(email.toString().toLowerCase().replaceAll(' ', '')) : false) : true)&&
      (occupation ? (item.occupation ? item.occupation.toString().toLowerCase().replaceAll(' ', '').match(occupation.toString().toLowerCase().replaceAll(' ', '')) : false) : true)&&
      (AddressLineOne ? (item.AddressLineOne ? item.AddressLineOne.toString().toLowerCase().replaceAll(' ', '').match(AddressLineOne.toString().toLowerCase().replaceAll(' ', '')) : false) : true)&&
      (countryCode ? (item.countryCode ? item.countryCode.toString().toLowerCase().replaceAll(' ', '').match(countryCode.toString().toLowerCase().replaceAll(' ', '')) : false) : true) 
      
    );
    
    this.dataSource = new MatTableDataSource(filteredDatas);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
   
   }
   clearFilters() {
    this.ngOnInit();
     this.filtersModel = [];
     this.filterKeys = {};
    }
    
}

