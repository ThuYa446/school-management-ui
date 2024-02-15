import { Subject } from "./Subject";
export class Teacher{
    id:number;
    name:string;
    email:string;
    phNo:string;
    address:string;
    subjects: Subject[];
    createdAt:string;
    updatedAt:string;
}