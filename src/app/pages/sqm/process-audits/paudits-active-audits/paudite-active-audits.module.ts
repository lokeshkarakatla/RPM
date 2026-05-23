import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveauditsReferenceComponent } from './activeaudits-reference/activeaudits-reference.component';

// 1. Declare the routes FIRST
const routes: Routes = [
  {
    path: 'reference',
    component: ActiveauditsReferenceComponent
  }
];

// 2. Use them in the module AFTERWARDS
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PauditeActiveAuditsModule { }