import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { AppComponent } from './app.component';
// import {
//   NbChatModule,
//   NbDatepickerModule,
//   NbDialogModule,
//   NbMenuModule,
//   NbSidebarModule,
//   NbToastrModule,
//   NbWindowModule,
 
// } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule}from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
//import { InventoryModule } from './inventory/inventory.module'
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ThemeModule } from './@theme/theme.module';
import { CoreModule } from './@core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MominurCvComponent } from './mominur-cv/mominur-cv.component';
import {NgxPrintModule} from 'ngx-print';
import { MatAutocompleteModule, MatPaginatorModule, MatStepperModule } from '@angular/material';
import { PricingCardComponent } from './pricing-card/pricing-card.component';
import { HowToUseComponent } from './how-to-use/how-to-use.component';
//import { HelpComponent } from './help/help.component';
import {MatExpansionModule} from '@angular/material/expansion';
//import {MatRadioModule} from '@angular/material/radio';
import { SearchECompnyComponent } from './search-e-compny/search-e-compny.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    AppComponent,
    // WebdatarocksComponent, 
    SearchECompnyComponent, 
    LoginComponent,
    RegisterComponent,
    // MominurCvComponent,
    PricingCardComponent,
    HowToUseComponent,
   // HelpComponent,
   

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    //MatPaginatorModule,
    //InventoryModule ,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatSnackBarModule,
   // ThemeModule.forRoot(),
   // MatDatepickerModule,
   // NbSidebarModule.forRoot(),
  //  NbMenuModule.forRoot(),
  //  NbDatepickerModule.forRoot(),
  //  NbDialogModule.forRoot(),
  //  NbWindowModule.forRoot(),
   // NbToastrModule.forRoot(),
    // NbChatModule.forRoot({
    //   messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    // }),
   CoreModule.forRoot(),
 //MatRadioModule,
 //NgxPrintModule
 MatProgressSpinnerModule
  ],
  providers: [],  
  bootstrap: [AppComponent] 
})
export class AppModule {
  // constructor(){
  //   console.log('app module called')
  // }
 }
