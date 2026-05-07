import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';


import { MCategoriesComponent } from '../../admin/masterdata/m-categories/m-categories.component';
import { AddContinentComponent } from '../../admin/masterdata/m-continents/add-continent/add-continent.component';
import { MContinentsComponent } from '../../admin/masterdata/m-continents/m-continents.component';
import { AddCountrysComponent } from '../../admin/masterdata/m-country/add-countrys/add-countrys.component';
import { MCountryComponent } from '../../admin/masterdata/m-country/m-country.component';
import { AddCriticalityComponent } from '../../admin/masterdata/m-criticality/add-criticality/add-criticality.component';
import { MCriticalityComponent } from '../../admin/masterdata/m-criticality/m-criticality.component';
import { AddDepartmentComponent } from '../../admin/masterdata/m-departments/add-department/add-department.component';
import { MDepartmentsComponent } from '../../admin/masterdata/m-departments/m-departments.component';
import { MSectionsComponent } from '../../admin/masterdata/m-sections/m-sections.component';
import { AddStatusmasterComponent } from '../../admin/masterdata/m-status-master/add-statusmaster/add-statusmaster.component';
import { MStatusMasterComponent } from '../../admin/masterdata/m-status-master/m-status-master.component';
import { AddStepsComponent } from '../../admin/masterdata/m-step/add-steps/add-steps.component';
import { MStepComponent } from '../../admin/masterdata/m-step/m-step.component';

import { AddCategoryComponent } from '../../setup/subjective-setup/category-master/add-category/add-category.component';
// import { AddSectionComponent } from '../../subjective-audits/prts-subjective-setup/section/add-section/add-section.component';
import { MdataDeptsComponent } from './mdata-depts/mdata-depts.component';
import { TestMasterDataComponent } from './test-master-data.component';
import { DistributorComponent } from '../../admin/masterdata/distributor/distributor.component';
import { AddDistributorComponent } from '../../admin/masterdata/distributor/add-distributor/add-distributor.component';



export const routes: Routes = [
  { path: "", redirectTo: "status-master", pathMatch: "full" },
  { path: 'departments', component: MdataDeptsComponent, data: { breadcrumb: 'Departments', description: 'List of agencies are managed here.' }},
  { path: 'status-master', component: MStatusMasterComponent, data: { breadcrumb: 'Status Master', description: 'List of agencies are managed here.' }},
  { path: 'sections', component: MSectionsComponent, data: { breadcrumb: 'Sections', description: 'List of agencies are managed here.' }},
  { path: 'categories', component: MCategoriesComponent, data: { breadcrumb: 'Categories', description: 'List of agencies are managed here.' }},
  // { path: 'continents', component: MContinentsComponent, data: { breadcrumb: 'Continents', description: 'List of agencies are managed here.' }},
  { path: 'country', component: MCountryComponent, data: { breadcrumb: 'Countries', description: 'List of agencies are managed here.' }},
  { path: 'criticality', component: MCriticalityComponent, data: { breadcrumb: 'Criticality', description: 'List of agencies are managed here.' }},
  { path: 'step', component: MStepComponent, data: { breadcrumb: 'Steps', description: 'List of agencies are managed here.' }},
   { path: 'distributor', component: DistributorComponent, data: { breadcrumb: 'Distributors', description: 'List of agencies are managed here.' }},
  { path: 'department', component: MDepartmentsComponent, data: { breadcrumb: 'Department', description: 'List of departments are managed here.' }},
];


@NgModule({
  declarations: [
    MDepartmentsComponent,
    MStatusMasterComponent,

    MCategoriesComponent,
    MContinentsComponent,
    MCountryComponent,
    MCriticalityComponent,
    MStepComponent,
    AddDepartmentComponent,
    AddStatusmasterComponent,
    // AddSectionComponent,
    // AddCategoryComponent,
    AddContinentComponent,
    AddCountrysComponent,
    AddCriticalityComponent,
    AddStepsComponent,
   // MdataDeptsComponent,
    TestMasterDataComponent,
    AddDistributorComponent,
    DistributorComponent
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

  ],

})
export class TestMasterDataModule { }
