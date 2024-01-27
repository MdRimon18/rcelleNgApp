import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { ProductCategories } from '../../../@core/data/marchanzider-model/product-categories';
import { ProductSubCategories } from '../../../@core/data/marchanzider-model/product-sub-categories';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { ProductCategoryService } from '../../../@core/mock/marchandizer/product-category.service';
import { ProductSubCategoriesService } from '../../../@core/mock/marchandizer/product-sub-categories.service';
import { ToasterService } from '../../../@core/mock/toaster.service';

@Component({
  selector: 'ngx-add-product-sub-categories',
  templateUrl: './add-product-sub-categories.component.html',
  styleUrls: ['./add-product-sub-categories.component.scss']
})
export class AddProductSubCategoriesComponent implements OnInit {

  productSubCategoryObj={key:'',productCategoriesId:'',SubCategoreisName:''}
 isButtonShow=false;
  editkey: any;
  productCategories: any[]=[];
  productSubCategories: any[]=[];
  constructor(public languageService:LanguageConverterService,
    private toastrService:ToasterService,
    private roter:Router,
    private route:ActivatedRoute,
    public productCategoryService:ProductCategoryService,
    public productSubCategoriesService:ProductSubCategoriesService
    ) { 

      this.editkey = this.route.snapshot.paramMap.get('key');
      if(this.editkey==0||this.editkey==null){
       
      }else{
        this.isButtonShow=true;
      this.productSubCategoriesService.getAllProductInfo().snapshotChanges().subscribe(item=>{
          item.forEach(element => {
            var y = element.payload.toJSON();
            if(element.key==this.editkey){
              y["key"] = element.key;
        
              this.productSubCategories.push(y as ProductSubCategories);
            }
        
          })
        
          if(this.productSubCategories.length>0){
            this.productSubCategoryObj=this.productSubCategories.pop();
          }
        
         
          
        })
      }
    }

  ngOnInit() {
    this.productCategoryDDL();
  }
  backTo(){
  this.roter.navigate(['/inventory/Product-sub-categories'])
  }
  save(){
    this.productSubCategoryObj.SubCategoreisName=this.productSubCategoryObj.SubCategoreisName.trim();
    this.productSubCategoriesService.addProductInfo(this.productSubCategoryObj).then(data=>{
     
     this.toastrService.saveMessage()
     
    },(err) => {   this.toastrService.errorMessage()})

  }

  edit(){
   
    this.productSubCategoriesService.updateProductInfo(this.productSubCategoryObj.key,this.productSubCategoryObj).then(data=>{
      
     this.toastrService.updateMessage()
     
    },(err) => {   this.toastrService.errorMessage()})
  }

  productCategoryDDL(){
    this.productCategoryService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
       this.productCategories.push(y as ProductCategories);
    
      })
      
    })
  }
  
}
