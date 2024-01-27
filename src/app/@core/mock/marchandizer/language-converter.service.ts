import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageConverterService {
unitEntry:any;
UnitInfo:any;
productEntry:any;
stockInfo:any;
InvoiceEntry:any;
SalesReturnInfo:any;
PurchaseRetureInfo:any;
UserInfo:any;
selectedLanguage:any='';
  languages=[
  {
    //0
    productEntryEnglish:
    {
      addSerial:'Add Serial',
      placeOrder:'Place Order',
      productEntryTitle:'Product Entry',
      productName:'Name/ Model',
      productCategory:'Category',
      subCategory:'Sub Category',
      OpeningQuantity:'Opening Quantity',
      AlertQuantity:'Alert Quantity',
      ImportedFrom:'Imported From',
      SellingPrice:'Selling Price',
      BuyingPrice:'Buying Price',
      UnitType:'Unit Type',
      BarCode:'Bar Code',
      LinktoSupplier:'Link to Supplier',
      ImageLink:'Image Link',
      Vatin:'Vat (in %)',
      VatAmount:'Vat Amount',
      Discount:'Discount(%)',
      DiscountAmount:'Discount Amount',
      Date:'Date',
      Remarks:'Remarks',
      Desc:'Descriptions',

      additionalDesc:'Additional Descriptions',
      shippingDay:'Shipping Details',
      brand:'Brand',
      color:'Color',
      size:'Size',
      previousCost:'Previous Cost',

      Required:'Required',
      Select:'Select',
      productDisplayHeader:'Product Info',
      productEditButtonOherEffect:'Edit Product',
      productDeleteButtonOherEffect:'Delete Product',
      productAddButtonOherEffect:'Add Product',
      productSearchEffect:'Search Here..',
      productSearchWordCancelEffect:'Cancel',
      ItemsPerpage:'Items Per Page',
      PresentStockQuantity:'Present Stock Quantity', 
      NewQuantity:'New Quantity', 
      RemovalQnty:'Removal Quantity', 
      ChooseProduct:'Choose Product',
      Save:'Save',
      Delete:'Delete',
      AddPurchaseItemtoStockHeading:'Add Purchase Item to Stock',
      RemovePurchaseItemtoStockHeading:'Do Adjust  Product Quantity to Stock',
      loadPurchaseItemtoStockHeading:'Load Product Quantity  For Adjust',
      BackButtonhoverEffect:'Back',
      Update:'Update', 
      serialNumber:'Serial Number',
      waranty:'Warranty',
      guaranty:'Guaranty',
      warrentyOrGurrenty:'Warranty/Guarente',

     supplierProfile:'Supplier Profile',
     supplierProfileEntry:'Supplier Profile Entry',
     supplierProfileUpdate:'Update Supplier Profile ',
     mobile:'Give Mobile No.',
     mobileRequired:'Mobile Number Is required',
     Name:'Name',
     nameRequird:'Name is Required.',
     OrganizationName:'Organization name',
     SelectCountry:'  Select Country',
     CountryRerquired:'Country is required',
     stateName:'Give Your State Name',
     addressLineOne:'Give Supplier Address Line One',
     addressLineOneRequird:'AddressLine One is required',
     addressLineTwo:'Give Supplier Address Line Two',
     selectType:'Select Type',
     typeRequird:'Type is required',
     deliveryOffDayName:'Delivery Off Day Name',
     email:'give your email',
     customerProfile:'Customer Profile',
     officeName:'Office Name',
     occupation:'Occupation',
     createShopEmp:'Create Shop Employee',
     password:'Password',
      
      passwordRequird:'Password is Required',
      designation:'Designation',
      hrProfile:'Employee Info',
      department:'Department',
      grade:'Grade',
      salary:'Salary',
      createAnAccount:'Create an account',
      signIn:'Sign In',
      remember:'Remember me',
      login:'Log in',
      logout:'Log out',
      signUp:'Sign Up',
      alreadymember:'I am already member',
      doubleClick:'Double Click',
      importedFrom:'Imported From'
    },
    productEntryBangla:
    {
      addSerial:'সিরিয়াল যোগ করুন',
      placeOrder:'অর্ডার করুন',
      productEntryTitle:'পণ্য প্রবেশ',
      productName:'নাম/মডেল',
      productCategory:'পণ্যের ধরন ',
      subCategory:'উপ ধরন',
      OpeningQuantity:'শুরুর পরিমান',
      AlertQuantity:'সর্বনিম্ন পরিমান',
      ImportedFrom:'কোথায় থেকে ইমপোর্টেড',
      SellingPrice:'বিক্রির দাম',
      BuyingPrice:'ক্রয়কৃত দাম',
      UnitType:'এককের ধরণ',
      BarCode:'বার কোড',
      LinktoSupplier :'সরবরাহকারী',
      ImageLink:'ছবির লিংক',
      Vatin:'ভ্যাট (শতকরা %)',
      VatAmount:'ভ্যাটের পরিমান ',
      Discount:'ছাড়(শতকরা %)',
      DiscountAmount:'ছাড়ের পরিমান',
      Date:'তারিখ',
      Remarks:'মন্তব্য',
      Desc:'বর্ণনা',
      additionalDesc:'অতিরিক্ত বর্ণনা',
      shippingDay:'শিপিং বিস্তারিত',
      brand:'ব্র্যান্ড',
      color:'রঙ',
      size:'আকার',
      previousCost:'আগের খরচ',
      

      Required:'দিতে হবে',
      Select:'নির্ধারণ করুন',
      productDisplayHeader:'পণ্যের তথ্য', 
      productEditButtonOherEffect:'পরিবর্তন করুন', 
      productDeleteButtonOherEffect:'বাদ দিন ', 
      productAddButtonOherEffect:'পণ্যের তথ্য যোগ করুন', 
      productSearchEffect:'পণ্যের তথ্য এখানে খুজুন... ', 
      productSearchWordCancelEffect:'মুছে ফেলুন  ', 
      ItemsPerpage:'প্রতি পেজ এর আইটেম সংখ্যা নির্ধারণ করুন', 
      PresentStockQuantity:'বর্তমান স্টকের পরিমান',
      NewQuantity:'নতুন পরিমান',  
      RemovalQnty:'অপসারণের পরিমান',
      ChooseProduct:'পণ্য পছন্দ করুন',  
      Save:'সংরক্ষণ করুন ',  
      Delete:'বাদ দিন করুন ',  
      AddPurchaseItemtoStockHeading:'স্টকে ক্রয় আইটেম যোগ করুন', 
      RemovePurchaseItemtoStockHeading:'স্টকে পণ্যের পরিমাণ সামঞ্জস্য করুন', 
      loadPurchaseItemtoStockHeading:'সামঞ্জস্যের জন্য পণ্যের পরিমাণ লোড করুন', 
      BackButtonhoverEffect:'পিছনে যান',  
      Update:'আপডেট করুন ',
      serialNumber:'ক্রমিক সংখ্যা',
      waranty:'ওয়ারেন্টি',
      guaranty:'গ্যারান্টি',
      warrentyOrGurrenty:'ওয়ারেন্টি/গ্যারান্টি',
      supplierProfile:'সরবরাহকারীর প্রোফাইল',
      supplierProfileEntry:'সরবরাহকারীর প্রোফাইল যোগ করুন',
     supplierProfileUpdate:'সরবরাহকারীর প্রোফাইল আপডেট করুন',
      mobile:'মোবাইল নম্বর দিন',
      mobileRequired:'মোবাইল নম্বর প্রয়োজন',
      Name:'নাম দেন',
      nameRequird:'নাম আবশ্যক.',
      OrganizationName:'সংগঠনের নাম দিন',
      SelectCountry:'দেশ নির্বাচন করুন',
      CountryRerquired:'দেশ নির্বাচন প্রয়োজন',
      stateName:'আপনার রাজ্যের নাম দিন',
      addressLineOne:'আপনার প্রাথমিক ঠিকানা দিন',
      addressLineOneRequird:'প্রাথমিক ঠিকানা প্রয়োজন',
      addressLineTwo:'আপনার ঠিকানা দিন (ঐচ্ছিক)',
      selectType:'প্রকার নির্বাচন করুন',
      typeRequird:'প্রকার প্রয়োজন',
      deliveryOffDayName:'ডেলিভারি অফ ডে নাম',
      email:'আপনার ইমেইল দিন',

      customerProfile:'ক্রেতা বিবরণ',
      officeName:'অফিসের নাম',
      occupation:'পেশা',
      createShopEmp:'দোকান কর্মচারী তৈরি করুন',
      password:'পাসওয়ার্ড',
      passwordRequird:'পাসওয়ার্ড প্রয়োজন',
      designation:'পদবি  ',
      hrProfile:'কর্মচারী তথ্য',
      department:'ডিপার্টমেন্ট',
      grade:'গ্রেড',
      salary:'বেতন',
      createAnAccount:'অ্যাকাউন্ট তৈরি করুন',
      signIn:'প্রবেশ করুন',
      remember:'মনে রাখুন',
      login:'লগ ইন',
      logout:'লগ আউট',
      signUp:'নিবন্ধন করুন',
      alreadymember:'আমি ইতিমধ্যে একজন ব্যবহারকারী',
      doubleClick:'ডবল ক্লিক করুন',
      importedFrom:'আমদানি'
     },
  },
  {//1
    unitEntryEnglish:{unitEntryTitle:'Unit Entry',Action:'Action',name:'Unit Name',SaveButton:'Submit',requiredMessage:'Unit Name is Required'},
    unitEntryBangla:{unitEntryTitle:'একক দিন',Action:'ক্লিক করুন',name:'এককের নাম',SaveButton:'সেভ',requiredMessage:'এককের নাম আবশ্যক'},
  },
  {//2
    unitInfoEnglish:{UnitInfo:'Unit Info',Action:'Action',SearchHere:'Search Here',UnitName:'Unit Name'},
    unitInfoBangla:{UnitInfo:'এককের তথ্য',Action:'ক্লিক করুন',SearchHere:'অনুসন্ধান করুন',UnitName:'এককের নাম'},
  },
  {
    //3
    stockInfoEnglish:{
      StockInfo:'Stock Info',
      alarmingProduct:'Alarming Product',
      search:'Search Here ..',
      productCategory:'Category',
      subCategory:'Sub Category',
      productName:'Product Name/Model',
      serialNumber:'Serial Number',
      inStock:'In Stock',
      unit:'Unit'
    },
    stockInfoBangla:{
      StockInfo:'স্টক এর তথ্য',
      alarmingProduct:'সংকটাপন্ন পণ্য',
      search:'এখানে খুজুন..',
      productCategory:'পণ্যের ধরন ',
      subCategory:'উপ ধরন',
      productName:'পণ্যের নাম/মডেল',
      serialNumber:'ক্রমিক সংখ্যা',
      inStock:'মজুদ আছে',
      unit:'একক'
    },
  },
  {
    //4
    InvoiceEntryEnglish:
    { 
      phone:'Your Phone No.',
      GiveYourAddressOne:'Give Your Address Line One',
      GiveYourAddressTwo:'Give Your Address Line Two (optional)',
      repairRequest:'Repair Request',
      CreateInvoice:'Create Invoice',
      CreateQuatation:'Create Quotation',
      printQuotation:'Print Quotation',
      CreateOrder:'Create Order',
      Details:'Invoice Details',
      CustomerMobile:'Customer Mobile',
      CompanyID:'Company ID',
      ClientName:'Client Name',
      CompanyName:'Company Name',
      entryDate:'Entry Date',
      Category:'Category',
      SubCategory:'Sub Category',
      ChooseProduct:'Choose Product',
      ChooseSerialNumber:'Choose Serial Number',
      AddNewCustomer:'Add New Customer',
      AddNewSupplier:'Add New Supplier',
      ProductName:'Product Name',
      Quantity:'Quantity',
      Unit:'Unit',
      Rate:'Rate',
      Amount:'Amount',
      Vatin:'Vat(%)',
      Discount:'Dis(%)',
      Action:'Action',
      More:'More',
      Refresh:'Refresh',
      Total:'Total',
      Vat:'Vat',
      Dis:'Discount',
      AdditionalDiscount:'Additional Discount',
      PreviousDue:'Previous Due',
      Receive:'Receive',
      TotalPayable:'Total Payable',
      CurrentDue:'Current Due',
      PrintMemo:'Print Invoice',
      Supplier:'Supplier',
      productSend:'Product Send',
      productReceive:'Product receive',
      salesBy:'Sales By',
      memoNo:'Memo No.',
      returnBy:'Return By',
      supplierNumber:'Supplier Mobile Number',
      supplierName:'Supplier Name',
      receivedBy:'Received By',
      sendBy:'Send By',
      orgName:'Organization Name',
      tagProduct:'Tag Product',
      payable:'Pay',
      repairIssue:'Repair Issue/Description'
    },
    InvoiceEntryBangla:
    {
      phone:'আপনার ফোন নং',
      GiveYourAddressOne:'আপনার ঠিকানা দিন',
      GiveYourAddressTwo:'আপনার ঠিকানা দিন (ঐচ্ছিক)',
      repairRequest:'মেরামতের অনুরোধ',
      CreateInvoice:'চালান তৈরি করুন',
      CreateQuatation:'উদ্ধৃতি তৈরি করুন',
      printQuotation:'প্রিন্ট কোটেশন',
      CreateOrder:'অর্ডার তৈরি করুন',
      Details:'চালান বিস্তারিত',
      CustomerMobile:'গ্রাহকের মোবাইল নম্বর',
      CompanyID:'কোম্পানি আইডি',
      ClientName:'ক্রেতার নাম',
      CompanyName:'কোমপানির নাম',
      Category:'ধরণ',
      SubCategory:'উপ- ধরণ',
      ChooseProduct:'পণ্য নির্বাচন করুন',
      ChooseSerialNumber:'ক্রমিক সংখ্যা নির্বাচন করুন',
      AddNewCustomer:'নতুন গ্রাহক যোগ করুন',
      AddNewSupplier:'নতুন সরবরাহকারী যোগ করুন',
      ProductName:'পণ্যের নাম',
      Quantity:'পরিমাণ',
      Unit:'একক',
      Rate:'দর',
      Amount:'অর্থ',
      Vatin:'ভ্যাট (%)',
      Discount:'ছাড়(%)',
      Action:'কর্ম',
      More:'আরও',
      Refresh:'রিফ্রেশ',
      Total:'মোট',
      Vat:'ভ্যাট',
      Dis:'ছাড়',
      AdditionalDiscount:'অতিরিক্ত ছাড়',
      PreviousDue:'আগের বকেয়া',
      Receive:'গৃহীত',
      TotalPayable:'মোট পাওনা',
      CurrentDue:'বর্তমান বাকি',
      PrintMemo:'প্রিন্ট মেমো',
      Supplier:'সরবরাহকারী ',
      productSend:'পণ্য পাঠান',
      productReceive:'পণ্য গ্রহণ',
      entryDate:'চালানের তারিখ',
      salesBy:'কে বিক্রি করেছে',
      memoNo:'মেমো নং',
      returnBy:'কে রিটার্ন নিয়েছে',
      supplierNumber:'সরবরাহকারীর মোবাইল নম্বর',
      supplierName:'সরবরাহকারী নাম',
      receivedBy:'গ্রহণকারী',
      sendBy:'কে পাঠাচ্ছে',
      orgName:'প্রতিষ্ঠানের নাম',
      tagProduct:'ট্যাগ পণ্য',
      payable:'প্রদেয়',
      repairIssue:'মেরামত সমস্যা/বর্ণনা'
    },
   
  },
  {
    //5
    SalesReturnDisplayEnglish:{
      customerLedger:'Customer Ledger',
      supplierLedger:'Supplier Ledger',
      RepairSummary:'Repair List',
     Date:'Date',

     ClientName:'Client Name',
     TotalAmount:'Total Amount',
     TotalItem:'Total Item',
     DueAmount:'Due Amount',
     PaidAmount:'Paid Amount',
     QuotationList:'Quotation List',
     QuotationNo:'Quotation No',
     AdditionalDiscount:'Additional Discount',
     SalesReturnList:'Sales Return List',
     SalesReturncreate :'Sales Return Create',
     PurchaseList:'Purchase List',
     SupplierName:'Supplier',
     MemoNo:'Memo No.' ,

     totalProfit:'Total Profit',
     totalSales:'Total Sales',
     totalPurchase:'Total Purchase',
     totalExpense:'Total expense',
     targetProfit:'Target Profit',
     totalPayableAmount:'Total Payable',
     totalPaidAmount:'Total Paid Amount',
     totalEarn:'Total Earn',
     totalDeuAmount:'Total Due Amount',
     specialDiscount:'Special Discount',
     tk:'.tk',
     dailySales:'Daily Sales',
     byDate:'By Date',
     search:'Search',
     profitFromInvoice:'Profit From Invoice',
     toDate:'To Date',
     fromDate:'From Date',
     totalProfitFromBuyingNSellingPrce:'Total Profit from Buying/Selling Price',
     profit:'Profit(BDT)',
     dailyincomDetails:'Daily Income Details',
     invoiceNo:'Invoice No',
     OrderNo:'Order NO',
     searchHeare:'Search Here',
     productDetails:'Product Details',
     duePaymentDetails:'Due Payment Details',
     mobile:'Mobile',
     pay:'Pay',
     orderDetails:'Order Details',
     dailypurchaseSummery:'Daily Purchase Summary',
     purchaseDuePaymentDetails:'Purchase Due Payment Details',
     productCategoryInfo:'Product Category Info',
     productCategoryDisplayPage:'Product Category List',
     alldeleteTootip:'Delete',
     allAddTootip:'Click For Add',
     allEditTootip:'Click For Edit',
     productCategoryEdit:'Edit Product Category Item',
     productCategoryRequired:'Product Name is Required!',
     productCategoryName:'Product Category Name',
     productSubCategoryName:'Product Sub Category Name',
     productSubCategoryInfo:'Product Sub Category Info',
    salesReturnReport:'Sales Return Report',
    totalReturn:'Total Return',
    returnReceive:'Return Receive',
    purchaseReturnReport:'Purchase Return Report',
    totalSavings:'Total Savings',
    ProfitwithSalesreturn:'Profit with Sales return',
    SavingsWithPurchaseReturn:'Savings With Purchase Return',
    totalAmountOfByingProduct:'Total Amount Of Bying Product',
    totalQty:'Total Quantity',
    required:' is Required!',
    Entry:'Entry'
    
  },
    SalesReturnDisplayBangla:{
      customerLedger:'গ্রাহকদের খাতা',
      supplierLedger:'সরবরাহকারী খাতা',
      RepairSummary:'মেরামতের তালিকা',
     Date:'তারিখ',
     QuotationList:'উদ্ধৃতি তালিকা',
     QuotationNo:'উদ্ধৃতি নং',
     ClientName:'ক্রেতার নাম',
     TotalAmount:'মোট টাকার পরিমান',
     TotalItem:'টোটাল আইটেম',
     DueAmount:'বাকির পরিমান',
     PaidAmount:'পরিশোধিত টাকার পরিমান',
     AdditionalDiscount:'অতিরিক্ত ছাড়',
     SalesReturnList:'বিক্রয় রিটার্ন তালিকা',
     SalesReturncreate:'বিক্রয় রিটার্ন তৈরি করুন',
     PurchaseList:'ক্রয় তালিকা',
     SupplierName:'সরবরাহকারী',
     MemoNo:'মেমো নং',

     totalProfit:'মোট লাভ',
     totalPayableAmount:'মোট প্রদেয়',
     totalSales:'মোট বিক্রয়',
     totalPurchase:'মোট ক্রয়',
     totalExpense:'সর্বমোট খরচ',
     targetProfit:'লাভ হবে',
     totalPaidAmount:'মোট পরিশোধিত টাকা',
     totalEarn:'মোট আয়',
     totalDeuAmount:'মোট বাকি',
     specialDiscount:'মোট ছাড়',
     tk:'.৳',
     dailySales:'দৈনিক বিক্রয়',
     byDate:'তারিখ দ্বারা অনুসন্ধান',
     search:'অনুসন্ধান করুন',
     profitFromInvoice:'বিক্রয় থেকে লাভ',
     toDate:'তারিখ হতে',
     fromDate:'তারিখ পর্যন্ত',
     totalProfitFromBuyingNSellingPrce:'ক্রয়/বিক্রয় মূল্য থেকে মোট লাভ',
     profit:'লাভ',
     dailyincomDetails:'দৈনিক আয়ের বিবরণ',
     invoiceNo:'চালান নং',
     OrderNo:'অর্ডার নম্বর',
     searchHeare:'এখানে অনুসন্ধান করুন',
     productDetails:'পণ্যের বিবরণ',
     duePaymentDetails:'বকেয়া পেমেন্টের বিবরণ',
     mobile:'মোবাইল নাম্বার',
     pay:'অর্থপ্রদান',
     orderDetails:'অর্ডার বিবরণ',
     dailypurchaseSummery:'দৈনিক ক্রয় সারাংশ',
     purchaseDuePaymentDetails:'ক্রয়ের বকেয়া পেমেন্ট বিবরণ',
     productCategoryInfo:'পণ্যের ধরণ যোগ করুন',
     productCategoryDisplayPage:'পণ্যের ধরণের তালিকা',
     alldeleteTootip:'মুছুন',
     allAddTootip:'যোগ করুন',
     allEditTootip:'পরিবর্তন করুন',
     productCategoryEdit:'পণ্যের ধরণ আপডেট করুন',
     productCategoryRequired:'পণ্যের নাম দিতে হবে!',
     productCategoryName:'পণ্যের ধরণের নাম',
     productSubCategoryName:'পণ্যের উপ-ধরণের নাম',
     productSubCategoryInfo:'পণ্য উপ-ধরণের তথ্য',
     salesReturnReport:'বিক্রয় রিটার্ন রিপোর্ট',
     totalReturn:'মোট রিটার্ন',
     returnReceive:'গৃহীত রিটার্ন',
     purchaseReturnReport:'ক্রয় রিটার্ন রিপোর্ট',
     totalSavings:'মোট সঞ্চয়',
     ProfitwithSalesreturn:'বিক্রয় রিটার্ন সহ লাভ',
    SavingsWithPurchaseReturn:'ক্রয় রিটার্ন থেকে সঞ্চয়',
    totalAmountOfByingProduct:'পণ্য কেনার মোট পরিমাণ',
    totalQty:'মোট পরিমাণ',
    required:' দিতে হবে!',
    Entry:'যোগ করুন'
    }
   
  },
  {
    PurchaseReturnListEnglish:{
      Date:'Date',
      ClientName:'Client Name',
      TotalAmount:'Total Amount',
      DueAmount:'Due Amount',
      PaidAmount:'Paid Amount',
      AdditionalDiscount:'Additional Discount',
      PurchaseReturnList:'Purchase Return List',
      PurchaseReturnCreate:'Purchase Return',
      supplierName:'Supplier',
      MemoNo:'Memo No.',
      productReveivingList:'Product Receiving List',
      productSendingList:'Product Sending List',
    },
    PurchaseReturnListBangla:{
      Date:'তারিখ',
      ClientName:'ক্রেতার নাম',
      TotalAmount:'সর্বমোট টাকার পরিমান',
      DueAmount:'বাকির পরিমান',
      PaidAmount:'পরিশোধিত টাকার পরিমান',
      AdditionalDiscount:'অতিরিক্ত ছাড়',
      PurchaseReturnList:'ক্রয় রিটার্ন তালিকা',
      PurchaseReturnCreate:'ক্রয় রিটার্ন তৈরি করুন',
      supplierName:'সরবরাহকারী',
      MemoNo:'মেমো নং',
      productReveivingList:'পণ্য প্রাপ্তির তালিকা',
      productSendingList:'পণ্য পাঠানোর তালিকা',
     
     
    }
  },
   {//7
    userInfoEnglish:{name:'Name',mobile:'Mobile',gmail:'Gmail',occupation:'Occupation',address1:'Address',Country:'Country',orgName:'org. Name',storeType:'Store Type'},
    userInfoBangla:{name:'নাম',mobile:'মোবাইল',gmail:'জিমেইল',occupation:'পেশা',address1:'ঠিকানা',Country:'দেশ',orgName:'প্রতিষ্ঠানের নাম',storeType:''},
  },
];
  
ECommerceMENU_ITEMS= [
  {
    title: 'Sales',
    icon: '#cart-1',
    children: [
      // {
      //   title: 'Pos Sale',
      //   link: '/d',
      // },
      {
        title: 'New Sale',
        link: '/inventory/Invoice-entry',
      },
      
      {
        title: 'Daily Sell',
        link: '/inventory/daily-sells',
      }, 
       
      {
        title: 'Daily Income',
        link: '/inventory/daily-income',
      },
	   {
        title: 'Invoice Details',
        link: '/inventory/Invoice-Details',
      } ,

      {
        title: 'Deu Payment Details',
        link: '/inventory/Deu-Payment-Details',
      },
      {
        title: 'Sales Return',
        link: '/inventory/sales-return',
      },
      {
        title: 'Sales Return List',
        link: '/inventory/sales-return-list',
      },
      {
        title: 'Customer Order Details',
        link: '/inventory/customer-order-display',
      }
      
    ],
  },
  {
    title: 'Purchase',
    icon: '#paper-stack-1',
    children: [
      {

        title: 'New Purchase',
        link: '/inventory/new-purchase',
      },
      {

        title: 'Purchase From Invoice',
        link: '/inventory/Recieve-Inv-From-Cmpny',
      },
    
      {

        title: 'Purchase Summary',
        link: '/inventory/purchase-summry',
      },
      
      {
        title: 'Purchase List',
        link: '/inventory/purchase-info',
      } 
      ,
      {
        title: 'Due Payment Details',
        link: '/inventory/purchase-due-payment-detls',
      },
      {
        title: 'Purchase Return',
        link: '/inventory/purchase-return',
      },
      {
        title: 'Purchase Return List',
        link: '/inventory/purchase-return-list',
      }
 
    ],
  },
  {
    title: 'Stock Info',
    icon: '#paper-stack-1',
    children: [
      {
        title: 'Stock Info',
        link: '/inventory/stock-info',
      },
      {
        title: 'Alerming Stock',
        link: '/inventory/alerming-product',
      },
      // {
      //   title: 'Stock Chart',
      //   link: '/inventory/stock-chart',
      // },
      {

        title: 'Add Item',
        link: '/inventory/add-purchase',
      },
      {

        title: 'Remove Item',
        link: '/inventory/remove-purchase-stock',
      },  
	  
    ],
  }
];
  ShopOwnerMENU_ITEMS= [
  // {
  //   title: 'Dashboard',
  //   icon: 'shopping-cart-outline',
  //   link: '/dashboard',
  //   home: true,
  // },
  // {
  //   title: 'IoT Dashboard',
  //   icon: 'home-outline',
  //   link: '/iot-dashboard',
  // },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  {
    title: 'Sales',
    icon: '#cart-1',
    children: [
      // {
      //   title: 'Pos Sale',
      //   link: '/d',
      // },
      {
        title: 'New Sale',
        link: '/inventory/Invoice-entry',
      },
      
      {
        title: 'Daily Sell',
        link: '/inventory/daily-sells',
      }, 
       
      {
        title: 'Daily Income',
        link: '/inventory/daily-income',
      },
      {
        title:'Best Selling Product',
       link:'/inventory/best-selling-product'
      },
	   {
        title: 'Invoice Details',
        link: '/inventory/Invoice-Details',
      } ,

      {
        title: 'Deu Payment Details',
        link: '/inventory/Deu-Payment-Details',
      },
      {
        title: 'Sales Return',
        link: '/inventory/sales-return',
      },
      {
        title: 'Sales Return List',
        link: '/inventory/sales-return-list',
      },
      {
        title: 'Customer Order Details',
        link: '/inventory/customer-order-display',
      }
      
    ],
  },
  {
    title: 'Purchase',
    icon: '#paper-stack-1',
    children: [
      {

        title: 'New Purchase',
        link: '/inventory/new-purchase',
      },
      {

        title: 'Purchase From Invoice',
        link: '/inventory/Recieve-Inv-From-Cmpny',
      },
    
      {

        title: 'Purchase Summary',
        link: '/inventory/purchase-summry',
      },
      
      {
        title: 'Purchase List',
        link: '/inventory/purchase-info',
      } 
      ,
      {
        title: 'Due Payment Details',
        link: '/inventory/purchase-due-payment-detls',
      },
      {
        title: 'Purchase Return',
        link: '/inventory/purchase-return',
      },
      {
        title: 'Purchase Return List',
        link: '/inventory/purchase-return-list',
      }
 
    ],
  },
  {
    title: 'Stock Info',
    icon: '#paper-stack-1',
    children: [
      {
        title: 'Stock Info',
        link: '/inventory/stock-info',
      },
      {
        title: 'Alerming Stock',
        link: '/inventory/alerming-product',
      },
      // {
      //   title: 'Stock Chart',
      //   link: '/inventory/stock-chart',
      // },
      {

        title: 'Add Item',
        link: '/inventory/add-purchase',
      },
      {

        title: 'Remove Item',
        link: '/inventory/remove-purchase-stock',
      },  
	  
    ],
  },
   
  {
    title: 'Price Quotation',
    icon: '#portfolio-grid-1',
    children: [
      {
        title: 'Create Price Quatation',
        link: '/inventory/price-qutation',
      },
      {
        title: 'Quotation List',
        link: '/inventory/Quotation-List',
      } 
    ],
  },
  {
    title: 'Repair',
    icon: '#portfolio-grid-1',
    children: [
      {

        title: 'Repair Request',
        link: '/inventory/Repair-Request',
      },
      {

        title: 'Repair Summary',
        link: '/inventory/repair-summary',
      },
     
    ],
  },
  {
    title: 'Products',
    icon: '#literature-1',
    children: [
      {
        title: 'Product Info',
        link:'/inventory/product-info'
      },
      // {
      //   title: 'E-comerce View',
      //   link:`/e-commerce`
      // },
      // {
      //   title:'Easy to Sale Stores',
      //   link:'/inventory/e-com-home'
      // },
      {
        title: 'Add Product',
        link: '/inventory/product-info-create',
      },
      {
        title: 'Bulk Product Entry',
        link: '/inventory/bulk-product-entry',
      } 
      ,
      {
        title: 'Product Categories',
        link: '/inventory/Product-categories',
      },
      {
        title: 'Product Sub Categories',
        link: '/inventory/Product-sub-categories',
      } 
      ,
      {
        title: 'Unit',
        link: '/inventory/unit-info',
      },
       
      {
        title: 'Product damage Report',
        link: '/inventory/product-damage-report',
      },
      {
        title:'total price & Quantity',
        link:'/inventory/total-product-amount'
      }
    ],
  },
  {
    title: 'Customer',
    icon: '#man-1',
    children: [
      {
        title: 'Customer Info',
        link: '/inventory/customer-display',
      } 
      ,
	   {
        title: 'Add Customer',
        link: '/inventory/my-customer',
      },
      {
        title: 'Customer Ledger',
        link: '/inventory/customer-ledger-v2',
      } 
      ,
    ],
  },
  {
    title: 'Supplier',
    icon: '#delivery-truck-1',
    children: [
      {
        title: 'Supplier Info',
        link:'/inventory/supplier-profile-display'
      },
      {
        title: 'Add Supplier',
        link: '/inventory/my-supplier-profile',
      } 
      ,
      {
        title: 'Supplier Ledger',
        link: '/inventory/supplier-ledger-v2',
      } ,
    ],
  },
  {
    title: 'User Management',
    icon: '#user-1',
    children: [
      {
        title: 'User Info',
        link:'/inventory/shop-emp-display'
      },
      {
        title: 'Add User',
        link: '/inventory/create-shop-emp',
      } ,
      {
        title: 'Menu Management',
        link: '/inventory/Menu-Mangement',
      } 
    ],
  },
  {
    title: 'Transfer & Receive',
    icon: '#tractor-1',
    children: [
      {
        title: 'Product send',
        link:'/inventory/Product-send'
      },
      
      {
        title: 'Product Sending List',
        link: '/inventory/product-sending-list',
      },
      {
        title: 'Product Receiving List',
        link: '/inventory/product-receiving-list',
      }  
 
    ],
  },
  {
    title: 'Employee Management',
    icon: '#pay-1',
    children: [
      { 
        title: 'Employee Info',
        link: '/inventory/my-hr-profile-display',
      },
      {
        title: 'Add Employee',
        link: '/inventory/my-hr-profile',
      } 
     
    ],
  },
  {
    title: 'Accounts',
    icon: '#ballpoint-pen-1',
    children: [
      // {
      //   title: 'Expense List',
      //   link: '/inventory/Monthly-Expanse',
      // } 
      // ,
	   {
        title: 'Accounts Ledger',
        link: '/inventory/daily-Expense',
      },
      {
        title: 'Accounts Chart',
        link: '/inventory/account-chart',
      },
      {
        title: 'Receiveable Due',
        link: '/inventory/payment-receivable',
      } ,
      {
        title: 'Payable Due',
        link: '/inventory/payable-due',
      },
      {
        title: 'Add Account Head',
        link: '/inventory/add-accntd-head',
      },
      // {
      //   title: 'Monthly sells Details',
      //   link: '/inventory/Monthly-income',
      // }
      // ,
      // {
      //   title: 'Monthly  Income and Due',
      //   link: '/inventory/Monthly-income-due',
      // }
     
    ],
  },
  {
    title: 'Report',
    icon: '#sales-up-1',
    children: [
       
      {
        title: 'Profit From Invoice',
        link: '/inventory/profit-from-invoice',
      },
      {
        title: 'Sales Report',
        link: '/inventory/sales-report',
      }  
      ,
      {
        title: 'Purchase Report',
        link: '/inventory/purchase-report',
      },
      {
        title: 'Sales Return Rport',
        link: '/inventory/sales-return-report',
      }
      ,
      {
        title: 'Purchase Return Report',
        link: '/inventory/purchase-return-report',
      },
      {
        title: 'Profit with Sales return',
        link: '/inventory/profit-with-sales-return',
      } ,
      {
        title: 'Savings With Purchase Return',
        link: '/inventory/savings-with-purchase-return',
      },
      
    ],
  },
  // {
  //   title: 'Your Shops',
  //   icon: '#stack-1',
  //   children: [
       
  //     {
  //       title:'Your Others Shops',
  //       link:'/inventory/your-others-shops-display'
  //    },
  //    {
  //     title:'Create Your Others Shop',
  //     link:'/inventory/create-others-shop'
  //  } 
     
  //   ],
  // },
  {
    title: 'Settings',
    icon: '#settings-1',
    children: [
      // {
      //   title: 'Complete Supplier Profile',
      //   link: '/inventory/supplier-profile',
      // },
      // {
      //   title: 'Complete Employee/User Profile',
      //   link: '/inventory/complete-Emp-profile',
      // },
      {
        title: 'Complete Shop Owner Profile',
        link: '/inventory/sign-up-by-shop',
      },
      // {
      //   title: 'Complete Customer Profile',
      //   link: '/inventory/complete-customer-profile',
      // },
      // {
      //   title: 'Image Upload',
      //   link: '/inventory/upload-image',
      // } 
     
    ],
  },{
    title: 'E-Commerce',
    icon: '#paper-plane-1',
    children: [
      {
        title: 'e-com home',
        link: '/e-commerce/home',
      },
      {
        title: 'E-Settings',
        link:'/inventory/E-Settings'
      }, 
    ],
  },
  {
    title: 'Auth',
    icon: '#unlocked-1',
    children: [
      {
        title: 'Login',
        link: '/login',
      },
      {
        title: 'Register',
        link: '/register',
      } 
      ,
      {
        title: 'Change Password',
        link: '/inventory/change-passord',
      } 
       
        
    ],
  },
  
];
//     ShopOwnerMENU_ITEMSBangla = [
//   // {
//   //   title: 'ড্যাশবোর্ড',
//   //   icon: 'shopping-cart-outline',
//   //   link: '/inventory/dashboard',
//   //   home: true,
//   // },
//   // {
//   //   title: 'IoT ড্যাশবোর্ড',
//   //   icon: 'home-outline',
//   //   link: '/inventory/iot-dashboard',
//   // },
//   // {
//   //   title: 'ফিচার',
//   //   group: true,
//   // },
//   {
//     title: 'বিক্রয়',
//     icon: '#cart-1',
//     children: [
//       // {
//       //   title: 'Pos Sale',
//       //   link: '/inventory/d',
//       // },
//       {
//         title: 'নতুন বিক্রয়',
//         link: '/inventory/Invoice-entry',
//       },
      
