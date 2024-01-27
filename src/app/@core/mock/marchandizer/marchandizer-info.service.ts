import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarchandizerInfo } from '../../data/marchanzider-model/marchandizer-info.model';
import { Observable } from 'rxjs';
import { BaseURL } from '../../data/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class MarchandizerInfoService {

  constructor(public http:HttpClient) { }
  getAllMarchandizer():Observable<MarchandizerInfo[]>{
    return this.http.get<MarchandizerInfo[]>(BaseURL.apiUrl+'/DealingMrcndiserInfoes/Index');
  }
  addMarchandizer(marchandizerInfo:MarchandizerInfo){
    console.log(marchandizerInfo);
    return this.http.post<MarchandizerInfo[]>(BaseURL.apiUrl+'/DealingMrcndiserInfoes',marchandizerInfo);
  }
  updateMarchandizer(marchandizerInfo:MarchandizerInfo){
    return this.http.put(BaseURL.apiUrl+'/DealingMrcndiserInfoes/'+marchandizerInfo.id,marchandizerInfo);
  }
  deleteMarchandizer(id: number){
    return this.http.delete(BaseURL.apiUrl+'/DealingMrcndiserInfoes/'+id);
  }
}
