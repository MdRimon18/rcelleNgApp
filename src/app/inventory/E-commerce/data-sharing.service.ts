import { Injectable } from '@angular/core';
import { ajaxTransport } from 'jquery';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserInfoTblService } from '../../@core/data/ClientDb/user-info-tbl.service';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';
import { UserService } from '../../@core/mock/marchandizer/user.service';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  SharingData = new Subject(); 
  public invoiceDetailsFilterInfo: BehaviorSubject<any>;
  public imageLink: BehaviorSubject<any>;

  public companyInfo:BehaviorSubject<any>;
  public  userInfo:BehaviorSubject<any>;
  public users: any[];


  aboutUs=[];
  placeInfo=[];
  constructor(public userService:UserService,
    public userInfoTblService:UserInfoTblService) { 

    this.invoiceDetailsFilterInfo=new BehaviorSubject<any>(0);
    this.imageLink=new BehaviorSubject<any>(0);

    this.companyInfo=new BehaviorSubject<any>(0);
    this.userInfo=new BehaviorSubject<any>(0);

   }
   setImagelink(newValue): void {
    this.imageLink.next(newValue);
  }

  getImageLink() {
    return this.imageLink.asObservable();
  }
   setInvoiceDetailsFilterInfo(newValue): void {
    this.invoiceDetailsFilterInfo.next(newValue);
  } 

  getInvoiceDetailsFilterInfo() {
    return this.invoiceDetailsFilterInfo.asObservable();
  }
  productSearchByMultiColumn(arry,category?,subCategory?,name?,
    productCategoriesId?,SubCategoreisName?,remarks?) {
    
    const filteredDatas = arry.filter(item =>
       (category ? item.catagory.toString().toLowerCase().replaceAll(' ','').match(category.toString().toLowerCase().replaceAll(' ','')) : true)
      &&(subCategory ? item.subCategory.toString().toLowerCase().replaceAll(' ','').match(subCategory.toString().toLowerCase().replaceAll(' ','')): true)
     &&(name ? item.name.toString().toLowerCase().replaceAll(' ','').match(name.toString().toLowerCase().replaceAll(' ','')): true)
     &&(productCategoriesId ? item.productCategoriesId.toString().toLowerCase().replaceAll(' ','').match(productCategoriesId.toString().toLowerCase().replaceAll(' ','')): true)
     &&(SubCategoreisName ? item.SubCategoreisName.toString().toLowerCase().replaceAll(' ','').match(SubCategoreisName.toString().toLowerCase().replaceAll(' ','')): true)
     &&(remarks ? item.remarks.toString().toLowerCase().replaceAll(' ','').match(remarks.toString().toLowerCase().replaceAll(' ','')): true)
     
     );
    // console.log(filteredDatas)
    return filteredDatas; 
}

invoiceSearchByMultiColumn(arry,invoiceNo?,entryDate?,clienName?,totalAmount?,
  PaidAmount?,DueAmount?,Profit?,mobile?,memoNo?,catagory?,subCategory?,name?,
  serialNumber?,quantity?,unit?,totalDiscount?,totalExpense?,purpsose?) {

    // const date = new Date(entryDate);
    // const day = date.toLocaleString('en-US', { day: '2-digit' });
    // const month = date.toLocaleString('en-US', { month: 'short' });
    // const year = date.toLocaleString('en-US', { year: 'numeric' });
    // entryDate = `${day} ${month} ${year}`;
    // const entryDate = `${this.entryDate.replace(/\s+/g, '-')}`;

  const filteredDatas = arry.filter(item =>
  (invoiceNo?item.invoiceNo.toString().toLowerCase().replaceAll(' ','').match(invoiceNo.toString().toLowerCase().replaceAll(' ','')) : true)
  &&(entryDate ? item.entryDate.match(new Date(entryDate).toDateString()): true)
  &&(clienName ? item.clienName.toString().toLowerCase().replaceAll(' ','').match(clienName.toString().toLowerCase().replaceAll(' ','')): true)
  &&(totalAmount ? item.totalAmount.toString().toLowerCase().replaceAll(' ','').match(totalAmount.toString().toLowerCase().replaceAll(' ','')): true)
  &&(PaidAmount ? item.PaidAmount.toString().toLowerCase().replaceAll(' ','').match(PaidAmount.toString().toLowerCase().replaceAll(' ','')): true)
  &&(DueAmount ? item.DueAmount.toString().toLowerCase().replaceAll(' ','').match(DueAmount.toString().toLowerCase().replaceAll(' ','')): true)
  &&(Profit ? item.Profit.toString().toLowerCase().replaceAll(' ','').match(Profit.toString().toLowerCase().replaceAll(' ','')): true)
  &&(mobile ? item.mobile.toString().toLowerCase().replaceAll(' ','').match(mobile.toString().toLowerCase().replaceAll(' ','')): true)
  &&(memoNo ? item.memoNo.toString().toLowerCase().replaceAll(' ','').match(memoNo.toString().toLowerCase().replaceAll(' ','')): true)
  &&(catagory ? item.catagory.toString().toLowerCase().replaceAll(' ','').match(catagory.toString().toLowerCase().replaceAll(' ','')): true)
  &&(subCategory ? item.subCategory.toString().toLowerCase().replaceAll(' ','').match(subCategory.toString().toLowerCase().replaceAll(' ','')): true)
  &&(name ? item.name.toString().toLowerCase().replaceAll(' ','').match(name.toString().toLowerCase().replaceAll(' ','')): true)
  &&(serialNumber ? item.serialNumber.toString().toLowerCase().replaceAll(' ','').match(serialNumber.toString().toLowerCase().replaceAll(' ','')): true)
  &&(quantity ? item.quantity.toString().toLowerCase().replaceAll(' ','').match(quantity.toString().toLowerCase().replaceAll(' ','')): true)
  &&(unit ? item.unit.toString().toLowerCase().replaceAll(' ','').match(unit.toString().toLowerCase().replaceAll(' ','')): true)
  &&(totalDiscount ? item.totalDiscount.toString().toLowerCase().replaceAll(' ','').match(totalDiscount.toString().toLowerCase().replaceAll(' ','')): true)
  &&(totalExpense ? item.totalExpense.toString().toLowerCase().replaceAll(' ','').match(totalExpense.toString().toLowerCase().replaceAll(' ','')): true)
  &&(purpsose ? item.purpsose.toString().toLowerCase().replaceAll(' ','').match(purpsose.toString().toLowerCase().replaceAll(' ','')): true)
 
  );

  return filteredDatas;
}