//       {
//         title: 'দৈনিক বিক্রি',
//         link: '/inventory/daily-sells',
//       }, 
       
//       {
//         title: 'দৈনিক আয়',
//         link: '/inventory/daily-income',
//       },
// 	   {
//         title: 'চালান বিস্তারিত',
//         link: '/inventory/Invoice-Details',
//       } ,
       
	   
//       {
//         title: 'বাকি  পেমেন্টের বিবরণ',
//         link: '/inventory/Deu-Payment-Details',
//       },
//       {
//         title: 'বিক্রয় রিটার্ন',
//         link: '/inventory/sales-return',
//       },
//       {
//         title: 'বিক্রয় রিটার্ন List',
//         link: '/inventory/sales-return-list',
//       },
//       {
//         title: 'গ্রাহকের অর্ডার বিবরণ',
//         link: '/inventory/customer-order-display',
//       }
      
//     ],
//   },
//   {
//     title: 'ক্রয়',
//     icon: '#paper-stack-1',
//     children: [
//       {

//         title: 'New ক্রয়',
//         link: '/inventory/new-purchase',
//       },
//       {

//         title: 'চালান থেকে ক্রয়',
//         link: '/inventory/Recieve-Inv-From-Cmpny',
//       },
//       {

//         title: 'ক্রয় Summary',
//         link: '/inventory/purchase-summry',
//       },
//       {
//         title: 'ক্রয় List',
//         link: '/inventory/purchase-info',
//       } 
//       ,
//       {
//         title: 'বকেয়া পেমেন্ট বিবরণ',
//         link: '/inventory/purchase-due-payment-detls',
//       },
//       {
//         title: 'ক্রয় রিটার্ন',
//         link: '/inventory/purchase-return',
//       },
//       {
//         title: 'ক্রয় রিটার্ন List',
//         link: '/inventory/purchase-return-list',
//       }
 
