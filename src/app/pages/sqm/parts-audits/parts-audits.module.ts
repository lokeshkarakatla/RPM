import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HighchartsChartModule } from 'highcharts-angular';

// Material Imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';

// Component Imports
import { PartsAuditsComponent } from './parts-audits.component';
import { PartsCompletedAuditsComponent } from './parts-completed-audits/parts-completed-audits.component';
import { PartsActionsComponent } from './parts-actions/parts-actions.component';
import { PartsUserManualComponent } from './parts-user-manual/parts-user-manual.component';
import { HelpDeskComponent } from './help-desk/help-desk.component';
import { NewAuditComponent } from './new-audit/new-audit.component';
import { ViewDocPhotosComponent } from './parts-actions/view-doc-photos/view-doc-photos.component';

// ❌ REMOVED PartsAlertsComponent and PartsAlertsDetailsComponent

const routes: Routes = [
  {
    path: '',
    component: PartsAuditsComponent,
    children: [
      {
        path: 'analytics',
        loadChildren: () => import('./parts-analytics/parts-analytics.module').then(m => m.PartsAnalyticsModule)
      },
      // ✅ CHANGED: Lazy load the new Active Audits module
      {
        path: 'active-audits',
        loadChildren: () => import('./parts-active-audits/parts-active-audits.module').then(m => m.PartsActiveAuditsModule)
      },
      { 
        path: 'setup', 
        loadChildren: () => import('./parts-setup/parts-setup.module').then(m => m.PartsSetupModule) 
      },
      // ✅ CHANGED: Lazy load the new Alerts module
      {
        path: 'alerts',
        loadChildren: () => import('./parts-alerts/parts-alerts.module').then(m => m.PartsAlertsModule)
      },
      { path: 'new-audit', component: NewAuditComponent },
      { path: 'completed-audits', component: PartsCompletedAuditsComponent },
      { path: 'actions', component: PartsActionsComponent },
      { path: 'user-manual', component: PartsUserManualComponent },
      { path: 'help-desk', component: HelpDeskComponent },

      { path: '', redirectTo: 'analytics', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    PartsAuditsComponent,
    PartsCompletedAuditsComponent,
    PartsActionsComponent,
    PartsUserManualComponent,
    HelpDeskComponent,
    NewAuditComponent,
    ViewDocPhotosComponent
    // ❌ REMOVED Alerts components from declarations
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxChartsModule,
    HighchartsChartModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class PartsAuditsModule { }