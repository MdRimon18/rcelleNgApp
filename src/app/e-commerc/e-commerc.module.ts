import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ECommercRoutingModule } from './e-commerc-routing.module';
import { EComeHomeComponent } from './e-come-home/e-come-home.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { SingleProductDetailsComponent } from './single-product-details/single-product-details.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatIconModule, MatPaginatorModule, MatDialogModule, MatSortModule, MatSelectModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatBadgeModule, MatCheckboxModule, MatDividerModule, MatOptionModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatCommonModule } from '@angular/material';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPrintModule } from 'ngx-print';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ItemCardComponent } from './item-card/item-card.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import {MatTabsModule} from '@angular/material/tabs';
@NgModule({
  declarations: [
    EComeHomeComponent,
    CategoryListComponent,
    SingleProductDetailsComponent,
    ItemCardComponent,
    ShippingAddressComponent,
    OrderSuccessComponent,
  ],
  imports: [
    CommonModule,
    ECommercRoutingModule,
    NgxPaginationModule,

    HttpClientModule,
    CommonModule,
    FormsModule,
   
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
     MatButtonModule,
     MatCheckboxModule,
     MatCommonModule,
     MatDividerModule,
     MatOptionModule,     
     MatToolbarModule,
     MatTooltipModule,
     MatTabsModule

  ]
})
export class  ECommercModule {
  // constructor(){
  //   console.log('E-com module called')
  // }
 }
