import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyShopEmpService } from '../../@core/mock/marchandizer/my-shop-emp.service';
import { UserService } from '../../@core/mock/marchandizer/user.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { ToasterService } from '../../@core/mock/toaster.service';
import { MatDialogService } from '../../@core/mock/mat-dialog.service';
 
@Component({
  selector: 'ngx-shop-emp-display',
  templateUrl: './shop-emp-display.component.html',
  styleUrls: ['./shop-emp-display.component.scss']
})
export class ShopEmpDisplayComponent implements OnInit,OnDestroy {

  subscription:Subscription;
  userInfos:any[]=[];
  userEmployees:any[]=[];



  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['key', 
  'name','phone',
  'designation'];

  columns = [
    {field:"filter"},
    
    {field:"name",header:`${this.languageService.UserInfo.name}`},
    {field:"phone",header:`${this.languageService.UserInfo.mobile}`},
    {field:"designation",header:`${this.languageService.productEntry.designation}`} 
  
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };

  constructor(
    public languageService:LanguageConverterService,
    public userService:UserService,
    private router:Router,
    private toasterService:ToasterService,
    private mathdialogService: MatDialogService) { }

  ngOnInit() {
    this.subscription= this.userService.getUserBycmpCode(localStorage.getItem('cmpCode')).snapshotChanges().subscribe(item=>{
      this.userEmployees=[];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
        if(y['userType']=='Employee'){
          this.userEmployees.push(y);
        }
      console.log(this.userEmployees)
        this.dataSource=new MatTableDataSource(this.userEmployees.reverse());
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      });
  }); 
  }
 ngOnDestroy(){
   this.subscription.unsubscribe();
 }
 onEdit(key){
  this.router.navigate(['/inventory/shop-emp-edit',key]);
  console.log(key)
}
redirectToAdd(){
  this.router.navigate(['inventory/create-shop-emp']);
}
onDelete(key){
  this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
  .afterClosed().subscribe(res=>{
   if(res){
     this.userService.deleteUserInfo(key).then(res=>{

       this.ngOnInit();
       this.toasterService.deleteMessage()
     },(err) => {   this.toasterService.errorMessage()});
   }
  })
 
}
search(userInfoArray,searchIndex) {
  let emptyValue,name,phone,designation;
  [emptyValue,name,phone,designation]=userInfoArray;
   console.log(userInfoArray)
   console.log(this.userEmployees)
  const customersCopy = [...this.userEmployees];

  const filteredDatas = customersCopy.filter(item =>
    (name ? (item.name ? item.name.toString().toLowerCase().replaceAll(' ', '').match(name.toString().toLowerCase().replaceAll(' ', '')) : false) : true)&&
    (phone ? (item.phone ? item.phone.toString().toLowerCase().replaceAll(' ', '').match(phone.toString().toLowerCase().replaceAll(' ', '')) : false) : true)&&
    (designation ? (item.designation ? item.designation.toString().toLowerCase().replaceAll(' ', '').match(designation.toString().toLowerCase().replaceAll(' ', '')) : false) : true) 
    
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
