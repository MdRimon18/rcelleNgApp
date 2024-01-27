import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemCartTblService } from '../@core/data/ClientDb/item-cart-tbl.service';
import { PageMenuTblService } from '../@core/data/ClientDb/page-menu-tbl.service';
import { UserInfoTblService } from '../@core/data/ClientDb/user-info-tbl.service';
import { Company } from '../@core/data/marchanzider-model/assignCompanyName';
import { ProductCategories } from '../@core/data/marchanzider-model/product-categories';
import { DropdownValuesService } from '../@core/mock/marchandizer/dropdown-values.service';
import { LanguageConverterService } from '../@core/mock/marchandizer/language-converter.service';
import { ProductCategoryService } from '../@core/mock/marchandizer/product-category.service';
import { UserService } from '../@core/mock/marchandizer/user.service';
import { DataSharingService } from './E-commerce/data-sharing.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductInfoService } from '../@core/mock/marchandizer/product-info.service';
import { ProductInfo } from '../@core/data/ProductInfo';
import { InvoiceDetailsService } from '../@core/mock/marchandizer/invoice-details.service';
import { PurchaseInvoiceDetailsService } from './Perchase/purchase-invoice-details.service';

@Component({
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})

export class InventoryComponent implements OnInit {
 
 //SideMenuList=[];
 //SideMenuListBangla=[];
 SideUserMenuList=[];
 SideUserMenuListBangla=[];
 filteredArray=[];
 title='Dashboard';
 currentPage='';
 language='';
 masterMenu='';
 masterMenuLink='';
  subMenuLink='';

  // on html (onscroll)="onscroll()" [ngClass]="navbarfixed?'fixed':'nofixed'"
  // navbarfixed:boolean=false;

  // @HostListener('window:scroll',['$event']) onscroll(){
  //  if(window.scrollY>300){
  //   this.navbarfixed=true;
  //  }
  //  else{
  //   this.navbarfixed=false;
  //  }
  // }
features=[
  {name:'Orders'},
  {name:'Purchase'}
]
selectFeature='Orders';


filteredData = [];
searchTerm = '';

isButtonActive = false;
sideNav:boolean = true;



stateCtrl = new FormControl('');
  filteredStates: Observable<any[]>;

