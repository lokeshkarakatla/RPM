import { Component, OnInit } from '@angular/core';
import { AddcriteriaComponent } from '../addcriteria/addcriteria.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gate-testing',
  templateUrl: './gate-testing.component.html',
  styleUrls: ['./gate-testing.component.scss']
})
export class GateTestingComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

   testingStageQuestions = [
  {
    id: 1,
    question: "Has a detailed testing and validation plan been prepared and approved?",
    answer: null // "Yes" or "No"
  },
  {
    id: 2,
    question: "Have all functional, performance, and reliability tests been completed?",
    answer: null
  },
  {
    id: 3,
    question: "Has the product been tested under real-world operating conditions?",
    answer: null
  },
  {
    id: 4,
    question: "Have all identified defects, failures, and deviations been documented?",
    answer: null
  },
  {
    id: 5,
    question: "Have corrective actions been implemented and re-tested successfully?",
    answer: null
  },
  {
    id: 6,
    question: "Has the product met all defined quality and acceptance criteria?",
    answer: null
  },
  {
    id: 7,
    question: "Have regulatory, safety, and compliance validation tests been completed?",
    answer: null
  },
  {
    id: 8,
    question: "Has manufacturing process validation or pilot production testing been conducted?",
    answer: null
  },
  {
    id: 9,
    question: "Have test reports, results, and approvals been formally documented?",
    answer: null
  },
  {
    id: 10,
    question: "Has management approval been obtained to proceed to production or launch stage?",
    answer: null
  }
];

addCriteria(): void {
  const dialogRef = this.dialog.open(AddcriteriaComponent, {
    width: '850px',
    height: 'auto',
    disableClose: false,
    data: {} // pass any data if needed
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Criteria added:', result);
      // push result into your list here
    }
  });
}

}
