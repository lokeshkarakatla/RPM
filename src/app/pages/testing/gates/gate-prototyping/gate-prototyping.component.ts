import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddcriteriaComponent } from '../addcriteria/addcriteria.component';
import { MatDialog } from '@angular/material/dialog';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gate-prototyping',
  templateUrl: './gate-prototyping.component.html',
  styleUrls: ['./gate-prototyping.component.scss']
})
export class GatePrototypingComponent implements OnInit, OnDestroy {

  private subs = new Subscription();

 prototypingStageQuestions = [
  {
    id: 1,
    question: 'Has the prototype build plan been approved and documented?',
    description: 'Build plan is reviewed, approved, and formally documented.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 2,
    question: 'Are all required materials, components, and tools available for prototype development?',
    description: 'All materials and tools needed for the prototype are sourced.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 3,
    question: 'Has the prototype been developed according to the approved design specifications?',
    description: 'Prototype is built in line with the approved design specs.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 4,
    question: 'Have prototype assembly and manufacturing processes been validated?',
    description: 'Assembly and manufacturing steps are tested and confirmed.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 5,
    question: 'Have functional tests been conducted on the prototype?',
    description: 'Core functionality of the prototype has been tested and verified.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 6,
    question: 'Have design issues, defects, or performance gaps been identified and recorded?',
    description: 'All defects and gaps are logged and assigned for resolution.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 7,
    question: 'Has the prototype met the defined performance and quality criteria?',
    description: 'Prototype results are measured against set quality benchmarks.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 8,
    question: 'Have safety, usability, and reliability checks been completed on the prototype?',
    description: 'Safety and reliability evaluations are completed and passed.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 9,
    question: 'Has feedback from engineering, manufacturing, and stakeholders been collected and reviewed?',
    description: 'All stakeholder feedback is gathered and actioned appropriately.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 10,
    question: 'Has approval been obtained to move the prototype into formal testing or pilot production?',
    description: 'Formal sign-off to proceed to testing or pilot production received.',
    answer: null, priority: '', mandatory: false
  }
];

  constructor(private dragulaService: DragulaService, private dialog: MatDialog) {
    if (this.dragulaService.find('PROTOTYPING_ROWS')) {
      this.dragulaService.destroy('PROTOTYPING_ROWS');
    }

    this.dragulaService.createGroup('PROTOTYPING_ROWS', {
      revertOnSpill: true,
    });

    this.subs.add(
      this.dragulaService.dropModel('PROTOTYPING_ROWS').subscribe(({ targetModel }) => {
        this.prototypingStageQuestions = [...targetModel];
      })
    );
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.dragulaService.destroy('PROTOTYPING_ROWS');
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
      }
    });
  }

}