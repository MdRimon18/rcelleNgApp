import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from '../../@core/mock/marchandizer/user.service';
import { Router } from '@angular/router';
import { ItemCartTblService } from '../../@core/data/ClientDb/item-cart-tbl.service';
import { ProductInfoService } from '../../@core/mock/marchandizer/product-info.service';
import { ToasterService } from '../../@core/mock/toaster.service';
import { PageMenuTblService } from '../../@core/data/ClientDb/page-menu-tbl.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { ProductSubCategoriesService } from '../../@core/mock/marchandizer/product-sub-categories.service';
import { ProductCategoryService } from '../../@core/mock/marchandizer/product-category.service';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';
import { DataSharingService } from '../../inventory/E-commerce/data-sharing.service';
import { InvoiceDetailsService } from '../../@core/mock/marchandizer/invoice-details.service';

@Component({
  selector: 'ngx-e-come-home',
  templateUrl: './e-come-home.component.html',
  styleUrls: ['./e-come-home.component.scss']
})
export class EComeHomeComponent implements OnInit {
  items: any[]=[];
  companyInfoes: any[]=[];
  searchTerm: string = '';
  searchByCriteria: string = '';
  productInfos=[]
  productSubCategories=[]
  productInfosFiltered:any[]=[]
  ProductMenu=[];
  ProductCategories=[];
  navbarfixed:boolean=false;
  cmpnyName='';
  ToCost=''
  FromCost=''
  selectedValue: string='';
  selectedCategory: string='';

  selectedBrand: { [key: string]: boolean } = {};
  selectedColor: { [key: string]: boolean } = {};
  selectedSize: { [key: string]: boolean } = {};
 

  foods = [
    {value: 'steak-0', viewValue: 'All Company'},
    {value: 'pizza-1', viewValue: 'Company Products'},
    
  ];
  colorGroups: any[];
  BrandGroups: any[];
  SizeGroups: any[];

  @HostListener('window:scroll',['$event']) onscroll(){
   if(window.scrollY>100){
    this.navbarfixed=true;
   }
   else{
    this.navbarfixed=false;
   }
  }

  constructor(private userService:UserService,
    private router:Router,
    public itemCartTblService:ItemCartTblService,
    public productInfoService:ProductInfoService,
    public productCategoryService:ProductCategoryService,
    private toasterService:ToasterService,
    private languageConverterService:LanguageConverterService,
    private pageMenuTblService:PageMenuTblService,
    public productSubCategoriesService:ProductSubCategoriesService,
    public dataSharingService:DataSharingService,
    public invoiceDetailsService:InvoiceDetailsService) { 
      this.pageMenuTblService.initialLoad(languageConverterService.ECommerceMENU_ITEMS);
    }
  
