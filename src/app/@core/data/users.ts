import { Observable } from 'rxjs';

export interface User {
  name: string;
  picture: string;
}

export interface Contacts {
  user: User;
  type: string;
}

export interface RecentUsers extends Contacts {
  time: number;
}

export abstract class UserData {

//default template method signature
   abstract getUsers(): Observable<User[]>;
   abstract getContacts(): Observable<Contacts[]>;
   abstract getRecentUsers(): Observable<RecentUsers[]>;

  //garments erp properties
  userId: number;
  fullName: string;
  email: string;
  contact: string;
  regDate: Date;
  userName: string;
  userPassword: string;
  userTypeId: number;
  deptId: number;

}
