import { Component, OnInit } from '@angular/core';
import {Department} from '../models/department.model'
import {AppSettings} from '../infrastructure/appsettings'
import {ServiceUrl} from '../infrastructure/service/serviceUrls.service'
import { ServiceUtil } from '../infrastructure/service/serviceUtil.sevice';
import { CommonUtil } from '../infrastructure/commonutil.component';
import swal from "sweetalert2";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  config:any;
  collection=[];
   
  departmentList:Array<Department>;
  constructor(private serviceUtil: ServiceUtil, private route: ActivatedRoute, private router: Router) {
     
  }
   
  ngOnInit() {
    this.loadDepartment();
  }
  loadDepartment() {
    //alert(AppSettings.base_url+ServiceUrl.dList);
    this.serviceUtil.getData(AppSettings.base_url + ServiceUrl.getDepartmentList)
      .subscribe((response: any) => {
        if (!response.isError) {
          console.log("Fetched data");
          this.departmentList= response.model;
          console.log(this.departmentList);
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
