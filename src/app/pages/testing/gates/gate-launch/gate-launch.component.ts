import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddcriteriaComponent } from '../addcriteria/addcriteria.component';
import { MatDialog } from '@angular/material/dialog';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gate-launch',
  templateUrl: './gate-launch.component.html',
  styleUrls: ['./gate-launch.component.scss']
})
export class GateLaunchComponent implements OnInit, OnDestroy {

  private subs = new Subscription();

 launchStageQuestions = [
  {
    id: 1,
    question: 'Has final product approval been obtained from all required stakeholders?',
    description: 'All stakeholders have reviewed and signed off on the final product.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 2,
    question: 'Are manufacturing processes fully validated and ready for production scale-up?',
    description: 'Production processes are validated and ready for full-scale output.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 3,
    question: 'Have all quality control and inspection procedures been established?',
    description: 'QC procedures and inspection checkpoints are defined and in place.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 4,
    question: 'Are supply chain, procurement, and inventory plans in place for launch?',
    description: 'Supply chain and inventory are ready to support the launch demand.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 5,
    question: 'Have packaging, labeling, and product documentation been finalized and approved?',
    description: 'All packaging, labels, and documents are approved and print-ready.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 6,
    question: 'Have regulatory certifications and compliance approvals been completed?',
    description: 'All required certifications and regulatory approvals are obtained.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 7,
    question: 'Has production staff and operational teams been trained for product rollout?',
    description: 'All teams are trained and ready to execute the product rollout.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 8,
    question: 'Has a customer support, service, or maintenance plan been prepared?',
    description: 'Support and service plans are documented and teams are briefed.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 9,
    question: 'Have launch risks, contingency plans, and escalation procedures been reviewed?',
    description: 'Risks and contingency plans are reviewed and escalation paths set.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 10,
    question: 'Has management provided final authorization for commercial launch or deployment?',
    description: 'Final management approval to proceed with commercial launch is confirmed.',
    answer: null, priority: '', mandatory: false
  }
];

  constructor(private dragulaService: DragulaService, private dialog: MatDialog) {
    if (this.dragulaService.find('LAUNCH_ROWS')) {
      this.dragulaService.destroy('LAUNCH_ROWS');
    }

    this.dragulaService.createGroup('LAUNCH_ROWS', {
      revertOnSpill: true,
    });

    this.subs.add(
      this.dragulaService.dropModel('LAUNCH_ROWS').subscribe(({ targetModel }) => {
        this.launchStageQuestions = [...targetModel];
      })
    );
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.dragulaService.destroy('LAUNCH_ROWS');
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