import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddcriteriaComponent } from '../addcriteria/addcriteria.component';
import { MatDialog } from '@angular/material/dialog';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gate-feasibility',
  templateUrl: './gate-feasibility.component.html',
  styleUrls: ['./gate-feasibility.component.scss']
})
export class GateFeasibilityComponent implements OnInit, OnDestroy {

  private subs = new Subscription();

feasibilityData = [
  {
    id: 1,
    question: 'Has the customer/business requirement been clearly defined and documented?',
    description: 'Customer needs and business goals are captured and agreed upon.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 2,
    question: 'Is the proposed product or solution technically achievable with current capabilities and resources?',
    description: 'Technical feasibility is confirmed within existing team capabilities.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 3,
    question: 'Has a preliminary market or customer demand analysis been completed?',
    description: 'Market demand and target customer segments have been evaluated.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 4,
    question: 'Are the estimated development costs within the approved budget range?',
    description: 'Cost estimates are reviewed and aligned with the approved budget.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 5,
    question: 'Have key manufacturing constraints and production limitations been identified?',
    description: 'Production bottlenecks and capacity limits are known and documented.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 6,
    question: 'Are the required raw materials, components, or technologies available and accessible?',
    description: 'All necessary materials and technologies are sourced and available.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 7,
    question: 'Have major technical, operational, and supply chain risks been assessed?',
    description: 'Key risks are identified with mitigation plans in place.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 8,
    question: 'Does the project comply with applicable regulatory, safety, and quality standards?',
    description: 'Compliance with relevant regulations and quality standards is confirmed.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 9,
    question: 'Has an initial project timeline and resource plan been prepared?',
    description: 'A high-level schedule and resource allocation plan has been drafted.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 10,
    question: 'Has management/stakeholder approval been obtained to proceed to the next stage?',
    description: 'Formal sign-off from management to move forward has been received.',
    answer: null, priority: '', mandatory: false
  }
];

  constructor(private dragulaService: DragulaService, private dialog: MatDialog) {
    if (this.dragulaService.find('CRITERIA_ROWS')) {
      this.dragulaService.destroy('CRITERIA_ROWS');
    }

    this.dragulaService.createGroup('CRITERIA_ROWS', {
      revertOnSpill: true,
    });

    this.subs.add(
      this.dragulaService.dropModel('CRITERIA_ROWS').subscribe(({ targetModel }) => {
        this.feasibilityData = [...targetModel];
      })
    );
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.dragulaService.destroy('CRITERIA_ROWS');
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
        // push result into your list here
      }
    });
  }

}