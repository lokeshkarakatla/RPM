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
import { PartsSetupComponent } from './parts-setup/parts-setup.component';
import { PartsAlertsComponent } from './parts-alerts/parts-alerts.component';
import { PartsCompletedAuditsComponent } from './parts-completed-audits/parts-completed-audits.component';
import { PartsActionsComponent } from './parts-actions/parts-actions.component'; 
import { PartsUserManualComponent } from './parts-user-manual/parts-user-manual.component';
import { HelpDeskComponent } from './help-desk/help-desk.component';
import { NewAuditComponent } from './new-audit/new-audit.component';

// ❌ REMOVED PartsActiveAuditsComponent and PartsReferenceComponent from imports

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
      { path: 'new-audit', component: NewAuditComponent },
      { path: 'setup', component: PartsSetupComponent },
      { path: 'alerts', component: PartsAlertsComponent },
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
    PartsSetupComponent,
    PartsAlertsComponent,
    PartsCompletedAuditsComponent,
    PartsActionsComponent,
    PartsUserManualComponent,
    HelpDeskComponent,
    NewAuditComponent
    // ❌ REMOVED PartsActiveAuditsComponent and PartsReferenceComponent from declarations
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