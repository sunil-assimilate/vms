import { Component, OnInit } from '@angular/core';
import{Role} from'../models/role.model';
import {AppSettings} from '../infrastructure/appsettings'
import {ServiceUrl} from '../infrastructure/service/serviceUrls.service'
import { ServiceUtil } from '../infrastructure/service/serviceUtil.sevice';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
   

  config:any;
  collection=[];
roleList:Array<Role>;
constructor(private serviceUtil: ServiceUtil, private route: ActivatedRoute, private router: Router) {
  this.config = {
    currentPage: 1,
    itemsPerPage: 5
  };

  this.route.queryParams.subscribe(params => {
    this.config.currentPage = params.page;
  });
  for (let i = 1; i <= 100; i++) {
    this.collection.push(`item ${i}`);
  }
}
pageChange(newPage: number) {
  this.router.navigate(['/role'], { queryParams: { page: newPage } });
}
  ngOnInit() { 
    this.loadRoleList();
  } 
  //To fetch user list 
  loadRoleList(){
  this.serviceUtil.getData(AppSettings.base_url+ServiceUrl.role).subscribe(
    response=>{
      if(!response.IsError)
      {
        this.roleList = response.model;
       //console.log("hi");
       //alert('Save');
      }
      else
      {
        alert('error');
      }
    }
  )
}}

