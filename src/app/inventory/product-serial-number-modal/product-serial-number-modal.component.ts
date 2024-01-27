import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
 
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Tostr } from '../../@core/data/tostr.model';
import { DropdownValuesService } from '../../@core/mock/marchandizer/dropdown-values.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { ToasterService } from '../../@core/mock/toaster.service';
 
import { ProductSeralNumbersService } from '../product-serial-numbers/product-seral-numbers.service';

@Component({
  selector: 'ngx-product-serial-number-modal',
  templateUrl: './product-serial-number-modal.component.html',
  styleUrls: ['./product-serial-number-modal.component.scss']
})
export class ProductSerialNumberModalComponent implements OnInit{

    searchObjectName=''
  Tostr=new Tostr();
editkey: string='';
serialNumberList: any[]=[];
searchSerialNumberList: any[]=[];
selectAll:boolean=false;
  constructor(
    public dialogbox: MatDialogRef<ProductSerialNumberModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  public productSerialNumbersService:ProductSeralNumbersService,
  private router:Router,
  private route:ActivatedRoute,
  //private dateResizeService:DateResizeService,
  private toastrService:ToasterService,
  public dropdownValuesService: DropdownValuesService,
  public languageService:LanguageConverterService,
 
    ) { 
     
      this.editkey =this.data.key;
      this.productSerialNumbersService.getProductSerialNumberByProductKey(this.data.key).snapshotChanges().subscribe(items => {
        const serialNumberList = items.map(item => {
          const y = item.payload.toJSON();
          y["key"] = item.key;

          y["productName"]=this.data.ProductBrand;
          y["productKey"]=this.data.key;
          
          y["isSelected"]=false;
          return y;
        });
        this.productSerialNumbersService.loadProductSerialNumbersForm(serialNumberList);
      });
      
      
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
        this.toastrService.deleteMessage();
       // this.Tostr.showToast('primary','', 'Delete Successfully', '',this.toastrService);
      });
  }
   
}


  onSubmit(){  
    
  let selectedItems=this.productSerialNumbersService.ProductSerialNumbersForm.value.filter(f=>f.isSelected==true);
   
    selectedItems.index=this.data.index;
   // selectedItems.productKey=this.data.key;
    this.productSerialNumbersService.ObjectReciever.next(selectedItems);
    this.dialogbox.close();
   
  
    
  }


    backTo(){
      this.router.navigate(['/inventory/product-info']);
    }
    onClose(){

      //this.datapassingService.setJobSelectionFormValue(this.filteredEmbelCostArray);
          this.dialogbox.close();
        }
        onSerach(){
          this.productSerialNumbersService.getProductSerialNumberBySerialNumber(this.searchObjectName.trim()).snapshotChanges().subscribe(items => {
            const serialNumberList = items.map(item => {
              const y = item.payload.toJSON();
              y["key"] = item.key;
              y["isSelected"]=false;
              return y;
            });
            this.productSerialNumbersService.loadProductSerialNumbersForm(serialNumberList);
          });
      // this.searchSerialNumberList=this.serialNumberList.filter(f=>f.serialNumber.toLowerCase()==this.searchObjectName.toLocaleLowerCase().trim());
      //  this.productSerialNumbersService.loadProductSerialNumbersForm(this.searchSerialNumberList);
    }
        resetFilter(){
          this.searchObjectName='';
          this.productSerialNumbersService.getProductSerialNumberByProductKey(this.data.key).snapshotChanges().subscribe(items => {
            const serialNumberList = items.map(item => {
              const y = item.payload.val();
              y["key"] = item.key;
              y["isSelected"]=false;
              return y;
            });
            this.productSerialNumbersService.loadProductSerialNumbersForm(serialNumberList);
          });

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