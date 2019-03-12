import { Component, OnInit } from '@angular/core';
import { ServiceUtil } from '../infrastructure/service/serviceUtil.sevice';
import { User } from '../models/user.model';
import { AppSettings } from '../infrastructure/appsettings';
import { ServiceUrl } from '../infrastructure/service/serviceUrls.service';
import { CommonUtil } from '../infrastructure/commonutil.component';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Dropdown } from '../models/dropdown.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  roleList: any;
  userId: string;
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
  constructor(private serviceUtil: ServiceUtil, private route: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this._route.snapshot.params["id"];
    this.bindRole();
    this.userDetail(this.userId);

  }
  // to bind role dropdown
  bindRole() {
    this.serviceUtil.getData(AppSettings.base_url + ServiceUrl.getRoleList)
      .subscribe((response: any) => {
        if (!response.isError) {
          this.roleList = response.model.roles;
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

  //To get user detail by id
  userDetail(id: string) {
    this.serviceUtil.getData(AppSettings.base_url + ServiceUrl.userDetail + this.userId)
      .subscribe((response: any) => {
        if (!response.isError) {
          this.user = response.model;
          console.log(this.user);
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

  // To edit a user
  editUser() {
    this.user.id = this.userId;
    this.serviceUtil.putData(AppSettings.base_url + ServiceUrl.editUser, this.user)
      .subscribe((response: any) => {
        if (!response.isError) {
          swal.fire({ type: 'success', text: 'Updated successfully', showCancelButton: false, confirmButtonText: 'OK' })
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

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }

  // to reset contrl
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
  goBack() {
    this.route.navigate(['user']);
  }

 // Restrict input only to number only
 numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}

}
