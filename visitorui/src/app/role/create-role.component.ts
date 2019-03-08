import { Component, OnInit } from '@angular/core';
import { Role } from '../models/role.model';
import { Router } from '@angular/router';
import { AppSettings } from '../infrastructure/appsettings'
import { ServiceUrl } from '../infrastructure/service/serviceUrls.service'
import { ServiceUtil } from '../infrastructure/service/serviceUtil.sevice'
import swal from 'sweetalert2';
import { CommonUtil } from '../infrastructure/commonutil.component';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  role: Role = {
    id: null,
    name: null,
    type: null,
    permissions: null
  }
  constructor(private serviceUtil: ServiceUtil, private route: Router) {
  }
  ngOnInit() {
  }
  addRole(newrole: Role) {
    this.serviceUtil.postData(AppSettings.base_url + ServiceUrl.role, this.role)
      .subscribe((response: any) => {
        if (!response.isError) {
          swal.fire({ type: 'success', text: 'Saved successfully', showCancelButton: false, confirmButtonText: 'OK' })
            .then((result) => {
              if (response.isError === true && result.value === true) {
              } else {
                this.route.navigate(['role']);
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
  //To clear control data
  clearControl() {
    this.role.name = null;
  }

  //To go on role 
  goBack() {
    this.route.navigate(['role']);
  }
}
