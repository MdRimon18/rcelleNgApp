
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
  import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable,of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Company } from '../../data/marchanzider-model/assignCompanyName';
import * as firebase from 'firebase'; 
//import { UserInfoTblService } from '../../../pages/merchandizer-module/ClientDb/user-info-tbl.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfoTblService } from '../../data/ClientDb/user-info-tbl.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userInfo$ = new BehaviorSubject<any>([]);
  userData:any;
  filteredArray=[];
 
     constructor(private db: AngularFireDatabase,
      private af:AngularFireAuth,
      private route:ActivatedRoute,
      private router:Router,
      private userInfoTblService:UserInfoTblService,
       ) { 
     
     }
  addUserInfo(obj) {
    return  this.db.list(`/users/`).push(obj);
   }
  
   updateUserInfo(id, obj) {
    return this.db.object(`/users/` + id).update(obj);
   }
    
 getByIdUserInfo(id):Observable<any>{
  return this.db.object(`/users/` + id)
  .valueChanges()
  .pipe(catchError(err => of(null)));
 }
 
 loginCheckAuth(){

      if(localStorage.getItem('phone')==undefined||
      localStorage.getItem('phone')==''||localStorage.getItem('phone')==null){
        // this.router.navigate(['/pages/login']);
        return false;
      }else{

        return true;
        
      }
   
    
  }
 
//  IsExistProductTitle(title: string) {
//   return this.db.list('/products', {
//     query: {
//       orderByChild: 'title',
//       equalTo: title
//     }
//   });
// }
isPhoneNoExistOrNot(phone){
  return this.db.list('/users', ref => 
     ref.orderByChild('phone').equalTo(`${phone}`)
  );
}
//not in use
ifExist(phone: any) {
  return firebase.database().ref("/users/").child("users")
    .orderByChild("phone").equalTo(phone)
    .once("value", snapshot => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log("exists!", userData);
        return true;
      }
      return false;
    });
}
 getAllUserInfo() { 
  return this.db.list(`/users`);
}


getAllAccountHead() { 
  return this.db.list(`/NewsCategory`);
}
getAllCompanyInfo() { 
  return this.db.object(`/`);
}
  deleteUserInfo(key: string) {
  return this.db.list(`/users`).remove(key);
}

getUserByMobileNoNPassWord(phoneNo: string){
 return   this.db.list(`/users`, ref => ref.orderByChild('phone')
 .equalTo(phoneNo));
 
}
 
getUserBycmpCode(cmpCode: string){
  return   this.db.list(`/users`, ref => ref.orderByChild('cmpCode')
  .equalTo(cmpCode));
 //  .valueChanges()
 //  .subscribe(res=>{
 //   this.userInfo$.next(res);
 // });
 }
getUser(mobileNo: string, password: string) {
  return this.db.list('users', ref => ref.orderByChild('phone').equalTo(mobileNo))
  .valueChanges().pipe(map(res=>{
    res.filter((item:any)=>{
      if(item.pass== password){
        return item;
      }
    })
  }));
}
checkPhoneNumberExists(phoneNumber: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    this.db.list('users').valueChanges().subscribe((users: any[]) => {
      const exists = users.some(user => user.phone === phoneNumber);
      resolve(exists);
    }, error => {
      reject(error);
    });
  });
}
// signUp(registrationForm){
//   return this.af.auth
//   .createUserWithEmailAndPassword(registrationForm.email,
//    registrationForm.pass);
    
//   }

  signIn(email,password){
   // let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
   // localStorage.setItem('returnUrl', returnUrl);
   
    return this.af.auth.signInWithEmailAndPassword(email, password);
   
  } 




  addUserMenu(obj) {
 
    return  this.db.list(`${Company.cName}/userMenu/`).push(obj);
   }
  
   updateUserMenu(id, obj) {
    return this.db.object(`${Company.cName}/userMenu/` + id).update(obj);
   }
   
   getByIdUserMenu(id){
    return this.db.object(`${Company.cName}/userMenu/` + id);
   }
   getAllUserMenu() { 
    return this.db.list(`${Company.cName}/userMenu/`);
  }
  getUserMenuByUserId(key){
    return   this.db.list(`${Company.cName}/userMenu/`,
     ref => ref.orderByChild('Userkey').equalTo(key));

  }
}
