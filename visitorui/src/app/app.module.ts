import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WebcamModule } from 'ngx-webcam';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { CreateUserComponent } from './user/create-user.component';
import { UserListComponent } from './user/user-list.component';
import { CreateRoleComponent } from './role/create-role.component';
import { RoleListComponent } from './role/role-list.component';
import { DepartmentListComponent } from './department/department-list.component';
import { VisitorListComponent } from './visitor/visitor-list.component';
import { CreateVisitorComponent } from './visitor/create-visitor.component';
import { EmployeeListComponent } from './employee/employee-list.component';
import { EmployeeAddComponent } from './employee/employee-add.component'
import { FormsModule }   from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule} from '@angular/common/http'; 
import { HttpRequestInterceptor } from './infrastructure/interceptor.service';
import {ServiceUtil} from './infrastructure/service/serviceUtil.sevice';
import { WithNavbarComponent } from './with-navbar/with-navbar.component';
import { WithoutNavbarComponent } from './without-navbar/without-navbar.component';
import { HeaderMainComponent } from './header-main/header-main.component';
import { FooterMainComponent } from './footer-main/footer-main.component';
import {EditUserComponent} from './user/edit-user.component'
import {NgxPaginationModule} from 'ngx-pagination';
import { ChangePasswordComponent } from './user/change-password.component';
import {ConfirmEqualValidatorDirective} from './common/confirm-equal-validator.directive';
import { EmployeeEditComponent } from './employee/employee-edit.component';
import { EditRoleComponent } from './role/edit-role.component'
import { VisitorDetailComponent } from './visitor/visitor-detail.component';
import { EditVisitorComponent } from './visitor/edit-visitor.component';
import { GaurdNavbarComponent } from './gaurd-navbar/gaurd-navbar.component';
import {ScanImageComponent } from './scanImage/scan-image.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CreateUserComponent,
    UserListComponent,
    CreateRoleComponent,
    RoleListComponent,
    DepartmentListComponent,
    VisitorListComponent,    
    CreateVisitorComponent, 
    VisitorDetailComponent,
    EditVisitorComponent,
    EmployeeListComponent, 
    EmployeeAddComponent,
     WithNavbarComponent, 
     WithoutNavbarComponent, HeaderMainComponent, FooterMainComponent,EditUserComponent, 
     ChangePasswordComponent,
     ConfirmEqualValidatorDirective,
     EmployeeEditComponent,
     EditRoleComponent,
     GaurdNavbarComponent,
     ScanImageComponent
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    WebcamModule   
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    ServiceUtil
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
