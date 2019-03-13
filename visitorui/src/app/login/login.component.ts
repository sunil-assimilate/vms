import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../infrastructure/appsettings'
import { ServiceUrl } from '../infrastructure/service/serviceUrls.service'
import { ServiceUtil } from '../infrastructure/service/serviceUtil.sevice'
import { Authentication } from '../models/authentication.model'
import swal from 'sweetalert2'
import { CommonUtil } from '../infrastructure/commonutil.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authentication: Authentication = {
    userName: null,
    password: null
  }
  constructor(private serviceUtil: ServiceUtil, private route: Router,private spinner:NgxSpinnerService) { }

  ngOnInit() {
  }
  authenticate(authenticate: Authentication): void { 
    let errorMessage:string;
    this.spinner.show();
    this.serviceUtil.postData(AppSettings.base_url + ServiceUrl.validateUser, this.authentication).subscribe(
      response => {
        this.spinner.hide();
         if (!response.IsError) {
          console.log(response.token);
          const serviceToken = { 'expiresAt': response.expiresAt, 'token': response.token };
          const user = {
            'userId': response.model.id, 'userName': response.model.userName, 'email': response.model.email, 'role': response.model.role.name,
            'firstName': response.model.firstName, 'lastName': response.model.lastName
          };          
          localStorage.setItem('ServiceToken', JSON.stringify(serviceToken));
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem("role", user.role);  
          this.route.navigate(['dashboard']);
        } else {
          this.spinner.hide();
          swal.fire({
            type: 'error', text: response.message, showCancelButton: false,
            confirmButtonText: 'OK'
          });
        }
      }, error => {
        this.spinner.hide();
        CommonUtil.handleError(error);
        
      }
    )
  }
//To prevent pasting password
  pasteUrl(event) {
    return false;
  }
}


