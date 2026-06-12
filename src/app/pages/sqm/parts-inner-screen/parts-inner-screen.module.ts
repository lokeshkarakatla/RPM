import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// --- ADDED FORMS MODULES (Required for formControlName and ngModel) ---
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

// --- ANGULAR MATERIAL IMPORTS ---
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';   // <-- FIXES THE BUTTONS
import { MatTooltipModule } from '@angular/material/tooltip'; // <-- FIXES TOOLTIPS ON ICONS
import { PartsInnerScreenComponent } from './parts-inner-screen.component';
import { PartsAuditDetailsComponent } from './parts-audit-details/parts-audit-details.component';
import { PartsAuditReferenceComponent } from './parts-audit-reference/parts-audit-reference.component';
import { PartsCompletedReferenceComponent } from './parts-completed-reference/parts-completed-reference.component';
import { AuditrefRemarksPopComponent } from './parts-audit-reference/auditref-remarks-pop/auditref-remarks-pop.component';
import { MatDialogModule } from "@angular/material/dialog";

// Import your components
 
 

const routes: Routes = [
  {
    path: '',
    component: PartsInnerScreenComponent, 
    children: [
       
      { path: 'parts-audit-details', component: PartsAuditDetailsComponent },
      { path: 'parts-audit-reference', component: PartsAuditReferenceComponent },
       { path: 'parts-completed-reference', component: PartsCompletedReferenceComponent },
 
      
      { path: '', redirectTo: 'parts-audit-details', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // --- ADD THE MISSING MODULES HERE ---
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule
],
  exports: [RouterModule],
  declarations: [
   PartsAuditDetailsComponent ,
   PartsAuditReferenceComponent ,
   PartsCompletedReferenceComponent,
   AuditrefRemarksPopComponent
  ]
})
export class PartsInnerScreen { }