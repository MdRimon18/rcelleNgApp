import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
import { ToasterService } from '../../../@core/mock/toaster.service';
import { UnitService } from '../unit.service';

@Component({
  selector: 'ngx-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.scss']
})
export class EditUnitComponent implements OnInit {
  unitObj={name:''}
  editkey;
  constructor(
    public route:ActivatedRoute,
    public unitService:UnitService,
    private router:Router,
    public languageService:LanguageConverterService,
    private toasterService:ToasterService
  ) { }

  ngOnInit() {
    this.editkey = this.route.snapshot.paramMap.get('id');
    this.unitService.getByIdUnitInfo(this.editkey).subscribe(s=>{
      
      this.unitObj.name=s[0];
    })
   
  }
  update(){
    this.unitService.updateUnitInfo(this.editkey,this.unitObj).then(t=>{
      this.toasterService.updateMessage()
    })
  }
  backToProductInfo(){
    this.router.navigate(['/inventory/unit-info']);
  }
}
