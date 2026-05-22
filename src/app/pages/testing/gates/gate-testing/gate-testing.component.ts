import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddcriteriaComponent } from '../addcriteria/addcriteria.component';
import { MatDialog } from '@angular/material/dialog';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gate-testing',
  templateUrl: './gate-testing.component.html',
  styleUrls: ['./gate-testing.component.scss']
})
export class GateTestingComponent implements OnInit, OnDestroy {

  private subs = new Subscription();

  testingStageQuestions = [
    { id: 1, question: "Has a detailed testing and validation plan been prepared and approved?", answer: null },
    { id: 2, question: "Have all functional, performance, and reliability tests been completed?", answer: null },
    { id: 3, question: "Has the product been tested under real-world operating conditions?", answer: null },
    { id: 4, question: "Have all identified defects, failures, and deviations been documented?", answer: null },
    { id: 5, question: "Have corrective actions been implemented and re-tested successfully?", answer: null },
    { id: 6, question: "Has the product met all defined quality and acceptance criteria?", answer: null },
    { id: 7, question: "Have regulatory, safety, and compliance validation tests been completed?", answer: null },
    { id: 8, question: "Has manufacturing process validation or pilot production testing been conducted?", answer: null },
    { id: 9, question: "Have test reports, results, and approvals been formally documented?", answer: null },
    { id: 10, question: "Has management approval been obtained to proceed to production or launch stage?", answer: null }
  ];

  constructor(private dragulaService: DragulaService, private dialog: MatDialog) { 
    // Clean up previous registration of this group name if it exists
    if (this.dragulaService.find('TESTING_ROWS')) {
      this.dragulaService.destroy('TESTING_ROWS');
    }

    // Set up the drag group configuration
    this.dragulaService.createGroup('TESTING_ROWS', {
      revertOnSpill: true,
    });

    // Handle data model synchronization when a drop event completes
    this.subs.add(
      this.dragulaService.dropModel('TESTING_ROWS').subscribe(({ targetModel }) => {
        this.testingStageQuestions = [...targetModel];
      })
    );
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    // Prevent memory leaks and registration clashes
    this.dragulaService.destroy('TESTING_ROWS');
    this.subs.unsubscribe();
  }

  addCriteria(): void {
    const dialogRef = this.dialog.open(AddcriteriaComponent, {
      width: '850px',
      height: 'auto',
      disableClose: false,
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Criteria added:', result);
        // If you need to append the item seamlessly, you can generate a new ID and push:
        // this.testingStageQuestions.push({ id: this.testingStageQuestions.length + 1, question: result.question, answer: null });
        // this.testingStageQuestions = [...this.testingStageQuestions];
      }
    });
  }

}