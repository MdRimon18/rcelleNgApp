import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Router, Routes, PreloadAllModules} from '@angular/router'
 
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MominurCvComponent } from './mominur-cv/mominur-cv.component';
import { PricingCardComponent } from './pricing-card/pricing-card.component';
import { HelpComponent } from './help/help.component';
import { HowToUseComponent } from './how-to-use/how-to-use.component';
import { SearchECompnyComponent } from './search-e-compny/search-e-compny.component';
 
const routes:Routes=[
  {
    path: 'e-commerce-store',
    component: SearchECompnyComponent,
  },
  // {
  //   path: '.Net_SQL_Ng',
  //   component: MominurCvComponent,
  // },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'features-pricing',
    component: PricingCardComponent,
  },
  // {
  //   path: 'help',
  //   component: HelpComponent,
  // },
  {
    path: 'how-to-use',
    component: HowToUseComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module')
      .then(m => m.InventoryModule),
  },
  {
    path: 'e-commerce',
    loadChildren: () => import('./e-commerc/e-commerc.module')
      .then(m => m.ECommercModule),
  },
 
  { path: '', redirectTo: 'e-commerce-store', pathMatch: 'full' },
  { path: '**', redirectTo: 'e-commerce-companies' },

   
  // { path: '', redirectTo: '/e-commerce', pathMatch: 'full' },
  // { path: '**', redirectTo: '/e-commerce' },
];
@NgModule({
  declarations: [],
  exports:[RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,
   //   { preloadingStrategy: PreloadAllModules }
      )
  ]
})
export class AppRoutingModule { }
