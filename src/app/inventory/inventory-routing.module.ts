import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
 
import { AddPurchaseStockComponent } from './add-purchase-stock/add-purchase-stock.component';
import { BarcodeGeneratorComponent } from './barcode-generator/barcode-generator.component';
import { AccountChartComponent } from './Charts/account-chart/account-chart.component';
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
import { DailySellsComponent } from './daily-sells/daily-sells.component';
import { DeuPaymentDetailsComponent } from './deu-payment-details/deu-payment-details.component';
 
import { ComposeEmailComponent } from './email-system/compose-email/compose-email.component';
import { EmailSystemComponent } from './email-system/email-system.component';
import { EditMyHrProfileComponent } from './Hrm/edit-my-hr-profile/edit-my-hr-profile.component';
import { MyHrProfileDisplayComponent } from './Hrm/my-hr-profile-display/my-hr-profile-display.component';
import { MyHrProfileComponent } from './Hrm/my-hr-profile/my-hr-profile.component';
 
import { InventoryComponent } from './inventory.component';
import { InvoicDetailssComponent } from './invoic-detailss/invoic-detailss.component';
import { InvoicPrintComponent } from './invoic-print/invoic-print.component';
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
import { RecievePurchaseComponent } from './Perchase/recieve-purchase/recieve-purchase.component';
import { CreatePriceQuatationComponent } from './price-quatation/create-price-quatation/create-price-quatation.component';
import { PriceQuatationComponent } from './price-quatation/price-quatation.component';
import { QutationReportComponent } from './price-quatation/qutation-report/qutation-report.component';
import { AddProductCategoryComponent } from './product-categories/add-product-category/add-product-category.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductEntryCreatePageComponent } from './product-entry-create-page/product-entry-create-page.component';
import { ProductEntryEditPageComponent } from './product-entry-edit-page/product-entry-edit-page.component';
import { ProductInfoDetailsComponent } from './product-info-details/product-info-details.component';
import { ProductInfoDisplayComponent } from './product-info-display/product-info-display.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductUpdateV2Component } from './product-info/product-update-v2/product-update-v2.component';
import { ProductSerialNumbersComponent } from './product-serial-numbers/product-serial-numbers.component';
import { AddProductSubCategoriesComponent } from './product-sub-categories/add-product-sub-categories/add-product-sub-categories.component';
import { ProductSubCategoriesComponent } from './product-sub-categories/product-sub-categories.component';
import { ProductReceiveReportComponent } from './product-transfer/product-receive-report/product-receive-report.component';
 
import { ProductReceivingInfoComponent } from './product-transfer/product-receiving-info/product-receiving-info.component';
import { ProductSendComponent } from './product-transfer/product-send/product-send.component';
import { ProductSendingInfoComponent } from './product-transfer/product-sending-info/product-sending-info.component';
import { RecieveProductComponent } from './product-transfer/recieve-product/recieve-product.component';
import { SendingReportV1Component } from './product-transfer/sending-report-v1/sending-report-v1.component';
import { SendingReportV2Component } from './product-transfer/sending-report-v2/sending-report-v2.component';
import { QrcodeGeneratorComponent } from './qrcode-generator/qrcode-generator.component';
import { RecieveInvoiceFromCmpnyComponent } from './recieve-invoice-from-cmpny/recieve-invoice-from-cmpny.component';
import { RemovePurchaseStockComponent } from './remove-purchase-stock/remove-purchase-stock.component';
import { RepairPrintV2Component } from './Repair/repair-print-v2/repair-print-v2.component';
import { RepairPrintV3Component } from './Repair/repair-print-v3/repair-print-v3.component';
import { RepairRequestDisplayComponent } from './Repair/repair-request-display/repair-request-display.component';
import { RepairRequestComponent } from './Repair/repair-request/repair-request.component';
import { AlermingProductComponent } from './Report/alerming-product/alerming-product.component';
import { CustomerLedgerV2Component } from './Report/customer-ledger-v2/customer-ledger-v2.component';
import { CustomerLedgerComponent } from './Report/customer-ledger/customer-ledger.component';
import { DailyReportComponent } from './Report/daily-report/daily-report.component';
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
import { StockChartComponent } from './stock-info/stock-chart/stock-chart.component';
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
import { UserProfileComponent } from './user-profile/user-profile.component';
import { YourOthersShopDisplayComponent } from './your-others-shop-display/your-others-shop-display.component';
import { YourOthersShopComponent } from './your-others-shop/your-others-shop.component';
import { EComInvoiceComponent } from './e-com-invoice/e-com-invoice.component';
import { UserMenuMngmntComponent } from './user-menu-mngmnt/user-menu-mngmnt.component';
import { BestSellingProductComponent } from './best-selling-product/best-selling-product.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BulkProductEntryComponent } from './product-info/bulk-product-entry/bulk-product-entry.component';
import { EComSettingComponent } from './e-com-setting/e-com-setting.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { PurchaseInvoiceDetailsService } from './Perchase/purchase-invoice-details.service';
import { PurchaseDetailsComponent } from './Perchase/purchase-details/purchase-details.component';

