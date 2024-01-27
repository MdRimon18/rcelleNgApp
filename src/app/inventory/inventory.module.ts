import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatIconModule, MatPaginatorModule, MatDialogModule, MatSnackBarModule, MatSortModule, MatSelectModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatBadgeModule, MatCheckboxModule, MatDividerModule, MatOptionModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatCommonModule } from '@angular/material';
import { NbCardModule, NbUserModule, NbButtonModule, NbTabsetModule, NbActionsModule, NbRadioModule, NbSelectModule, NbListModule, NbIconModule, NbInputModule, NbTreeGridModule, NbDialogModule, NbWindowModule, NbCheckboxModule, NbPopoverModule, NbTooltipModule, NbDatepickerModule, NbToastrService, NbMenuModule, NbSidebarModule, NbToastrModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NgxBarcode6Module } from 'ngx-barcode6';
import {NgxPrintModule} from 'ngx-print';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DataTable, DataTableModule } from 'angular5-data-table';
import { MatConfirmDialogComponent } from '../@core/data/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatDialogService } from '../@core/mock/mat-dialog.service';
//import { LoginComponent } from '../login/login.component';
import { AddPurchaseStockComponent } from './add-purchase-stock/add-purchase-stock.component';
import { BarcodeGeneratorComponent } from './barcode-generator/barcode-generator.component';
import { CustomerOrderDisplayComponent } from './customer-order-display/customer-order-display.component';
import { CustomerDisplayComponent } from './Customer/customer-display/customer-display.component';
import { CustomerOrderReportV1Component } from './Customer/customer-order-report-v1/customer-order-report-v1.component';
import { CustomerOrderReportV2Component } from './Customer/customer-order-report-v2/customer-order-report-v2.component';
import { CustomerProfileComponent } from './Customer/customer-profile/customer-profile.component';
import { EditMyCustomerComponent } from './Customer/edit-my-customer/edit-my-customer.component';
import { MyCustomerComponent } from './Customer/my-customer/my-customer.component';
import { DailyExpanseCreatePageComponent } from './daily-expanse-create-page/daily-expanse-create-page.component';
import { DailyIncomeExpanseComponent } from './daily-income-expanse/daily-income-expanse.component';
import { DailyIncomeComponent } from './daily-income/daily-income.component';
import { DailyInfoComponent } from './daily-info/daily-info.component';
import { DailySellsComponent } from './daily-sells/daily-sells.component';
import { DeuPaymentDetailsComponent } from './deu-payment-details/deu-payment-details.component';

