import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';

import { PauditsAnalyticsComponent } from './paudits-analytics.component';
import { AnalyticsCommodityComponent } from './analytics-commodity/analytics-commodity.component';
import { AnalyticsPerformanceComponent } from './analytics-performance/analytics-performance.component';
import { AnalyticsActionsComponent } from './analytics-actions/analytics-actions.component';
import { AnalyticsScatterComponent } from './analytics-scatter/analytics-scatter.component';
import { AnalyticsBellcurveComponent } from './analytics-bellcurve/analytics-bellcurve.component';
import { AnalyticsParetoComponent } from './analytics-pareto/analytics-pareto.component';
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'; //
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

const routes: Routes = [
  {
    path: '',
    component: PauditsAnalyticsComponent,
    children: [
      { path: '', redirectTo: 'commodity', pathMatch: 'full' },

      { path: 'commodity', component: AnalyticsCommodityComponent },
      { path: 'performance', component: AnalyticsPerformanceComponent },
      { path: 'actions', component: AnalyticsActionsComponent },
      { path: 'scatter', component: AnalyticsScatterComponent },
      { path: 'bell-curve', component: AnalyticsBellcurveComponent },
      { path: 'pareto', component: AnalyticsParetoComponent }
    ]
  }
];

@NgModule({
  declarations: [
    PauditsAnalyticsComponent,
    AnalyticsCommodityComponent,
    AnalyticsPerformanceComponent,
    AnalyticsActionsComponent,
    AnalyticsScatterComponent,
    AnalyticsBellcurveComponent,
    AnalyticsParetoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HighchartsChartModule,
    MatIconModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    CanvasJSAngularChartsModule
]
})
export class PauditsAnalyticsModule { }