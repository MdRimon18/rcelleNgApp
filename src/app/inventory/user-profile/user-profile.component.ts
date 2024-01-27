import { Component, OnInit } from '@angular/core';
import { UserService } from '../../@core/mock/marchandizer/user.service';
import { DataSharingService } from '../E-commerce/data-sharing.service';

@Component({
  selector: 'ngx-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

constructor(public dataSharingService:DataSharingService) { }

  ngOnInit() {
  //console.log(this.dataSharingService.userInfo.value)
  }
 
}
