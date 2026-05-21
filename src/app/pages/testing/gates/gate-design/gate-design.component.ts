import { Component, OnInit } from '@angular/core';
import { AddcriteriaComponent } from '../addcriteria/addcriteria.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gate-design',
  templateUrl: './gate-design.component.html',
  styleUrls: ['./gate-design.component.scss']
})
export class GateDesignComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }


 designStageQuestions = [
  {
    id: 1,
    question: "Have detailed product specifications and design requirements been finalized?",
    answer: null // "Yes" or "No"
  },
  {
    id: 2,
    question: "Has the product design been reviewed and approved by all relevant stakeholders?",
    answer: null
  },
  {
    id: 3,
    question: "Have CAD models, engineering drawings, and technical documents been completed?",
    answer: null
  },
  {
    id: 4,
    question: "Has Design for Manufacturing (DFM) analysis been conducted?",
    answer: null
  },
  {
    id: 5,
    question: "Have material selections and component specifications been validated?",
    answer: null
  },
  {
    id: 6,
    question: "Has a preliminary Bill of Materials (BOM) been created and reviewed?",
    answer: null
  },
  {
    id: 7,
    question: "Have safety, regulatory, and compliance requirements been incorporated into the design?",
    answer: null
  },
  {
    id: 8,
    question: "Has design risk analysis (e.g., DFMEA) been completed and documented?",
    answer: null
  },
  {
    id: 9,
    question: "Have prototype manufacturing methods and tooling requirements been identified?",
    answer: null
  },
  {
    id: 10,
    question: "Has the design passed internal review gates for progression to prototyping/testing?",
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
