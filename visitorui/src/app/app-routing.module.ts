import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { RoleListComponent } from './role/role-list.component'
import { CreateRoleComponent } from './role/create-role.component'
import { UserListComponent } from './user/user-list.component'
import { CreateUserComponent } from './user/create-user.component'
import { VisitorListComponent } from './visitor/visitor-list.component'
import { CreateVisitorComponent } from './visitor/create-visitor.component'
import { EmployeeListComponent } from './employee/employee-list.component'
import { EmployeeAddComponent } from './employee/employee-add.component'
import { DepartmentListComponent } from './department/department-list.component'
import { EditUserComponent } from './user/edit-user.component';
import { ChangePasswordComponent } from './user/change-password.component';
import { EmployeeEditComponent } from './employee/employee-edit.component'
import { EditVisitorComponent } from './visitor/edit-visitor.component';
import { VisitorDetailComponent } from './visitor/visitor-detail.component';
import { EditRoleComponent } from './role/edit-role.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'role', component: RoleListComponent },
  { path: 'role/createrole', component: CreateRoleComponent },
  { path: 'user', component: UserListComponent },
  { path: 'user/createuser', component: CreateUserComponent },
  { path: 'user/edit/:id', component: EditUserComponent },
  { path: 'visitor', component: VisitorListComponent },
  { path: 'visitor/createvisitor', component: CreateVisitorComponent },
  { path: 'employee', component: EmployeeListComponent },
  { path: 'employee/addemployee', component: EmployeeAddComponent },
  { path: 'department', component: DepartmentListComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  { path: 'employee/edit/:id', component: EmployeeEditComponent },
  { path: 'visitor', component: VisitorListComponent },
  { path: 'visitor/createvisitor', component: CreateVisitorComponent },
  { path: 'visitor/edit/:id', component: EditVisitorComponent },
  { path: 'visitor/detail/:id', component: VisitorDetailComponent },
  { path: 'role/edit/:id', component: EditRoleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
