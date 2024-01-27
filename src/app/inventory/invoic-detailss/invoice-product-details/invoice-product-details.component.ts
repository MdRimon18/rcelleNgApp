import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SerialDetailsFromInvoiceComponent } from './serial-details-from-invoice/serial-details-from-invoice.component';

@Component({
  selector: 'ngx-invoice-product-details',
  templateUrl: './invoice-product-details.component.html',
  styleUrls: ['./invoice-product-details.component.scss']
})
export class InvoiceProductDetailsComponent implements OnInit {
items:any[]=[];

  constructor(
    private dialog:MatDialog,
    public dialogbox: MatDialogRef<InvoiceProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { 
    
    for (let key in this.data.items) {
      //  console.log(key, this.invoiceDetails.items[key]);
        this.items.push(this.data.items[key]);

      }

     
  }

  ngOnInit() {
  }
  onClose(){
        this.dialogbox.close();
      }

      onDetailsSerial(element){
  
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;
          dialogConfig.width = "60%";
          dialogConfig.height = "60%";
          dialogConfig.data=element;
          //this.dialog.open(ShowTrimsItemFormComponent, dialogConfig);
          this.dialog.open(SerialDetailsFromInvoiceComponent, dialogConfig);

      }
}
