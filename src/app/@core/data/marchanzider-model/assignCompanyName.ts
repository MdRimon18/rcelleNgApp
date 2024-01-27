import { UserService } from "../../mock/marchandizer/user.service";

 
export class Company {
    static cName:string=localStorage.getItem('cmpCode');
    static cmpCode:string=localStorage.getItem('cmpCode');
    static userType:string=localStorage.getItem('userType');
    static key:string=localStorage.getItem('key');
 }

//  export class UserInitInfo { 
//      static cmpCode:string=localStorage.getItem('cmpCode');
//      static cName:string=localStorage.getItem('name');
//      static userType:string=localStorage.getItem('userType');
//      static key:string=localStorage.getItem('key');
//      //static shopOwner:string=localStorage.getItem('shopOwner');
//   }
