import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b><a href="https://brainstemq.web.app/" target="_blank">BrainStem Soft</a></b> 2019| <a [routerLink]="['/pages/Answer','-N7f3ldhQL6BEddUbQO1','Easy-To-Sales--Inventory-Software-Details']">Software Details</a></span>
    <div class="socials">
    {{time}}
      <a href="#" target="_blank" class="ion ion-social-github"></a>
      <a href="#" target="_blank" class="ion ion-social-facebook"></a>
      <a href="#" target="_blank" class="ion ion-social-twitter"></a>
      <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
    
  `,
})
export class FooterComponent implements OnInit {
public time;
  ngOnInit(){
    var d = new Date();
this.time = d.toLocaleTimeString();
//setInterval(this.ngOnInit,500);
  }
  
}
