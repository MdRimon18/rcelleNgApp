import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateResizerService {

  constructor() { }
    resize(formDateValue){
    let EntryDate="";
    if(formDateValue==""||formDateValue==undefined||formDateValue==null){
      EntryDate="";

    }else{
      var month;
      var day;
       var dateObj = new Date(formDateValue);
       var dObj=dateObj.toLocaleDateString().split('/');
        month=parseInt(dObj[0]);
        day=parseInt(dObj[1]);
            if(month<10){
              month='0'+month;
            }
            if(day<10){
              day='0'+day;
            }
  
     EntryDate =dObj[2]+'-'+month+'-'+day;

    }
   
  
    return EntryDate;
  }
}
