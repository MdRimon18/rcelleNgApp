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
export class SignUpByShopService {

  userData:any;
  constructor(private db: AngularFireDatabase,private af:AngularFireAuth) { 
     //this.userData=firebase.database().ref(`/shopRegistraion/`);
  }
addshopRegistraionInfo(obj) {
 return  this.db.list(`/shopRegistraion/`).push(obj);
}
 
updateshopRegistraionInfo(id, obj) {
 return this.db.object(`/shopRegistraion/` + id).update(obj);
}

getByIdshopRegistraionInfo(id):Observable<any>{
return this.db.list(`/shopRegistraion/` + id)
.valueChanges()
.pipe(catchError(err => of(null)));
}


getAllshopRegistraionInfo() { 
return this.db.list(`/shopRegistraion`);
}

deleteshopRegistraionInfo(key: string) {
return this.db.list(`/shopRegistraion`).remove(key);
}

 

 


}
