import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadImagesService } from '../../@core/mock/marchandizer/upload-images.service';
import { DataSharingService } from '../E-commerce/data-sharing.service';
 
@Component({
  selector: 'ngx-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent {
  
inv=new Invoice();
constructor() {
this.inv.productName='Fish'
this.inv.ProductQuantity=2;
this.inv.rate=100;
this.inv.amount=200;
console.log(this.inv)

for (let index = 0; index <=100; index++) {
  console.log(index)
  
}
}


}

export class Invoice {
  productName:string=''
  ProductQuantity:number=0
  rate:number=0
  amount:number=0
}
