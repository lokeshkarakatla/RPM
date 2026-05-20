import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gate-implimentation',
  templateUrl: './gate-implimentation.component.html',
  styleUrls: ['./gate-implimentation.component.scss']
})
export class GateImplimentationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

   implementationStageQuestions = [
  {
    id: 1,
    question: "Has full-scale production been successfully initiated according to the approved plan?",
    answer: null // "Yes" or "No"
  },
  {
    id: 2,
    question: "Are production outputs meeting the defined quality standards and specifications?",
    answer: null
  },
  {
    id: 3,
    question: "Have all operational teams been trained and aligned with standard operating procedures (SOPs)?",
    answer: null
  },
  {
    id: 4,
    question: "Are manufacturing equipment, tools, and systems operating without major issues?",
    answer: null
  },
  {
    id: 5,
    question: "Has the supply chain demonstrated stable material availability and delivery performance?",
    answer: null
  },
  {
    id: 6,
    question: "Have initial customer deliveries or deployments been completed successfully?",
    answer: null
  },
  {
    id: 7,
    question: "Are customer feedback, field issues, and product performance being actively monitored?",
    answer: null
  },
  {
    id: 8,
    question: "Have corrective and preventive actions (CAPA) been implemented for identified issues?",
    answer: null
  },
  {
    id: 9,
    question: "Has project documentation, lessons learned, and knowledge transfer been completed?",
    answer: null
  },
  {
    id: 10,
    question: "Has the project been formally reviewed and approved for operational handover or closure?",
    answer: null
  }
];

}