//     ],
//   },
//   {
//     title: 'স্টক',
//     icon: '#paper-stack-1',
//     children: [
//       {
//         title: 'স্টক এর তথ্য',
//         link: '/inventory/stock-info',
//       }
//       ,
//       {
//         title: 'সতর্ককারী পণ্য',
//         link: '/inventory/alerming-product',
//       },
//       // {
//       //   title: 'Stock Chart',
//       //   link: '/inventory/stock-chart',
//       // },
//       {

//         title: 'ক্রয় আইটেম যোগ করুন',
//         link: '/inventory/add-purchase',
//       },
//       {

//         title: 'Remove ক্রয় Item',
//         link: '/inventory/remove-purchase-stock',
//       },  
	   
     
//     ],
//   },
//   {
//     title: 'মূল্য উদ্ধৃতি',
//     icon: '#portfolio-grid-1',
//     children: [
//       {
//         title: 'মূল্য উদ্ধৃতি',
//         link: '/inventory/price-qutation',
//       },
//       {
//         title: 'উদ্ধৃতি তালিকা',
//         link: '/inventory/Quotation-List',
//       },
//     ],
//   },
//   {
//     title: 'মেরামত',
//     icon: '#portfolio-grid-1',
//     children: [
//       {

//         title: 'মেরামতের অনুরোধ',
//         link: '/inventory/Repair-Request',
//       },
//       {

