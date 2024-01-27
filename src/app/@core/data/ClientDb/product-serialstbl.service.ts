import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSerialstblService {
  public  ObjectReciever = new BehaviorSubject<any>([]);
  ObjectTbl= this.ObjectReciever.asObservable();

  constructor() {}
  
  initialLoad(objects:any){
    this.ObjectReciever.next(objects);
  }
  add(object:any){
    const newBookList=[
      ...this.ObjectReciever.value,object];
      this.ObjectReciever.next(newBookList);
  }

  Update(object:any){
    const index = this.ObjectReciever.value.findIndex(elmnt =>elmnt.id==object.id);
    if (index > -1) {
    this.ObjectReciever.value.splice(index, 1);
   
    const newBookList=[
      ...this.ObjectReciever.value,object];

      this.ObjectReciever.next(newBookList);
     
   }
  
  }

  delete(key:number){   
    const index = this.ObjectReciever.value.findIndex(elmnt =>elmnt.key==key);
   if (index > -1) {
   this.ObjectReciever.value.splice(index, 1);
  }
    
  }

  getAll(){
  return  this.ObjectTbl;
  }
}
