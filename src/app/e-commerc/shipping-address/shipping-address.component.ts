import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCartTblService } from '../../@core/data/ClientDb/item-cart-tbl.service';
import { ToasterService } from '../../@core/mock/toaster.service';
import { CustomerOrderService } from '../../@core/mock/marchandizer/customer-order.service';
import { DropdownValuesService } from '../../@core/mock/marchandizer/dropdown-values.service';
import { DateResizerService } from '../../@core/mock/marchandizer/date-resizer.service';
 
@Component({
  selector: 'ngx-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})
export class ShippingAddressComponent implements OnInit {
  OrderNo:Number;
  entryDate:any=this.dateResizerService.resize(new Date());
  constructor(private router:Router,
    private itemCartTblService:ItemCartTblService,
    private toastrService:ToasterService,
    private dateResizerService:DateResizerService,
    private dropdownValuesService:DropdownValuesService,
    public customerOrderService:CustomerOrderService) { 

    }

  ngOnInit() {
    console.log(this.itemCartTblService.ObjectReciever.value)
      
  this.customerOrderService.getAllOrder().snapshotChanges().subscribe(items=>{
      this.OrderNo = items.length+1;
  })
  }
  onSubmit(form: any) {
  //  console.log(form.value);
   // console.log(this.itemCartTblService.ObjectReciever.value)
    let entryDateTime=this.dropdownValuesService.dateNdTimeFormat(this.entryDate);
    let orderDetails={
                    OrderNo:this.OrderNo,
                    EntryDate:this.entryDate,
                    entryDateTime:entryDateTime,
                   // ClientName:form.value.name,
                  //  Mobile:form.value.mobile,
                    ShippingDtls:form.value,
                    OrderDetails:this.itemCartTblService.ObjectReciever.value,
                    TotalQty:this.itemCartTblService.totalQty(),
                    TotalCost:this.itemCartTblService.totalCount(),
                    OrderStatus:0
                  };
    if(this.itemCartTblService.ObjectReciever.value.length>0){
    this.customerOrderService.addOrder(orderDetails).then(then=>{
      this.router.navigate(["/e-commerce/order-success"]);
    }).catch(c=>console.log(c))
     
    }else{
      this.toastrService.openSnackBarWarning('You have no item in your product list','ok')
    }
   
  }
  previous(){
    this.router.navigate(["/e-commerce/item-card"]);
  }
}
