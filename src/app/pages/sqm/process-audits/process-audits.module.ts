import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- ADDED for [(ngModel)]

// Angular Material Imports
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox'; // <-- ADDED for <mat-checkbox>

// Charting Modules
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgxChartsModule } from '@swimlane/ngx-charts'; // <-- ADDED for <ngx-charts-pie-chart>

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
import { PauditsAlertsDetailsComponent } from './paudits-alerts/paudits-alerts-details/paudits-alerts-details.component';
import { ProcessAuditsCategoriesComponent } from './paudits-setup/process-audits-categories/process-audits-categories.component';
import { CommodityMasterComponent } from './paudits-setup/commodity-master/commodity-master.component';
import { AddProcessCategoryPopComponent } from './paudits-setup/process-audits-categories/add-process-category-pop/add-process-category-pop.component';
import { AddCommodityPopComponent } from './paudits-setup/commodity-master/add-commodity-pop/add-commodity-pop.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ActionDescRemarksComponent } from './paudits-actions/action-desc-remarks/action-desc-remarks.component';
import { ProcessActionsGridComponent } from './paudits-actions/process-actions-grid/process-actions-grid.component';
import { ProcessActionsEditComponent } from './paudits-actions/process-actions-edit/process-actions-edit.component';
import { ProcessDocPopComponent } from './paudits-actions/process-doc-pop/process-doc-pop.component';


const routes: Routes = [
  {
    path: '',
    component: ProcessAuditsComponent,
    children: [
      { path: '', redirectTo: 'analytics', pathMatch: 'full' },
      {
        path: 'analytics',
        loadChildren: () => import('./paudits-analytics/paudits-analytics.module').then(m => m.PauditsAnalyticsModule)
      },
      { path: 'new-audit', component: PauditsNewAuditComponent },
      { path: 'active-audits', component: PauditsActiveAuditsComponent },
      { path: 'reference', component: ActiveauditsReferenceComponent },
      { path: 'details', component: PauditsAlertsDetailsComponent },
      {
        path: 'setup',
        component: PauditsSetupComponent,
        children: [
          // Default redirect to Process Audit Categories when they click "Setup"
          { path: '', redirectTo: 'process-cat', pathMatch: 'full' },

          // The two child tabs
          { path: 'process-cat', component: ProcessAuditsCategoriesComponent },
          { path: 'commodity', component: CommodityMasterComponent }
        ]
      },
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
    PauditsActiveAuditsComponent,
    PauditsSetupComponent,
    PauditsAlertsComponent,
    PauditsCompletedAuditsComponent,
    PauditsUserManualComponent,
    PauditsHelpDeskComponent,
    PauditsActionsComponent,
    ActiveauditsReferenceComponent,
    PauditsAlertsDetailsComponent,
    ProcessAuditsCategoriesComponent,
    CommodityMasterComponent,
    AddProcessCategoryPopComponent,
    AddCommodityPopComponent,
    PauditsNewAuditComponent,
    ActionDescRemarksComponent,
    ProcessActionsGridComponent,
    ProcessActionsEditComponent,
    ProcessDocPopComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,             // <-- ADDED
    NgxChartsModule,         // <-- ADDED (Fixes your current error)
    MatCheckboxModule,       // <-- ADDED
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
    ReactiveFormsModule,
    MatCardModule,     // ← Add this
    MatDialogModule,   // ← Add this
    RouterModule,
    
  
  ]
})
export class ProcessAuditsModule { }