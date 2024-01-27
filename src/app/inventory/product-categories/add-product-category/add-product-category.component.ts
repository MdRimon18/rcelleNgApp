import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategories } from '../../../@core/data/marchanzider-model/product-categories';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { ProductCategoryService } from '../../../@core/mock/marchandizer/product-category.service';
import { ToasterService } from '../../../@core/mock/toaster.service';

@Component({
  selector: 'ngx-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.scss']
})
export class AddProductCategoryComponent implements OnInit {

  productCategoryObj={key:'',ProductName:''}
 isButtonShow=false;
  editkey: any;
  productCategories: any[]=[];
  constructor(public languageService:LanguageConverterService,
    private toastrService:ToasterService,
    private roter:Router,
    private route:ActivatedRoute,
    public productCategoryService:ProductCategoryService) { 

      this.editkey = this.route.snapshot.paramMap.get('key');
      console.log(this.editkey)
      if(this.editkey==0||this.editkey==null){
       
      }else{
        this.isButtonShow=true;
      this.productCategoryService.getAllProductInfo().snapshotChanges().subscribe(item=>{
          item.forEach(element => {
            var y = element.payload.toJSON();
            if(element.key==this.editkey){
              y["key"] = element.key;
        
              this.productCategories.push(y as ProductCategories);
            }
        
          })
          console.log(this.productCategories)
          if(this.productCategories.length>0){
            this.productCategoryObj=this.productCategories.pop();
          }
        
         
          
        })
      }
    }

  ngOnInit() {
  }
  backTo(){
  this.roter.navigate(['/inventory/Product-categories'])
  }
  save(){
    this.productCategoryObj.ProductName=this.productCategoryObj.ProductName.trim();
    this.productCategoryService.addProductInfo(this.productCategoryObj).then(data=>{
     
     this.toastrService.saveMessage()
     
    },(err) => {   this.toastrService.errorMessage()})

  }

  edit(){
   
    this.productCategoryService.updateProductInfo(this.productCategoryObj.key,this.productCategoryObj).then(data=>{
      
     this.toastrService.updateMessage()
     
    },(err) => {   this.toastrService.errorMessage()})
  }
}
