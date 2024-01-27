import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';
import { DateResizerService } from '../../@core/mock/marchandizer/date-resizer.service';
 

@Injectable({
  providedIn: 'root'
})
export class ProductSeralNumbersService {
  public ObjectReciever = new BehaviorSubject<any>([]);
  ObjectTbl= this.ObjectReciever.asObservable();

  productSerialNumbers:ProductSerialNumbers; 

  ProductSerialNumbersForm: FormArray = this.fb.array([]);
 count=0;
  ngOnInit() {
  }
  constructor(private db: AngularFireDatabase,
    private fb: FormBuilder,
    private dateResizerService:DateResizerService) { }

  
  addProductSerialNumber(obj) {
   
    return  this.db.list(`${Company.cName}/ProductSerialNumbers/`).push(obj);
   }

   updateProductSerialNumber(id, obj) {
    return this.db.object(`${Company.cName}/ProductSerialNumbers/` + id).update(obj);
   }
   
 getByIdProductSerialNumber(id):Observable<any>{
  return this.db.list(`${Company.cName}/ProductSerialNumbers/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
 }
  getProductSerialNumberByProductKey(productKey){
   return this.db.list(`${Company.cName}/ProductSerialNumbers/`,
    ref => ref.orderByChild('productKey').equalTo(productKey));
  }
  getProductSerialNumberBySerialNumber(serialNumber){
    return this.db.list(`${Company.cName}/ProductSerialNumbers/`,
     ref => ref.orderByChild('serialNumber').equalTo(serialNumber));
   }
 
  getAllProductSerialNumber() { 
  return this.db.list(`${Company.cName}/ProductSerialNumbers`);
}
 
  deleteProductSerialNumber(key: string) {
  return this.db.list(`${Company.cName}/ProductSerialNumbers`).remove(key);
}


ProductSerialNumbersFormAction() {
  const newFormGroup: FormGroup = this.fb.group({
    key: '',
    productKey: '',
    supplierNumber: '',
    rate: 0,
    date: this.dateResizerService.resize(new Date()),
    supplierName: '',
    suplierOrgName: '',
    serialNumber: '',
    remarks: '',
    isSell: 'No',
    isSelected: false
  });
  
  // Insert the new form group at the first position in the FormArray
  const formArray: FormArray = this.ProductSerialNumbersForm;
  formArray.insert(0, newFormGroup);


 
//   this.count=this.count+1;
//   this.ProductSerialNumbersForm.push(this.fb.group({
//   key:'',
//   productKey: '' ,
//   supplierNumber:'',
//   rate:0,
//   date:this.dateResizerService.resize(new Date()),
//   supplierName:'',
//   suplierOrgName:'',
//  serialNumber: '' ,
// remarks: '',
// isSell:'No',
// isSelected:false  
// }))

};


 loadProductSerialNumbersForm(array){
  this.ProductSerialNumbersForm = this.fb.array([]);
  this.count=0;
  array.forEach(element => {
   this.count=this.count+1;
   this.ProductSerialNumbersForm.push(this.fb.group({
   
    key :element.key,
    productKey :element.productKey,
  serialNumber :element.serialNumber,
  productName :element.productName,
  rate :element.rate,
  date :element.date,
 supplierNumber:element.supplierNumber,
 supplierName:element.supplierName,
 suplierOrgName:element.suplierOrgName,
remarks :element.remarks,
isSell :element.isSell,
isSelected:element.isSelected 
     
   }));
  });
  
} 

 
}

export class ProductSerialNumbers {
  
  key: string ;
  productKey: string ;
serialNumber: string ;
rate: number ;
date: any ;
supplierNumber: string ;
supplierName: string ;
suplierOrgName: string ;
remarks: string ;
isSell: string ;
}