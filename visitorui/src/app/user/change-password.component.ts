import { Component, OnInit } from '@angular/core';
import { ChangePassword } from '../models/changepassword.model';
import { CommonUtil } from '../infrastructure/commonutil.component';
import swal from 'sweetalert2';
import { ServiceUrl } from '../infrastructure/service/serviceUrls.service';
import { AppSettings } from '../infrastructure/appsettings';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { ServiceUtil } from '../infrastructure/service/serviceUtil.sevice';

@Component({
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePassword: ChangePassword = {
    id: null,
    currentPassword: null,
    newPassword: null,
    confirmPassword: null
  };
  // serviceUtil: any;
  constructor(private route: Router,private serviceUtil: ServiceUtil) { }

  ngOnInit() {
    
    let user = JSON.parse(localStorage.getItem('user'));
    this.changePassword.id =user.userId;
   
  }
  // To reset control data
  resetControl() {
    this.changePassword.currentPassword = null;
    this.changePassword.newPassword = null;
    this.changePassword.confirmPassword = null;
  }
  //To change user password
  changeUserPassword(userpassword: ChangePassword) {
    userpassword.id=this.changePassword.id;
    this.serviceUtil.postData(AppSettings.base_url + ServiceUrl.changePassword, userpassword)
      .subscribe((response: any) => {
         if (!response.isError) {
           swal.fire({ type: 'success', text: 'Changed successfully', showCancelButton: false, confirmButtonText: 'OK' })
           .then((result) => {
             if (response.isError === true && result.value === true) {
           } else {
            this.route.navigate(['/']);
              }
           });
        } else {
        swal.fire({
           type: 'error', text: response.message, showCancelButton: false,
             confirmButtonText: 'OK'
         });
         }
      }, error => {
       CommonUtil.handleError(error);
       });
  }
}