//         title: 'মেরামতের Summary',
//         link: '/inventory/repair-summary',
//       },
     
//     ],
//   },
//   {
//     title: 'পণ্য',
//     icon: '#literature-1',
//     children: [
//       {
//         title: 'পণ্যের তথ্য',
//         link:'/inventory/product-info'
//       },
//       // {
//       //   title: 'E-comerce View',
//       //   link:`/e-commerce`
//       // },
//       // {
//       //   title:'Easy to Sale Stores',
//       //   link:'/inventory/e-com-home'
//       // },
//       {
//         title: 'পণ্য যোগ করুন',
//         link: '/inventory/product-info-create',
//       } 
//       ,
//       {
//         title: 'পণ্যের ধরন',
//         link: '/inventory/Product-categories',
//       },
//       {
//         title: 'পণ্যের উপ ধরন',
//         link: '/inventory/Product-sub-categories',
//       } 
//       ,
//       {
//         title: 'ইউনিট',
//         link: '/inventory/unit-info',
//       },{
//         title: 'পণ্যের ক্ষতির তালিকা',
//         link: '/inventory/product-damage-report',
//       },
//       {
//         title:'পণ্যের মোট ক্রয় মূল্য',
//         link:'/inventory/total-product-amount'
//       }
//     ],
//   },
//   {
//     title: 'ক্রেতা',
//     icon: '#man-1',
//     children: [
//       {
//         title: 'গ্রাহকদের তথ্য',
//         link: '/inventory/customer-display',
//       } 
//       ,
// 	   {
//         title: 'ক্রেতা  যোগ করুন',
//         link: '/inventory/my-customer',
//       },
//       {
//         title: 'গ্রাহকদের খাতা',
//         link: '/inventory/customer-ledger-v2',
//       } 
//       ,
//     ],
//   },
//   {
//     title: 'সরবরাহকারী',
//     icon: '#delivery-truck-1',
//     children: [
//       {
//         title: 'সরবরাহকারীর তথ্য',
//         link:'/inventory/supplier-profile-display'
//       },
//       {
//         title: 'সরবরাহকারী যোগ করুন',
//         link: '/inventory/my-supplier-profile',
//       } 
//      ,
//       {
//         title: 'সরবরাহকারী খাতা',
//         link: '/inventory/supplier-ledger-v2',
//       },
//     ],
//   },
//   {
//     title: 'ইউজার ম্যানেজমেন্ট',
//     icon: '#user-1',
//     children: [
//       {
//         title: 'ব্যবহারকারীর তথ্য',
//         link:'/inventory/shop-emp-display'
//       },
//       {
//         title: 'ব্যবহারকারী যোগ করুন',
//         link: '/inventory/create-shop-emp',
//       },
//       {
//         title: 'মেনু ব্যবস্থাপনা',
//         link: '/inventory/Menu-Mangement',
//       }  
     
