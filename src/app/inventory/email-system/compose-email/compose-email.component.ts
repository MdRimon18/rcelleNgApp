import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-compose-email',
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.scss']
})
export class ComposeEmailComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  onClickInbox(){
    this.router.navigate(['/inventory/compose-email']);
    
  }
}
