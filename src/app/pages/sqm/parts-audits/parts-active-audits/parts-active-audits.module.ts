import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Third-party imports needed for these components
import { HighchartsChartModule } from 'highcharts-angular';
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Angular Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

// Component Imports
import { PartsActiveAuditsComponent } from './parts-active-audits.component';
import { PartsReferenceComponent } from './parts-reference/parts-reference.component';

const routes: Routes = [
  {
    // The base path loads the main active audits table
    path: '', 
    component: PartsActiveAuditsComponent
  },
  {
    // This handles the routing when you click a reference link
    path: 'reference', 
    component: PartsReferenceComponent
  }
];

@NgModule({
  declarations: [
    PartsActiveAuditsComponent,
    PartsReferenceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HighchartsChartModule,
    NgxChartsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSelectModule
  ]
})
export class PartsActiveAuditsModule { }