import { EditMyHrProfileComponent } from './Hrm/edit-my-hr-profile/edit-my-hr-profile.component';
import { HrProfileComponent } from './Hrm/hr-profile/hr-profile.component';
import { MyHrProfileDisplayComponent } from './Hrm/my-hr-profile-display/my-hr-profile-display.component';
import { MyHrProfileComponent } from './Hrm/my-hr-profile/my-hr-profile.component';
import { InvoicDetailssComponent } from './invoic-detailss/invoic-detailss.component';
import { InvoiceProductDetailsComponent } from './invoic-detailss/invoice-product-details/invoice-product-details.component';
import { SerialDetailsFromInvoiceComponent } from './invoic-detailss/invoice-product-details/serial-details-from-invoice/serial-details-from-invoice.component';
import { InvoicPrintComponent } from './invoic-print/invoic-print.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceEntryComponent } from './invoice-entry/invoice-entry.component';
import { ItemCardComponent } from './item-card/item-card.component';
import { MoneyRecitByInvoiceComponent } from './money-recit-by-invoice/money-recit-by-invoice.component';
import { MoneyRecitByInvoice2Component } from './money-recit-by-invoice2/money-recit-by-invoice2.component';
import { MoneyRecitDisplayComponent } from './money-recit-display/money-recit-display.component';
import { MoneyRecitDisplayv2Component } from './money-recit-displayv2/money-recit-displayv2.component';
import { MonthlyExpanseComponent } from './monthly-expanse/monthly-expanse.component';
import { MonthlyIncomeDueComponent } from './monthly-income-due/monthly-income-due.component';
import { MonthlyIncomeComponent } from './monthly-income/monthly-income.component';
import { PaymentComponent } from './payment/payment.component';
import { MoneyRecitPuchaseV2Component } from './Perchase/money-recit-puchase-v2/money-recit-puchase-v2.component';
import { MoneyRecitPurchaseComponent } from './Perchase/money-recit-purchase/money-recit-purchase.component';
import { NewPurchaseComponent } from './Perchase/new-purchase/new-purchase.component';
import { PurchaseDuePaymentDetlsComponent } from './Perchase/purchase-due-payment-detls/purchase-due-payment-detls.component';
import { PurchaseInfoComponent } from './Perchase/purchase-info/purchase-info.component';
import { PurchasePaymentComponent } from './Perchase/purchase-payment/purchase-payment.component';
import { PurchasePrintV2Component } from './Perchase/purchase-print-v2/purchase-print-v2.component';
import { PurchasePrintV3Component } from './Perchase/purchase-print-v3/purchase-print-v3.component';
import { PurchasePrintComponent } from './Perchase/purchase-print/purchase-print.component';
import { PurchaseReturnListComponent } from './Perchase/purchase-return-list/purchase-return-list.component';
import { PurchaseReturnPrintV2Component } from './Perchase/purchase-return-print-v2/purchase-return-print-v2.component';
import { PurchaseReturnPrintV3Component } from './Perchase/purchase-return-print-v3/purchase-return-print-v3.component';
import { PurchaseReturnPrintComponent } from './Perchase/purchase-return-print/purchase-return-print.component';
import { PurchaseReturnComponent } from './Perchase/purchase-return/purchase-return.component';
import { PurchaseSummaryComponent } from './Perchase/purchase-summary/purchase-summary.component';
import { ProductEntryCreatePageComponent } from './product-entry-create-page/product-entry-create-page.component';
import { ProductEntryEditPageComponent } from './product-entry-edit-page/product-entry-edit-page.component';
import { ProductInfoDetailsComponent } from './product-info-details/product-info-details.component';
import { ProductInfoDisplayComponent } from './product-info-display/product-info-display.component';
import { ProductDetailsComponent } from './product-info/product-details/product-details.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductSerialNumberModalComponent } from './product-serial-number-modal/product-serial-number-modal.component';
import { ProductSerialNumbersComponent } from './product-serial-numbers/product-serial-numbers.component';
import { ProductSubCategoriesComponent } from './product-sub-categories/product-sub-categories.component';
import { ProductReceiveReportComponent } from './product-transfer/product-receive-report/product-receive-report.component';
 
