import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Material Modules
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

// Components
import { ProjectDashboardComponent } from './project-dashboard.component';
import { ProjectDocumentsComponent } from './project-documents/project-documents.component';
import { ProjectNotesComponent } from './project-notes/project-notes.component';
import { ProjectPhotosComponent } from './project-photos/project-photos.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UploadDocumentComponent } from './project-notes/upload-document/upload-document.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddReferralDocComponent } from './project-documents/add-referral-doc/add-referral-doc.component';
import { PlaceholderImageComponent } from './placeholder-image/placeholder-image.component';
import { AddphotoPopComponent } from './project-photos/addphoto-pop/addphoto-pop.component';

const routes: Routes = [
  {
    path: '', 
    component: ProjectDashboardComponent, // The parent wrapper with the side-nav
    children: [
      // Optional: Redirect to 'notes' by default when hitting /projects/dashboard
      { path: '', redirectTo: 'notes', pathMatch: 'full' }, 
      
      // The child components that will load in the router-outlet
      { path: 'documents', component: ProjectDocumentsComponent },
      { path: 'notes', component: ProjectNotesComponent },
      { path: 'photos', component: ProjectPhotosComponent },
          { path: 'analytics', component: PlaceholderImageComponent },
  { path: 'overview', component: PlaceholderImageComponent },
  { path: 'setup', component: PlaceholderImageComponent },
  { path: 'team', component: PlaceholderImageComponent },
  { path: 'wbs', component: PlaceholderImageComponent },
  { path: 'schedule', component: PlaceholderImageComponent },
  { path: 'budget', component: PlaceholderImageComponent },
  { path: 'backlog', component: PlaceholderImageComponent },
  { path: 'sprints', component: PlaceholderImageComponent },
  { path: 'timeline', component: PlaceholderImageComponent },
  { path: 'assets', component: PlaceholderImageComponent },
  { path: 'facilities', component: PlaceholderImageComponent },
  { path: 'expenses', component: PlaceholderImageComponent },
  { path: 'hours', component: PlaceholderImageComponent },
    { path: 'timesheet1', component: PlaceholderImageComponent },
  { path: 'timesheet2', component: PlaceholderImageComponent },

    ]
  }
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
    AddphotoPopComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,

MatFormFieldModule,

MatInputModule,

MatSelectModule,

MatButtonModule,

MatIconModule,

MatTableModule,

MatPaginatorModule,

MatDialogModule,
 
  ]
})
export class ProjectDashboardModule { }