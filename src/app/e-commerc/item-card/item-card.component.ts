import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { ItemCartTblService } from '../../@core/data/ClientDb/item-cart-tbl.service';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';
import { DateResizerService } from '../../@core/mock/marchandizer/date-resizer.service';
import { LanguageConverterService } from '../../@core/mock/marchandizer/language-converter.service';
import { ToasterService } from '../../@core/mock/toaster.service';

@Component({
  selector: 'ngx-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements  OnInit{
 
 
  entryDate:any='';
 

  totalPrice:number=0;
  constructor( 
    
    private toastrService:ToasterService,
    private router:Router ,
    private dateResizerService:DateResizerService,
    public languageService:LanguageConverterService,
    private itemCartTblService:ItemCartTblService,
    
    ) {
      

     }

   
  ngOnInit() {
      this.entryDate=this.dateResizerService.resize(new Date());
 
  }
   
  ContinueShipping(){
    this.router.navigate(["/e-commerce/home"]);
  }
  checkout(){
    
    this.router.navigate(["/e-commerce/shipping-address"]);
    }
}

