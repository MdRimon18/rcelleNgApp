import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInfoService } from '../../@core/mock/marchandizer/product-info.service';
 
@Component({
  selector: 'ngx-qrcode-generator',
  templateUrl: './qrcode-generator.component.html',
  styleUrls: ['./qrcode-generator.component.scss']
})
export class QrcodeGeneratorComponent implements OnInit {
  title = 'app';
  elementType = 'url';
  value;
  key: string;
  items: any[]=[];
 
  constructor(private router:Router,
    private route:ActivatedRoute,
    public productInfoService:ProductInfoService) {
    this.key = this.route.snapshot.paramMap.get('key');
    this.productInfoService.getByIdProductInfo(this.key).subscribe(res=>{
      
      if(res!=null){
        let vl='';
        for (const [key, val] of Object.entries(res)) {
          console.log(key,val)
         vl=vl+key+':'+val+',';
         
      }
      vl= vl.slice(0, -1);
      this.value=vl;
      
      }
      
         
         
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
