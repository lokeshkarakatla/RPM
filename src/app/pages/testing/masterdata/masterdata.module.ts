import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RespareasComponent } from './respareas/respareas.component';
import { SubGroupsComponent } from './sub-groups/sub-groups.component';
import { CategoryComponent } from './category/category.component';
import { DetectionComponent } from './detection/detection.component';
import { DeparmentsComponent } from './deparments/deparments.component';
import { ScoreMatrixComponent } from './score-matrix/score-matrix.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

import { AddcategoryComponent } from './category/addcategory/addcategory.component';
import { AddeditdeparmentComponent } from './deparments/addeditdeparment/addeditdeparment.component';
import { AdddetectionComponent } from './detection/adddetection/adddetection.component';
import { AddresparasComponent } from './respareas/addresparas/addresparas.component';
import { AddeditscorematrixComponent } from './score-matrix/addeditscorematrix/addeditscorematrix.component';
import { AddeditsubgroupComponent } from './sub-groups/addeditsubgroup/addeditsubgroup.component';
import { JobCodeComponent } from './job-code/job-code.component';
import { AddJobcodePopComponent } from './job-code/add-jobcode-pop/add-jobcode-pop.component';
import { ItemMasterComponent } from './item-master/item-master.component';
import { ItemCategoryComponent } from './item-category/item-category.component';
import { ItemSubcategoryComponent } from './item-subcategory/item-subcategory.component';
import { AdditemComponent } from './item-master/additem/additem.component';
import { AddItemCategoryComponent } from './item-category/add-item-category/add-item-category.component';
import { AdditemSubCategoryComponent } from './item-subcategory/additem-sub-category/additem-sub-category.component';
import { AssetMasterComponent } from './asset-master/asset-master.component';
import { AddAssetmasterComponent } from './asset-master/add-assetmaster/add-assetmaster.component';
import { FacilityMasterComponent } from './facility-master/facility-master.component';
import { AddFacilityMasterComponent } from './facility-master/add-facility-master/add-facility-master.component';
import { ProjectTypesComponent } from './project-types/project-types.component';
import { ProjectStatusComponent } from './project-status/project-status.component';
import { AddProjectStatusComponent } from './project-status/add-project-status/add-project-status.component';
import { AddProjectTypesComponent } from './project-types/add-project-types/add-project-types.component';
import { MasterSectionComponent } from './master-section/master-section.component';
import { DepartmentComponent } from './department/department.component';
import { AddDeptComponent } from './department/add-dept/add-dept.component';
import { AddMasterComponent } from './master-section/add-master/add-master.component';

const routes: Routes = [
  { path: '', redirectTo: 'asset-master', pathMatch: 'full' },
  {
    path: 'respareas',
    component: RespareasComponent
  },
  {
    path: 'sub-group',
    component: SubGroupsComponent
  },
  {
    path: 'category',
    component: CategoryComponent,
    data: {
      breadcrumb: 'Category', screenId: 4,
      description: 'The categories can be managed here.'
    }
  },
  {
    path: 'detection',
    component: DetectionComponent
  },
  {
    path: 'deparments',
    component: DeparmentsComponent
  },
  {
    path: 'score-matrix',
    component: ScoreMatrixComponent
  },
  {
    path: 'job-code',
    component: JobCodeComponent,
     data: {
      breadcrumb: 'Job Code',
      description: 'Job codes and their hourly rates can be managed here.'
    }
  },
  {
    path: 'item-master',
    component: ItemMasterComponent,
    data: {
      breadcrumb: 'Item Master',
      description: 'The list of items are managed here.'
    }
  },
  {
    path: 'item-sub',
    component: ItemSubcategoryComponent,
     data: {
      breadcrumb: 'Item Sub Category',
      description: 'The master table of sub-categories is managed here.'
    }
  },
  {
    path: 'item-cat',
    component: ItemCategoryComponent,
     data: {
      breadcrumb: 'Item Category', 
      description: 'The categories for items can be  managed here.'
    }
  },
  {
    path: 'asset-master',
    component: AssetMasterComponent,
    data: {
      breadcrumb: 'Asset Master', screenId: 4,
      description: 'The log of assets are managed here.'
    }
  },

  {
    path: 'facility-master',
    component: FacilityMasterComponent,
    data: {
      breadcrumb: 'Facility Master', 
      description: 'The list of facilities can be managed here.'
    }
  },

  {
    path: 'project-types',
    component: ProjectTypesComponent,
     data: {
      breadcrumb: 'Project Types',
      description: 'The list of project types are managed here.'
    }
  },
  {
    path: 'project-status',
    component: ProjectStatusComponent,
     data: {
      breadcrumb: 'Project Status',
      description: 'The list of project status code can be managed here.'
    }
  },
  {
    path: 'section',
    component: MasterSectionComponent,
     data: {
      breadcrumb: 'Section',
      description: 'The list of sections can be managed here.'
    }
  },
  {
    path: 'department',
    component: DepartmentComponent,
     data: {
      breadcrumb: 'Department',
      description: 'The list of departments can be managed here.'
    }
  }

]


@NgModule({
  declarations: [
    AddcategoryComponent,
    AddeditdeparmentComponent,
    AdddetectionComponent,
    AddresparasComponent,
    AddeditscorematrixComponent,
    AddeditsubgroupComponent,
    ScoreMatrixComponent, DeparmentsComponent, DetectionComponent, CategoryComponent, SubGroupsComponent, RespareasComponent, JobCodeComponent, AddJobcodePopComponent, ItemMasterComponent, ItemCategoryComponent, ItemSubcategoryComponent, AdditemComponent, AddItemCategoryComponent, AdditemSubCategoryComponent, AssetMasterComponent, AddAssetmasterComponent, FacilityMasterComponent, AddFacilityMasterComponent, ProjectTypesComponent, ProjectStatusComponent, AddProjectStatusComponent, AddProjectTypesComponent, MasterSectionComponent, DepartmentComponent, AddDeptComponent, AddMasterComponent],
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
    MatSelectModule
  ]
})
export class MasterdataModule { }
