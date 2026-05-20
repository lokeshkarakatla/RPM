import { HighchartsChartModule } from 'highcharts-angular';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TestingIssuesComponent } from './testing-issues/testing-issues.component';
import { TestingProductsComponent } from './testing-products/testing-products.component';
import { TestingTestsComponent } from './testing-tests/testing-tests.component';
import { TestingProjectsComponent } from './testing-projects/testing-projects.component';
import { AddIssuesssComponent } from './testing-issues/add-issuesss/add-issuesss.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddProductsComponent } from './testing-products/add-products/add-products.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StatusModifyComponent } from './testing-products/status-modify/status-modify.component';
import { AddTestsComponent } from './testing-tests/add-tests/add-tests.component';
import { AddProjectsComponent } from './testing-projects/add-projects/add-projects.component';
import { TractorstatusComponent } from './tractorstatus/tractorstatus.component';
import { TeststatusComponent } from './teststatus/teststatus.component';
import { MasterdataComponent } from './masterdata/masterdata.component';
import { StatusConfirmationDialogComponent } from './testing-projects/add-projects/status-confirmation-dialog/status-confirmation-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';           // ← add FormsModule here
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TestdashboardComponent } from '../dashboard/testdashboard/testdashboard.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddProjectSectionComponent } from './testing-projects/add-project-section/add-project-section.component';
import { ActivityRpmComponent } from './activity/activity-rpm/activity-rpm.component';
import { RpmStagesComponent } from './rpm-stages/rpm-stages.component';
import { RpmTasksComponent } from './rpm-tasks/rpm-tasks.component';
import { GatesComponent } from './gates/gates.component';
import { MatDatepickerModule } from '@angular/material/datepicker';          // ← add this
import { MatNativeDateModule } from '@angular/material/core';                // ← add this

const routes: Routes = [
    { path: "", redirectTo: "test-dashboard", pathMatch: "full" },
    { path: 'test-dashboard', component: TestdashboardComponent, data: { breadcrum: 'Radar' } },
    { path: 'issues', component: TestingIssuesComponent, data: { breadcrumb: 'Issues' } },
    { path: 'tractorstatus', component: TractorstatusComponent, data: { breadcrumb: 'Tractor Status' } },
    { path: 'teststatus', component: TeststatusComponent, data: { breadcrumb: 'Test Status' } },
    { path: 'activity', component: ActivityRpmComponent, data: { breadcrumb: 'Activity' } },
    { path: 'stages', component: RpmStagesComponent, data: { breadcrumb: 'Stages' } },
    { path: 'tasks', component: RpmTasksComponent, data: { breadcrumb: 'Tasks' } },
    { path: 'projects', component: TestingProjectsComponent, data: { breadcrumb: 'Projects' } },
    {
        path: "gates", component: GatesComponent,
        loadChildren: () => import("./gates/gates.module").then((m) => m.GatesModule),
        data: { breadcrumb: 'Feasibility', screenId: 4 }
    },
    {
        path: "testing-masterData", component: MasterdataComponent,
        loadChildren: () => import("./masterdata/masterdata.module").then((m) => m.MasterdataModule),
        data: { breadcrumb: 'Master Data', screenId: 4 }
    },
]

@NgModule({
    declarations: [
        // ✅ ONLY components, directives, pipes go here
        TestingIssuesComponent,
        TestingProductsComponent,
        TestingTestsComponent,
        TestingProjectsComponent,
        AddIssuesssComponent,
        AddProductsComponent,
        StatusModifyComponent,
        AddTestsComponent,
        AddProjectsComponent,
        TractorstatusComponent,
        TeststatusComponent,
        StatusConfirmationDialogComponent,
        TestdashboardComponent,
        AddProjectSectionComponent,
        ActivityRpmComponent,
        RpmStagesComponent,
        RpmTasksComponent,
        GatesComponent,
        MasterdataComponent,
    ],
    imports: [
        // ✅ ALL modules go here
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,              // ← fixes [(ngModel)]
        ReactiveFormsModule,
        MatIconModule,
        NgxChartsModule,
        MatButtonModule,
        MatTooltipModule,
        MatCardModule,
        HighchartsChartModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDatepickerModule,      // ← fixes mat-datepicker
        MatNativeDateModule,      // ← required date adapter
    ]
})
export class TestingModule { }