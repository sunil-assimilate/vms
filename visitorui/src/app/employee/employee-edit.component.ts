import { Component, OnInit } from '@angular/core';
import { Dropdown } from '../models/dropdown.model';
import { Employee } from '../models/employee.model';
import { ServiceUtil } from '../infrastructure/service/serviceUtil.sevice';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSettings } from '../infrastructure/appsettings';
import { ServiceUrl } from '../infrastructure/service/serviceUrls.service';
import { CommonUtil } from '../infrastructure/commonutil.component';
import swal from 'sweetalert2';


@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
departmentList:Array<Dropdown>;
employeeId:string;
employee:Employee= {
  id:null,
   firstName:null,
   lastName:null,
   cell:null,
   email:null,
   department:null,
   empCode:null
}
constructor(private serviceUtil: ServiceUtil, private route: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.employeeId = this._route.snapshot.params["id"];    
    this.bindDepartment();
    this.employeeDetail(this.employeeId);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  alphabetsOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)) {
      return true;
    }
    return false;
  }



    // to bind role dropdown  
    bindDepartment() {       
      this.serviceUtil.putData(AppSettings.base_url+ServiceUrl.configuration, ServiceUrl.getDepartmentList)
        .subscribe((response: any) => {
          if (!response.isError) {
            this.departmentList= response.model.departments;
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
    //To get employee detail by id
     employeeDetail(id: string) {      
       console.log(AppSettings.base_url +ServiceUrl.employeeDetail+this.employeeId);
    this.serviceUtil.getData(AppSettings.base_url +ServiceUrl.employeeDetail+this.employeeId)
      .subscribe((response: any) => {
        if (!response.isError) {          
          this.employee = response.model;        
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
 editEmployee() {
  this.employee.id = this.employeeId;   
   this.serviceUtil.putData(AppSettings.base_url +ServiceUrl.editEmployee,this.employee )
     .subscribe((response: any) => {
       if (!response.isError) {
         swal.fire({ type: 'success', text: 'Updated successfully', showCancelButton: false, confirmButtonText: 'OK' })
           .then((result) => {
             if (response.isError === true && result.value === true) {
             } else {
               this.route.navigate(['employee']);
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
// to reset contrl
resetControl(){
  this.employee.firstName=null;
  this.employee.lastName=null;
  this.employee.cell=null;
  this.employee.email=null;  
  this.employee.department=null;  
}
compareFn(c1: any, c2: any): boolean {
  return c1 && c2 ? c1._id === c2._id : c1 === c2;
}

}
