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
    console.log(user.role);     
      if(user.role=='admin'){
        this.isAdmin=true;  
      }
      else
      {
        this.isAdmin=false;  
      }
  }

}
