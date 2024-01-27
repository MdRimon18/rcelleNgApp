import { Observable } from 'rxjs';

export class ProductionDeptInfoes{
        id: number;
        prodDeptName: string;
        departmentId: number;
        department: string;
    }

export abstract class ProductionDeptInfoesData {
constructor() {  
}
 abstract getProductionDeptInfoesDDL():Observable<ProductionDeptInfoes[]>;
}