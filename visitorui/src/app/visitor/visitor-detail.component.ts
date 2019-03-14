import { Component, OnInit } from '@angular/core';
import { Visitor } from '../models/visitor.model';
import { ServiceUtil } from '../infrastructure/service/serviceUtil.sevice';
import { AppSettings } from '../infrastructure/appsettings';
import swal from "sweetalert2";

import { CommonUtil } from '../infrastructure/commonutil.component';
import { ServiceUrl } from '../infrastructure/service/serviceUrls.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-visitor',
  templateUrl: './visitor-detail.component.html',
  styleUrls: ['./visitor-detail.component.css']
})
export class VisitorDetailComponent implements OnInit {
  visitor: Visitor;
  visitorId: string;
  configuration: any;
  countries: any;
  departments: any;
  employees: any;
  states: any;

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
            this.countries =  this.configuration.countries;
            this.departments = this.configuration.departments;
            this.employees = this.configuration.employees;

            this.userDetail(this.visitorId);
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

  //To get visitor detail by id
  userDetail(id: string) { 
    this.serviceUtil.getData(AppSettings.base_url + ServiceUrl.visitor + this.visitorId)
      .subscribe((response: any) => {
        if (!response.isError) {
          this.visitor = response.model;
         this.visitor.image = "data:image/jpeg;base64,"+ this.visitor.image;
          // this.visitor.department = response.model.department;
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

  updateVisitor() {
this.serviceUtil.putData(AppSettings.base_url +ServiceUrl.visitor, this.visitor)
.subscribe(
  response => {
    if(!response.IsError) {

    }

  }
)

  }

  routeToList()
  {
   this.route.navigate(['/visitor']);
  }
}
