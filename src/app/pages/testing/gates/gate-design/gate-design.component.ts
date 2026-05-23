import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddcriteriaComponent } from '../addcriteria/addcriteria.component';
import { MatDialog } from '@angular/material/dialog';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gate-design',
  templateUrl: './gate-design.component.html',
  styleUrls: ['./gate-design.component.scss']
})
export class GateDesignComponent implements OnInit, OnDestroy {

  private subs = new Subscription();

designStageQuestions = [
  {
    id: 1,
    question: 'Have detailed product specifications and design requirements been finalized?',
    description: 'All functional and performance requirements are defined and agreed upon.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 2,
    question: 'Has the product design been reviewed and approved by all relevant stakeholders?',
    description: 'Engineering, marketing, and management have signed off on the design.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 3,
    question: 'Have CAD models, engineering drawings, and technical documents been completed?',
    description: 'All design outputs are documented and version-controlled.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 4,
    question: 'Has Design for Manufacturing (DFM) analysis been conducted?',
    description: 'Manufacturing challenges are identified and addressed early.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 5,
    question: 'Have material selections and component specifications been validated?',
    description: 'Materials and components meet performance, cost, and availability needs.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 6,
    question: 'Has a preliminary Bill of Materials (BOM) been created and reviewed?',
    description: 'All parts and assemblies are listed for costing and procurement.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 7,
    question: 'Have safety, regulatory, and compliance requirements been incorporated into the design?',
    description: 'Design meets applicable standards to avoid regulatory delays.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 8,
    question: 'Has design risk analysis (e.g., DFMEA) been completed and documented?',
    description: 'Failure modes are identified and mitigation actions are in place.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 9,
    question: 'Have prototype manufacturing methods and tooling requirements been identified?',
    description: 'Processes and equipment for prototyping are planned and ready.',
    answer: null, priority: '', mandatory: false
  },
  {
    id: 10,
    question: 'Has the design passed internal review gates for progression to prototyping/testing?',
    description: 'Design is formally confirmed as mature enough for prototyping.',
    answer: null, priority: '', mandatory: false
  }
];

  constructor(private dragulaService: DragulaService, private dialog: MatDialog) {
    if (this.dragulaService.find('DESIGN_ROWS')) {
      this.dragulaService.destroy('DESIGN_ROWS');
    }

    this.dragulaService.createGroup('DESIGN_ROWS', {
      revertOnSpill: true,
    });

    this.subs.add(
      this.dragulaService.dropModel('DESIGN_ROWS').subscribe(({ targetModel }) => {
        this.designStageQuestions = [...targetModel];
      })
    );
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.dragulaService.destroy('DESIGN_ROWS');
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