import { Subject } from "./Subject";
export class Teacher{
    id:number;
    name:string;
    email:string;
    phoneNo:string;
    address:string;
    subjects: Subject[];
    createdAt:string;
    updatedAt:string;
}