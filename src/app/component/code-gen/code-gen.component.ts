import { Component } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-code-gen',
  templateUrl: './code-gen.component.html',
  styleUrls: ['./code-gen.component.css']
})
export class CodeGenComponent{

  textValue:string = '';
  handyResult:string = '';
  textOutValue:string = '';
  constructor() { 
   
  }

  /* To copy Text from Textbox */
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  /* To copy any Text */
  copyText(){
      let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = this.handyResult;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
  }

  resetResult(){
    this.handyResult = '';
    this.textOutValue = '';
  }

  forLoop(type){
    this.resetResult();
    if(this.textValue == '' || this.textValue == 'Your text' || this.textValue == 'yourObject'){
      this.textValue = 'yourArrayItem'
    }
    let array:string = '';
    let item:string = '';
    let textOutValue = _.camelCase(this.textValue);
    if(textOutValue.substr(-1) != 's'){
      array= textOutValue + 's';
      item = textOutValue;
    }
    else{
      array= textOutValue;
      item = textOutValue.slice(0, -1);
    }
    if(type == 'of'){
      this.handyResult = `for (let ${item} of ${array}){\n    //your logic \n}`;
    }
    else if(type == 'in'){
      this.handyResult = `for (let index in ${array}){\n    //your logic \n}`;
    }
    else if(type == 'each'){
      this.handyResult = `${array}.forEach(function (${item}, index, theArray) {\n    //your logic \n});`;
    }
    else{
      this.handyResult = `for (index = 0; index < ${array}.length; ++index) {\n    //your logic \n}`;
    }
           
  }

  forOfObject(type){
    this.resetResult();    
    if(this.textValue == '' || this.textValue == 'yourArrayItem' || this.textValue == 'Your text'){
      this.textValue = 'yourObject'
    }  
    let textOutValue = _.camelCase(this.textValue); 
    if(type == 'Entries'){
      this.handyResult = `for (const [key, value] of Object.entries(${textOutValue})) {\n    //your logic\n}`;
    }
    else if(type == 'Keys'){
      this.handyResult = `for (const key of Object.keys(${textOutValue})) {\n    //your logic\n}`;
    }
    else{
      this.handyResult = `for (const value of Object.values(${textOutValue})) {\n    //your logic\n}`;
    }          
  }

  forEachOfObject(type){
    this.resetResult();
    if(this.textValue == '' || this.textValue == 'yourArrayItem' || this.textValue == 'Your text'){
      this.textValue = 'yourObject'
    }
    let textOutValue = _.camelCase(this.textValue);
    if(type == 'Entries'){
      this.handyResult = `Object.entries(${textOutValue}).forEach(([key, value]) => { \n    //your logic\n});`;
    }
    else if(type == 'Keys'){
      this.handyResult = `Object.keys(${textOutValue}).forEach((key) => { \n    //your logic\n});`;
    }
    else{
      this.handyResult = `Object.values(${textOutValue}).forEach((value) => { \n    //your logic\n});`;
    }           
  }  

  addYourText(){
    if(this.textValue == '' || this.textValue == 'yourArrayItem' || this.textValue == 'yourObject'){
      this.textValue = 'Your text'
    }
  }

  convertSnakeCase(){
    this.resetResult(); 
    this.addYourText();  
    this.textOutValue = this.textValue;   
    this.textOutValue = _.snakeCase(this.textOutValue);     
  }

  convertLowerCase(){
    this.resetResult();
    this.addYourText();         
    this.textOutValue = this.textValue;   
    this.textOutValue = this.textOutValue.toLowerCase();     
  }

  convertUpperCase(){
    this.resetResult();
    this.addYourText();
    this.textOutValue = this.textValue;
    this.textOutValue = this.textOutValue.toUpperCase();     
  }

  toPascalCase() {
    this.resetResult();
    this.addYourText();
    this.textOutValue = this.textValue;
    this.textOutValue =  `${this.textOutValue}`
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w+)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\s/, 'g'), '')
    .replace(new RegExp(/\w/), s => s.toUpperCase());  
  }

  toHyphenCase(){
    this.resetResult();
    this.addYourText();    
    this.textOutValue = this.textValue;
    this.textOutValue = this.textOutValue.replace(/ +/g, '-').toLowerCase();    
  }

  convertSentence(){
    this.resetResult();
    this.addYourText();
    this.textOutValue = this.textValue;     
    this.textOutValue = _.capitalize(this.textOutValue);     
  }  

  toTitleCase() {
    this.resetResult();
    this.addYourText();
    let sentence = this.textValue.toLowerCase().split(" ");
    for (var i = 0; i< sentence.length; i++){
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    this.textOutValue = sentence.join(" ");          
  }

  convertCamelCase(){
    this.resetResult();
    this.addYourText();
    this.textOutValue = this.textValue;
    this.textOutValue = _.camelCase(this.textOutValue);     
  }  
}
