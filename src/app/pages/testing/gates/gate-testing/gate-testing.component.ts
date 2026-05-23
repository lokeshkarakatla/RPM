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
  {
    id: 1,
    question: 'Has a detailed testing and validation plan been prepared and approved?',
    description: 'Testing plan is documented, reviewed, and formally approved.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 2,
    question: 'Have all functional, performance, and reliability tests been completed?',
    description: 'All planned tests are executed and results are recorded.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 3,
    question: 'Has the product been tested under real-world operating conditions?',
    description: 'Product performance is validated in actual use environments.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 4,
    question: 'Have all identified defects, failures, and deviations been documented?',
    description: 'All issues found during testing are logged and tracked.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 5,
    question: 'Have corrective actions been implemented and re-tested successfully?',
    description: 'Fixes are applied and verified through successful re-testing.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 6,
    question: 'Has the product met all defined quality and acceptance criteria?',
    description: 'Product results are confirmed against all acceptance benchmarks.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 7,
    question: 'Have regulatory, safety, and compliance validation tests been completed?',
    description: 'All mandatory regulatory and safety tests are passed and recorded.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 8,
    question: 'Has manufacturing process validation or pilot production testing been conducted?',
    description: 'Pilot production runs are completed and process is validated.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 9,
    question: 'Have test reports, results, and approvals been formally documented?',
    description: 'All test reports and sign-offs are finalized and stored.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 10,
    question: 'Has management approval been obtained to proceed to production or launch stage?',
    description: 'Formal management sign-off to move to production is confirmed.',
    answer: null, priority: '', mandatory: false
  }
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