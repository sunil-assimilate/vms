import { Dropdown } from './dropdown.model';

export class Visitor{
    constructor() {
        this.country = new Dropdown();
        this.state = new Dropdown();
        this.department= new Dropdown();
        this.toMeet = new Dropdown();
        this.photoIdType = new Dropdown();
    }
    id:number;
    firstName:string;
    lastName:string;
    contactNumber:string;
    email:string;
    country: Dropdown;
    state: Dropdown;
    address: string;
    zipCode:string;
    department:  Dropdown;
    toMeet: Dropdown;
    identityNumber:string;
    image: string;
    photoIdType: Dropdown;
    location: Dropdown;
    photoIdPath : string;
    imagePath:string;
    purpose:string;
    comment:string;
    inTime?:string;
    outTime:string;
    checkOut:string;
    checkIn:string;
}
 
