import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NbToastrService } from '@nebular/theme';
import { Tostr } from '../../@core/data/tostr.model';
import { UserService } from '../../@core/mock/marchandizer/user.service';
import { MatDialogService } from '../../@core/mock/mat-dialog.service';
import { ToasterService } from '../../@core/mock/toaster.service';
 
@Component({
  selector: 'ngx-sign-up-approval',
  templateUrl: './sign-up-approval.component.html',
  styleUrls: ['./sign-up-approval.component.scss']
})
export class SignUpApprovalComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['key', 'name','phone','userType','storeType','cmpCode','entryDate','isApproved','pass','AddressLineOne','orgName'];
  singupObj={name:'',phone:'',pass:'',userType:'',agree_term:false,entryDate:'',isApproved:false}
  users=[];
  UserTypeList=[
    {name:'Customer'},
    {name:'Shop Owner'} 
    
  ]
  shopTypeList=[
    {name:'Fashion and Apparel',code:'FashionandApparel'},
    {name:'General',code:'GeneralStore'},
    {name:'Electronics',code:'Electronics'},
    {name:'Food and Beverage',code:'FoodandBeverage'},
    {name:'Healthcare',code:'Healthcare'},
    {name:'Entertainment',code:'Entertainment'},
    {name:'Home Improvement',code:'HomeImprovement'},
    {name:'Department',code:'Dept'},
    {name:'Grocery',code:'Grocery'},
    {name:'Technology',code:'technology'},
    {name:'Clothing',code:'Cloth'},
    {name:'Accessory',code:'Accessories'},
    {name:'Pharmacies',code:'Pharmacies'},
    {name:'Pet stores',code:'Petstores'},
    {name:'Toy stores',code:'Toystores'},
    {name:'Specialty stores',code:'Specialtystores'},
    {name:'Kioskss',code:'Kiosks'},
    {name:'Travel and Hospitality',code:'TravelandHospitality'},
   
    {name:'Others',code:'Others'},
  ]
  Tostr=new Tostr();
  constructor( public userService:UserService,
    private toastrService:ToasterService,
    private mathdialogService: MatDialogService) { }

  ngOnInit() {
   
    this.userService.getAllUserInfo().snapshotChanges().subscribe(items=>{
      this.users=[];
      this.dataSource=new MatTableDataSource(items.map(item => {
        const y = item.payload.val();
        y["key"] = item.key;
      
        return y;
      }).reverse());
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.users=this.dataSource.data;
      
      console.log(this.users)
 

    })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  edit(element){
     
    this.userService.updateUserInfo(element.key,element).then(data=>{
     
      this.toastrService.updateMessage()
      this.ngOnInit();
    },(err) => {  this.toastrService.errorMessage()})
  }
  delete(element){
     
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
                .afterClosed().subscribe(res=>{
                 if(res){  
                   this.userService.deleteUserInfo(element.key).then(res=>{
                     this.ngOnInit();
                     this.toastrService.deleteMessage()
                   },(err) => {  this.toastrService.errorMessage()});
                 }
                })
  }
}
