import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { ProductCategoryService } from '../../../@core/mock/marchandizer/product-category.service';
import { ProductSubCategoriesService } from '../../../@core/mock/marchandizer/product-sub-categories.service';
import { ProductCategories } from '../../../@core/data/marchanzider-model/product-categories';
import { ProductSubCategories } from '../../../@core/data/marchanzider-model/product-sub-categories';
import { ToasterService } from '../../../@core/mock/toaster.service';
import { MatDialogService } from '../../../@core/mock/mat-dialog.service';
import { ProductInfoService } from '../../../@core/mock/marchandizer/product-info.service';
import { UnitService } from '../../Unit/unit.service';
import { DateResizerService } from '../../../@core/mock/marchandizer/date-resizer.service';
import { DataSharingService } from '../../E-commerce/data-sharing.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'ngx-bulk-product-entry',
  templateUrl: './bulk-product-entry.component.html',
  styleUrls: ['./bulk-product-entry.component.scss']
})
export class BulkProductEntryComponent implements OnInit {
  ProductEntryForm: any = this.fb.array([]);
  productCategories: any[]=[];
  productSubCategories: any[]=[];
  UnitList: any[];
  selectedFile: File;
  jsonResult: string;
  jsonArray: any[]=[];
  prdctList: any;
  constructor(private fb: FormBuilder,
    public languageService:LanguageConverterService,
    private productCategoriesService:ProductCategoryService,
    private productSubCategoryService:ProductSubCategoriesService,
    private toastrService:ToasterService,
    private mathdialogService: MatDialogService,
    public productInfoService:ProductInfoService,
    private unitService:UnitService,
    private dateResizerService:DateResizerService,
    private dataSharingService:DataSharingService) {}