//     ],
//   },
//   {
//     title: 'স্থানান্তর & গ্রহণ',
//     icon: '#tractor-1',
//     children: [
//       {
//         title: 'পণ্য পাঠান',
//         link:'/inventory/Product-send'
//       },
      
//       {
//         title: 'পণ্য পাঠানোর তালিকা',
//         link: '/inventory/product-sending-list',
//       },
//       {
//         title: 'পণ্য প্রাপ্তির তালিকা',
//         link: '/inventory/product-receiving-list',
//       }  
 
//     ],
//   },
//   {
//     title: 'কর্মচারী ব্যবস্থাপন',
//     icon: '#pay-1',
//     children: [
//       { 
//         title: 'কর্মচারী তথ্য',
//         link: '/inventory/my-hr-profile-display',
//       },
//       {
//         title: 'কর্মচারী যোগ করুন',
//         link: '/inventory/my-hr-profile',
//       } 
     
//     ],
//   },
//   {
//     title: 'হিসাব',
//     icon: '#ballpoint-pen-1',
//     children: [
//       // {
//       //   title: 'ব্যয়ের তালিকা',
//       //   link: '/inventory/Monthly-Expanse',
//       // } 
//       // ,
// 	   {
//         title: 'হিসাবের খাতা',
//         link: '/inventory/daily-Expense',
//       },
//       {
//         title: 'হিসাবের মানচিত্র',
//         link: '/inventory/account-chart',
//       },
//       {
//         title: 'প্রাপ্য বকেয়া',
//         link: '/inventory/payment-receivable',
//       },
//       {
//         title: 'প্রদেয় বকেয়া',
//         link: '/inventory/payable-due',
//       },
//       // {
//       //   title: 'মাসিক বিক্রির বিবরণ',
//       //   link: '/inventory/Monthly-income',
//       // }
//       // ,
//       // {
//       //   title: 'মাসিক আয় এবং বকেয়া',
//       //   link: '/inventory/Monthly-income-due',
//       // }
     
