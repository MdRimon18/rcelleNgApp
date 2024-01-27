import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserService } from '../@core/mock/marchandizer/user.service';
import { DataSharingService } from '../inventory/E-commerce/data-sharing.service';
import { Router } from '@angular/router';
import { Company } from '../@core/data/marchanzider-model/assignCompanyName';

@Component({
  selector: 'ngx-search-e-compny',
  templateUrl: './search-e-compny.component.html',
  styleUrls: ['./search-e-compny.component.scss']
})
export class SearchECompnyComponent implements OnInit {

  companyCntrl = new FormControl('');
  filteredStates: Observable<any[]>;

  // states: any[] = [
  //   {
  //     name: 'Arkansas',
  //     population: '2.978M',
   
  //     flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg',
  //   },
  //   {
  //     name: 'California',
  //     population: '39.14M',
     
  //     flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg',
  //   } 
     
  // ];
  users: any[] = [];
  constructor( public router:Router,
    public userService:UserService 
    ) {
     
  
   }
 

   
  ngOnInit() {
    this.userService.getAllUserInfo().snapshotChanges().subscribe(item=>{
      item.forEach(element => {
        var y :any= element.payload.toJSON();
        y.key = element.key;
      if(y.userType=='Shop Owner'){
        y.compInfo=y.orgName+' ('+y.storeType+') '+y.AddressLineOne+','+y.state
        this.users.push(y);
      }
        
      })
    });
  //console.log(this.users)

    this.filteredStates = this.companyCntrl.valueChanges.pipe(
      startWith(''),
      map(user => (user ? this._filterStates(user) : this.users.slice())),
    );
  }
  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(user => user.compInfo.toLowerCase().includes(filterValue));
  }
  redirectToSpecificComp(cmpObj){
   // console.log(cmpObj)
   localStorage.setItem('cmpCode',cmpObj.cmpCode)
 //   Company.cName=cmpObj.cmpCode;
   // this.router.navigate(['/e-commerce/']);

    const urlToOpen = '/e-commerce/'; // Replace with your desired URL
    window.open(urlToOpen, '_blank');
  }
  clearInput(){
   // console.log(this.companyCntrl)
    this.companyCntrl.reset('');
  }
}