  ngOnInit() {
  
     
  this.productCategoriesService.getAllProductInfo().snapshotChanges().subscribe(item=>{
    item.forEach(element => {
      var y = element.payload.toJSON();
      y["key"] = element.key;

      this.productCategories.push(y as ProductCategories);
    })
//console.log(this.productCategories)
  })

  this.productSubCategoryService.getAllProductInfo().snapshotChanges().subscribe(item=>{
    item.forEach(element => {
      var y = element.payload.toJSON();
      y["key"] = element.key;

      this.productSubCategories.push(y as ProductSubCategories);
    })
  
  })


  this.unitService.getAllUnitInfo().snapshotChanges().subscribe(item=>{
    this.UnitList=[];
    item.forEach(element => {
      var y = element.payload.toJSON();
    //  y["key"] = element.key;
    this.UnitList.push(y);
    });
   


  });
  this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
    this.prdctList=[];
     item.forEach(element => {
       var y = element.payload.toJSON();
       y["key"] = element.key;

    
       this.prdctList.push(y);
     });
  
    });
  //this.initializeForm()
  }
  initializeForm() {
    this.ProductEntryForm.push(this.fb.group({
      catagory: ['', Validators.required],
      subCategory: [''],
      subCategoryList: [''],
      name: ['', Validators.required],
      serialNumber: [''],
      productBuyingPrice: [''],
      cost: [''],
      quantity: ['', Validators.required],
      unit: [''],
      barcode: [''],
      alertQuantity: [0],
      supplier: [''],
      discountPercent: [''],
      discountAmount: [''],
      vatAmount: [''],
      vatPercent: [''],
      brand: [''],
      color: [''],
      size: [''],
      previousCost: [''],
      imageLink: [''],
      shippingDay: [''],
      Desc: [''],
      additionDesc: [''],
      warantyNgurenty: [''],
      importedForm: [''],
      remarks: [''],
      key: [''],
      date:this.dateResizerService.resize(new Date())
    }));
  }
  OnCategoryDDLChange(product,index){
   //console.log(product)
   //console.log(this.productSubCategories)
  //  let category=this.ProductEntryForm.at(index).get('category').value;
  //  let filterproductSubCategories = (category) ?
  //  this.productSubCategories.filter(p => p.productCategoriesId==category):
  //   this.productSubCategories;      
    
  //  this.ProductEntryForm.at(index).get('subCategoryList').patchValue(filterproductSubCategories);
  }
 

  onDelete(i){
      let keyToBeDeleted =this.ProductEntryForm.at(i).get('key').value;
     
     console.log(keyToBeDeleted)

      if (keyToBeDeleted =='') {    
        this.ProductEntryForm.removeAt(i) ;
      }
      if (keyToBeDeleted!='') {
        this.mathdialogService.openConfirmDialog('Are you sure to delete this record ?')
        .afterClosed().subscribe(res=>{
         if(res){
           this.productInfoService.deleteProductInfo(keyToBeDeleted).then(res=>{
             this.ProductEntryForm.removeAt(i);
             this.toastrService.deleteMessage()
           },(err) => { this.toastrService.errorMessage()});
         }
        })
      }
    }

    vatAmountNDiscountCalculation(index){
      let vatPercent=this.ProductEntryForm.at(index).get('vatPercent').value;
      let discountPercent=this.ProductEntryForm.at(index).get('discountPercent').value;
      let cost=this.ProductEntryForm.at(index).get('cost').value;
      
      this.ProductEntryForm.at(index).get('vatAmount').patchValue((cost*vatPercent)/100);
      this.ProductEntryForm.at(index).get('discountAmount').patchValue((cost*discountPercent)/100);
    
    }
    submit(){
      console.log(this.prdctList)
      //let insertCount=this.ProductEntryForm.value.length;
      let existingCount=0;
      let productlenth=this.prdctList.length;
      this.ProductEntryForm.value.forEach(element => {
        
             // element.serialNumber==undefined||''?0:element.productBuyingPrice,
              element.productBuyingPrice==undefined||''?0:element.productBuyingPrice,
              element.cost==undefined||''?0:element.cost,
              element.quantity==undefined||''?0:element.quantity,
              element.alertQuantity==undefined||''?0:element.alertQuantity,
              element.discountPercent==undefined||''?0:element.discountPercent,
              element.discountAmount==undefined||''?0:element.discountAmount,
              element.vatAmount==undefined||''?0:element.vatAmount,
              element.vatPercent==undefined||''?0:element.vatPercent,
           //     element.previousCost==undefined||''?0:element.previousCost,
             //  element.shippingDay==undefined||''?0:element.shippingDay
               
           //   element.serialNumber=parseFloat(element.serialNumber),
              element.productBuyingPrice=parseFloat(element.productBuyingPrice),
              element.cost=parseFloat(element.cost),
              element.quantity=parseFloat(element.quantity),
              element.alertQuantity=parseFloat(element.alertQuantity),
              element.discountPercent=parseFloat(element.discountPercent),
              element.discountAmount=parseFloat(element.discountAmount),
              element.vatAmount=parseFloat(element.vatAmount),
              element.vatPercent=parseFloat(element.vatPercent) 
              //  element.previousCost=parseFloat(element.previousCost),
               //element.shippingDay=parseFloat(element.shippingDay) 
              // console.log(typeof(element))
              
       let stockObjByelementId= this.prdctList.filter(f=>
        f.catagory==element.catagory&&
        f.subCategory==element.subCategory&&
        f.name.toLowerCase().trim()==element.name.toLowerCase().trim());
       
        if(stockObjByelementId.length==0){
        
          if(JSON.stringify(element) !== '{}'){
           productlenth++;
          element.serialNumber = productlenth;
         
            this.productInfoService.addProductInfo(element).then(data=>{
           //console.log(element)
          // insertCount++;
           },(err) => {console.log(err)})
      
          }
        
        }
       else{
        //this.toastrService.openSnackBarWarning('Product  is Already Exist! You Can Only Update..','Ok')
        existingCount++;
       }
        });
        this.toastrService.saveMessage();
        
       // this.toastrService.openSnackBarSuccess(`Total ${insertCount-existingCount} Item Inserted Successfully.`,'OK')
       // this.toastrService.openSnackBarWarning(`Total Exinsting Item ${existingCount}`,'Ok')
        console.log(this.ProductEntryForm.value)
    }

    exportToCsv(): void {
      // const jsonData = [
      //   { name: 'John', age: 30, city: 'New York' },
      //   { name: 'Jane', age: 25, city: 'Los Angeles' },
      //   // ... other JSON data
      // ];
     //console.log(this.dataSource.data)
  
    //  const header = Object.keys(this.dataSource.data[0]);
    //  console.log(header)  
    //  const headerRow = header.join(','); 
    //  console.log(headerRow)  
  
   
  
        const columnOrder = [
          'catagory','subCategory','name', 
          'productBuyingPrice','cost', 'quantity','unit' 
          ,'alertQuantity', 
           'discountPercent','discountAmount',
          'vatAmount', 'vatPercent',
            ,'warantyNgurenty','importedForm','supplier','remarks','key' 
        ];
    
        const csvContent = this.dataSharingService.generateCSVContent([{
          catagory:'A',subCategory:'B',name:'Name', productBuyingPrice:0.0,
           cost:0.0, quantity:0,unit:'Pcs' ,alertQuantity:0, 
           discountPercent:0,discountAmount:0,supplier:'',
           vatPercent:0,  vatAmount:0,
            warantyNgurenty:'1 Year',importedForm:'',remarks:'',key:''
        }], columnOrder);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'Template.csv');
      
    }

    onFileChange(event: any){
      this.selectedFile = event.target.files[0];
    }
          
        
            
    convertToJSON() {
      if (this.selectedFile) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const content = fileReader.result as string;
          this.jsonArray = this.csvToJSON(content);
          
          try {
            //console.log(this.jsonArray);
           // console.log(typeof(this.jsonArray))
            let arry:any[]=[]
            for(const key in this.jsonArray){
                arry.push(this.jsonArray[key])
            }
            for (let i = 0; i < this.jsonArray.length-1; i++) {
              this.initializeForm();
            }
 
        this.ProductEntryForm.patchValue(arry)
        // parsedArray.forEach(element => {
        //     this.ProductEntryForm.push(this.fb.group({
        //           catagory:element.catagory==undefined?'':element.catagory,
        //           subCategory:element.subCategory==undefined?'':element.subCategory,
        //           subCategoryList:this.productSubCategories,
        //           name:element.name==undefined?'':element.name,
        //           serialNumber:element.serialNumber==undefined?'':element.serialNumber,
        //           productBuyingPrice:element.productBuyingPrice==undefined?0:element.productBuyingPrice,
        //           cost: element.cost==undefined?0:element.cost,
        //           quantity:element.quantity==undefined?0:element.quantity,
        //           unit: element.unit==undefined?'':element.unit,
        //           barcode:element.barcode==undefined?'':element.barcode,
        //           alertQuantity:element.alertQuantity==undefined?0:element.alertQuantity,
        //           supplier:element.supplier==undefined?'':element.supplier,
        //           discountPercent:element.discountPercent==undefined?0:element.discountPercent,
        //           discountAmount:element.discountAmount==undefined?0:element.discountAmount,
        //           vatAmount:element.vatAmount==undefined?0:element.vatAmount,
        //           vatPercent:element.vatPercent==undefined?0:element.vatPercent,
        //           brand:element.brand==undefined?'':element.brand,
        //           color:element.color==undefined?'':element.color,
        //           size: element.size==undefined?'':element.size,
        //           previousCost: element.previousCost==undefined?0:element.previousCost,
        //           imageLink:element.imageLink==undefined?'':element.imageLink,
        //           shippingDay: element.shippingDay==undefined?0:element.shippingDay,
        //           Desc:element.Desc==undefined?'':element.Desc,
        //           additionDesc:element.additionDesc==undefined?'':element.additionDesc,
        //           warantyNgurenty:element.warantyNgurenty==undefined?'':element.warantyNgurenty,
        //           importedForm:element.importedForm==undefined?'':element.importedForm,
        //           remarks:element.remarks==undefined?'':element.remarks,
        //           key:element.key==undefined?'':element.key,
        //           date:this.dateResizerService.resize(new Date())
        //         }));
        // });
               // this.ProductEntryForm.push(this.fb.group({element}))
              
              
           
         
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        };
        fileReader.readAsText(this.selectedFile);
      }
    }
    
    csvToJSON(csv: string): any[] {
      const lines = csv.split('\n');
      const headers = lines[0].split(',');
      const jsonArray = [];
    
      for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(',');
        const jsonObject = {};
    
        for (let j = 0; j < headers.length; j++) {
          jsonObject[headers[j]] = currentLine[j];
        }
    
        jsonArray.push(jsonObject);
      }
    
      return jsonArray;
    }
    
     
 
    
}
