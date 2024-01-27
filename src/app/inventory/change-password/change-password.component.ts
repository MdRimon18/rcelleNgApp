import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../E-commerce/data-sharing.service';
import { UserService } from '../../@core/mock/marchandizer/user.service';
import { ToasterService } from '../../@core/mock/toaster.service';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
   
  constructor(
    public dataSharingService:DataSharingService,
    public userService:UserService,
    private toastrService:ToasterService,
    ) { }

  ngOnInit() {
  }
  onSubmit(obj): void {
  //   console.log(obj)
    const user =this.dataSharingService.userInfo.value;
    //  console.log(user)
    if(obj.currentPassword===user.pass){
      if (obj.newPassword === obj.confirmPassword) {
      
        if (user.key!=''||user.key!==undefined||user.key!=null) {
          user.pass=obj.newPassword;
          this.userService.updateUserInfo(user.key,user).then(t=>{
            //success
            this.toastrService.updateMessage();
             },err=>{
              //error
              this.toastrService.errorMessage();
            //  console.log(err)
            }) 
            }
        }
        else {
          this.toastrService.openSnackBarWarning('New password and confirm password do not match.','ok')
     
         }
    }else{
      this.toastrService.openSnackBarWarning('Current password do not match.','ok')
    }
   
}
}
