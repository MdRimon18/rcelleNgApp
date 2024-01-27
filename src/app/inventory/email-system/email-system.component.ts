import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-email-system',
  templateUrl: './email-system.component.html',
  styleUrls: ['./email-system.component.scss']
})
export class EmailSystemComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  onCompose(){
    this.router.navigate(['/inventory/compose-email']);
  }
}
