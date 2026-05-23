import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
// Angular Material Imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';

// Components
import { ProcessAuditsComponent } from './process-audits.component';
import { PauditsNewAuditComponent } from './paudits-new-audit/paudits-new-audit.component';
import { PauditsActiveAuditsComponent } from './paudits-active-audits/paudits-active-audits.component';
import { PauditsSetupComponent } from './paudits-setup/paudits-setup.component';
import { PauditsAlertsComponent } from './paudits-alerts/paudits-alerts.component';
import { PauditsCompletedAuditsComponent } from './paudits-completed-audits/paudits-completed-audits.component';
import { PauditsHelpDeskComponent } from './paudits-help-desk/paudits-help-desk.component';
import { PauditsUserManualComponent } from './paudits-user-manual/paudits-user-manual.component';
import { PauditsActionsComponent } from './paudits-actions/paudits-actions.component';
import { ActiveauditsReferenceComponent } from './paudits-active-audits/activeaudits-reference/activeaudits-reference.component';

const routes: Routes = [
  {
    path: '',
    component: ProcessAuditsComponent,
    children: [
      // DEFAULT REDIRECT: Opens Analytics automatically
      { path: '', redirectTo: 'analytics', pathMatch: 'full' },
      
      // ✅ LAZY LOAD THE ANALYTICS MODULE
      // This tells Angular to look inside paudits-analytics.module.ts for the tab routes
      { 
        path: 'analytics', 
        loadChildren: () => import('./paudits-analytics/paudits-analytics.module').then(m => m.PauditsAnalyticsModule) 
      },
      
      // Child Routes (These load into the right-side content area)
      { path: 'new-audit', component: PauditsNewAuditComponent },
      { path: 'active-audits', component: PauditsActiveAuditsComponent },
      { path: 'reference', component: ActiveauditsReferenceComponent },
      { path: 'setup', component: PauditsSetupComponent },
      { path: 'alerts', component: PauditsAlertsComponent },
      { path: 'completed-audits', component: PauditsCompletedAuditsComponent },
      { path: 'user-manual', component: PauditsUserManualComponent },
      { path: 'help-desk', component: PauditsHelpDeskComponent },
      { path: 'actions', component: PauditsActionsComponent }
    ]
  }
];

@NgModule({
  declarations: [
    ProcessAuditsComponent, 
    PauditsNewAuditComponent,
    PauditsActiveAuditsComponent,
    PauditsSetupComponent,
    PauditsAlertsComponent,
    PauditsCompletedAuditsComponent,
    PauditsUserManualComponent,
    PauditsHelpDeskComponent,
    PauditsActionsComponent,
    ActiveauditsReferenceComponent
    // Notice how all the Analytics child components are GONE from here!
    // They belong in paudits-analytics.module.ts now.
  ],
imports: [
  CommonModule,
  RouterModule.forChild(routes),
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  CanvasJSAngularChartsModule,
  HighchartsChartModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
]
})
export class ProcessAuditsModule { }