  states: any[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg',
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg',
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg',
    },
  ];
  
  searchInvoice: any[]=[];
  SalesInvoices: any[]=[];
  purchaseInvoices: any[]=[];
  isSearhShow:boolean=false;

  isScreenLarge = false;
 
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }
  constructor(public userService:UserService ,
    private languageConverterService:LanguageConverterService,
    private router:Router,
    private invoiceDetailsService:InvoiceDetailsService,
    public dropdownValuesService: DropdownValuesService,
    public itemCartTblService:ItemCartTblService,
    private productCategoriesService:ProductCategoryService,
    public userInfoTblService:UserInfoTblService,
    private pageMenuTblService:PageMenuTblService,
    private route:ActivatedRoute,
    private dataSharingService:DataSharingService,
    public purchaseInvoiceDetailsService:PurchaseInvoiceDetailsService,
  
    ) { 
      this.language=localStorage.getItem('Language');
      this.filteredStates = this.stateCtrl.valueChanges.pipe(
        startWith(''),
        map(state => (state ? this._filterStates(state) : this.searchInvoice.slice())),
      );
     // this.dropdownValuesService.initialization();
  //  this.route.params.subscribe(routeParams => {
  //   console.log(routeParams)
  //  })
  }
  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.searchInvoice.filter(state => state.invcNdClint.toLowerCase().includes(filterValue));
  }
  private checkScreenSize(): void {
    this.isScreenLarge = window.innerWidth >= 750; // Adjust the breakpoint as needed
  }
  toggleButton() {
    //event.preventDefault(); // Prevent the default behavior (navigation)
    this.isButtonActive = !this.isButtonActive;
    this.sideNav = !this.sideNav;
   // console.log(this.sideNav)
  }
  toggleSearchBtn(){
    this.isSearhShow=!this.isSearhShow;
  }
  clearInput(){
    // console.log(this.companyCntrl)
     this.stateCtrl.reset('');
   }
  selectItem(item) {
    this.searchTerm = item.name;
    this.filteredData = [];
  }
  setTitle(menu,subMenu){
   this.title=menu.title;
   this.currentPage=subMenu.title;
   if(this.isScreenLarge!=true){
    this.sideNav=false;
   }
   this.masterMenu='';
   this.subMenuLink=subMenu.link;

   if(subMenu.link=='/inventory/Invoice-entry'){
    if(this.language=='English'){
      this.masterMenu='Invoice Details';
    }
    if(this.language=='Bangla'){
      this.masterMenu='চালান বিস্তারিত';
    }
     this.masterMenuLink='/inventory/Invoice-Details'
   }

  }
  ngOnInit() {
    this.checkScreenSize();
   if(localStorage.getItem('userType')==null){
      this.router.navigate(['/login']);
      return;
    }
    if(localStorage.getItem('cmpCode')==null){
      this.router.navigate(['/login']);
      return;
    }
    

     this.dataSharingService.getCompanyInfo(localStorage.getItem('cmpCode'));
     this.dataSharingService.getUserInfo(localStorage.getItem('key'));
 

      if(localStorage.getItem('userType')=='Employee'){
        if(localStorage.getItem('key')!=''){
          this.userService.getUserMenuByUserId(localStorage.getItem('key')).snapshotChanges().subscribe((menuRes:any)=>{
        
            menuRes=menuRes.map(item => {
              const y = item.payload.val();
              y["key"] = item.key;
             
              return y;
            });

           // console.log(menuRes)
            if(menuRes.length>0){
            let menu=  this.languageConverterService.menuMaker(menuRes[0].Menu,this.languageConverterService.userMenu());
             const newMenu = menu
            .filter(item => item.visibility === true)
            .map(item => ({
              ...item,
              children: item.children.filter(child => child.visibility === true)
            }));

          //  console.log(newMenu);
              this.pageMenuTblService.initialLoad(newMenu);
            }
          })
        }
        
      }
      if(localStorage.getItem('userType')=='Shop Owner'){
        this.pageMenuTblService.initialLoad(this.languageConverterService.userMenu());
      }
    
   
   
  this.dropdownValuesService.initialization();
 
  this.loadSalesInvoiceDetails();
  this.loadPurhcaseInvoiceInfo();
       
  }
 
 
  logout(){
    this.userInfoTblService.initialLoad({});
    this.dataSharingService.companyInfo.next({});
    this.dataSharingService.userInfo.next({});
    localStorage.removeItem('phone')
    localStorage.removeItem('cmpCode')
    localStorage.removeItem('name')
    localStorage.removeItem('userType')
    localStorage.removeItem('key')
    localStorage.removeItem('returnUrl')
    localStorage.removeItem('shopOwner')
     this.router.navigate(['/login']);
  }
  ChangeLanguage(value){
     
    localStorage.setItem("Language",value);
    window.location.reload();
  }
  onClickProfile(){
    this.router.navigate(['/inventory/user-profile']);
  }
  onClickInbox(){
    this.router.navigate(['/inventory/inbox']);
    
  }
  expandCardItem(){
    this.router.navigate(['/inventory/item-card']);
  }
  loadSalesInvoiceDetails(){
     this.invoiceDetailsService.getAllProductInfo().snapshotChanges().subscribe(item=>{
      
      this.SalesInvoices=[];
      item.forEach(element => {
        var y = element.payload.toJSON();

        y["key"] = element.key;
       y['invcNdClint']=y['invoiceNo']+' '+y['clienName'];
      this.SalesInvoices.push(y);
   
      });
   //  console.log(this.SalesInvoices)
     this.searchInvoice=this.SalesInvoices;
  }); 
   }
   loadPurhcaseInvoiceInfo(){
    this.purchaseInvoiceDetailsService.getAllpurchaseInvDtlsInfo().snapshotChanges().subscribe(item=>{
      this.purchaseInvoices=[];
      item.forEach(element => {
        var y = element.payload.val();
        y["key"] = element.key;
        y['invcNdClint']=y['invoiceNo']+' '+y['clienName'];
        this.purchaseInvoices.push(y);
      });
      //console.log(this.purchaseInvoices)
    })
   }
   onChangeFeature(){
   // console.log(this.selectFeature)
    if(this.selectFeature=='Orders'){
      this.searchInvoice=[]
      this.searchInvoice=this.SalesInvoices;
    } 
    if(this.selectFeature=='Purchase'){
      this.searchInvoice=[]
      this.searchInvoice=this.purchaseInvoices;
       
    } 
   }

   RedirectToSearchItem(inv){
    if(this.selectFeature=='Orders'){
      this.router.navigate(['/inventory/order-invoice/',inv.key]);
    } 
    if(this.selectFeature=='Purchase'){
      this.router.navigate(['/inventory/purchase-invoice/',inv.key]);
    } 
    

   }
}
