import { Component, OnInit } from '@angular/core';
import { Visitor } from '../models/visitor.model';
import { CommonUtil } from '../infrastructure/commonutil.component';
import { ServiceUrl } from '../infrastructure/service/serviceUrls.service';
import { AppSettings } from '../infrastructure/appsettings';
import swal from "sweetalert2";
import { ServiceUtil } from '../infrastructure/service/serviceUtil.sevice';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { Dropdown } from '../models/dropdown.model';

@Component({
  selector: 'app-create-visitor',
  templateUrl: './create-visitor.component.html',
  styleUrls: ['./create-visitor.component.css']
})
export class CreateVisitorComponent implements OnInit {
  visitor: Visitor = new Visitor();
  configuration: any;
  countries: any;
  photoIdTypes: any;
  departments: any;
  employees: any;
  states: any;
  locations:any;
  employeeDisabled:Boolean;
  isAdmin:boolean;
  constructor(private serviceUtil: ServiceUtil, private route: Router) { }

  ngOnInit() {
    this.getConfiguration();
    this.initializeDefaultValues();
    let user = JSON.parse(localStorage.getItem('user'));  
    if(user.role.toLowerCase()=='security'){
      this.isAdmin=false;  
    }
    else
    {
      this.isAdmin=true;  
    }
  }

  initializeDefaultValues()
  {
     this.visitor.department = null;
     this.visitor.state  = null;
     this.visitor.toMeet = null;
     this.visitor.photoIdType = null;
     this.visitor.location = null;
    
     this.employeeDisabled = true;
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
  getConfiguration() {
    // this.serviceUtil.getData(AppSettings.base_url + ServiceUrl.configuration)
    this.serviceUtil.getData(AppSettings.base_url + "configuration")
      .subscribe(
        response => {
          if (!response.IsError) {
            this.configuration = response.model;
            this.countries = this.configuration.countries.map((value, index, array) => {
              return { _id: value.id, name: value.name };
            })

            this.departments = this.configuration.departments;
            this.configuration.employees = this.configuration.employees.map((value, index, array) => {
              return { _id: value.id, name: value.firstName +" " + value.lastName, department: value.department };
            })

            this.photoIdTypes = this.configuration.photoIdTypes;
            this.states = this.configuration.countries[0].states;
            this.locations = this.configuration.locations;
            this.visitor.country = this.countries[0];
          }
          else {
            alert('error');
          }
        }
      )
  }

  bindEmployees(department: any) {
   if(department == null)
   {
     this.employees = [];
      return;
   }
    // TODO: filter employees based on Department
    this.employees = this.configuration.employees.filter((employee)=>{
      return employee.department._id == department._id;
    }); 
  }

  bindStates(event): void {
    // We are supporting only India right now, so not rettrieving the country again.
    this.states = this.configuration.countries[0].states;
  }

  //To add a user
  addVisitor(visitor: Visitor) {
    console.log(visitor);
    this.serviceUtil.postData(AppSettings.base_url + ServiceUrl.visitor, this.visitor)
      .subscribe((response: any) => {
        if (!response.isError) {
          swal.fire({ type: 'success', text: 'Saved successfully', showCancelButton: false, confirmButtonText: 'OK' })
            .then((result) => {
              if (response.isError === false) {
                this.route.navigate(['/visitor/scan', response.model.id,"profilePicture"]);
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

  resetControl() {
    this.visitor = new Visitor();
    this.initializeDefaultValues();
    this.visitor.country = this.countries[0];
  }

  checkOut(visitor: Visitor) {
    this.serviceUtil.postData(AppSettings.base_url + ServiceUrl.visitorCheckout, visitor.id)
      .subscribe((response: any) => {
        if (!response.isError) {
          swal.fire({ type: 'success', text: 'Checked Out Successfully', showCancelButton: false, confirmButtonText: 'OK' })
            .then((result) => {
              if (response.isError === true && result.value === true) {
              } else {
                this.route.navigate['/visitor'];
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

  goBack(){
    this.route.navigate(['/visitor']);
  }
}
