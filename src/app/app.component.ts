import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /**
   *
   */
  constructor(private router:Router) {
 

    // if(localStorage.getItem('userType')==null){
    //   this.router.navigate(['/login']);
    //   return;
    // }
    // if(localStorage.getItem('cmpCode')==null){
    //   this.router.navigate(['/login']);
    //   return;
    // }
    
  }
}
