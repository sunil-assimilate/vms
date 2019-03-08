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
  constructor(private serviceUtil: ServiceUtil, private route: Router) { }

  ngOnInit() {
    this.getConfiguration();
    this.initializeDefaultValues();
  }

  initializeDefaultValues()
  {
     this.visitor.department = null;
     this.visitor.state  = null;
     this.visitor.toMeet = null;
     this.visitor.photoIdType = null;
     this.visitor.location = null;
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

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
            this.employees = this.configuration.employees;
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

  bindEmployees() {
    // TODO: filter employees based on Department
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
                this.route.navigate(['/visitor']);
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
}
