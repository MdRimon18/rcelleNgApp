import { Observable } from 'rxjs';

export class items {
    id:number;
    orderEntryId:number;
    item: string;
    ratio: number;
    sewSmvPcs:number;
    cutSmvPcs:number;
    finSmvPcs: number;
    complexity: string;
    print: string;
    embroYesNo:string;
    embroNumber: number;
    washYesNo: string;
    washNumber: number;
    spWorksYesNo:string;
    spWorksNumber: number;
    gmtsDyeingYesNo: string;
    gmtsDyeingNumber: number;
    aopYesNo: string;
    aopNumber:number;
    }
    export abstract class itemsData {
    constructor() {  
    }
    abstract getitemsDropDownValues():Observable<items[]>;
    }