import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// ✅ ADDED: FormsModule is required for [(ngModel)] in your dropdowns and checkboxes
import { FormsModule } from '@angular/forms';
 import { MatDialogModule } from '@angular/material/dialog';
// ✅ ADDED: All required Material Imports for your setup components
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

// Component Imports
import { PartsSetupComponent } from './parts-setup.component';
import { AuditCategoriesComponent } from './audit-categories/audit-categories.component';
import { PartsFamiliesComponent } from './parts-families/parts-families.component';
import { PartsMasterComponent } from './parts-master/parts-master.component';
import { AddPartCategoryComponent } from './audit-categories/add-part-category/add-part-category.component';
import { AddPartsFamilypopComponent } from './parts-families/add-parts-familypop/add-parts-familypop.component';
import { AddPartspopComponent } from './parts-master/add-partspop/add-partspop.component';
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: PartsSetupComponent,
    children: [
      { path: 'parts-cat', component: AuditCategoriesComponent },
      { path: 'families', component: PartsFamiliesComponent },
      { path: 'master', component: PartsMasterComponent },
      
      // Makes "Parts Audit Categories" open by default
      { path: '', redirectTo: 'parts-cat', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    PartsSetupComponent,
    AuditCategoriesComponent,
    PartsFamiliesComponent,
    PartsMasterComponent,
    AddPartCategoryComponent,
    AddPartsFamilypopComponent,
    AddPartspopComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // ✅ ADDED: Include the new modules here
    FormsModule,
    
    MatPaginatorModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
]
    MatCardModule,
MatDialogModule,
CommonModule
  ]
})
export class PartsSetupModule { }