import { ProductReceivingInfoComponent } from './product-transfer/product-receiving-info/product-receiving-info.component';
import { ProductSendComponent } from './product-transfer/product-send/product-send.component';
import { ProductSendingInfoComponent } from './product-transfer/product-sending-info/product-sending-info.component';
import { ProductTransferComponent } from './product-transfer/product-transfer.component';
import { SendingReportV1Component } from './product-transfer/sending-report-v1/sending-report-v1.component';
import { SendingReportV2Component } from './product-transfer/sending-report-v2/sending-report-v2.component';
import { QrcodeGeneratorComponent } from './qrcode-generator/qrcode-generator.component';
import { RemovePurchaseStockComponent } from './remove-purchase-stock/remove-purchase-stock.component';
import { RepairPrintV2Component } from './Repair/repair-print-v2/repair-print-v2.component';
import { RepairPrintV3Component } from './Repair/repair-print-v3/repair-print-v3.component';
import { RepairRequestDisplayComponent } from './Repair/repair-request-display/repair-request-display.component';
import { RepairRequestComponent } from './Repair/repair-request/repair-request.component';
import { AlermingProductComponent } from './Report/alerming-product/alerming-product.component';
import { CustomerLedgerV2Component } from './Report/customer-ledger-v2/customer-ledger-v2.component';
import { CustomerLedgerComponent } from './Report/customer-ledger/customer-ledger.component';
import { InvoicePrintV2Component } from './Report/invoice-print-v2/invoice-print-v2.component';
import { InvoicePrintV3Component } from './Report/invoice-print-v3/invoice-print-v3.component';
import { PayableDueComponent } from './Report/payable-due/payable-due.component';
import { PaymentReceiveableComponent } from './Report/payment-receiveable/payment-receiveable.component';
import { ProductDamageReportComponent } from './Report/product-damage-report/product-damage-report.component';
import { ProfitFromInvoiceComponent } from './Report/profit-from-invoice/profit-from-invoice.component';
import { ProfitWithSalseReturnComponent } from './Report/profit-with-salse-return/profit-with-salse-return.component';
import { PurchaseReportComponent } from './Report/purchase-report/purchase-report.component';
import { PurchaseReturnReportComponent } from './Report/purchase-return-report/purchase-return-report.component';
import { SalesReportComponent } from './Report/sales-report/sales-report.component';
import { SalesReturnReportComponent } from './Report/sales-return-report/sales-return-report.component';
import { SavingsWithPurchaseReturnComponent } from './Report/savings-with-purchase-return/savings-with-purchase-return.component';
import { ShowDamageproductSerialNumberComponent } from './Report/show-damageproduct-serial-number/show-damageproduct-serial-number.component';
import { SupplierLedgerV2Component } from './Report/supplier-ledger-v2/supplier-ledger-v2.component';
import { SupplierLedgerComponent } from './Report/supplier-ledger/supplier-ledger.component';
import { TotalProductamountComponent } from './Report/total-productamount/total-productamount.component';
import { SalesReturnListComponent } from './Sales/sales-return-list/sales-return-list.component';
import { SalesReturnPrintV2Component } from './Sales/sales-return-print-v2/sales-return-print-v2.component';
import { SalesReturnPrintV3Component } from './Sales/sales-return-print-v3/sales-return-print-v3.component';
import { SalesReturnPrintComponent } from './Sales/sales-return-print/sales-return-print.component';
import { SalesReturnComponent } from './Sales/sales-return/sales-return.component';
import { SalesSummaryComponent } from './Sales/sales-summary/sales-summary.component';
import { ShopEmpCmpltePrfleComponent } from './shop-emp-cmplte-prfle/shop-emp-cmplte-prfle.component';
import { ShopEmpDisplayComponent } from './shop-emp-display/shop-emp-display.component';
import { ShopEmpEditComponent } from './shop-emp-edit/shop-emp-edit.component';
import { ShopEmpComponent } from './shop-emp/shop-emp.component';
import { SignUpApprovalComponent } from './sign-up-approval/sign-up-approval.component';
import { SignUpByShopComponent } from './sign-up-by-shop/sign-up-by-shop.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StockInfoComponent } from './stock-info/stock-info.component';
import { SupplierShopDisplayComponent } from './supplier-shop-display/supplier-shop-display.component';
import { SupplierShopComponent } from './supplier-shop/supplier-shop.component';
import { EditMySupplierProfileComponent } from './Supplier/edit-my-supplier-profile/edit-my-supplier-profile.component';
import { MySupplierProfileComponent } from './Supplier/my-supplier-profile/my-supplier-profile.component';
import { SupplierProfileDisplayComponent } from './Supplier/supplier-profile-display/supplier-profile-display.component';
import { SupplierProfileComponent } from './Supplier/supplier-profile/supplier-profile.component';
import { CreateUnitComponent } from './Unit/create-unit/create-unit.component';
import { EditUnitComponent } from './Unit/edit-unit/edit-unit.component';
import { UnitInfoComponent } from './Unit/unit-info/unit-info.component';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { YourOthersShopDisplayComponent } from './your-others-shop-display/your-others-shop-display.component';
import { YourOthersShopComponent } from './your-others-shop/your-others-shop.component';
import { CoreModule } from '../@core/core.module';
import { AddProductCategoryComponent } from './product-categories/add-product-category/add-product-category.component';
import { AddProductSubCategoriesComponent } from './product-sub-categories/add-product-sub-categories/add-product-sub-categories.component';
import { SearchDropdownComponent } from './search-dropdown/search-dropdown.component';
import { PriceQuatationComponent } from './price-quatation/price-quatation.component';
import { CreatePriceQuatationComponent } from './price-quatation/create-price-quatation/create-price-quatation.component';
 
import { QutationReportComponent } from './price-quatation/qutation-report/qutation-report.component';
import { ProductUpdateV2Component } from './product-info/product-update-v2/product-update-v2.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EmailSystemComponent } from './email-system/email-system.component';
import { ReadEmailComponent } from './email-system/read-email/read-email.component';
import { ComposeEmailComponent } from './email-system/compose-email/compose-email.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { StockChartComponent } from './stock-info/stock-chart/stock-chart.component';

