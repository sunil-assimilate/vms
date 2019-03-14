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
  pager: any; 
  employeeSearch = {
    "sortType": "ASC",
    "sortBy": "",
    "pageNumber": 1,
    "pageSize": 10,
    "text": "" ,
    "totalCount": 0
  }
  employeeList: Array<Employee>;
  constructor(private serviceUtil: ServiceUtil, private route: ActivatedRoute, private router: Router) {
    this.pager = {
      currentPage: 1,
      itemsPerPage:10,     
      totalItems:0
    };
      this.route.queryParams.subscribe(params => {
      this.pager.currentPage = params.page; 
      this.loadEmployeeList();
    });  
  }

  pageChange(newPage: number) {   
    console.log(newPage); 
    this.router.navigate(['/employee'], { queryParams: { page: newPage } });
  }
  ngOnInit() {
    this.loadEmployeeList();
  }
  //To fetch Employee list 
  loadEmployeeList() {
    this.employeeSearch.pageNumber = this.pager.currentPage;
    console.log(this.employeeSearch.pageNumber);
    this.serviceUtil.postData(AppSettings.base_url + ServiceUrl.employeeList,this.employeeSearch).subscribe(
      response => {
        if (!response.IsError) {
          console.log("employee list" + response.model)
          //this.employeeSearch.totalCount = response.totalCount;
          this.pager.totalItems = response.totalCount;
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
    this.loadEmployeeList();
  }
}
