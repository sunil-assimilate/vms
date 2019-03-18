import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model'
import { AppSettings } from '../infrastructure/appsettings'
import { ServiceUrl } from '../infrastructure/service/serviceUrls.service'
import { ServiceUtil } from '../infrastructure/service/serviceUtil.sevice';
import { CommonUtil } from '../infrastructure/commonutil.component';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { ChangePassword } from '../models/changepassword.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  //Variables for paging
  pager: any;
  collection = [];
  // To reset password
  changePassword: ChangePassword = {
    id: null,
    currentPassword: null,
    newPassword: null,
    confirmPassword: null
  };

  userSearch = {
    "sortType": "ASC",
    "sortBy": "",
    "pageNumber": 1,
    "pageSize": 10,
    "text": "",
    "totalCount": 0
  }
  userList: Array<User>;
  constructor(private serviceUtil: ServiceUtil, private route: ActivatedRoute, private router: Router) {
    this.pager = {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems:0
    };
    this.route.queryParams.subscribe(params => {
      this.pager.currentPage = params.page; 
      this.loadUserList();
    });

    

    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }
  pageChange(newPage: number) {
    this.router.navigate(['/user'], { queryParams: { page: newPage } });
  }
  ngOnInit() {
    this.loadUserList();
  }
  //To fetch user list 
  loadUserList() {    
    this.userSearch.pageNumber = this.pager.currentPage;
    this.serviceUtil.postData(AppSettings.base_url + ServiceUrl.userList, this.userSearch).subscribe(
      response => {
        if (!response.IsError) {
         // this.userSearch.totalCount = response.TotalCount;
          this.pager.totalItems = response.totalCount;
          this.userList = response.model;
          console.log(this.userList);
        }
        else {
          alert('error');
        }
      }
    )
  }
  //To search user based on input value in text
  searchUser() {
    this.loadUserList();
  }
  //To reset user password
  resetPassword(id: string) {
    this.changePassword.id = id;
    this.serviceUtil.postData(AppSettings.base_url + ServiceUrl.resetPassword, this.changePassword)
      .subscribe((response: any) => {
        if (!response.isError) {
          swal.fire({ type: 'success', text: 'Reset successfully', showCancelButton: false, confirmButtonText: 'OK' })
            .then((result) => {
              if (response.isError === true && result.value === true) {
              } else {
                this.router.navigate(['user']);
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
