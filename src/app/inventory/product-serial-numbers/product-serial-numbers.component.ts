
  import { Component, Inject, OnInit } from '@angular/core';
  import { FormArray, FormBuilder, FormControl, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
  import { Router, ActivatedRoute } from '@angular/router';
  import { NbToastrService } from '@nebular/theme';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Tostr } from '../../@core/data/tostr.model';
import { DateResizerService } from '../../@core/mock/marchandizer/date-resizer.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { ToasterService } from '../../@core/mock/toaster.service';
 
import { SupplierService } from '../Supplier/supplier.service';
import { ProductSeralNumbersService } from './product-seral-numbers.service';
@Component({
  selector: 'ngx-product-serial-numbers',
  templateUrl: './product-serial-numbers.component.html',
  styleUrls: ['./product-serial-numbers.component.scss']
})
export class ProductSerialNumbersComponent implements OnInit {
  Suppliers: any[]=[];
  productName;
  Tostr=new Tostr();
  editkey: string='';
  prdctList: any[]=[];
  filteredSupplier: any[];
  searchSerialNumberList: any[];
  clinentName:string='';
  serialName;
  myControlCustomer = new FormControl();
  filteredOptionsCustomer: Observable<string[]>;
  subscription:Subscription;
  selectAll:boolean=false;
 
    constructor(
      private dateResizerService:DateResizerService,
    public productSerialNumbersService:ProductSeralNumbersService,
    private router:Router,
    private route:ActivatedRoute,
    private mySupplier:SupplierService,
    public languageService:LanguageConverterService,
    //private dateResizeService:DateResizeService,
    private toastrService:ToasterService,
    //private fb: FormBuilder,
    //private dropdownValueService:DropdownValueService
    public dialogbox: MatDialogRef<ProductSerialNumbersComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
      ) { 
        console.log(data)
        this.editkey =this.data.key;
        this.productSerialNumbersService.getProductSerialNumberByProductKey(this.data.key).snapshotChanges().subscribe(items => {
          const serialNumberList = items.map(item => {
            const y = item.payload.val();
            
            y["key"] = item.key;
            y["isSelected"]=false;
            y["productName"]=this.data.ProductBrand;
            y["productKey"]=this.data.key;
            return y;
          });
          this.productSerialNumbersService.loadProductSerialNumbersForm(serialNumberList);
        });
        
      }
  
    ngOnInit() {
     this.productName=localStorage.getItem('filterItem');
     // this.productSerialNumbersService.ProductSerialNumbersForm=this.fb.array([]);
    //this.productSerialNumbersService.count=0;
   // this.productSerialNumbersService.ProductSerialNumbersFormAction();
      //this.dropdownValueService.getStatus();
      this.loadCustomer();
    }
  
    ngOnDestroy(){
      // if( this.productSerialNumbersService.subscription){
      //   this.productSerialNumbersService.subscription.unsubscribe();
      // }
      
      }
      private _filterCustomer(value: any): any[] {
        const filterValue = value.toLowerCase();
     //  this.isShowCustomerAddBtn= this.customers.some(f=>f.phone.trim()==this.myControlCustomer.value);
        return this.Suppliers.filter(option => option.phone.toLowerCase().indexOf(filterValue) === 0);
      }
  
