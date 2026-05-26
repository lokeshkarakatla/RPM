import { NgModule } from "@angular/core";
import { SqmDashboardComponent } from "./sqm-dashboard/sqm-dashboard.component";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { DragulaModule } from "ng2-dragula";
import { HighchartsChartModule } from 'highcharts-angular';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// ❌ REMOVED all the PartsAudits imports from here! 
// They belong exclusively to PartsAuditsModule now.

const routes: Routes = [
    { path: "", redirectTo: "sqmd", pathMatch: "full" }, 
    { path: 'sqmd', component: SqmDashboardComponent, data: { breadcrumb: 'Dashboard' } }, 
    
    { 
        path: 'process', 
        loadChildren: () => import('./process-audits/process-audits.module').then(m => m.ProcessAuditsModule),
        data: { breadcrumb: 'Process Audit' } 
    }, 
    
    // ✅ CHANGED: Lazy load the PartsAuditsModule instead of routing to the component directly
    { 
        path: 'parts', 
        loadChildren: () => import('./parts-audits/parts-audits.module').then(m => m.PartsAuditsModule),
        data: { breadcrumb: 'Parts Audit' } 
    }, 
]

@NgModule({
    declarations: [
       SqmDashboardComponent
       // ❌ REMOVED PartsAuditsComponent and all its child components from here!
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatPaginatorModule,
        MatCardModule,
        MatSelectModule,
        MatRadioModule,
        DragulaModule,
        HighchartsChartModule,
        CanvasJSAngularChartsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule, 
    ],
    providers: []
})
export class SqmModule { }