import { Component, OnDestroy, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
 
import { UnitService } from '../unit.service';
import{jsPDF} from 'jspdf'
import { Tostr } from '../../../@core/data/tostr.model';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
@Component({
  selector: 'ngx-unit-info',
  templateUrl: './unit-info.component.html',
  styleUrls: ['./unit-info.component.scss']
})
export class UnitInfoComponent implements OnInit,OnDestroy {
 
  title = 'app';
  elementType = 'url';
  value = 'Alu potol begun';
 
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('content',{static:false}) el!:ElementRef;
  dataSource = new MatTableDataSource();
  displayedColumns = ['key', 'name'];
  columns = [
    {field:"filter"},
    {field:"name",header:`${this.languageService.UnitInfo.UnitName}`}
    
    ];
      headers: string[] = this.columns.map(x => x.field);
      headersFilters = this.headers.map((x, i) => x+'_'+i);
      filtersModel = [];
      filterKeys = {
        
      };
  productInfos:any[]=[];
 
   
  Tostr=new Tostr();
  subscription:Subscription;
  stockInfos:any[]=[];
  productInfostwo:any[]=[];
 
  isBangla=false;
  rows: any;
  
  constructor(
    public unitService:UnitService,
     private toastrService:ToasterService,
     private mathdialogService: MatDialogService,
     
     private router:Router ,
     public languageService:LanguageConverterService 
    ) { }
makePdf(){
  let pdf=new jsPDF("p","pt","a4");
  pdf.html(this.el.nativeElement,{
    callback:(pdf)=>{
      pdf.save('demo.pdf');
    }
  });
  
}
  ngOnInit() {
     

   if(localStorage.getItem("Language")=='Bangla'){
    this.isBangla=true;
   }
   this.refresList();
   

  
  }
  search(value,searchIndex){
    if(searchIndex==1){
        let searchName =this.productInfos.filter(  
          (res:any) =>res.name.toString().toLowerCase().replaceAll(' ','').match(value.toLocaleLowerCase().replaceAll(' ',''))
        );
        this.dataSource = new MatTableDataSource(searchName);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    
        if(searchName.length==0){
          this.toastrService.searchNotFoundMessage();
        }
      
    }
  
  }
  clearFilters() {
    this.refresList();
    this.filtersModel = [];
    this.filterKeys = {};
   }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  AddNewInpurRow(){
    this.router.navigate(["/inventory/create-unit"]);
    
  }

  edit(element){
    this.router.navigate(["/inventory/edit-unit/",element.key])
        
      }
  save(element){
 
  }

 

  delete(element){
  
    this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
               .afterClosed().subscribe(res=>{
                if(res){
                  this.unitService.deleteUnitInfo(element.key).then(res=>{

                    
                    this.refresList();
                    this.toastrService.deleteMessage()
                  },(err) => { this.toastrService.errorMessage()});
                }
               })
  }

  refresList(){
    
    this.subscription= this.unitService.getAllUnitInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.toJSON();

        y["key"] = element.key;
     
      this.productInfos.push(y);
      
      });
      
 
      this.dataSource=new MatTableDataSource(this.productInfos);
      
     
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
   
  }
  
  ngOnDestroy(): void {
    
   
  } 
  
}
