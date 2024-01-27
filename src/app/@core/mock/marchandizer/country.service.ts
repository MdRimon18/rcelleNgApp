import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../data/marchanzider-model/assignCompanyName';
import * as firebase from 'firebase'; 
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private db: AngularFireDatabase) { }
  addCountriesInfo(obj) {
    return  this.db.list(`/Countries/`).push(obj);
   }
    
   updateCountriesInfo(id, obj) {
    return this.db.object(`/Countries/` + id).update(obj);
   }
   
 getByIdCountriesInfo(id):Observable<any>{
  return this.db.list(`/Countries/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
 }

 
 getAllCountriesInfo() { 
  return this.db.list(`/Countries`);
}

  deleteCountriesInfo(key: string) {
  return this.db.list(`/Countries`).remove(key);
}
}
