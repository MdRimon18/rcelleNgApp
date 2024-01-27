import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../data/marchanzider-model/assignCompanyName';

@Injectable({
  providedIn: 'root'
})
export class RemoveStockReasonService {

  constructor(private db: AngularFireDatabase) { 
  
  }
  addReasonsOfRemovalStock(obj) {
    
    return  this.db.list(`${Company.cName}/ReasonsOfRemovalStock/`).push(obj);
  }

  updateReasonsOfRemovalStock(id, obj) {
    return this.db.object(`${Company.cName}/ReasonsOfRemovalStock/` + id).update(obj);
  }
  
getByIdReasonsOfRemovalStock(id):Observable<any>{
  return this.db.list(`${Company.cName}/ReasonsOfRemovalStock/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
}


getAllReasonsOfRemovalStock() { 
  return this.db.list(`${Company.cName}/ReasonsOfRemovalStock`);
}

  deleteReasonsOfRemovalStock(key: string) {
  return this.db.list(`${Company.cName}/ReasonsOfRemovalStock`).remove(key);
}
}
