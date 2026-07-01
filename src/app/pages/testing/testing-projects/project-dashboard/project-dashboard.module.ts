import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

// --- Highcharts ---
import { HighchartsChartModule } from "highcharts-angular";

// --- Flex Layout ---
import { FlexLayoutModule } from "@angular/flex-layout"; // <-- ADDED THIS IMPORT

// --- Material Modules ---
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";

// --- Components ---
import { ProjectDashboardComponent } from "./project-dashboard.component";
import { ProjectDocumentsComponent } from "./project-documents/project-documents.component";
import { ProjectNotesComponent } from "./project-notes/project-notes.component";
import { ProjectPhotosComponent } from "./project-photos/project-photos.component";
import { UploadDocumentComponent } from "./project-notes/upload-document/upload-document.component";
import { AddReferralDocComponent } from "./project-documents/add-referral-doc/add-referral-doc.component";
import { PlaceholderImageComponent } from "./placeholder-image/placeholder-image.component";
import { AddphotoPopComponent } from "./project-photos/addphoto-pop/addphoto-pop.component";
import { ProjectAnalyticsComponent } from "./project-analytics/project-analytics.component";
import { ProjectOverviewComponent } from "./project-overview/project-overview.component";
import { ProjectTeamComponent } from "./project-team/project-team.component";
import { ProjectSetupComponent } from "./project-setup/project-setup.component";
import { ProjectScheduleComponent } from "./project-schedule/project-schedule.component";
import { ProjectBudgetComponent } from "./project-budget/project-budget.component";
import { ProjectAssetsComponent } from "./project-assets/project-assets.component";
import { AssetsSchedulingComponent } from "./project-assets/assets-scheduling/assets-scheduling.component";
import { ProjectExpensesComponent } from "./project-expenses/project-expenses.component";
import { ProjectMaterialsComponent } from "./project-materials/project-materials.component";
import { AddRequisitionPopComponent } from "./project-materials/add-requisition-pop/add-requisition-pop.component";
import { ProjectBacklogComponent } from "./project-backlog/project-backlog.component";
import { ProjectFacilitiesComponent } from "./project-facilities/project-facilities.component";
import { FacilitiesSchedulingComponent } from "./project-facilities/facilities-scheduling/facilities-scheduling.component";
import { ProjectHoursComponent } from "./project-hours/project-hours.component";

const routes: Routes = [
  {
    path: "",
    component: ProjectDashboardComponent, // The parent wrapper with the side-nav
    children: [
      { path: "", redirectTo: "analytics", pathMatch: "full" },
      { path: "documents", component: ProjectDocumentsComponent },
      { path: "notes", component: ProjectNotesComponent },
      { path: "photos", component: ProjectPhotosComponent },
      { path: "analytics", component: ProjectAnalyticsComponent },
      { path: "overview", component: ProjectOverviewComponent },
      { path: "setup", component: ProjectSetupComponent },
      { path: "team", component: ProjectTeamComponent },
      { path: "wbs", component: PlaceholderImageComponent },
      { path: "schedule", component: ProjectScheduleComponent },
      { path: "budget", component: ProjectBudgetComponent },
      { path: "backlog", component: ProjectBacklogComponent },
      { path: "sprints", component: PlaceholderImageComponent },
      { path: "timeline", component: PlaceholderImageComponent },
      {
        path: "assets",
        children: [
          { path: "", component: ProjectAssetsComponent },
          { path: "sample", component: AssetsSchedulingComponent }, // or whatever the scheduling view is called
        ],
      },
      {
        path: "facilities",
        children: [
          { path: "", component: ProjectFacilitiesComponent },
          {
            path: "facilities_sample",
            component: FacilitiesSchedulingComponent,
          }, // or whatever the scheduling view is called
        ],
      },
      { path: "expenses", component: ProjectExpensesComponent },
      { path: "hours", component: ProjectHoursComponent },
      { path: "timesheet1", component: PlaceholderImageComponent },
      { path: "timesheet2", component: PlaceholderImageComponent },
      { path: "sample", component: AssetsSchedulingComponent },
      { path: "materials", component: ProjectMaterialsComponent },
    ],
  },
];

@NgModule({
  declarations: [
    ProjectDashboardComponent,
    ProjectDocumentsComponent,
    ProjectNotesComponent,
    ProjectPhotosComponent,
    UploadDocumentComponent,
    AddReferralDocComponent,
    PlaceholderImageComponent,
    AddphotoPopComponent,
    ProjectAnalyticsComponent,
    ProjectOverviewComponent,
    ProjectTeamComponent,
    ProjectSetupComponent,
    ProjectScheduleComponent,
    ProjectBudgetComponent,
    ProjectAssetsComponent,
    AssetsSchedulingComponent,
    ProjectExpensesComponent,
    ProjectMaterialsComponent,
    AddRequisitionPopComponent,
    ProjectBacklogComponent,
    ProjectFacilitiesComponent,
    FacilitiesSchedulingComponent,
    ProjectHoursComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FlexLayoutModule, // <-- ADDED TO IMPORTS ARRAY
    FormsModule,
    HighchartsChartModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatMenuModule,
  ],
})
export class ProjectDashboardModule {}
