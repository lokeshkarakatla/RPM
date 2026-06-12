import { NgModule } from "@angular/core";
import { SqmDashboardComponent } from "./sqm-dashboard/sqm-dashboard.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from "src/app/shared/shared.module";

import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { DragulaModule } from "ng2-dragula";
import { HighchartsChartModule } from 'highcharts-angular';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from "@angular/material/sidenav";
import { ProcessInnerScreenComponent } from './process-inner-screen/process-inner-screen.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
// import { PartsAuditReferenceComponent } from './parts-inner-screen/parts-audit-reference/parts-audit-reference.component';
// import { PartsAuditDetailsComponent } from './parts-inner-screen/parts-audit-details/parts-audit-details.component';
// import { PartsCompletedReferenceComponent } from './parts-inner-screen/parts-completed-reference/parts-completed-reference.component';

// import { ProcessCompletedReferenceComponent } from './process-inner-screen/process-completed-reference/process-completed-reference.component';
// import { FormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';

// ❌ REMOVED all the PartsAudits imports from here! 
// They belong exclusively to PartsAuditsModule now.

const routes: Routes = [
    { path: "", redirectTo: "sqmd", pathMatch: "full" },
    { path: 'sqmd', component: SqmDashboardComponent, data: { breadcrumb: 'Dasgddhboard', hideBreadcrumb: true } },

    {
        path: 'process',
        loadChildren: () => import('./process-audits/process-audits.module').then(m => m.ProcessAuditsModule),
        data: { breadcrumb: 'Process Audit', hideBreadcrumb: true }
    },

    // ✅ CHANGED: Lazy load the PartsAuditsModule instead of routing to the component directly
    {
        path: 'parts',
        loadChildren: () => import('./parts-audits/parts-audits.module').then(m => m.PartsAuditsModule),
        data: { breadcrumb: 'Parts Audit', hideBreadcrumb: true }
    },
    {
        path: 'process-inner-screen',
        loadChildren: () => import('./process-inner-screen/process-inner-screen.module').then(m => m.ProcessInnerScreen),
        data: { breadcrumb: 'Parts Audit', hideBreadcrumb: true }
    },
    {
        path: 'parts-inner-screen',
        loadChildren: () => import('./parts-inner-screen/parts-inner-screen.module').then(m => m.PartsInnerScreen),
        data: { breadcrumb: 'Parts Audit', hideBreadcrumb: true }
    },


]

@NgModule({
    declarations: [
        SqmDashboardComponent,
        ProcessInnerScreenComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        ReactiveFormsModule,
        SharedModule,
        MatButtonModule,


        MatPaginatorModule,
        MatCardModule,
        MatSelectModule,
        MatRadioModule,
        DragulaModule,
        HighchartsChartModule,
        CanvasJSAngularChartsModule,


        MatDatepickerModule,
        MatNativeDateModule,
        MatSidenavModule,


        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatIconModule,
    ],
    providers: []
})
export class SqmModule { }