  ngOnInit() {  
  
   // this.cmpnyName='C0';
    this.cmpnyName=Company.cName;
    this.dataSharingService.getCompanyInfo(this.cmpnyName);
    
    this.productCategoryService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.ProductCategories=[];
       item.forEach(element => {
         var y = element.payload.toJSON();
         y["key"] = element.key;
 
      
       this.ProductCategories.push(y);
       
       })
    //console.log(this.ProductCategories)
       this.productSubCategoriesService.getAllProductInfo().snapshotChanges().subscribe(item=>{
        this.productSubCategories=[];
         item.forEach(element => {
           var y = element.payload.toJSON();
           y["key"] = element.key;
   
        
         this.productSubCategories.push(y);
         }) 
        
         this.ProductMenu = this.ProductCategories.map(({ ProductName }) => {
          const filteredSubCategories = this.productSubCategories
            .filter(item => item.productCategoriesId === ProductName)
            .map(({ SubCategoreisName }) => ({ SubCategoreisName }));
        
          return { ProductName, subCategories: filteredSubCategories };
        });
       // console.log(this.ProductMenu);
        }); 
        
       
      });

  this.productInfoService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      this.productInfos=[];
      item.forEach(element => {
        var y = element.payload.val();

        y["key"] = element.key;
      // let sortDate= y["date"].split("/");
      // sortDate=sortDate[0]+sortDate[1]+sortDate[2];
      // y["eDate"]=parseInt(sortDate);
      if(y['imageLink']!=undefined&&y['imageLink']!=''){
        this.productInfos.push(y);
      
      }
     
      }); 

  
     this.colorGroups = [];
     this. BrandGroups = [];
     this.SizeGroups = [];

      this.productInfos.forEach(product => {
        const { color,brand,size } = product;
        if (this.colorGroups.find(group => group.color == color)) {
        } else {
          if(color!=undefined&&color!=''){
            this.colorGroups.push({ color });
          }
        }
        if (this.BrandGroups.find(group => group.brand == brand)) {
        } else {
          if(brand!=undefined&&brand!=''){
            this.BrandGroups.push({ brand });
          }
        
        }
        if (this.SizeGroups.find(group => group.size == size)) {
        } else {
          if(size!=undefined&&size!=''){
            this. SizeGroups.push({ size });
          }
         
        }
      });

      // console.log(this.colorGroups)
      // console.log(this.BrandGroups)
      // console.log(this.SizeGroups)
      
    });
  //   this.invoiceDetailsService.getAllProductInfo().valueChanges().subscribe((data:any)=>{
  //     //  data.reduce((acc, val) => console.log(val.entryDate));
  //      const mergedArray = data.reduce((acc, val) => acc.concat(val.items), []);
  //      console.log(mergedArray)
  //      const groupedItems = mergedArray.reduce((acc, item) => {
  //        const key = `${item.ProductCategory}-${item.ProductSubCategory}-${item.ProductBrand}`;
  //        if (!acc[key]) {
  //          acc[key] = {
  //            ProductCategory: item.ProductCategory,
  //            ProductSubCategory: item.ProductSubCategory,
  //            ProductBrand: item.ProductBrand,
  //            imageLink:item.imageLink,
  //            cost:item.cost,
  //            previousCost:item.previousCost,
  //            Quantity: 0
  //          };
  //        }
  //        acc[key].Quantity += item.Quantity;
  //        return acc;
  //      }, {});
       
  //      const resultrr:any = Object.values(groupedItems);
  //      resultrr.sort((a, b) => b.Quantity - a.Quantity);
  //      const top5 = resultrr.slice(0, 5);
  //    console.log(top5)
  // //  let top15BestSellingproducts = top15.map((item:any) => item.ProductBrand);
  // //  let top15BestSellingproductsQty = top15.map((item:any) => item.Quantity);
     
  //    })
 
  }
  loadProduct(mobile){

    this.router.navigate(['/inventory/shop-home',mobile])
  }
  expandCardItem(){
  //  this.searchTerm='';
    this.searchByCriteria='';
    this.router.navigate(['/e-commerce/item-card']);
  }
  viewCart(){
  // this.searchTerm='';
   this.searchByCriteria='';
    this.router.navigate(['/e-commerce/item-card']);
  }
  onKeyUp(): void {
  // console.log(this.productInfos)
   console.log(this.searchTerm)
   this.searchByCriteria='somthing';
   this.productInfosFiltered = this.productInfos
   .filter(item => item.name.toLowerCase()
   .includes(this.searchTerm.toLowerCase()));
   
  }
  SearchByCatg(catagory){
   // console.log(catagory)
   // console.log(this.productInfos)
   this.searchTerm=''
    this.searchByCriteria=catagory; 
    this.selectedCategory=catagory;
    this.productInfosFiltered=[]
    this.productInfosFiltered = this.productInfos
    .filter(item => item.catagory.toLowerCase()
    .includes(catagory.toLowerCase()));
   // console.log(this.productInfosFiltered)
  }
  SearchByCatgNSubCat(catagory,subCategory){
    this.searchTerm=''
    this.selectedCategory=catagory;
    this.searchByCriteria=catagory; 
    this.productInfosFiltered=[]
    this.productInfosFiltered = this.productInfos
    .filter(item => item.catagory.toLowerCase()
    .includes(this.searchTerm.toLowerCase())&&item.subCategory.toLowerCase()
    .includes(subCategory.toLowerCase()));
    //console.log(this.productInfosFiltered)
  }
  onClickNdGoSearch(){

    const searchBrands = Object.keys(this.selectedBrand).filter(brand => this.selectedBrand[brand]);
    const searchColor = Object.keys(this.selectedColor).filter(color => this.selectedColor[color]);
    const searchSize = Object.keys(this.selectedSize).filter(size => this.selectedSize[size]);
    // console.log(this.selectedBrand)
    // console.log(searchBrands);
   console.log(this.selectedCategory)
    // console.log(this.selectedColor)
    // console.log(searchColor);

    // console.log(this.selectedSize)
    // console.log(searchSize);

    // console.log(this.productInfos)

    // console.log(this.ToCost)
    //  console.log(this.FromCost)
    //  console.log(typeof(this.ToCost))
  
  // this.searchTerm='';
   this.productInfosFiltered=[]
   this.productInfosFiltered = this.productInfos
  .filter(item =>
    (this.FromCost ? item.cost >= this.FromCost : true) &&
    (this.ToCost ? item.cost <= this.ToCost : true) &&
    (this.selectedCategory? this.selectedCategory.includes(item.catagory) : true)&&
    (searchBrands.length > 0 ? searchBrands.includes(item.brand) : true)&&
    (searchColor.length > 0 ? searchColor.includes(item.color) : true)&&
    (searchSize.length > 0 ? searchSize.includes(item.size) : true)
  );

  console.log(this.productInfosFiltered)
  }
  onClickHome(){
    this.searchTerm='';
    this.searchByCriteria='';
    this.router.navigate(['/e-commerce/home'])
    
  }
  // addToCart(product){
  
  //   let itemExists = this.itemCartTblService.ObjectReciever.value.find(f=>f.key===product.key);
  //   if (itemExists) {
  //    if(itemExists.shippingQnty<itemExists.quantity){
  //      itemExists.shippingQnty++;
  //      console.log(itemExists)
  //      itemExists.itemPriceWithDisCount=itemExists.shippingQnty*(itemExists.cost-itemExists.discountAmount);
  //    }else{
  //    this.toasterService.stockFinisMessage(itemExists.quantity);
  //    }
     
  //   } else {
  //    product.shippingQnty=1;
  //    product.itemPriceWithDisCount=1*(product.cost-product.discountAmount);
  //    this.itemCartTblService.add(product);
  //    console.log(this.itemCartTblService.ObjectReciever.value)
  //   }
   
  //  }

   
  redirectToSingleProduct(cmpnyName: string, itemKey: string): void {
  
    this.searchByCriteria='';
    this.router.navigate(['/e-commerce/single-product', cmpnyName, itemKey]);
  }

  
}
