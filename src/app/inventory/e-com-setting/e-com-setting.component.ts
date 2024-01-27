import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../@core/mock/marchandizer/user.service';
import { DataSharingService } from '../E-commerce/data-sharing.service';
import { ToasterService } from '../../@core/mock/toaster.service';

@Component({
  selector: 'ngx-e-com-setting',
  templateUrl: './e-com-setting.component.html',
  styleUrls: ['./e-com-setting.component.scss']
})
export class EComSettingComponent implements OnInit {
  cmpInfo: any = this.fb.array([]);
  placeInfo: any = this.fb.array([]);
  myForm: FormGroup;
  cmpInfoLinks=[];
  constructor( 
    private fb: FormBuilder,
    public user:UserService,
    public datasharingService:DataSharingService,
    private toasterService:ToasterService) { }

  ngOnInit() {
    let cmpInfo=this.datasharingService.companyInfo.value;
    for (const key in cmpInfo.cmpInfoLinks) {
     
           this.cmpInfo.push(this.fb.group({
          linkName:[cmpInfo.cmpInfoLinks[key].linkName,Validators.required],
          link: [cmpInfo.cmpInfoLinks[key].link,Validators.required]
        }
        ));
     }
     for (const key in cmpInfo.workOrTransportPlace) {
     
           this.placeInfo.push(this.fb.group({
            placeName:[cmpInfo.workOrTransportPlace[key].placeName,Validators.required] 
        }
        ));
     }
   
  }
  addCmpInfo() {
    this.cmpInfo.push(this.fb.group({
      linkName:['',Validators.required],
      link: ['',Validators.required],
      
    }));
  }
  addPlaceInfo() {
    this.placeInfo.push(this.fb.group({
      placeName:['',Validators.required] 
      
    }));
  }
  onDelete(i) {
  //  console.log(this.cmpInfo.value[i])
   this.cmpInfo.value.splice(i, 1);
   this.cmpInfo.removeAt(i);
 
  }
  onDeletePlace(i) {
   
   this.placeInfo.value.splice(i, 1);
   this.placeInfo.removeAt(i);
 
  }

  onSave(){
    const cmpInfoArray = Object.values(this.cmpInfo.value);
    const placeInfoArray = Object.values(this.placeInfo.value);
   
    let cmpInfo=this.datasharingService.companyInfo.value;
    cmpInfo.cmpInfoLinks=cmpInfoArray;
    cmpInfo.workOrTransportPlace=placeInfoArray;
    
    this.user.updateUserInfo(cmpInfo.key,cmpInfo).then(t=>{
      this.toasterService.saveMessage()
      },err=>{console.log(err)});
  
   }
}
