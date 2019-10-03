import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-code-gen',
  templateUrl: './code-gen.component.html',
  styleUrls: ['./code-gen.component.css']
})
export class CodeGenComponent implements OnInit {

  textValue:string = '';
  handyResult:string = '';

  constructor() { 
   
  }

  ngOnInit() {
  }

  forLoop(type){
    if(this.textValue != ''){
      this.convertCamelCase();
      let array:string = '';
      let item:string = '';
      if(this.textValue.substr(-1) != 's'){
        array= this.textValue + 's';
        item = this.textValue;
      }
      else{
        array= this.textValue;
        item = this.textValue.slice(0, -1);
      }
      if(type == 'of'){
        this.handyResult = `for(let ${item} of ${array}){
                                 //your logic 
                            }`;
      }
      else{
        this.handyResult = `for(let index in ${array}){\n    //your logic \n}`;
      }
    }
  }

  convertSnakeCase(){
    if(this.textValue != ''){     
      this.textValue = _.snakeCase(this.textValue); 
    }
  }

  convertLowerCase(){
    if(this.textValue != ''){     
      this.textValue = this.textValue.toLowerCase(); 
    }
  }

  convertUpperCase(){
    if(this.textValue != ''){     
      this.textValue = this.textValue.toUpperCase(); 
    }
  }

  toPascalCase() {
    if(this.textValue != ''){
      this.textValue =  `${this.textValue}`
      .replace(new RegExp(/[-_]+/, 'g'), ' ')
      .replace(new RegExp(/[^\w\s]/, 'g'), '')
      .replace(
        new RegExp(/\s+(.)(\w+)/, 'g'),
        ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
      )
      .replace(new RegExp(/\s/, 'g'), '')
      .replace(new RegExp(/\w/), s => s.toUpperCase());
    }
  }

  toHyphenCase(){
    if(this.textValue != ''){
      this.textValue = this.textValue.replace(/ +/g, '-').toLowerCase();
    }
  }

  convertSentence(){
    if(this.textValue != ''){     
      this.textValue = _.capitalize(this.textValue); 
    }
  }

  toTitleCase() {
    if(this.textValue != ''){
      this.textValue = this.textValue.replace(/\w\S/g, function(t) { return t.toUpperCase() });
    }
  }
  convertCamelCase(){
    if(this.textValue != ''){     
      this.textValue = _.camelCase(this.textValue); 
    }
  }
}
