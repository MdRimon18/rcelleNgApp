import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA,   } from '@angular/material';
import { InvoiceProductDetailsComponent } from '../invoice-product-details.component';

@Component({
  selector: 'ngx-serial-details-from-invoice',
  templateUrl: './serial-details-from-invoice.component.html',
  styleUrls: ['./serial-details-from-invoice.component.scss']
})
export class SerialDetailsFromInvoiceComponent implements OnInit {
  serialNumber: any=[];

  constructor(
    public dialogbox: MatDialogRef<SerialDetailsFromInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { 
    
    if(this.data.serialNumbers!=undefined){
      for (let key in this.data.serialNumbers) {
        //  console.log(key, this.invoiceDetails.items[key]);
          this.serialNumber.push(this.data.serialNumbers[key]);
        }
      
    }
    
  }

  ngOnInit() {
  }
  onClose(){
    this.dialogbox.close();
  }
}
