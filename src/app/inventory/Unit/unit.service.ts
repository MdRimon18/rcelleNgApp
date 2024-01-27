import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../@core/data/marchanzider-model/assignCompanyName';
 
@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private db: AngularFireDatabase) { }
  
  addUnitInfo(obj) {
    return  this.db.list(`/${Company.cName}/Unit/`).push(obj);
  }
    
  updateUnitInfo(id, obj) {
    return this.db.object(`${Company.cName}/Unit/` + id).update(obj);
  }
  
getByIdUnitInfo(id):Observable<any>{
  return this.db.list(`${Company.cName}/Unit/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
}


getAllUnitInfo() { 
  return this.db.list(`${Company.cName}/Unit`);
}

  deleteUnitInfo(key: string) {
  return this.db.list(`${Company.cName}/Unit`).remove(key);
}
}
