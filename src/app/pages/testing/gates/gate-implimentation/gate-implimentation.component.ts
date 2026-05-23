import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddcriteriaComponent } from '../addcriteria/addcriteria.component';
import { MatDialog } from '@angular/material/dialog';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gate-implimentation',
  templateUrl: './gate-implimentation.component.html',
  styleUrls: ['./gate-implimentation.component.scss']
})
export class GateImplimentationComponent implements OnInit, OnDestroy {

  private subs = new Subscription();

 implementationStageQuestions = [
  {
    id: 1,
    question: 'Has full-scale production been successfully initiated according to the approved plan?',
    description: 'Production has started and is running as per the approved plan.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 2,
    question: 'Are production outputs meeting the defined quality standards and specifications?',
    description: 'Output quality is verified against defined standards and specs.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 3,
    question: 'Have all operational teams been trained and aligned with standard operating procedures (SOPs)?',
    description: 'All teams are trained and following the required SOPs.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 4,
    question: 'Are manufacturing equipment, tools, and systems operating without major issues?',
    description: 'Equipment and systems are stable with no critical issues.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 5,
    question: 'Has the supply chain demonstrated stable material availability and delivery performance?',
    description: 'Materials are available and delivered consistently on time.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 6,
    question: 'Have initial customer deliveries or deployments been completed successfully?',
    description: 'First customer deliveries are completed without major issues.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 7,
    question: 'Are customer feedback, field issues, and product performance being actively monitored?',
    description: 'Feedback and field data are being tracked and reviewed regularly.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 8,
    question: 'Have corrective and preventive actions (CAPA) been implemented for identified issues?',
    description: 'All identified issues have CAPA plans in place and actioned.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 9,
    question: 'Has project documentation, lessons learned, and knowledge transfer been completed?',
    description: 'All docs, learnings, and handover materials are finalized.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 10,
    question: 'Has the project been formally reviewed and approved for operational handover or closure?',
    description: 'Formal sign-off for project handover or closure has been obtained.',
    answer: null, priority: '', mandatory: false
  }
];

  constructor(private dragulaService: DragulaService, private dialog: MatDialog) {
    if (this.dragulaService.find('IMPLEMENTATION_ROWS')) {
      this.dragulaService.destroy('IMPLEMENTATION_ROWS');
    }

    this.dragulaService.createGroup('IMPLEMENTATION_ROWS', {
      revertOnSpill: true,
    });

    this.subs.add(
      this.dragulaService.dropModel('IMPLEMENTATION_ROWS').subscribe(({ targetModel }) => {
        this.implementationStageQuestions = [...targetModel];
      })
    );
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.dragulaService.destroy('IMPLEMENTATION_ROWS');
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