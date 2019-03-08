import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2'
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css']
})
export class HeaderMainComponent implements OnInit {
  profileName:string;
  subject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private route: Router) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.profileName= user.firstName+' '+user.lastName;
  }
  logout()
  {
    swal.fire({
      title: 'Are you sure to logout?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem('ServiceToken');
        localStorage.removeItem('user');
        this.subject.next(false);
        this.route.navigate(['/']);
        } else if (result.dismiss === swal.DismissReason.cancel) {
        
      }
    });
  }

}
