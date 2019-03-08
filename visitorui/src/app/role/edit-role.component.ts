import { Component, OnInit } from '@angular/core';
import {Role} from '../models/role.model';
import {AppSettings} from '../infrastructure/appsettings'
import {ServiceUrl} from '../infrastructure/service/serviceUrls.service'
import {ServiceUtil } from '../infrastructure/service/serviceUtil.sevice'
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { CommonUtil } from '../infrastructure/commonutil.component';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {
  roleId:string;
  role: Role = {
    id:null,
    name:null,
    type:null,
    permissions:null 
  }  
  constructor(private serviceUtil: ServiceUtil, private route: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.roleId= this._route.snapshot.params["id"];
    this.roleDetail(this.roleId);
  }

//To get role detail by id
roleDetail(id: string) {
  this.serviceUtil.getData(AppSettings.base_url + ServiceUrl.roleDetail+this.roleId)
    .subscribe((response: any) => {
      if (!response.isError) {
        this.role = response.model;     
        console.log(this.role ) ; 
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

// To edit a role
editrole() {
  this.role.id = this.roleId;  
   this.serviceUtil.putData(AppSettings.base_url + ServiceUrl.role, this.role)
     .subscribe((response: any) => {
       if (!response.isError) {
         swal.fire({ type: 'success', text: 'Updated successfully', showCancelButton: false, confirmButtonText: 'OK' })
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
//To go on role 
goBack(){
  this.route.navigate(['role']);
}
}
 