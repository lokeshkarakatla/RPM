import { Component, OnInit } from '@angular/core';
import { AddcriteriaComponent } from '../addcriteria/addcriteria.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gate-feasibility',
  templateUrl: './gate-feasibility.component.html',
  styleUrls: ['./gate-feasibility.component.scss']
})
export class GateFeasibilityComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }


feasibilityData = [
  {
    "id": 1,
    "question": "Has the customer/business requirement been clearly defined and documented?",
    "answer": null
  },
  {
    "id": 2,
    "question": "Is the proposed product or solution technically achievable with current capabilities and resources?",
    "answer": null
  },
  {
    "id": 3,
    "question": "Has a preliminary market or customer demand analysis been completed?",
    "answer": null
  },
  {
    "id": 4,
    "question": "Are the estimated development costs within the approved budget range?",
    "answer": null
  },
  {
    "id": 5,
    "question": "Have key manufacturing constraints and production limitations been identified?",
    "answer": null
  },
  {
    "id": 6,
    "question": "Are the required raw materials, components, or technologies available and accessible?",
    "answer": null
  },
  {
    "id": 7,
    "question": "Have major technical, operational, and supply chain risks been assessed?",
    "answer": null
  },
  {
    "id": 8,
    "question": "Does the project comply with applicable regulatory, safety, and quality standards?",
    "answer": null
  },
  {
    "id": 9,
    "question": "Has an initial project timeline and resource plan been prepared?",
    "answer": null
  },
  {
    "id": 10,
    "question": "Has management/stakeholder approval been obtained to proceed to the next stage?",
    "answer": null
  }
]
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
