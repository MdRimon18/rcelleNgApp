import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export class InitorderData {
  orderAutoId: number;
  jobNo: string;
  companyId: number;
  locationId: number;
  buyerId: number;
  styleRef: string;
  styleDescription: string;
  prodDeptId: number;
  subDeptId: number;
  currencyId: number;
  regionId: number;
  productCatId: number;
  teamLeaderId: number;
  dealingMerchantId: number;
  bhMerchant: string;
  remarks: string;
  shipmentModeId: number;
  orderUomId: number;
  smv: string;
  imagefile:File;
  packingId: number;
  seasonId: number;
  agentId: number;
  userId: number;
  cmpName:string;
  companyName:string;
}
export abstract class SmartTableData {
constructor() {  
}
  abstract getData(): any[];
 abstract getAllInitialOrder():Observable<InitorderData[]>;
 abstract getCompanyDropDownValues():Observable<InitorderData[]>;
 abstract addInitialOrder(iniorderlist:InitorderData):Observable<InitorderData[]>;
}
