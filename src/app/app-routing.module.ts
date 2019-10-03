import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeGenComponent } from './component/code-gen/code-gen.component';

const routes: Routes = [{ path: '', component: CodeGenComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
