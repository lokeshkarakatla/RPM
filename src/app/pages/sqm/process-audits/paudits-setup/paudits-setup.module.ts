import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Components
// import { QuestionPopComponent } from './process-audits-categories/audit-categories-innerscreen/question-pop/question-pop.component';
// ... (import your other components like AuditCategoriesInnerscreenComponent)

@NgModule({
  declarations: [
    // QuestionPopComponent, // <-- UNCOMMENT THIS
    // ... your other components
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule
  ]
})
export class PauditsSetupModule { }