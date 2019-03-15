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
  departmentSearch = {
    "sortType": "ASC",
    "sortBy": "",
    "pageNumber": 1,
    "pageSize": 10,
    "text": ""
  }
  constructor(private serviceUtil: ServiceUtil, private route: ActivatedRoute, private router: Router) {    
    this.config = {
      currentPage: 1,
      itemsPerPage: 10
    };
    this.route.queryParams.subscribe(params => {
      this.config.currentPage = params.page;
    });
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }  
  }   
  ngOnInit() {
    this.loadDepartment();
  }
  pageChange(newPage: number) {
    this.router.navigate(['/department'], { queryParams: { page: newPage } });
  }
  loadDepartment() { 
  console.log(AppSettings.base_url + ServiceUrl.getDepartmentList+this.departmentSearch);
    this.serviceUtil.postData(AppSettings.base_url + ServiceUrl.getDepartmentList,this.departmentSearch.text)
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
// Search role
searchDepartment(){  
  this.loadDepartment();
}
}