//Here Date formate is diffrence from above function
invoiceSearchByMultiColumnV2(arry,invoiceNo?,entryDate?,clienName?,totalAmount?,
  PaidAmount?,DueAmount?,Profit?,mobile?,memoNo?,catagory?,subCategory?,name?,
  serialNumber?,quantity?,unit?,totalDiscount?,totalExpense?,purpsose?) {

  const filteredDatas = arry.filter(item =>
  (invoiceNo?item.invoiceNo.toString().toLowerCase().replaceAll(' ','').match(invoiceNo.toString().toLowerCase().replaceAll(' ','')) : true)
  &&(entryDate ? item.entryDate.toLowerCase()==entryDate.toLowerCase(): true)
  &&(clienName ? item.clienName.toString().toLowerCase().replaceAll(' ','').match(clienName.toString().toLowerCase().replaceAll(' ','')): true)
  &&(totalAmount ? item.totalAmount.toString().toLowerCase().replaceAll(' ','').match(totalAmount.toString().toLowerCase().replaceAll(' ','')): true)
  &&(PaidAmount ? item.PaidAmount.toString().toLowerCase().replaceAll(' ','').match(PaidAmount.toString().toLowerCase().replaceAll(' ','')): true)
  &&(DueAmount ? item.DueAmount.toString().toLowerCase().replaceAll(' ','').match(DueAmount.toString().toLowerCase().replaceAll(' ','')): true)
  &&(Profit ? item.Profit.toString().toLowerCase().replaceAll(' ','').match(Profit.toString().toLowerCase().replaceAll(' ','')): true)
  &&(mobile ? item.mobile.toString().toLowerCase().replaceAll(' ','').match(mobile.toString().toLowerCase().replaceAll(' ','')): true)
  &&(memoNo ? item.memoNo.toString().toLowerCase().replaceAll(' ','').match(memoNo.toString().toLowerCase().replaceAll(' ','')): true)
  &&(catagory ? item.catagory.toString().toLowerCase().replaceAll(' ','').match(catagory.toString().toLowerCase().replaceAll(' ','')): true)
  &&(subCategory ? item.subCategory.toString().toLowerCase().replaceAll(' ','').match(subCategory.toString().toLowerCase().replaceAll(' ','')): true)
  &&(name ? item.name.toString().toLowerCase().replaceAll(' ','').match(name.toString().toLowerCase().replaceAll(' ','')): true)
  &&(serialNumber ? item.serialNumber.toString().toLowerCase().replaceAll(' ','').match(serialNumber.toString().toLowerCase().replaceAll(' ','')): true)
  &&(quantity ? item.quantity.toString().toLowerCase().replaceAll(' ','').match(quantity.toString().toLowerCase().replaceAll(' ','')): true)
  &&(unit ? item.unit.toString().toLowerCase().replaceAll(' ','').match(unit.toString().toLowerCase().replaceAll(' ','')): true)
  &&(totalDiscount ? item.totalDiscount.toString().toLowerCase().replaceAll(' ','').match(totalDiscount.toString().toLowerCase().replaceAll(' ','')): true)
  &&(totalExpense ? item.totalExpense.toString().toLowerCase().replaceAll(' ','').match(totalExpense.toString().toLowerCase().replaceAll(' ','')): true)
  &&(purpsose ? item.purpsose.toString().toLowerCase().replaceAll(' ','').match(purpsose.toString().toLowerCase().replaceAll(' ','')): true)
 
  );

  return filteredDatas;
}

