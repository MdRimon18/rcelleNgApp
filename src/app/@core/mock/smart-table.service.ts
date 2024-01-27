import { Injectable } from '@angular/core';
import { SmartTableData, InitorderData } from '../data/smart-table';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { company } from '../data/company';


@Injectable()
export class SmartTableService extends SmartTableData {
  initialorderFormData:InitorderData;
  companyformData:company;
  //iniorderlist: InitorderData[];
  readonly APIUrl="http://localhost:4186/api"
  constructor(public http:HttpClient) {
    super();
  }
  getAllInitialOrder():Observable<InitorderData[]>{
   return this.http.get<InitorderData[]>(this.APIUrl+'/initialorders/Index');
 
  }
  deleteInitialOrder(id: number){
    
  }
  updateInitialOrder(iniorderlist:InitorderData){
  
  }
  addInitialOrder(iniorderlist:InitorderData):Observable<InitorderData[]>{
    console.log(iniorderlist);
    return this.http.post<InitorderData[]>(this.APIUrl+'/initialorders/Create/',iniorderlist);
  }
  getCompanyDropDownValues():Observable<any>{
    return this.http.get<company[]>(this.APIUrl+'/TblCompanyInfoes');
  }
  
  data = [{
    JobNo:'MKL-18-227',
    OrderNo: '227',
    CompanyName: 'ABC',
    Location: 'USA',
    BuyerName: 'mdocom',
    StyleNo: '28',
  }, {
    JobNo:'MKL-18-228',
    OrderNo: '228',
    CompanyName: 'xyz',
    Location: 'UK',
    BuyerName: 'Micom',
    StyleNo: '29',
  }, {
    JobNo:'MKL-18-228',
    OrderNo: '228',
    CompanyName: 'xyz',
    Location: 'UK',
    BuyerName: 'Micom',
    StyleNo: '29',
  }, {
    JobNo:'MKL-18-228',
    OrderNo: '228',
    CompanyName: 'xyz',
    Location: 'UK',
    BuyerName: 'Micom',
    StyleNo: '29',
  }, {
    JobNo:'MKL-18-228',
    OrderNo: '228',
    CompanyName: 'xyz',
    Location: 'UK',
    BuyerName: 'Micom',
    StyleNo: '29',
  }, {
    JobNo:'MKL-18-228',
    OrderNo: '228',
    CompanyName: 'xyz',
    Location: 'UK',
    BuyerName: 'Micom',
    StyleNo: '29',
  }, {
    JobNo:'MKL-18-228',
    OrderNo: '228',
    CompanyName: 'xyz',
    Location: 'UK',
    BuyerName: 'Micom',
    StyleNo: '29',
  }, {
    JobNo:'MKL-18-228',
    OrderNo: '228',
    CompanyName: 'xyz',
    Location: 'UK',
    BuyerName: 'Micom',
    StyleNo: '29',
  }, {
    JobNo:'MKL-18-228',
    OrderNo: '228',
    CompanyName: 'xyz',
    Location: 'UK',
    BuyerName: 'Micom',
    StyleNo: '29',
  }, {
    JobNo:'MKL-18-228',
    OrderNo: '228',
    CompanyName: 'xyz',
    Location: 'UK',
    BuyerName: 'Micom',
    StyleNo: '29',
  }
  ];

  getData() {
    return this.data;
  }
}
