import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
 
import { SupplierService } from '../supplier.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';

@Component({
  selector: 'ngx-supplier-profile-display',
  templateUrl: './supplier-profile-display.component.html',
  styleUrls: ['./supplier-profile-display.component.scss']
})
export class SupplierProfileDisplayComponent implements OnInit {
  
  subscription:Subscription;
  Suppliers:any[]=[];


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['key', 
  'name','phone',
  'email','storeType','orgName',
  'AddressLineOne','countryCode'];

  columns = [
    {field:"filter"},
    
    {field:"name",header:`${this.languageService.UserInfo.name}`},
    {field:"phone",header:`${this.languageService.UserInfo.mobile}`},
    {field:"email",header:`${this.languageService.UserInfo.gmail}`},
    {field:"storeType",header:`${this.languageService.UserInfo.storeType}`},
    {field:"orgName",header:`${this.languageService.UserInfo.orgName}`},
    {field:"AddressLineOne",header:`${this.languageService.UserInfo.address1}`},
    {field:"countryCode",header:`${this.languageService.UserInfo.Country}`},
     
   
    
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };

  constructor( 
    public supplierService:SupplierService,
    public languageService:LanguageConverterService,
    private toaster:ToasterService,
    private router:Router,
    private mathdialogService: MatDialogService) { }

  ngOnInit() {
    this.subscription= this.supplierService.getAllMySupplierProfileInfo().snapshotChanges().subscribe(item=>{
      this.Suppliers=[];
      item.forEach(element => {
        var y = element.payload.toJSON();

        y["key"] = element.key;
      this.Suppliers.push(y);
      
      });
      
      console.log(this.Suppliers)

      this.dataSource=new MatTableDataSource(this.Suppliers.reverse());
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator; 
      
  }); 
  }
 
  onEdit(key){
     
    this.router.navigate(['/inventory/edit-supplier',key]);
   
  }
  redirectToAdd(){
    this.router.navigate(['inventory/my-supplier-profile']);
  }
  onDelete(key){
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res=>{
     if(res){
       this.supplierService.deleteMySupplierProfileInfo(key).then(res=>{
 
         this.ngOnInit();
         this.toaster.deleteMessage()
       },(err) => {   this.toaster.errorMessage()});
     }
    })  
  
  }

  search(userInfoArray,searchIndex) {
    let emptyValue,name,phone,email,storeType,orgName,AddressLineOne,countryCode;
    [emptyValue,name,phone,email,storeType,orgName,AddressLineOne,countryCode]=userInfoArray;
     console.log(userInfoArray)
     console.log(this.Suppliers)
    const customersCopy = [...this.Suppliers];

    const filteredDatas = customersCopy.filter(item =>
      (name ? (item.name ? item.name.toString().toLowerCase().replaceAll(' ', '').match(name.toString().toLowerCase().replaceAll(' ', '')) : false) : true)&&
      (phone ? (item.phone ? item.phone.toString().toLowerCase().replaceAll(' ', '').match(phone.toString().toLowerCase().replaceAll(' ', '')) : false) : true)&&
      (email ? (item.email ? item.email.toString().toLowerCase().replaceAll(' ', '').match(email.toString().toLowerCase().replaceAll(' ', '')) : false) : true)&&
      (storeType ? (item.storeType ? item.storeType.toString().toLowerCase().replaceAll(' ', '').match(storeType.toString().toLowerCase().replaceAll(' ', '')) : false) : true)&&
      (orgName ? (item.orgName ? item.orgName.toString().toLowerCase().replaceAll(' ', '').match(orgName.toString().toLowerCase().replaceAll(' ', '')) : false) : true)&&
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