//     ],
//   },
//   {
//     title: 'রিপোর্ট',
//     icon: '#sales-up-1',
//     children: [
      
//       {
//         title: 'চালান থেকে লাভ',
//         link: '/inventory/profit-from-invoice',
//       },
     
//       {
//         title: 'বিক্রয় রিপোর্ট',
//         link: '/inventory/sales-report',
//       }  
//       ,
//       {
//         title: 'ক্রয় রিপোর্ট',
//         link: '/inventory/purchase-report',
//       },
//       {
//         title: 'বিক্রয় রিটার্ন রিপোর্ট',
//         link: '/inventory/sales-return-report',
//       }
//       ,
//       {
//         title: 'ক্রয় রিটার্ন রিপোর্ট',
//         link: '/inventory/purchase-return-report',
//       } 
//       ,
//       {
//         title: 'বিক্রয় রিটার্ন সহ লাভ',
//         link: '/inventory/profit-with-sales-return',
//       },
//       {
//         title: 'ক্রয় রিটার্ন থেকে সঞ্চয়',
//         link: '/inventory/savings-with-purchase-return',
//       }
//     ],
//   },
//   {
//     title: 'অন্য দোকানগুলি',
//     icon: '#stack-1',
//     children: [
       
//       {
//         title:'আপনার অন্য দোকানগুলি',
//         link:'/inventory/your-others-shops-display'
//      },
//      {
//       title:'Create Your Others Shop',
//       link:'/inventory/create-others-shop'
//    } 
     
