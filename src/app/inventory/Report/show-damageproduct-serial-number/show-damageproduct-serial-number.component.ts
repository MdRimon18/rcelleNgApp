import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { Tostr } from '../../../@core/data/tostr.model';
import { DropdownValuesService } from '../../../@core/mock/marchandizer/dropdown-values.service';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
import { ProductSeralNumbersService } from '../../product-serial-numbers/product-seral-numbers.service';
 
@Component({
  selector: 'ngx-show-damageproduct-serial-number',
  templateUrl: './show-damageproduct-serial-number.component.html',
  styleUrls: ['./show-damageproduct-serial-number.component.scss']
})
export class ShowDamageproductSerialNumberComponent implements OnInit {

  searchObjectName=''
  Tostr=new Tostr();
editkey: string='';
serialNumberList: any[]=[];
items: any[]=[];
searchSerialNumberList: any[]=[];
  constructor(
    public dialogbox: MatDialogRef<ShowDamageproductSerialNumberComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  public productSerialNumbersService:ProductSeralNumbersService,
  private router:Router,
  private route:ActivatedRoute,
  //private dateResizeService:DateResizeService,
  private toastrService:ToasterService,
  public dropdownValuesService: DropdownValuesService,
  public languageService:LanguageConverterService,
  //private fb: FormBuilder,
  //private dropdownValueService:DropdownValueService
    ) { 
      for (let key in data) {
        //  console.log(key, this.invoiceDetails.items[key]);
          this.items.push(data[key]);
  
          
        }
     
        this.productSerialNumbersService.loadProductSerialNumbersForm(this.items);
      
    }

  ngOnInit() {
   // this.productSerialNumbersService.ProductSerialNumbersForm=this.fb.array([]);
  //this.productSerialNumbersService.count=0;
 // this.productSerialNumbersService.ProductSerialNumbersFormAction();
    //this.dropdownValueService.getStatus();
    
  }

  ngOnDestroy(){
    // if( this.productSerialNumbersService.subscription){
    //   this.productSerialNumbersService.subscription.unsubscribe();
    // }
    
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
    
  let selectedItems=this.productSerialNumbersService.ProductSerialNumbersForm.value.filter(f=>f.isSelected==true);
   
  
    this.productSerialNumbersService.ObjectReciever.next(selectedItems);
   
    this.dialogbox.close();
   
    //this.productSerialNumbersService.addOrUpdateMultilines(this.ProductSerialNumbersForm.value);
  // this.productSerialNumbersService.ProductSerialNumbersForm.value.forEach(element => {
   
    
  //  element.productKey=this.editkey;
  //   if(element.key!=''){
     
  //     this.productSerialNumbersService.updateProductSerialNumber(element.key,element).then(t=>{
  
  //     });
  //   }
  //   if(element.key==''){
       
  //     this.productSerialNumbersService.addProductSerialNumber(element).then(t=>{
   
  //     });
  //  }
    
  // });
  // this.Tostr.showToast('primary','', 'Saved Successfully', '',this.toastrService);
 // this.router.navigate(["//productSerialNumbers"]);
//  this.productSerialNumbersService.ProductSerialNumbersForm=this.fb.array([]);
  //this.productSerialNumbersService.count=0;
  
    
  }


    backTo(){
      this.router.navigate(['/inventory/product-info']);
    }
    onClose(){

      //this.datapassingService.setJobSelectionFormValue(this.filteredEmbelCostArray);
          this.dialogbox.close();
        }
        onSerach(){
      
      this.searchSerialNumberList=this.serialNumberList.filter(f=>f.serialNumber.toLowerCase()==this.searchObjectName.toLocaleLowerCase().trim());
       this.productSerialNumbersService.loadProductSerialNumbersForm(this.searchSerialNumberList);
    }
        resetFilter(){
          this.searchObjectName='';
          let serialKeyByProductKey=this.serialNumberList.filter(f=>f.productKey==this.editkey);
          this.productSerialNumbersService.loadProductSerialNumbersForm(serialKeyByProductKey);

        }
         

        
         
  }