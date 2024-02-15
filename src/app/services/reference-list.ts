import {Injectable} from '@angular/core' 

@Injectable()
export class RpReferences {  
    _lov: any = {
      "string": [{ "value": "eq", "caption": "Equals" }, 
                  { "value": "c", "caption": "Contains" }, 
                  { "value": "bw", "caption": "Begins With" }, 
                  { "value": "ew", "caption": "End With" }],
      "numeric": [{ "value": "eq", "caption": "Equals" }, 
                  { "value": "gt", "caption": "Greater than" }, 
                  { "value": "lt", "caption": "Less than" }, 
                  { "value": "geq", "caption": "Greater than or Equal"}, 
                  { "value": "leq", "caption": "Less than or Equal" }, 
                  { "value": "bt", "caption": "Between" }],
    };
    _lov1: any = {
      "sort": [{ "value": "asc", "caption": "Ascending" }, 
               { "value": "desc", "caption": "Descending" }],

      "sort_alpha": [{ "value": "asc", "caption": "A-Z" }, 
               { "value": "desc", "caption": "Z-A" }],
    }
}