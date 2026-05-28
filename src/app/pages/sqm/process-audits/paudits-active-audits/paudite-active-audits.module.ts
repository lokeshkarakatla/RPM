import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';

import { ActiveauditsReferenceComponent } from './activeaudits-reference/activeaudits-reference.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ActiveGridDialogComponent } from './activeaudits-reference/active-grid-dialog/active-grid-dialog.component';

const routes: Routes = [
  { path: 'reference', component: ActiveauditsReferenceComponent }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    MatSelectModule,
    MatCheckboxModule



  ],
  exports: [RouterModule],
  declarations: [
   

  ]
})
export class PauditeActiveAuditsModule { }