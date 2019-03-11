import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { Dropdown } from '../models/dropdown.model';
import { Employee } from '../models/employee.model';
import { AppSettings } from '../infrastructure/appsettings';
import { ServiceUrl } from '../infrastructure/service/serviceUrls.service';
import { CommonUtil } from '../infrastructure/commonutil.component';
import { ServiceUtil } from '../infrastructure/service/serviceUtil.sevice';
import swal from 'sweetalert2';


@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  departmentList:Array<Dropdown>;  
  @ViewChild('fileInput') fileInput: ElementRef;;
  fileToUpload: any;
  employee:Employee= {
    id:null,
     firstName:null,
     lastName:null,
     cell:null,
     email:null,
     department:null
  }
  constructor(private serviceUtil: ServiceUtil, private route: Router) { }
  ngOnInit() {
    this.bindDepartment();
  }
  // bind Department List 
  bindDepartment()
  {
    //alert(AppSettings.base_url + ServiceUrl.getdepartmentList);
   this.serviceUtil.getData(AppSettings.base_url+ServiceUrl.dList)
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
 // Validation for numbers
 numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}

 //To add a Employee
 createEmployee(newEmployee: Employee) { 
  this.serviceUtil.postData(AppSettings.base_url + "employee", this.employee)
    .subscribe((response: any) => {
      if (!response.isError) {
        swal.fire({ type: 'success', text: 'Saved successfully', showCancelButton: false, confirmButtonText: 'OK' })
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
resetControl()
{
  this.employee.firstName=null;
  this.employee.lastName=null;
  this.employee.cell=null;
  this.employee.email=null;  
  this.employee.department=null;
}

selected(){
  console.log(this.employee);
}
// import emplyee in excel
importEmployee() {
  const fi = this.fileInput.nativeElement;
  if (fi.files && fi.files[0]) {
    this.fileToUpload = fi.files[0];
  }
  alert(fi.files[0].name);
  this.serviceUtil.uploadExcel(AppSettings.base_url + ServiceUrl.importEmployee, this.fileToUpload).subscribe((res: any) => {
    if (res) {
      if (!res.isError) {
        let msgToDisplay = res.model.successCount + '  out of ' + res.model.totalCount + ' total Records imported successfully.';
        swal.fire({
          title: 'Result',
          text: msgToDisplay,
          type: "success",
          showCancelButton: false,
          confirmButtonText: 'OK',
          footer: '<a href="http://localhost:4200/' + res.model.filePath + '" >click here to download details</a>'
        }).then((result) => {
          this.route.navigate(['employee']);
          if (res.model.filePath !== null && res.model.filePath) {
          }
        });
      } else {
        // handle here the error condition
        swal.fire({
          title: 'Result',
          text: res.message,
          type: "error",
          showCancelButton: false,
          confirmButtonText: 'OK'
        });
      }
    }
  }, (err: any) => {
    swal.fire({
      title: 'Result',
      text: err.message,
      type: "error",
      showCancelButton: false,
      confirmButtonText: 'OK'
    });
  });
}

}