//     ],
//   },
//   {
//     title: 'সেটিংস',
//     icon: '#settings-1',
//     children: [
//       // {
//       //   title: 'Complete Supplier Profile',
//       //   link: '/inventory/supplier-profile',
//       // },
//       // {
//       //   title: 'Complete Employee/User Profile',
//       //   link: '/inventory/complete-Emp-profile',
//       // },
//       {
//         title: 'Complete Shop Owner Profile',
//         link: '/inventory/sign-up-by-shop',
//       },
//       // {
//       //   title: 'Complete ক্রেতা Profile',
//       //   link: '/inventory/complete-customer-profile',
//       // },
//       // {
//       //   title: 'ছবি আপলোড',
//       //   link: '/inventory/upload-image',
//       // } 
     
//     ],
//   }, 
//   {
//     title: 'ই-কমার্স',
//     icon: '#paper-plane-1',
//     children: [
       
//     ],
//   },
//   {
//     title: 'অনুমোদন',
//     icon: '#unlocked-1',
//     children: [
//       {
//         title: 'প্রবেশ করুন',
//         link: '/login',
//       },
//       {
//         title: 'নিবন্ধন',
//         link: '/register',
//       } 
       
//     ],
//   }
// ];

ShopOwnerMENU_ITEMSBangla = [
  // {
  //   title: 'ড্যাশবোর্ড',
  //   icon: 'shopping-cart-outline',
  //   link: '/dashboard',
  //   home: true,
  // },
  // {
  //   title: 'আইওটি ড্যাশবোর্ড',
  //   icon: 'home-outline',
  //   link: '/iot-dashboard',
  // },
  // {
  //   title: 'বৈশিষ্ট্যসমূহ',
  //   group: true,
  // },
  {
    title: 'বিক্রয়',
    icon: '#cart-1',
    children: [
      // {
      //   title: 'পস বিক্রয়',
      //   link: '/d',
      // },
      {
        title: 'নতুন বিক্রয়',
        link: '/inventory/Invoice-entry',
      },
      
      {
        title: 'দৈনিক বিক্রয়',
        link: '/inventory/daily-sells',
      }, 
       
      {
        title: 'দৈনিক আয়',
        link: '/inventory/daily-income',
      },
      {
        title:'সেরা বিক্রি পণ্য',
       link:'/inventory/best-selling-product'
      },
	   {
        title: 'চালানের বিবরণ',
        link: '/inventory/Invoice-Details',
      } ,

      {
        title: 'বাকি পরিশোধ বিবরণ',
        link: '/inventory/Deu-Payment-Details',
      },
      {
        title: 'বিক্রয় ফেরত',
        link: '/inventory/sales-return',
      },
      {
        title: 'বিক্রয় ফেরত তালিকা',
        link: '/inventory/sales-return-list',
      },
      {
        title: 'গ্রাহক অর্ডারের বিবরণ',
        link: '/inventory/customer-order-display',
      }
      
    ],
  },
  {
    title: 'ক্রয়',
    icon: '#paper-stack-1',
    children: [
      {

        title: 'নতুন ক্রয়',
        link: '/inventory/new-purchase',
      },
      {

        title: 'ক্রয় থেকে চালান',
        link: '/inventory/Recieve-Inv-From-Cmpny',
      },
    
      {

        title: 'ক্রয় সংক্ষিপ্তসার',
        link: '/inventory/purchase-summry',
      },
      
      {
        title: 'ক্রয় তালিকা',
        link: '/inventory/purchase-info',
      } 
      ,
      {
        title: 'বাকি পরিশোধ বিবরণ',
        link: '/inventory/purchase-due-payment-detls',
      },
      {
        title: 'ক্রয় ফেরত',
        link: '/inventory/purchase-return',
      },
      {
        title: 'ক্রয় ফেরত তালিকা',
        link: '/inventory/purchase-return-list',
      }
 
    ],
  },
  {
    title: 'স্টক তথ্য',
    icon: '#paper-stack-1',
    children: [
      {
        title: 'স্টক তথ্য',
        link: '/inventory/stock-info',
      },
      {
        title: 'সতর্কতামূলক স্টক',
        link: '/inventory/alerming-product',
      },
      // {
      //   title: 'স্টক চার্ট',
      //   link: '/inventory/stock-chart',
      // },
      {

        title: 'আইটেম যোগ করুন',
        link: '/inventory/add-purchase',
      },
      {

        title: 'আইটেম সরান',
        link: '/inventory/remove-purchase-stock',
      },  
	  
    ],
  },
   
  {
    title: 'মূল্য প্রদান',
    icon: '#portfolio-grid-1',
    children: [
      {
        title: 'মূল্য প্রস্তাবনা তৈরি করুন',
        link: '/inventory/price-qutation',
      },
      {
        title: 'প্রস্তাবনা তালিকা',
        link: '/inventory/Quotation-List',
      } 
    ],
  },
  {
    title: 'মেরামত',
    icon: '#portfolio-grid-1',
    children: [
      {

        title: 'মেরামত অনুরোধ',
        link: '/inventory/Repair-Request',
      },
      {

        title: 'মেরামত সংক্ষিপ্তসার',
        link: '/inventory/repair-summary',
      },
     
    ],
  },
   {
    title: 'প্রোডাক্ট',
    icon: '#literature-1',
    children: [
      {
        title: 'প্রোডাক্ট তথ্য',
        link: '/inventory/product-info'
      },
      // {
      //   title: 'ই-কমার্স দর্শনীতে',
      //   link: `/e-commerce`
      // },
      // {
      //   title: 'সহজে বিক্রয় করার দোকান',
      //   link: '/inventory/e-com-home'
      // },
      {
        title: 'প্রোডাক্ট যোগ করুন',
        link: '/inventory/product-info-create',
      },
      {
        title: 'বাল্ক পণ্য এন্ট্রি',
        link: '/inventory/bulk-product-entry',
      } 
      ,
      {
        title: 'প্রোডাক্ট ক্যাটাগরি',
        link: '/inventory/Product-categories',
      },
      {
        title: 'প্রোডাক্ট উপ-ক্যাটাগরি',
        link: '/inventory/Product-sub-categories',
      },
      {
        title: 'ইউনিট',
        link: '/inventory/unit-info',
      },
      {
        title: 'প্রোডাক্ট ক্ষতি রিপোর্ট',
        link: '/inventory/product-damage-report',
      },
      {
        title: 'মোট মূল্য ও পরিমাণ',
        link: '/inventory/total-product-amount',
      }
    ],
  },
  {
    title: 'গ্রাহক',
    icon: '#man-1',
    children: [
      {
        title: 'গ্রাহক তথ্য',
        link: '/inventory/customer-display',
      },
      {
        title: 'গ্রাহক যোগ করুন',
        link: '/inventory/my-customer',
      },
      {
        title: 'গ্রাহক লেজার',
        link: '/inventory/customer-ledger-v2',
      }
    ],
  },
  {
    title: 'সরবরাহকারী',
    icon: '#delivery-truck-1',
    children: [
      {
        title: 'সরবরাহকারী তথ্য',
        link: '/inventory/supplier-profile-display'
      },
      {
        title: 'সরবরাহকারী যোগ করুন',
        link: '/inventory/my-supplier-profile',
      },
      {
        title: 'সরবরাহকারী লেজার',
        link: '/inventory/supplier-ledger-v2',
      },
    ],
  },
  {
    title: 'ব্যবহারকারী পরিচালনা',
    icon: '#user-1',
    children: [
      {
        title: 'ব্যবহারকারী তথ্য',
        link: '/inventory/shop-emp-display'
      },
      {
        title: 'ব্যবহারকারী যোগ করুন',
        link: '/inventory/create-shop-emp',
      },
      {
        title: 'মেনু পরিচালনা',
        link: '/inventory/Menu-Mangement',
      }
    ],
  },
  {
    title: 'স্থানান্তর এবং গ্রহণ',
    icon: '#tractor-1',
    children: [
      {
        title: 'প্রোডাক্ট প্রেরণ',
        link:'/inventory/Product-send'
      },
      
      {
        title: 'প্রোডাক্ট প্রেরণের তালিকা',
        link: '/inventory/product-sending-list',
      },
      {
        title: 'প্রোডাক্ট গ্রহণের তালিকা',
        link: '/inventory/product-receiving-list',
      }  
 
    ],
  },
  {
    title: 'কর্মচারী পরিচালনা',
    icon: '#pay-1',
    children: [
      { 
        title: 'কর্মচারী তথ্য',
        link: '/inventory/my-hr-profile-display',
      },
      {
        title: 'কর্মচারী যোগ করুন',
        link: '/inventory/my-hr-profile',
      } 
     
    ],
  },
  {
    title: 'হিসাব',
    icon: '#ballpoint-pen-1',
    children: [
      // {
      //   title: 'ব্যয়ের তালিকা',
      //   link: '/inventory/Monthly-Expanse',
      // } 
      // ,
	   {
        title: 'হিসাবের লেজার',
        link: '/inventory/daily-Expense',
      },
      {
        title: 'হিসাব চার্ট',
        link: '/inventory/account-chart',
      },
      {
        title: 'গ্রাহ্যযোগ্য বকেয়া',
        link: '/inventory/payment-receivable',
      } ,
      {
        title: 'দেনাদার বকেয়া',
        link: '/inventory/payable-due',
      },
      {
        title: 'হিসাব হেড যোগ করুন',
        link: '/inventory/add-accntd-head',
      },
      // {
      //   title: 'মাসিক বিক্রয়ের বিবরণ',
      //   link: '/inventory/Monthly-income',
      // }
      // ,
      // {
      //   title: 'মাসিক আয় ও বকেয়া',
      //   link: '/inventory/Monthly-income-due',
      // }
     
    ],
  },
  {
    title: 'রিপোর্ট',
    icon: '#sales-up-1',
    children: [
       
      {
        title: 'ইনভয়েস থেকে মুনাফা',
        link: '/inventory/profit-from-invoice',
      },
      {
        title: 'বিক্রয় রিপোর্ট',
        link: '/inventory/sales-report',
      }  
      ,
      {
        title: 'ক্রয় রিপোর্ট',
        link: '/inventory/purchase-report',
      },
      {
        title: 'বিক্রয় ফেরত রিপোর্ট',
        link: '/inventory/sales-return-report',
      }
      ,
      {
        title: 'ক্রয় ফেরত রিপোর্ট',
        link: '/inventory/purchase-return-report',
      },
      {
        title: 'মুনাফা সহ বিক্রয় ফেরত',
        link: '/inventory/profit-with-sales-return',
      } ,
      {
        title: 'ক্রয় ফেরত সহ সেভিংস',
        link: '/inventory/savings-with-purchase-return',
      },
      
    ],
  },
  // ...rest of the code
  {
    title: 'সেটিংস',
    icon: '#settings-1',
    children: [
      // {
      //   title: 'সরবরাহকারী প্রোফাইল সম্পূর্ণ করুন',
      //   link: '/inventory/supplier-profile',
      // },
      // {
      //   title: 'কর্মচারী/ব্যবহারকারী প্রোফাইল সম্পূর্ণ করুন',
      //   link: '/inventory/complete-Emp-profile',
      // },
      {
        title: 'দোকান মালিকের প্রোফাইল সম্পূর্ণ করুন',
        link: '/inventory/sign-up-by-shop',
      },
      // {
      //   title: 'গ্রাহক প্রোফাইল সম্পূর্ণ করুন',
      //   link: '/inventory/complete-customer-profile',
      // },
      // {
      //   title: 'ছবি আপলোড করুন',
      //   link: '/inventory/upload-image',
      // } 
     
    ],
  },{
    title: 'ই-কমার্স',
    icon: '#paper-plane-1',
    children: [
      {
        title: 'ই-কমার্স হোম',
        link: '/e-commerce/home',
      }, 
      {
        title: 'ই-সেটিংস',
        link:'/inventory/E-Settings'
      }, 
    ],
  },
  {
    title: 'অথেন্টিকেশন',
    icon: '#unlocked-1',
    children: [
      {
        title: 'লগইন',
        link: '/login',
      },
      {
        title: 'রেজিস্টার',
        link: '/register',
      } 
      ,
      {
        title: 'পাসওয়ার্ড পরিবর্তন করুন',
        link: '/inventory/change-passord',
      } 
       
        
    ],
  } 
  
  ]
  
  
 
 
 
   
  constructor() { 
    this.selectedLanguage=localStorage.getItem('Language');

    if(this.selectedLanguage=='English'||this.selectedLanguage==null){
    this.productEntry=this.languages[0].productEntryEnglish;
    this.unitEntry=this.languages[1].unitEntryEnglish;
    this.UnitInfo=this.languages[2].unitInfoEnglish;
    this.stockInfo=this.languages[3].stockInfoEnglish;
    this.InvoiceEntry=this.languages[4].InvoiceEntryEnglish;
    this.SalesReturnInfo=this.languages[5].SalesReturnDisplayEnglish;
    this.PurchaseRetureInfo=this.languages[6].PurchaseReturnListEnglish;
    this.UserInfo=this.languages[7].userInfoEnglish;
    }
    if(this.selectedLanguage=='Bangla'){
      this.productEntry=this.languages[0].productEntryBangla;
      this.unitEntry=this.languages[1].unitEntryBangla;
      this.UnitInfo=this.languages[2].unitInfoBangla;
      this.stockInfo=this.languages[3].stockInfoBangla;
      this.InvoiceEntry=this.languages[4].InvoiceEntryBangla;
      this.SalesReturnInfo=this.languages[5].SalesReturnDisplayBangla;
      this.PurchaseRetureInfo=this.languages[6].PurchaseReturnListBangla;
      this.UserInfo=this.languages[7].userInfoBangla;
    }
  }
 

userMenu(){
  if(this.selectedLanguage=='English'||this.selectedLanguage==null){
    return this.ShopOwnerMENU_ITEMS;
  }
  if(this.selectedLanguage=='Bangla'){
    return this.ShopOwnerMENU_ITEMSBangla;
  }
  return [];
}
 


menuMaker(usernMenu:any[],currentLanguageWiseMenu:any[]){
  let newcurrentMenu:any[]=[];
     const currentMenu:any=currentLanguageWiseMenu;
     return   newcurrentMenu =usernMenu.map((item, index) => {
       return {
         title: currentMenu[index].title,
         icon: item.icon,
         visibility: item.visibility,
         children: item.children.map((itemChld, childIndex) => {
           return { 
             title: currentMenu[index].children[childIndex].title, 
             link: itemChld.link, 
             visibility: itemChld.visibility, 
             isSave: itemChld.isSave, 
             isEdit: itemChld.isEdit, 
             isDelete:itemChld.isDelete  
           };
         })
       };
     });
 }
}
