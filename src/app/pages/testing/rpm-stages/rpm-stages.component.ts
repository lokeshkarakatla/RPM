import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rpm-stages',
  templateUrl: './rpm-stages.component.html',
  styleUrls: ['./rpm-stages.component.scss']
})
export class RpmStagesComponent implements OnInit {

  constructor() { }

  totalSize = 100;
currentPage = 0;
pageSize = 10;

fnHandlePage(event: any) {
  console.log(event);
}

  ngOnInit(): void {
  }


  tdata = [
  {
    "phase": "Feasibility",
    "description": "Evaluate project viability, business value, technical feasibility, budget, risks, and stakeholder alignment before execution approval.",
    "tasks": "Market Research",
  },
  {
    "phase": "Design",
    "description": "Create functional, technical, and UI/UX designs for the solution architecture and workflows.",
    "tasks":"Wireframing", 
  },
  {
    "phase": "Prototyping",
    "description": "Develop an initial working prototype to validate concepts, workflows, usability, and stakeholder expectations.",
    "tasks": "Prototype Planning",
  },
  {
    "phase": "Testing",
    "description": "Validate functionality, quality, performance, security, and usability before production release.",
    "tasks": "Test Case Creation",
  },
  {
    "phase": "Launch",
    "description": "Prepare and release the product/application into the production environment for end users.",
    "tasks":"Deployment Planning",
  },
  {
    "phase": "Implementation",
    "description": "Execute full-scale adoption, user onboarding, operational transition, and support activities after launch.",
    "tasks": "Data Migration",
  }
]

}