const routes: Routes = [
  {
      path: '',
      component: InventoryComponent,
      children: [
        {
          path: 'dasboard',
          component: DashboardComponent,
        },
        {
          path: 'daily-Expense',
          component:DailyIncomeExpanseComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path: 'daily-Expense-create',
          component:DailyExpanseCreatePageComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path: 'daily-Expense-create/:key',
          component:DailyExpanseCreatePageComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path: 'daily-sells',
          component:DailySellsComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path: 'daily-income',
          component:DailyIncomeComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        { 
          path: 'product-info',
          component:ProductInfoComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path: 'product-info-create',
          component:ProductEntryCreatePageComponent,
         // canActivate:[LiveShopGurdGuard]
        },
       
        {
          path: 'product-info-create/:key',
          component:ProductEntryEditPageComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path: 'stock-info',
          component:StockInfoComponent,
        //  canActivate:[LiveShopGurdGuard]
        },
        {
          path: 'Invoice-Details',
          component:InvoicDetailssComponent,
       //   canActivate:[LiveShopGurdGuard]
        },{
          path: 'Invoice-entry',
          component:InvoiceEntryComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path: 'Invoice-print/:key',
          component:InvoicPrintComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path: 'Quotation-print/:key',
          component:QutationReportComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path: 'Quotation-List',
          component:PriceQuatationComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path: 'Deu-Payment-Details',
          component:DeuPaymentDetailsComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path: 'payment/:key',
          component:PaymentComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        
        {
          path: 'Monthly-income',
          component:MonthlyIncomeComponent,
        //  canActivate:[LiveShopGurdGuard]
        },
        {
          path: 'Monthly-income-due',
          component:MonthlyIncomeDueComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path: 'Monthly-Expanse',
          component:MonthlyExpanseComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path: 'Product-categories',
          component:ProductCategoriesComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path: 'add-Product-category/:key',
          component:AddProductCategoryComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path: 'Product-sub-categories',
          component:ProductSubCategoriesComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path: 'add-Product-sub-categories/:key',
          component:AddProductSubCategoriesComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path: 'sign-up',
          component:SignUpComponent,
        },
        {
          path: 'sign-up-by-shop',
          component:SignUpByShopComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'create-shop-emp',
          component:ShopEmpComponent,
          //canActivate:[LiveShopGurdGuard]
        },{
          path:'supplier-profile',
          component:SupplierProfileComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'supplier-Shop',
          component:SupplierShopComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'product-display/:phone',
          component:ProductInfoDisplayComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'shop-emp-display',
          component:ShopEmpDisplayComponent,
        //  canActivate:[LiveShopGurdGuard]
        },{
          path:'supplier-profile-display',
          component:SupplierProfileDisplayComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'supplier-shop-display',
          component:SupplierShopDisplayComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'your-others-shops-display',
          component:YourOthersShopDisplayComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'create-others-shop',
          component:YourOthersShopComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'my-supplier-profile',
          component:MySupplierProfileComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'my-customer',
          component:MyCustomerComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'customer-display',
          component:CustomerDisplayComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'complete-customer-profile',
          component:CustomerProfileComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'complete-Emp-profile',
          component:ShopEmpCmpltePrfleComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'my-hr-profile',
          component:MyHrProfileComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'unit-info',
          component:UnitInfoComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'edit-unit/:id',
          component:EditUnitComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'create-unit',
          component:CreateUnitComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'my-hr-profile-display',
          component:MyHrProfileDisplayComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'add-purchase',
          component:AddPurchaseStockComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'new-purchase',
          component:NewPurchaseComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'Recieve-purchase/:key',
          component:RecievePurchaseComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'purchase-return-list',
          component:PurchaseReturnListComponent,
          //canActivate:[LiveShopGurdGuard]
        },
        {
          path:'purchase-return',
          component:PurchaseReturnComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'sales-return',
          component:SalesReturnComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'sales-return-list',
          component:SalesReturnListComponent,
          //canActivate:[LiveShopGurdGuard]
        },
        {
          path:'upload-image',
          component:UploadImagesComponent,
        //  canActivate:[LiveShopGurdGuard]
        },
        {
          path:'purchase-info',
          component:PurchaseInfoComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'purchase-due-payment-detls',
          component:PurchaseDuePaymentDetlsComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'purchase-payment/:key',
          component:PurchasePaymentComponent,
          //canActivate:[LiveShopGurdGuard]
        },
        {
          path:'product-info-Details/:cmny/:key',
          component:ProductInfoDetailsComponent,
         //canActivate:[LiveShopGurdGuard]
        },
        {
          path:'remove-purchase-stock',
          component:RemovePurchaseStockComponent,
         // canActivate:[LiveShopGurdGuard]
        },
        {
          path:'invoice-edit/:key',
          component:InvoiceEditComponent,
          //canActivate:[LiveShopGurdGuard]
        },
        
         
        {
          path:'item-card',
          component:ItemCardComponent
        },
        {
          path:'customer-order-display',
          component:CustomerOrderDisplayComponent
        },
        {
          path: 'salesReturn-print/:key',
          component:SalesReturnPrintComponent 
        },
        {
          path: 'purchase-print/:key',
          component:PurchasePrintComponent 
        },
        {
          path: 'purchaseReturn-print/:key',
          component:PurchaseReturnPrintComponent 
        },
        {
          path: 'edit-customer/:key',
          component:EditMyCustomerComponent 
        },
        {
          path: 'shop-emp-edit/:key',
          component:ShopEmpEditComponent 
        },
        {
          path: 'edit-supplier/:key',
          component:EditMySupplierProfileComponent 
        },
        {
          path: 'edit-hr-profile/:key',
          component:EditMyHrProfileComponent 
        },
        {
          path: 'sales-summry',
          component:SalesSummaryComponent 
        },
        {
          path: 'purchase-summry',
          component:PurchaseSummaryComponent 
        },
        {
          path: 'money-recit/:key',
          component:MoneyRecitDisplayComponent 
        },
        {
          path: 'money-recit-by-invoice/:key',
          component:MoneyRecitByInvoiceComponent 
        },
        {
          path: 'money-recit-purchase/:key',
          component:MoneyRecitPurchaseComponent 
        },
        {
          path: 'sales-report',
          component:SalesReportComponent 
        },
        {
          path: 'serial-number/:key',
          component:ProductSerialNumbersComponent 
        },
        {
          path: 'profit-from-invoice',
          component:ProfitFromInvoiceComponent 
        },
        {
          path: 'alerming-product',
          component:AlermingProductComponent 
        },
        
        {
          path: 'Repair-Request',
          component:RepairRequestComponent 
        },
         
        {
          path: 'repair-summary',
          component:RepairRequestDisplayComponent 
        },
        {
          path: 'Product-send',
          component:ProductSendComponent 
        },
     
        {
          path: 'product-sending-list',
          component:ProductSendingInfoComponent 
        },
        {
          path: 'product-receiving-list',
          component:ProductReceivingInfoComponent 
        },
        {
          path: 'invoice-print-v2/:key',
          component:InvoicePrintV2Component 
        },
        {
          path: 'invoice-print-v3/:key',
          component:InvoicePrintV3Component 
        },
        {
          path: 'sales-return-print-v2/:key',
          component:SalesReturnPrintV2Component 
        },
        {
          path: 'sales-return-print-v3/:key',
          component:SalesReturnPrintV3Component 
        },
        
        {
          path: 'purchase-print-v2/:key',
          component:PurchasePrintV2Component 
        },
        {
          path: 'recieve/:key',
          component:RecieveProductComponent 
        },
        
        {
          path: 'purchase-print-v3/:key',
          component:PurchasePrintV3Component 
        },
        {
          path: 'purchase-return-print-v2/:key',
          component:PurchaseReturnPrintV2Component 
        },
        
        {
          path: 'purchase-return-print-v3/:key',
          component:PurchaseReturnPrintV3Component 
        },
        {
          path: 'repair-print-v2/:key',
          component:RepairPrintV2Component 
        },
        
        {
          path: 'repair-print-v3/:key',
          component:RepairPrintV3Component 
        },
         
        {
          path: 'sending-report-v1/:key',
          component:SendingReportV1Component 
        },
        
        {
          path: 'sending-report-v3/:key',
          component:SendingReportV2Component 
        },
        {
          path: 'customer-order-v1/:key',
          component:CustomerOrderReportV1Component 
        },
        
        {
          path: 'customer-order-v2/:key',
          component:CustomerOrderReportV2Component 
        },
        {
          path: 'money-recit-invoice-v2/:key',
          component:MoneyRecitByInvoice2Component 
        },
        
        {
          path: 'money-recit-display-v2/:key',
          component:MoneyRecitDisplayv2Component 
        },
        {
          path: 'money-recit-puchase-v2/:key/:invNo',
          component:MoneyRecitPuchaseV2Component 
        },
        {
          path: 'purchase-report',
          component:PurchaseReportComponent 
        },
        {
          path: 'payment-receivable',
          component:PaymentReceiveableComponent 
        },
        {
          path: 'payable-due',
          component:PayableDueComponent 
        },
        {
          path: 'customer-ledger',
          component:CustomerLedgerComponent 
        },
        {
          path: 'supplier-ledger',
          component:SupplierLedgerComponent 
        },
        {
          path: 'product-damage-report',
          component:ProductDamageReportComponent 
        },
        {
          path: 'QR-code/:key',
          component:QrcodeGeneratorComponent 
        },
        {
          path: 'bar-code/:key',
          component:BarcodeGeneratorComponent 
        },
        {
          path: 'product-receive-report/:key',
          component:ProductReceiveReportComponent 
        },
        {
          path: 'sales-return-report',
          component:SalesReturnReportComponent 
        },
        {
          path: 'purchase-return-report',
          component:PurchaseReturnReportComponent 
        },
        
        {
          path: 'profit-with-sales-return',
          component:ProfitWithSalseReturnComponent 
        },
        {
          path: 'savings-with-purchase-return',
          component:SavingsWithPurchaseReturnComponent 
        },
      
       
        {
          path: 'customer-ledger-v2',
          component:CustomerLedgerV2Component 
        },
        {
          path: 'supplier-ledger-v2',
          component:SupplierLedgerV2Component 
        },
        {
          path: 'total-product-amount',
          component:TotalProductamountComponent 
        },
        {
          path: 'price-qutation',
          component:CreatePriceQuatationComponent 
        }, 
        {
          path: 'user-profile',
          component:UserProfileComponent 
        }, 
        {
          path: 'inbox',
          component:EmailSystemComponent 
        }, 
        {
          path: 'compose-email',
          component:ComposeEmailComponent 
        }, 
        {
          path: 'appr',
          component:SignUpApprovalComponent 
        },
        {
          path: 'stock-chart',
          component:StockChartComponent 
        },
         
        {
          path: 'Recieve-Inv-From-Cmpny',
          component:RecieveInvoiceFromCmpnyComponent 
        },
        {
          path: 'daily-report/:date1/:date2',
          component:DailyReportComponent 
        },
        {
          path: 'account-chart',
          component:AccountChartComponent 
        },
        {
          path: 'e-com-invoice/:key',
          component: EComInvoiceComponent,
        },
        {
          path: 'Menu-Mangement',
          component: UserMenuMngmntComponent,
        },
        {
          path: 'best-selling-product',
          component: BestSellingProductComponent,
        },
        {
          path: 'change-passord',
          component: ChangePasswordComponent,
        },
        {
          path: 'bulk-product-entry',
          component: BulkProductEntryComponent,
        },
        {
          path: 'E-Settings',
          component: EComSettingComponent,
        },
        {
          path: 'order-invoice/:key',
          component: InvoiceDetailsComponent,
        },
        {
          path: 'purchase-invoice/:key',
          component: PurchaseDetailsComponent,
        },
        {
          path: '',
          redirectTo: 'dasboard',
          pathMatch: 'full',
        }
      ] 
      
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