productRecieveSearchByMultiColumnV2(arry,SendingCompanyPhone?,SendingCompanyName?,transferDate?,transferBy?,
  trackingNumber?,transferVia?,expectedDeliveryDate?,transferCost?,remarksOrNotes?) {
    // console.log(arry)
    // console.log(SendingCompanyPhone)
    // console.log(SendingCompanyName)
    // console.log(transferDate)
    // console.log(transferBy)
    // console.log(trackingNumber)
    // console.log(transferVia)
    // console.log(expectedDeliveryDate)
    // console.log(transferCost)
    // console.log(remarksOrNotes)
  const filteredDatas =
   arry.filter(item =>
  (SendingCompanyPhone?item.SendingCompanyPhone.toString().toLowerCase().replaceAll(' ','').match(SendingCompanyPhone.toString().toLowerCase().replaceAll(' ','')) : true)
  &&(SendingCompanyName ? item.SendingCompanyName.toString().toLowerCase().replaceAll(' ','').match(SendingCompanyName.toString().toLowerCase().replaceAll(' ','')): true)
  &&(transferDate ? item.transferDate.toLowerCase()==transferDate.toLowerCase(): true)
  &&(expectedDeliveryDate ? item.expectedDeliveryDate.toLowerCase()==expectedDeliveryDate.toLowerCase(): true)
  
  &&(transferBy ? item.transferBy.toString().toLowerCase().replaceAll(' ','').match(transferBy.toString().toLowerCase().replaceAll(' ','')): true)
  &&(trackingNumber ? item.trackingNumber.toString().toLowerCase().replaceAll(' ','').match(trackingNumber.toString().toLowerCase().replaceAll(' ','')): true)
  &&(transferVia ? item.transferVia.toString().toLowerCase().replaceAll(' ','').match(transferVia.toString().toLowerCase().replaceAll(' ','')): true)
  &&(transferCost ? item.transferCost==transferCost: true)
  &&(remarksOrNotes ? item.remarksOrNotes.toString().toLowerCase().replaceAll(' ','').match(remarksOrNotes.toString().toLowerCase().replaceAll(' ','')): true)
  );

   return filteredDatas;
}

getCompanyInfo(cmpCode){
    this.userService.getUserBycmpCode(cmpCode).snapshotChanges().subscribe(item=>{
      let users=[]
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["key"] = element.key;
        users.push(y as any);
      });
      let obj=users.find(f=>f.userType=='Shop Owner');
      if(obj!=undefined){
        this.companyInfo.next(obj);
    //    console.log(this.companyInfo.value)

        let cmpInfo=this.companyInfo.value;
        this.aboutUs=[];
        this.placeInfo=[];
        for (const key in cmpInfo.cmpInfoLinks) {
               this.aboutUs.push(
              {
                linkName:cmpInfo.cmpInfoLinks[key].linkName,
                link:cmpInfo.cmpInfoLinks[key].link
              }
            );
         }
         for (const key in cmpInfo.workOrTransportPlace) {
          this.placeInfo.push({placeName:cmpInfo.workOrTransportPlace[key].placeName});
         }
       //  console.log(this.aboutUs)
        // console.log(this.placeInfo)
      }
    }); 
}
getUserInfo(key){
  this.userService.getByIdUserInfo(key).subscribe((data:any)=>{
    data['key']=key;
    this.userInfoTblService.initialLoad(data);
    this.userInfo.next(data);
   // console.log( this.userInfo.value)

  })
}

getUser(){
  this.userService.getAllUserInfo().snapshotChanges().subscribe(item=>{
   this.users=[];
    item.forEach(element => {
      var y = element.payload.toJSON();
      y["key"] = element.key;
      this.users.push(y);
    })
 
  });
}

exportToCsv(data: any[], fileName: string): void {
  const csvContent = this.convertArrayToCsv(data);

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${fileName}.csv`);
}
  generateCSVContentv2(data: any[], columnOrder: string[]): string {
    
  const headerRow = columnOrder.join(',');

  const dataRows = data.map(item =>
    columnOrder.map(col => item[col]).join(',')
  );

  return [headerRow, ...dataRows].join('\n');
}

generateCSVContent(data: any[], columnOrder: string[]): string {
  const headerRow = columnOrder.map(col => `${col}`).join(',');

  const dataRows = data.map(item =>
    columnOrder.map(col => `${item[col]}`).join(',')
  );

  return [headerRow, ...dataRows].join('\n');
}
private convertArrayToCsv(data: any[]): string {
  const header = Object.keys(data[0]);
  console.log(header)
  const rows = data.map(item => header.map(fieldName => item[fieldName]));

  const headerRow = header.join(',');
  const dataRows = rows.map(row => row.join(','));

  return [headerRow, ...dataRows].join('\n');
}


}
