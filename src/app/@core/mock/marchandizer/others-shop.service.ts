import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../data/marchanzider-model/assignCompanyName';

@Injectable({
  providedIn: 'root'
})
export class OthersShopService  {

  constructor(private db: AngularFireDatabase) { }
  
  addMyOthersShopInfo(obj) {
    return  this.db.list(`/${Company.cName}/MyOthersShop/`).push(obj);
  }
    
  updateMyOthersShopInfo(id, obj) {
    return this.db.object(`${Company.cName}/MyOthersShop/` + id).update(obj);
  }
  
getByIdMyOthersShopInfo(id):Observable<any>{
  return this.db.list(`${Company.cName}/MyOthersShop/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
}


getAllMyOthersShopInfo() { 
  return this.db.list(`${Company.cName}/MyOthersShop`);
}

  deleteMyOthersShopInfo(key: string) {
  return this.db.list(`${Company.cName}/MyOthersShop`).remove(key);
}
}
