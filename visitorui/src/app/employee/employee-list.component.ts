import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model'
import { AppSettings } from '../infrastructure/appsettings'
import { ServiceUrl } from '../infrastructure/service/serviceUrls.service'
import { ServiceUtil } from '../infrastructure/service/serviceUtil.sevice';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  config: any;
  collection = [];
  employeeSearch = {
    "sortType": "ASC",
    "sortBy": "",
    "pageNumber": 1,
    "pageSize": 10,
    "text": ""
  }
  employeeList: Array<Employee>;

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

  pageChange(newPage: number) {
    this.router.navigate(['/employee'], { queryParams: { page: newPage } });

  }

  ngOnInit() {
    this.loadEmployeeList(this.employeeSearch.text);
  }
  //To fetch Employee list 
  loadEmployeeList(search:any) {
    this.serviceUtil.postData(AppSettings.base_url + ServiceUrl.employeeList,this.employeeSearch).subscribe(
      response => {
        if (!response.IsError) {
          console.log("employee list" + response.model)
          this.employeeList = response.model;
        }
        else {
          swal.fire({
            type: 'error', text: response.message, showCancelButton: false,
            confirmButtonText: 'OK'
          });
        }
      }
    )
  }
  // Filter employee with different field
  searchEmployee() {  
    this.loadEmployeeList(this.employeeSearch);
  }
}
