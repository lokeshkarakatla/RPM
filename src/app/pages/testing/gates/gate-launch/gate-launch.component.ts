import { Component, OnInit } from '@angular/core';
import { AddcriteriaComponent } from '../addcriteria/addcriteria.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gate-launch',
  templateUrl: './gate-launch.component.html',
  styleUrls: ['./gate-launch.component.scss']
})
export class GateLaunchComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

   launchStageQuestions = [
  {
    id: 1,
    question: "Has final product approval been obtained from all required stakeholders?",
    answer: null // "Yes" or "No"
  },
  {
    id: 2,
    question: "Are manufacturing processes fully validated and ready for production scale-up?",
    answer: null
  },
  {
    id: 3,
    question: "Have all quality control and inspection procedures been established?",
    answer: null
  },
  {
    id: 4,
    question: "Are supply chain, procurement, and inventory plans in place for launch?",
    answer: null
  },
  {
    id: 5,
    question: "Have packaging, labeling, and product documentation been finalized and approved?",
    answer: null
  },
  {
    id: 6,
    question: "Have regulatory certifications and compliance approvals been completed?",
    answer: null
  },
  {
    id: 7,
    question: "Has production staff and operational teams been trained for product rollout?",
    answer: null
  },
  {
    id: 8,
    question: "Has a customer support, service, or maintenance plan been prepared?",
    answer: null
  },
  {
    id: 9,
    question: "Have launch risks, contingency plans, and escalation procedures been reviewed?",
    answer: null
  },
  {
    id: 10,
    question: "Has management provided final authorization for commercial launch or deployment?",
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
