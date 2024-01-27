import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LanguageConverterService } from '../../../@core/mock/marchandizer/language-converter.service';
 
@Component({
  selector: 'ngx-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private dialog:MatDialog,
    public languageService:LanguageConverterService,
    public dialogbox: MatDialogRef<ProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { 
     
  }

  ngOnInit() {
  }
  onClose(){
    this.dialogbox.close();
  }
}