      loadCustomer(){
        this.subscription= this.mySupplier.getAllMySupplierProfileInfo().snapshotChanges().subscribe(item=>{
          this.Suppliers=[];
          item.forEach(element => {
            var y = element.payload.toJSON();
    
            y["key"] = element.key;
       
          this.Suppliers.push(y);
          
          });
         

          this.filteredOptionsCustomer = this.myControlCustomer.valueChanges.pipe(
            startWith(''),
            map(value => this._filterCustomer(value))
          );
      }); 
      }
   onDelete(id, i) {
    
    if (id ==''){
      this.productSerialNumbersService.count=this.productSerialNumbersService.count-1;
      this.productSerialNumbersService.ProductSerialNumbersForm.removeAt(i);
    }
    else{
      if (confirm('Are you sure to delete this record ?'))
      this.productSerialNumbersService.deleteProductSerialNumber(id).then(
        res => {
         //this.productSerialNumbersService.count=this.productSerialNumbersService.count-1;
        //  this.productSerialNumbersService.ProductSerialNumbersForm.removeAt(i);
 
         this.toastrService.deleteMessage()
        });
    }
     
  }
  
  
    onSubmit(){  
      
    //this.productSerialNumbersService.addOrUpdateMultilines(this.ProductSerialNumbersForm.value);
    this.productSerialNumbersService.ProductSerialNumbersForm.value.forEach(element => {
     
      
     element.productKey=this.editkey;
      if(element.key!=''){
        element.date=this.dateResizerService.resize(element.date);
        this.productSerialNumbersService.updateProductSerialNumber(element.key,element).then(t=>{
          
        });
      }
      if(element.key==''){
        element.date=this.dateResizerService.resize(element.date);
        this.productSerialNumbersService.addProductSerialNumber(element).then(t=>{
          
        });
     }
      
    });
    this.toastrService.saveMessage()
   // this.router.navigate(["//productSerialNumbers"]);
  //  this.productSerialNumbersService.ProductSerialNumbersForm=this.fb.array([]);
    //this.productSerialNumbersService.count=0;
    
      
    }
  
  
      backTo(){
        this.router.navigate(['/inventory/product-info']);
      }
      supplierSelection(obj,index){
         
       let arry= this.productSerialNumbersService.ProductSerialNumbersForm.value;
       arry[index].supplierName=obj.name;
       arry[index].suplierOrgName=obj.orgName;
       this.productSerialNumbersService.loadProductSerialNumbersForm(arry);
      } 
      onkeyupSupplier(event){
       
      let value=event.target.value;
        let filteredSupplier = (value) ?
       this.Suppliers.filter(p => p.phone.toLowerCase()
       .includes(value.toLowerCase())) :
       this.Suppliers;      
        this.filteredSupplier=filteredSupplier;
      }

      onSerach(){
        this.productSerialNumbersService.getProductSerialNumberBySerialNumber(this.serialName.trim()).snapshotChanges().subscribe(items => {
          const serialNumberList = items.map(item => {
            const y = item.payload.toJSON();
            y["key"] = item.key;
            y["isSelected"]=false;
            return y;
          });
          console.log(serialNumberList)
          this.productSerialNumbersService.loadProductSerialNumbersForm(serialNumberList);
        });

        //this.searchSerialNumberList=this.prdctList.filter(f=>f.serialNumber.toLowerCase()==this.serialName.toLocaleLowerCase().trim());
       // this.productSerialNumbersService.loadProductSerialNumbersForm(this.searchSerialNumberList);
      }
      resetFilter(){
        this.serialName='';
        let serialKeyByProductKey=this.prdctList.filter(f=>f.productKey==this.editkey);
        this.productSerialNumbersService.loadProductSerialNumbersForm(serialKeyByProductKey);

      }
      onClose(){
      //  this.dialogbox.close();
        let selectedItems=this.productSerialNumbersService.ProductSerialNumbersForm.value.filter(f=>f.isSelected==true);
   
        selectedItems.index=this.data.index;
        selectedItems.productKey=this.data.key;
        this.productSerialNumbersService.ObjectReciever.next(selectedItems);
        this.dialogbox.close();
       
      }

        
      onCheckboxChanged(){
        if(this.selectAll){
          this.productSerialNumbersService.ProductSerialNumbersForm.value.forEach((element,indx) => {
            this.productSerialNumbersService.ProductSerialNumbersForm.at(indx).get('isSelected').patchValue(true);
          });
        }else{
          this.productSerialNumbersService.ProductSerialNumbersForm.value.forEach((element,indx) => {
            this.productSerialNumbersService.ProductSerialNumbersForm.at(indx).get('isSelected').patchValue(false);
          });
        }
      
        
      }
    }