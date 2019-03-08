import { Dropdown } from './dropdown.model';

export class User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    contactNumber: string;
    password: string;
    confirmPassword: string;
    role: Dropdown;
}

