import { Component, OnInit } from '@angular/core';
import { Visitor } from '../models/visitor.model';
import { ServiceUtil } from '../infrastructure/service/serviceUtil.sevice';
import { AppSettings } from '../infrastructure/appsettings';
import swal from "sweetalert2";

import { CommonUtil } from '../infrastructure/commonutil.component';
import { ServiceUrl } from '../infrastructure/service/serviceUrls.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'edit-visitor',
    templateUrl: './edit-visitor.component.html',
    styleUrls: ['./edit-visitor.component.css']
})
export class EditVisitorComponent implements OnInit {
    visitor: Visitor;
    visitorId: string;
    configuration: any;
    countries: any;
    departments: any;
    employees: any;
    states: any;
    locations: any;
    photoIdTypes: any;

    constructor(private serviceUtil: ServiceUtil, private route: Router, private _route: ActivatedRoute) { }
    ngOnInit() {
        this.visitor = new Visitor();
        this.visitorId = this._route.snapshot.params["id"];
        this.getConfiguration();
    }

    getConfiguration() {
        this.serviceUtil.getData(AppSettings.base_url + ServiceUrl.configuration)
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
                        this.locations = this.configuration.locations;
                        this.userDetail(this.visitorId);
                    }
                    else {
                        alert('error');
                    }
                }
            )
    }

    compareFn(c1: any, c2: any): boolean {
        return c1 && c2 ? c1._id === c2._id : c1 === c2;
    }

    bindEmployees(department: any) {
   
        // TODO: filter employees based on Department
        this.employees = this.employees.filter((employee)=>{
          return employee.department._id == department._id;
        }); 
      }
      
    bindStates(event): void {
        // We are supporting only India right now, so not retrieving the country again.
        console.log("bind states");
        this.states = this.configuration.countries[0].states;
    }

    //To get visitor detail by id
    userDetail(id: string) {
        this.serviceUtil.getData(AppSettings.base_url + ServiceUrl.visitor + this.visitorId)
            .subscribe((response: any) => {
                if (!response.isError) {
                    this.visitor = response.model;
                    this.states = this.configuration.countries[0].states;
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

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
        }
        return true;
    
      }

    updateVisitor() {
        this.serviceUtil.putData(AppSettings.base_url + ServiceUrl.visitor, this.visitor)
            .subscribe(
                response => {
                    if (!response.IsError) {
                        swal.fire({ type: 'success', text: 'Updated successfully', showCancelButton: false, confirmButtonText: 'OK' })
                            .then((result) => {
                                if (response.isError === true && result.value === true) {
                                } else {
                                    this.route.navigate(['/visitor']);
                                }
                            });
                    }
                    else {

                        swal.fire({
                            type: 'error', text: response.message, showCancelButton: false,
                            confirmButtonText: 'OK'
                        });
                    }
                }, error => {
                    CommonUtil.handleError(error);
                });
    }

    goBack() {
        this.route.navigate(['/visitor']);
    }
}
