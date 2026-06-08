import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

// Components
import { CommodityMasterComponent } from './commodity-master.component';
import { AddCommodityPopComponent } from './add-commodity-pop/add-commodity-pop.component';
import { CommodityInnerGridComponent } from './commodity-inner-grid/commodity-inner-grid.component';
import { AddQuestionPopComponent } from './commodity-inner-grid/add-question-pop/add-question-pop.component';




 
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
 

const routes: Routes = [
  {
    path: '',
    component: CommodityMasterComponent, // This becomes the parent
    children: [
      { path: 'inner-grid', component: CommodityInnerGridComponent }
    ]
  }
];

@NgModule({
  declarations: [
    CommodityMasterComponent,
    AddCommodityPopComponent,
    CommodityInnerGridComponent,
    AddQuestionPopComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),// Sets up the child routing
    FormsModule,
    
    // Material Modules
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule
  ]
})
export class CommodityMasterModule { }