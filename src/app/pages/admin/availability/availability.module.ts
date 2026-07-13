import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragulaModule } from 'ng2-dragula';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { TimingsComponent } from './timings/timings.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { PaidLeavesComponent } from './paid-leaves/paid-leaves.component';
import { ExemptionsComponent } from './exemptions/exemptions.component';


const routes: Routes = [
    // { path: "", redirectTo: "manage-users", pathMatch: "full" },
    { path: "", redirectTo: "timings", pathMatch: "full" },
    { path: 'timings', component: TimingsComponent, data: { breadcrumb: 'Timings', description: 'Manage availability timings' } },
    { path: 'holidays', component: HolidaysComponent, data: { breadcrumb: 'Holidays', description: 'Manage holidays' } },
    { path: 'paid-leaves', component: PaidLeavesComponent, data: { breadcrumb: 'Paid Leaves', description: 'Manage paid leaves' } },
    { path: 'exceptions', component: ExemptionsComponent, data: { breadcrumb: 'Exceptions', description: 'Manage exceptions' } },
]

@NgModule({
    declarations: [


        TimingsComponent,
        HolidaysComponent,
        PaidLeavesComponent,
        ExemptionsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatPaginatorModule,
        MatCardModule,
        MatSelectModule,
        MatCheckboxModule,
        DragulaModule,
    ]
})
export class AvailabilityModule { }
