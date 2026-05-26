import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';

// ✅ ADDED: Import CanvasJS for your Bell Curve chart
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

// Component Imports
import { PartsAnalyticsComponent } from './parts-analytics.component';
import { PartsCommodityComponent } from './parts-commodity/parts-commodity.component';
import { PartsPerformanceComponent } from './parts-performance/parts-performance.component';
import { PartsScatterComponent } from './parts-scatter/parts-scatter.component'; 
import { PartsBellcurveComponent } from './parts-bellcurve/parts-bellcurve.component';
import { PartsParetoComponent } from './parts-pareto/parts-pareto.component';
import { PartsInnerActionsComponent } from './parts-inner-actions/parts-inner-actions.component';

const routes: Routes = [
  {
    path: '',
    component: PartsAnalyticsComponent,
    children: [
      { path: 'commodity', component: PartsCommodityComponent },
      { path: 'performance', component: PartsPerformanceComponent },
      { path: 'analyticsactions', component: PartsInnerActionsComponent }, 
      { path: 'scatter', component: PartsScatterComponent },
      { path: 'bell-curve', component: PartsBellcurveComponent }, 
      { path: 'pareto', component: PartsParetoComponent },
      
      { path: '', redirectTo: 'commodity', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    PartsAnalyticsComponent,
    PartsCommodityComponent,
    PartsPerformanceComponent,
    PartsScatterComponent,
    PartsBellcurveComponent,
    PartsParetoComponent,
    PartsInnerActionsComponent 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    HighchartsChartModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    
    // ✅ ADDED: Add it to the imports array here
    CanvasJSAngularChartsModule 
  ]
})
export class PartsAnalyticsModule { }