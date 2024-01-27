import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 
import { ProductInfoService } from '../../@core/mock/marchandizer/product-info.service';
@Component({
  selector: 'ngx-barcode-generator',
  templateUrl: './barcode-generator.component.html',
  styleUrls: ['./barcode-generator.component.scss']
})
export class BarcodeGeneratorComponent implements OnInit {
  key: string;
value=12345;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    public productInfoService:ProductInfoService
  ) { 
    this.key = this.route.snapshot.paramMap.get('key');
    this.productInfoService.getByIdProductInfo(this.key).subscribe(res=>{
      console.log(res);
     this.value=this.value+res.serialNumber;
    })
  }

  ngOnInit() {
  }
  captureScreen() {  
    var data = document.getElementById('content');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Invoice.pdf'); // Generated PDF   
    });  
  }
  toBack(){
    this.router.navigate(['/inventory/product-info']);
  }
}
