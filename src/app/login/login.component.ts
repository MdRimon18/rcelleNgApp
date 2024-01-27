import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PageMenuTblService } from '../@core/data/ClientDb/page-menu-tbl.service';
import { ProductCategoriesTblService } from '../@core/data/ClientDb/product-categories-tbl.service';
import { UserInfoTblService } from '../@core/data/ClientDb/user-info-tbl.service';
import { Company } from '../@core/data/marchanzider-model/assignCompanyName';
import { ProductCategories } from '../@core/data/marchanzider-model/product-categories';
import { CountryService } from '../@core/mock/marchandizer/country.service';
import { LanguageConverterService } from '../@core/mock/marchandizer/language-converter.service';
import { ProductCategoryService } from '../@core/mock/marchandizer/product-category.service';
import { UserService } from '../@core/mock/marchandizer/user.service';
import { ToasterService } from '../@core/mock/toaster.service';
import { first, map } from 'rxjs/operators';
import { DataSharingService } from '../inventory/E-commerce/data-sharing.service';

    
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginObj={your_name:'',your_pass:'',remember_me:false};
  users=[];
   language='';
  productInfos=[];
  subscription:Subscription;  
  filteredArray=[];
  cmny: string;
  isLoading = false;
    constructor( public userService:UserService ,
      private router:Router,
     // private userInfoTblService:UserInfoTblService,
     // private pageMenuService:LanguageConverterService,
    //  private pageMenuTblService:PageMenuTblService,
      private productCategory:ProductCategoryService,
     // private productCategoriesTblService:ProductCategoriesTblService,
     // private countryService:CountryService,
      //private route:ActivatedRoute,
      public languageService:LanguageConverterService,
      private toasterService:ToasterService 
     
      ){  
       
      
    }
    login(){
      this.isLoading = true;
       let user=[];
      this.userService.getUserByMobileNoNPassWord(this.loginObj.your_name)
      .snapshotChanges().subscribe((response:any)=>{
       // console.log(response)
        response.forEach(element => {
          var y = element.payload.toJSON();
          y["key"] = element.key;
          user.push(y);
        })


       let loginUser=user.find(f=>f.pass==this.loginObj.your_pass);
        if(loginUser==undefined){
          this.isLoading = false;
          this.toasterService.openSnackBarWarning(`User not found !`,`Ok`)
          return;
        }else{
         
        if(loginUser.isApproved==false){
          this.isLoading = false;
          this.toasterService.openSnackBarWarning(`Need Approval First! Please Contact to System Admin !`,`Ok`)
           
          return;
        }
    if(loginUser.isApproved==true){ 

      this.userService.getUserMenuByUserId(loginUser.key).snapshotChanges()
      .subscribe((menuRes:any)=>{
    
        menuRes=menuRes.map(item => {
          const y = item.payload.val();
          y["key"] = item.key;
         
          return y;
        });
       // console.log(menuRes)
      });


        localStorage.setItem('phone',loginUser.phone)
        localStorage.setItem('cmpCode',loginUser.cmpCode)
        localStorage.setItem('name',loginUser.name)
        localStorage.setItem('userType',loginUser.userType)
        localStorage.setItem('key',loginUser.key)
        localStorage.setItem('shopOwner',loginUser.cmpCode)
         Company.cName=loginUser.cmpCode;

      //  let url=localStorage.getItem('returnUrl')
      //     if(url!=null||url!=undefined){
      //       this.router.navigate([url]);
      //     }else{
          


            if(loginUser.userType=='Customer'){
            //  this.router.navigate(['/inventory/e-com-home']);
           // this.isLoading = false;
              this.router.navigate(['/ecommerce-company']);
            }
            if(loginUser.userType=='Shop Owner'){
              //this.isLoading = false;
             // console.log(loginUser)
              if(loginUser.orgName==undefined||
                loginUser.state==undefined||
                loginUser.AddressLineOne==undefined||
                loginUser.storeType==undefined||
  
                loginUser.orgName==''||
                loginUser.state==''||
                loginUser.AddressLineOne==''||
                loginUser.storeType==''){
                 // console.log(loginUser)
                  this.router.navigate(['/inventory/sign-up-by-shop']);
                }else{
                 // this.isLoading = false;
                  this.router.navigate(['/inventory']);
                }
                
            }
            if(loginUser.userType=='Employee'){
              //this.isLoading = false;
              this.router.navigate(['/inventory']);
            }
          
          }
         
         
        //}
          
        }
      
      });
       

   
    }
    
     ngOnInit(){
 
      // this.userService.getAllUserInfo().snapshotChanges().subscribe(item=>{
      //   item.forEach(element => {
      //     var y = element.payload.toJSON();
      //     y["key"] = element.key;
      //     this.filteredArray.push(y);
      //   })
      // })
     }
  
     Redirect(){
      this.router.navigate(['/register']);
    } 
 
      loadCustomerFetures(){
        

        Company.cName=localStorage.getItem('cmpCode');
        this.productCategory.getAllProductInfo().snapshotChanges().subscribe(item=>{
          this.productInfos=[];
          item.forEach(element => {
            var y = element.payload.toJSON();
            y["key"] = element.key;
        
          
          this.productInfos.push(y as ProductCategories);
          })
      
          this.productInfos.forEach(element => {
            
            this.languageService.ShopOwnerMENU_ITEMS[1].children.push({title:element.ProductName,link:`/inventory/e-com-home/${ Company.cName}/${element.ProductName.replace(/\s/g, '')}`});
          });
        
       //   this.pageMenuTblService.initialLoad(CustomerMENU_ITEMS); 
        
          
        });
      
      
      }
}
