import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RpReferences } from '../services/reference-list';
declare var $: any;
@Component({
  selector: 'advance-search',
  templateUrl: './adv-search.component.html',
  styleUrls: ['./adv-search.component.css']
})
export class AdvSearchComponent implements OnInit {

  @Input() rpFields :any;

  @Output() rpChanged: any = new EventEmitter();

  _count : number = 0;
  _advFields : any = [];
  _index: any;
  _temp = [];
  _fildName = [];
  _value = {"id":""};
  _searchData = [];

  constructor( public ref: RpReferences) { 

  }

  ngOnInit() {
    this.initSearchObj()
  }

  initSearchObj(){
    this._count = this.rpFields.length;
    let initvalue = {"caption":"","value":"","type":"","condition":"","sorting":"","between":false,"text1":"","text2":"","fields":[]};
    initvalue.caption = this.rpFields[0].caption;
    initvalue.value = this.rpFields[0].value;
    initvalue.type = this.rpFields[0].type;
    initvalue.condition = this.rpFields[0].condition;
    initvalue.sorting = this.rpFields[0].sorting;
    initvalue.between = this.rpFields[0].between;
    initvalue.text1 = this.rpFields[0].text1;
    initvalue.text2 = this.rpFields[0].text2;
    initvalue.fields = this.rpFields;
    this._advFields[0] = initvalue;
  }

  addFilter(){
    let _newObj  = [];
    let flag = true;
    this._temp = this._advFields[(this._advFields.length-1)].fields; // Add All Fields to temp Array
    this._value.id = this._advFields[(this._advFields.length - 1)].value ; // 1 or 2 or 3

    for (let j = 0; j < this._fildName.length; j++) {
      if (this._value.id == this._fildName[j].id) {
        flag = false;
      }
    }
    if(flag) {
      this._fildName.push(this._value);
    }
    for (let i = 0; i < this._temp.length; i++) {
      for (let j = 0; j < this._fildName.length; j++) {
        if (this._temp[i].value != this._fildName[j].id) {
          _newObj.push(this._temp[i]);
        }
      }
    }    
    if (this._count > 1 && _newObj != undefined) {
      let k = { "value": "", "caption": "", "type": "", "condition": "","sorting":"", "between":false, "text1": "", "text2": "", "fields": [] };
      k.value = _newObj[0].value;
      k.caption = _newObj[0].caption;
      k.type = _newObj[0].type;
      k.condition = _newObj[0].condition;
      k.sorting = _newObj[0].sorting;
      k.between = _newObj[0].between;
      k.text1 = _newObj[0].text1;
      k.text2 = _newObj[0].text2;
      k.fields = _newObj;
      this._advFields[this._advFields.length] = k;
      this._count = this._count - 1;
    }  
  }

  removeFilter(p) {
    if (this._count < this.rpFields.length) {
      let index = this._advFields.indexOf(p);
      let field = p.value;
      for (let j = 0; j < this._fildName.length; j++) {
        if (field == this._fildName[j].id) {
          this._fildName.splice(j,1);
        }
      }
      let flag = true;
      for (let i = 0; i < this._advFields[(this._advFields.length - 1)].fields.length; i++) {
        if (field == this._advFields[(this._advFields.length - 1)].fields[i].value) {
          flag = false;
        }
      }
      if(flag){
        let k = { "value": "", "caption": "", "type": "", "condition": "","sorting":"","between":false, "text1": "", "text2": ""};
        k.value = p.value;
        k.caption = p.caption;
        k.type = p.type;
        k.condition = p.condition;
        k.sorting = p.sorting;
        k.between = p.between;
        k.text1 = p.text1;
        k.text2 = p.text2;
        this._advFields[(this._advFields.length - 1)].fields.push(k);
      }      
      this._advFields.splice(index, 1);
      if(this._advFields.length == 1){
        this._advFields[0].fields = this.rpFields;
      }
      this._count = this._count+1;
    }
  }

  getIndex(obj){
    this._index = this._advFields.indexOf(obj);
  }

  changeField(field){
    for(let i = 0; i < this.rpFields.length; i++){
      if(this.rpFields[i].value == field){
          this._advFields[this._index].value = this.rpFields[i].value;
          this._advFields[this._index].caption = this.rpFields[i].caption;
          this._advFields[this._index].type = this.rpFields[i].type;
          this._advFields[this._index].condition = this.rpFields[i].condition; 
          this._advFields[this._index].between = this.rpFields[i].between; 
          this._advFields[this._index].text1 = this.rpFields[i].text1;
          this._advFields[this._index].text2 = this.rpFields[i].text2;    
      }
    } 
  }

  enableFilter(sign){
    let index = this._index;
    if(sign=="bt"){
      this._advFields[index].between = true;
    }else{
      this._advFields[index].between = false;
    }
  }

  sortFilter(sorting) {
    let index = this._index;
    if(sorting == "asc"){
      this._advFields[index].sorting = "asc";
    }else if (sorting == "desc"){
      this._advFields[index].sorting = "desc";
    }else {
      this._advFields[index].sorting = "";
    }
  }

  advSearch(){
    this._searchData =[];
    for (let i = 0; i < this._advFields.length; i++) {
      let obj = { "value": "", "caption": "", "type": "", "condition": "","sorting":"","between":false, "text1": "", "text2": ""};
      obj.value = this._advFields[i].value;
      obj.caption = this._advFields[i].caption;
      obj.type = this._advFields[i].type;
      obj.condition = this._advFields[i].condition;
      obj.sorting = this._advFields[i].sorting;
      obj.between = this._advFields[i].between;
      obj.text1 = this._advFields[i].text1;
      obj.text2 = this._advFields[i].text2;
      this._searchData.push(obj);
    }
    this.rpChanged.emit(this._searchData);
    $("#advsearchModal").modal('hide');
  }

  clearFilter() {
    this._count =this.rpFields.length;
    this._advFields = [];
    this._temp = [];
    this._value = { "id": "" };
    this._fildName = [];
    this.initSearchObj();
  }

}
