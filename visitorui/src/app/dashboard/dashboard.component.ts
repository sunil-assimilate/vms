import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 isAdmin:boolean;
  constructor() { }
  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user'));     
      if(user.role.toLowerCase()=='security'){
        this.isAdmin=false;  
      }
      else
      {
        this.isAdmin=true;  
      }
  }

}
