import { Component, OnInit } from '@angular/core';
import { Visitor } from '../models/visitor.model';
import { ServiceUtil } from '../infrastructure/service/serviceUtil.sevice';
import { AppSettings } from '../infrastructure/appsettings';
import swal from "sweetalert2";

import { CommonUtil } from '../infrastructure/commonutil.component';
import { ServiceUrl } from '../infrastructure/service/serviceUrls.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css']
})
export class VisitorListComponent implements OnInit {
  search = {
    "sortType": "ASC",
    "sortBy": "",
    "pageNumber": 1,
    "pageSize": 10,
    "Text": ""
  }
  pager: any;
  collection = [];

  searchText: string;
  visitorList: Array<Visitor>;
  constructor(private serviceUtil: ServiceUtil, private route: Router, private _route: ActivatedRoute) {
    this.pager = {
      currentPage: 1,
      itemsPerPage: 8
    };

    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }

    this._route.queryParams.subscribe(params => {
      this.pager.currentPage = params.page;
    });
  }

  pageChange(newPage: number) {
    this.route.navigate(['/visitor'], { queryParams: { page: newPage } });
  }
  ngOnInit() {
    this.getVisitors();
  }

  getVisitors() {
    this.serviceUtil.postData(AppSettings.base_url + ServiceUrl.visitorList, this.search)
      .subscribe(
        response => {
          if (!response.IsError) {
            this.visitorList = response.model;
          }
          else {
            swal.fire({
              type: 'error', text: response.message, showCancelButton: false,
              confirmButtonText: 'OK'
            });
          }
        }, error => {
          CommonUtil.handleError(error);
        }
      )
  }

  checkOut(id) {
    this.serviceUtil.putData(AppSettings.base_url + ServiceUrl.visitorCheckout + id, this.search)
      .subscribe(
        response => {
          if (!response.IsError) {
            this.visitorList = response.model;
          }
          else {

          }
        }
      )
  }

  searchVisitor() {
    this.search.Text = this.searchText;
    this.getVisitors();
  }
}