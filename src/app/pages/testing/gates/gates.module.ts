import { Routes } from "@angular/router";

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

import { RouterModule } from '@angular/router';
import {  ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { GateFeasibilityComponent } from './gate-feasibility/gate-feasibility.component';
import { GateDesignComponent } from './gate-design/gate-design.component';
import { GatePrototypingComponent } from './gate-prototyping/gate-prototyping.component';
import { GateTestingComponent } from './gate-testing/gate-testing.component';
import { GateLaunchComponent } from './gate-launch/gate-launch.component';
import { GateImplimentationComponent } from './gate-implimentation/gate-implimentation.component';



const routes: Routes = [

     { path: "", redirectTo: "feasibility", pathMatch: "full" },
        {
            path: 'feasibility', component: GateFeasibilityComponent,
            data: { breadcrum: 'Feasibility' }
    
        },
        {
            path: 'design', component: GateDesignComponent,
            data: { breadcrum: 'Design' }
    
        },
        {
            path: 'prototyping', component: GatePrototypingComponent,
            data: { breadcrum: 'Prototyping' }
    
        },
        {
            path: 'testing', component: GateTestingComponent,
            data: { breadcrum: 'Testing' }
    
        },
        {
            path: 'launch', component: GateLaunchComponent,
            data: { breadcrum: 'Launch' }
    
        },
        {
            path: 'implementation', component: GateImplimentationComponent,
            data: { breadcrum: 'Implementation' }
    
        },
]


@NgModule({
    declarations: [
        
        
       
        GateFeasibilityComponent,
        GateDesignComponent,
        GatePrototypingComponent,
        GateTestingComponent,
        GateLaunchComponent,
        GateImplimentationComponent
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
        MatSelectModule
    ]
})
export class GatesModule { }