import { RecieveProductComponent } from './product-transfer/recieve-product/recieve-product.component';
import { RecieveInvoiceFromCmpnyComponent } from './recieve-invoice-from-cmpny/recieve-invoice-from-cmpny.component';
import { RecievePurchaseComponent } from './Perchase/recieve-purchase/recieve-purchase.component';
import { DailyReportComponent } from './Report/daily-report/daily-report.component';
import { AccountChartComponent } from './Charts/account-chart/account-chart.component';
import { EComInvoiceComponent } from './e-com-invoice/e-com-invoice.component';
import { UserMenuMngmntComponent } from './user-menu-mngmnt/user-menu-mngmnt.component';
import { BestSellingProductComponent } from './best-selling-product/best-selling-product.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BulkProductEntryComponent } from './product-info/bulk-product-entry/bulk-product-entry.component';
import { EComSettingComponent } from './e-com-setting/e-com-setting.component';
import { PurchaseDetailsComponent } from './Perchase/purchase-details/purchase-details.component';
//import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    InventoryComponent,
    DashboardComponent,
   // MatConfirmDialogComponent,
    ProductCategoriesComponent,
    ProductInfoComponent,
    StockInfoComponent,
    DailyInfoComponent,
    DailyIncomeExpanseComponent,
    DailySellsComponent,
    InvoiceDetailsComponent,
    InvoicDetailssComponent,
    MatConfirmDialogComponent,
    DeuPaymentDetailsComponent,
    MonthlyIncomeComponent,
    MonthlyExpanseComponent,
    ProductCategoriesComponent,
    ProductSubCategoriesComponent,
    ProductCategoriesComponent,
    InvoiceEntryComponent,
    InvoicPrintComponent,
    DailyExpanseCreatePageComponent,
    ProductEntryCreatePageComponent,
    PaymentComponent,
    DailyIncomeComponent,

    MonthlyIncomeDueComponent,
   // LoginComponent,
    SignUpComponent,
    SignUpByShopComponent,
    ShopEmpComponent,
    SupplierProfileComponent,
    SupplierShopComponent,
    ProductInfoDisplayComponent,
    ShopEmpDisplayComponent,
    SupplierProfileDisplayComponent,
    SupplierShopDisplayComponent,
    YourOthersShopComponent,
    YourOthersShopDisplayComponent,
    MySupplierProfileComponent,
    MyCustomerComponent,
    CustomerProfileComponent,
    CustomerDisplayComponent,
    ShopEmpCmpltePrfleComponent,
    HrProfileComponent,
    MyHrProfileComponent,
    MyHrProfileDisplayComponent,
    CreateUnitComponent,
    EditUnitComponent,
    UnitInfoComponent,
    ProductEntryEditPageComponent,
    AddPurchaseStockComponent,
    NewPurchaseComponent,
    PurchaseReturnListComponent,
    PurchaseReturnComponent,
    SalesReturnComponent,
    SalesReturnListComponent,
    UploadImagesComponent,
    PurchaseInfoComponent,
    PurchaseDuePaymentDetlsComponent,
    PurchasePaymentComponent,
    ProductInfoDetailsComponent,
    RemovePurchaseStockComponent,
    InvoiceEditComponent,
    
    ItemCardComponent,
    CustomerOrderDisplayComponent,
    SalesReturnPrintComponent,
    PurchaseReturnPrintComponent,
    PurchasePrintComponent,
    ShopEmpEditComponent,
    EditMyCustomerComponent,
    EditMyCustomerComponent,
    EditMySupplierProfileComponent,
    EditMyHrProfileComponent,
    SalesSummaryComponent,
    PurchaseSummaryComponent,
    MoneyRecitDisplayComponent,
    MoneyRecitPurchaseComponent,
    SalesReportComponent,
    ProductSerialNumbersComponent,
    ProductSerialNumberModalComponent,
    ProfitFromInvoiceComponent,
    AlermingProductComponent,
    RepairRequestComponent,
    RepairRequestDisplayComponent,
    InvoiceProductDetailsComponent,
    SerialDetailsFromInvoiceComponent,
    MoneyRecitByInvoiceComponent,
    ProductTransferComponent,
    ProductSendComponent,
    ProductSendingInfoComponent,
    ProductReceivingInfoComponent,
    InvoicePrintV2Component,
    InvoicePrintV3Component,
    SalesReturnPrintV2Component,
    SalesReturnPrintV3Component,
    PurchasePrintV2Component,
    PurchasePrintV3Component,
    PurchaseReturnPrintV2Component,
    PurchaseReturnPrintV3Component,
    RepairPrintV2Component,
    RepairPrintV3Component,
    SendingReportV1Component,
    SendingReportV2Component,
    CustomerOrderReportV1Component,
    CustomerOrderReportV2Component,
    MoneyRecitByInvoice2Component,
    MoneyRecitDisplayv2Component,
    MoneyRecitPuchaseV2Component,
    PurchaseReportComponent,
    PaymentReceiveableComponent,
    PayableDueComponent,
    CustomerLedgerComponent,
    SupplierLedgerComponent,
    ProductDamageReportComponent,
    ShowDamageproductSerialNumberComponent,
    QrcodeGeneratorComponent,
    BarcodeGeneratorComponent,
    ProductReceiveReportComponent,
    SalesReturnReportComponent,
    PurchaseReturnReportComponent,
    ProfitWithSalseReturnComponent,
    SavingsWithPurchaseReturnComponent,
  
    CustomerLedgerV2Component,
    SupplierLedgerV2Component,
    ProductDetailsComponent,
    TotalProductamountComponent,
    SignUpApprovalComponent,
    AddProductCategoryComponent,
    AddProductSubCategoriesComponent,
    SearchDropdownComponent,
    PriceQuatationComponent,
    CreatePriceQuatationComponent,
   
    QutationReportComponent,
   
    ProductUpdateV2Component,
   
    UserProfileComponent,
   
    EmailSystemComponent,
   
    ReadEmailComponent,
   
    ComposeEmailComponent,
   
    StockChartComponent,
    
    RecieveProductComponent,
   
    RecieveInvoiceFromCmpnyComponent,
   
    RecievePurchaseComponent,
   
    DailyReportComponent,
   
    AccountChartComponent,
   
    EComInvoiceComponent,
   
    UserMenuMngmntComponent,
   
    BestSellingProductComponent,
   
    ChangePasswordComponent,
   
    BulkProductEntryComponent,
   
    EComSettingComponent,
   
    PurchaseDetailsComponent
     
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule 
    ,
    NgxPaginationModule,

    HttpClientModule,
    CommonModule,
    FormsModule,
   
   // ThemeModule,
    NbCardModule,
  //  NbUserModule,
   // NbButtonModule,
  //  NbTabsetModule,
  //  NbActionsModule,
   // NbRadioModule,
    //NbSelectModule,
   // NbListModule,
  //  NbIconModule,
    
   // NbInputModule,
   // NbTreeGridModule,
    
   // NbDialogModule.forChild(),
  //  NbWindowModule.forChild(),
  //  NbCheckboxModule,
  //  NbPopoverModule,
    //NbTooltipModule,
     
    //metarial
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    DataTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSortModule,
    MatSelectModule,
    //MatCardModule,
    
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,

    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireDatabaseModule,
    // AngularFireAuthModule,
    // AngularFireStorageModule,
    NgxPrintModule, 
    NbDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatBadgeModule,

    // MatAutocompleteModule,
    // MatBadgeModule,
    // MatBottomSheetModule,
     MatButtonModule,
    // MatButtonToggleModule,
    // MatCardModule,
     MatCheckboxModule,
    // MatChipsModule,
     MatCommonModule,
     MatDatepickerModule,
    // MatDialogModule,
     MatDividerModule,
    // MatExpansionModule,
    // MatFormFieldModule,
    // MatGridListModule,
    // MatIconModule,
    // MatInputModule,
    // MatLineModule,
    // MatListModule,
    // MatMenuModule,
    // MatNativeDateModule,
     MatOptionModule,
    MatPaginatorModule,
    // MatProgressBarModule,
     MatProgressSpinnerModule,
     
    // MatPseudoCheckboxModule,
    // MatRadioModule,
    // MatRippleModule,
     MatSelectModule,
    // MatSidenavModule,
    // MatSliderModule,
    // MatSlideToggleModule,
 
    // MatSortModule,
    // MatStepperModule,
    // MatTabsModule,
     MatTableModule,
     MatToolbarModule,
     MatTooltipModule,
     MatTreeModule,
    //FlexLayoutModule
   // PagesRoutingModule,
    //ThemeModule,
   // NbMenuModule,
   // DashboardModule,
    //ECommerceModule,
  //  FormsModule,
 //   NbCardModule,
    MatCardModule,
   MatAutocompleteModule,
   

    NgxQRCodeModule,
    NgxBarcode6Module,

  
  ],
  providers:[
    MatDialogService,
    //NbToastrService
  //AngularFireModule,
  //   AngularFireDatabaseModule,AngularFireAuthModule,
  // AngularFireStorage
  // AngularFirestore
    
  ],
  entryComponents:[
    MatConfirmDialogComponent,
    ProductSerialNumberModalComponent,
    InvoiceProductDetailsComponent,
    SerialDetailsFromInvoiceComponent,
    ShowDamageproductSerialNumberComponent,
    ProductDetailsComponent ,
    ProductSerialNumbersComponent,
    ProductUpdateV2Component,
    UploadImagesComponent
  ] 
})
export class InventoryModule { }
