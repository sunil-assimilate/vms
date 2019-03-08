import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { CommonUtil } from '../infrastructure/commonutil.component';
import { ServiceUrl } from '../infrastructure/service/serviceUrls.service';
import { AppSettings } from '../infrastructure/appsettings';
import swal from "sweetalert2";
import { ServiceUtil } from '../infrastructure/service/serviceUtil.sevice';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { Dropdown } from '../models/dropdown.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  roleList: any;
  user: User = {
    id: null,
    firstName: null,
    lastName: null,
    userName: null,
    contactNumber: null,
    email: null,
    password: null,
    confirmPassword: null,
    role: null
  }
  constructor(private serviceUtil: ServiceUtil, private route: Router) { }
  ngOnInit() {
    this.bindRole();
  }
  // to bind role dropdown
  bindRole() {
    this.serviceUtil.getData(AppSettings.base_url + ServiceUrl.getRoleList)
      .subscribe((response: any) => {
        if (!response.isError) {
          this.roleList= response.model.roles;
          console.log(this.roleList);
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
  //To add a user
  createUser(newUser: User) {
  console.log(newUser.role);
    this.serviceUtil.postData(AppSettings.base_url + ServiceUrl.createUser, newUser)
      .subscribe((response: any) => {
        if (!response.isError) {
          swal.fire({ type: 'success', text: 'Saved successfully', showCancelButton: false, confirmButtonText: 'OK' })
            .then((result) => {
              if (response.isError === true && result.value === true) {
              } else {
                this.route.navigate(['user']);
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
  // to reset control value
  resetControl() {
    this.user.firstName = null;
    this.user.lastName = null;
    this.user.password = null;
    this.user.confirmPassword = null;
    this.user.contactNumber = null;
    this.user.email = null;
    this.user.userName = null;
    this.user.role = null;
  }
  //To go on user list
  goBack(){
    this.route.navigate(['user']);
  }

}
