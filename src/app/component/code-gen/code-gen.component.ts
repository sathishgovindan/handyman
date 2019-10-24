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
  textOutValue:string = '';
  lineNumber:number = 0;
  constructor() { 
   
  }

  ngOnInit() {
  }

  forLoop(type){
    if(this.textValue != ''){
      this.convertCamelCase();
      let array:string = '';
      let item:string = '';
      if(this.textOutValue.substr(-1) != 's'){
        array= this.textOutValue + 's';
        item = this.textOutValue;
      }
      else{
        array= this.textOutValue;
        item = this.textOutValue.slice(0, -1);
      }
      if(type == 'of'){
        this.handyResult = `for(let ${item} of ${array}){\n    //your logic \n}`;
      }
      else if(type == 'in'){
        this.handyResult = `for(let index in ${array}){\n    //your logic \n}`;
      }
      else if(type == 'each'){
        this.handyResult = `${array}.forEach(function (${item}, index, theArray) {\n    //your logic \n});`;
      }
      else{
        this.handyResult = `for (index = 0; index < ${array}.length; ++index) {\n    //your logic \n}`;
      }
    }
    this.codeView();   
  }

  forOfObject(type){
    if(this.textValue != ''){
      this.convertCamelCase();      
      if(type == 'Entries'){
        this.handyResult = `for (const [key, value] of Object.entries(${this.textOutValue})) {\n    //your logic\n}`;
      }
      else if(type == 'Keys'){
        this.handyResult = `for (const key of Object.keys(${this.textOutValue})) {\n    //your logic\n}`;
      }
      else{
        this.handyResult = `for (const value of Object.values(${this.textOutValue})) {\n    //your logic\n}`;
      }
    }
    this.codeView();   
  }

  forEachOfObject(type){
    if(this.textValue != ''){
      this.convertCamelCase();      
      if(type == 'Entries'){
        this.handyResult = `Object.entries(${this.textOutValue}).forEach(([key, value]) => { \n    //your logic\n});`;
      }
      else if(type == 'Keys'){
        this.handyResult = `Object.keys(${this.textOutValue}).forEach((key) => { \n    //your logic\n});`;
      }
      else{
        this.handyResult = `Object.values(${this.textOutValue}).forEach((value) => { \n    //your logic\n});`;
      }
    }
    this.codeView();   
  }  

  convertSnakeCase(){
    if(this.textValue != ''){  
      this.textOutValue = this.textValue;   
      this.textOutValue = _.snakeCase(this.textOutValue); 
    }
  }

  convertLowerCase(){
    if(this.textValue != ''){     
      this.textOutValue = this.textValue;   
      this.textOutValue = this.textOutValue.toLowerCase(); 
    }
  }

  convertUpperCase(){
    if(this.textValue != ''){     
      this.textOutValue = this.textValue;
      this.textOutValue = this.textOutValue.toUpperCase(); 
    }
  }

  toPascalCase() {
    if(this.textValue != ''){
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
  }

  toHyphenCase(){
    if(this.textValue != ''){
      this.textOutValue = this.textValue;
      this.textOutValue = this.textOutValue.replace(/ +/g, '-').toLowerCase();
    }
  }

  convertSentence(){
    if(this.textValue != ''){
      this.textOutValue = this.textValue;     
      this.textOutValue = _.capitalize(this.textOutValue); 
    }    
  }  

  toTitleCase() {
    if(this.textValue != ''){
      let sentence = this.textValue.toLowerCase().split(" ");
      for(var i = 0; i< sentence.length; i++){
          sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
      }
      this.textOutValue = sentence.join(" ");      
    }
  }

  convertCamelCase(){
    if(this.textValue != ''){     
      this.textOutValue = this.textValue;
      this.textOutValue = _.camelCase(this.textOutValue); 
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  codeView() {
    this.lineNumber = this.handyResult.split(/\n/).length;
  }
  
  changeCodeFontSize(size) {
    if (size == 0) { return }
    var elements = document.getElementsByTagName('pre')
    for (var i = 0; i < elements.length; i++) {
      elements[i].style['font-size'] = size + 'px'
    }
  }
  
  codeCopy(id) {
    var element = document.getElementById(id)
    var text = element.innerHTML
    //text.select
    element.focus
  
    try {
      document.execCommand('copy')
      this.copyCodeToClipboard(text, id)
    } catch (err) {
      console.error('Something went wrong to copy to clipboard', err)
    }
  }
  
  copyCodeToClipboard(text, id) {
    if (!navigator.clipboard) {
      console.warn('Re-try')
      this.codeCopy(id)
      return
    }
    navigator.clipboard.writeText(text).then(function () {
      // done
    }, function (err) {
      console.error('Could not copy text: ', err)
    })
  }
}
