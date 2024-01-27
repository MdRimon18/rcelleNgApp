import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-pricing-card',
  templateUrl: './pricing-card.component.html',
  styleUrls: ['./pricing-card.component.scss']
})
export class PricingCardComponent implements OnInit {

  constructor(
    //private router:Router
    ) { }

  ngOnInit() {
  }
  // backToProductInfo(){
  //   this.router.navigate(['/inventory/product-info']);
  // }
  openImageInNewTab() {
    const imageUrl = 'assets/website/img/invoiceImage.JPG'; // Replace with your image URL
    window.open(imageUrl, '_blank');
  }
}
