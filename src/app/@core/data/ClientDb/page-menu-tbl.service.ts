import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageMenuTblService{ 
  public ObjRcver = new BehaviorSubject<any>([]);
  ObjectTbl= this.ObjRcver.asObservable();

  constructor() {}
  
  initialLoad(objects:any){
    this.ObjRcver.next(objects);
  }
  add(object:any){
    const newBookList=[
      ...this.ObjRcver.value,object];
      this.ObjRcver.next(newBookList);
  }

  Update(object:any){
    const index = this.ObjRcver.value.findIndex(elmnt =>elmnt.id==object.id);
    if (index > -1) {
    this.ObjRcver.value.splice(index, 1);
   
    const newBookList=[
      ...this.ObjRcver.value,object];

      this.ObjRcver.next(newBookList);
     
   }
  
  }

  delete(id:number){
    const index = this.ObjRcver.value.findIndex(elmnt =>elmnt.id==id);
   if (index > -1) {
   this.ObjRcver.value.splice(index, 1);
  }
    
  }

  getAll(){
  return  this.ObjectTbl;
  }
}
