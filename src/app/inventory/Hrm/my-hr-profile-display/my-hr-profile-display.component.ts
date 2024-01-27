import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HrProfileService } from '../hr-profile.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';
import { ToasterService } from '../../../@core/mock/toaster.service';

@Component({
  selector: 'ngx-my-hr-profile-display',
  templateUrl: './my-hr-profile-display.component.html',
  styleUrls: ['./my-hr-profile-display.component.scss']
})
export class MyHrProfileDisplayComponent implements OnInit {

  
  subscription:Subscription;
  customers:any[]=[];

  
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['key', 
  'name','phone',
  'email','department',
  'designation','grade','salary'];

  columns = [
    {field:"filter"},
    
    {field:"name",header:`${this.languageService.UserInfo.name}`},
    {field:"phone",header:`${this.languageService.UserInfo.mobile}`},
    {field:"email",header:`${this.languageService.UserInfo.gmail}`},
    {field:"department",header:`${this.languageService.productEntry.department}`},
    {field:"designation",header:`${this.languageService.productEntry.designation}`},
    {field:"grade",header:`${this.languageService.productEntry.grade}`},
    {field:"salary",header:`${this.languageService.productEntry.salary}`},
     
   
    
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };
      
  constructor( public hrProfileService:HrProfileService,
    public languageService:LanguageConverterService,
    private router:Router,
    private toasterService:ToasterService,
    private mathdialogService: MatDialogService) { }

  ngOnInit() {
    this.subscription= this.hrProfileService.getAllMyHrProfileInfo().snapshotChanges().subscribe(item=>{
      this.customers=[];
      item.forEach(element => {
        var y = element.payload.toJSON();

        y["key"] = element.key;
      this.customers.push(y);
      
      });
      console.log(this.customers)
      this.dataSource=new MatTableDataSource(this.customers.reverse());
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }); 
  }
  onEdit(key){
    this.router.navigate(['/inventory/edit-hr-profile',key]);
   
  }
  redirectToAdd(){
    this.router.navigate(['inventory/my-hr-profile']);
  }
  onDelete(key){
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res=>{
     if(res){
       this.hrProfileService.deleteMyHrProfileInfo(key).then(res=>{
 
         this.ngOnInit();
         this.toasterService.deleteMessage()
       },(err) => {   this.toasterService.errorMessage()});
     }
    })
 
  }
  search(userInfoArray,searchIndex) {
    let emptyValue,name,phone,email,department,designation,grade,salary;
    [emptyValue,name,phone,email,department,designation,grade,salary]=userInfoArray;
     console.log(userInfoArray)
     console.log(this.customers)
    const customersCopy = [...this.customers];
    
    const filteredDatas = customersCopy.filter(item =>
      (name ? (item.name ? item.name.toString().toLowerCase().replaceAll(' ', '').match(name.toString().toLowerCase().replaceAll(' ', '')) : false) : true)&&
      (phone ? (item.phone ? item.phone.toString().toLowerCase().replaceAll(' ', '').match(phone.toString().toLowerCase().replaceAll(' ', '')) : false) : true)&&
      (email ? (item.email ? item.email.toString().toLowerCase().replaceAll(' ', '').match(email.toString().toLowerCase().replaceAll(' ', '')) : false) : true)&&
      (department ? (item.department ? item.department.toString().toLowerCase().replaceAll(' ', '').match(department.toString().toLowerCase().replaceAll(' ', '')) : false) : true)&&
      (designation ? (item.designation ? item.designation.toString().toLowerCase().replaceAll(' ', '').match(designation.toString().toLowerCase().replaceAll(' ', '')) : false) : true)&&
      (grade ? (item.grade ? item.grade.toString().toLowerCase().replaceAll(' ', '').match(grade.toString().toLowerCase().replaceAll(' ', '')) : false) : true)&&
      (salary ? (item.salary ? item.salary.toString().toLowerCase().replaceAll(' ', '').match(salary.toString().toLowerCase().replaceAll(' ', '')) : false) : true) 
      
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

