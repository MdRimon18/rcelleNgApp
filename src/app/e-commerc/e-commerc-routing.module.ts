import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EComeHomeComponent } from './e-come-home/e-come-home.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { SingleProductDetailsComponent } from './single-product-details/single-product-details.component';
//import { CategoryListRightSidebarComponent } from './category-list-right-sidebar/category-list-right-sidebar.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
 
const routes: Routes = [

  {
    path: '',
    component: EComeHomeComponent,
    children: [
      {
        path: 'ECome',
        component: EComeHomeComponent,
      },
      {
        path: 'home',
        component: CategoryListComponent,
      },
      {
        path: 'single-product/:cmny/:key',
        component: SingleProductDetailsComponent,
      },
      // {
      //   path: 'category-list-sidebar',
      //   component: CategoryListRightSidebarComponent,
      // },
      {
        path: 'item-card',
        component: ItemCardComponent,
      },
      {
        path: 'shipping-address',
        component: ShippingAddressComponent,
      },
      {
        path: 'order-success',
        component: OrderSuccessComponent,
      },
       
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECommercRoutingModule { }
