import { Observable } from 'rxjs';

export class SubDeptInfoes{
    subDeptId:number;
    subDeptName:string;
    departmentId: number;
    department: string;
    }

export abstract class SubDeptInfoesData {
constructor() {  
}
 abstract getSubDeptInfoesDDL():Observable<SubDeptInfoes[]>;
}