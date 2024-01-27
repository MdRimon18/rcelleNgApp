import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
 
import { UnitService } from '../unit.service';

@Component({
  selector: 'ngx-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.scss']
})
export class CreateUnitComponent implements OnInit {
  unitObj={name:''}
  constructor(
    private router:Router,
    public languageService:LanguageConverterService,
    public unit:UnitService,
    private toasterService:ToasterService
    ) { }

  ngOnInit() {
   
  }
  backToProductInfo(){
    this.router.navigate(['/inventory/unit-info']);
  }
  save(){
  this.unit.addUnitInfo(this.unitObj).then(t=>{
    this.toasterService.saveMessage()
  },err=>console.log(err))
  }
}
