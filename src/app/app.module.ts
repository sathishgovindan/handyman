import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightModule } from 'ngx-highlightjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeGenComponent } from './component/code-gen/code-gen.component';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';

export function hljsLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'javascript', func: javascript}
  ];
}

@NgModule({
  declarations: [
    AppComponent,
    CodeGenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    }) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
