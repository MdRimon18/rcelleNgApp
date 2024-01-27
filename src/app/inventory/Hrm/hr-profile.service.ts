import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';
 
@Injectable({
  providedIn: 'root'
})
export class HrProfileService {

  constructor(private db: AngularFireDatabase) { }
  
  addMyHrProfileInfo(obj) {
    return  this.db.list(`/${Company.cName}/MyHrProfile/`).push(obj);
  }
    
  updateMyHrProfileInfo(id, obj) {
    return this.db.object(`${Company.cName}/MyHrProfile/` + id).update(obj);
  }
  
getByIdMyHrProfileInfo(id):Observable<any>{
  return this.db.list(`${Company.cName}/MyHrProfile/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
}


getAllMyHrProfileInfo() { 
  return this.db.list(`${Company.cName}/MyHrProfile`);
}

  deleteMyHrProfileInfo(key: string) {
  return this.db.list(`${Company.cName}/MyHrProfile`).remove(key);
}
}
