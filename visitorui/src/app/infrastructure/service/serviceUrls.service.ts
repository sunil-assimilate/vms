export class ServiceUrl {
    static validateUser = 'Account/Authenticate';
    static userList = 'User/Search';
    static userDetail = 'User';
    static createUser = 'User';
    static editUser = 'User';
    static getRoleList = 'Configuration';
    static changePassword = 'Account/ChangePassword';
    static resetPassword = 'Account/ResetPassword';
    //Role
    static role = 'role';
    static roleDetail='role/';
    //Department
    static getDepartmentList = 'department';
    static configuration ='configuration';
    //employee
    static employeeList = 'employee/search';
    static employeeDetail = "employee/";
    static createEmployee = 'employee';
    static editEmployee = 'employee';
    static dList = 'configuration';
    static importEmployee = 'Employee/Import';

    static visitorList = 'visitor/search';
    static visitor ='visitor/';
    static visitorCheckout = "visitor/checkout/"; 
}