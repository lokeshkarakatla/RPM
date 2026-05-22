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
    { id: 1, question: 'Has the prototype build plan been approved and documented?', answer: null },
    { id: 2, question: 'Are all required materials, components, and tools available for prototype development?', answer: null },
    { id: 3, question: 'Has the prototype been developed according to the approved design specifications?', answer: null },
    { id: 4, question: 'Have prototype assembly and manufacturing processes been validated?', answer: null },
    { id: 5, question: 'Have functional tests been conducted on the prototype?', answer: null },
    { id: 6, question: 'Have design issues, defects, or performance gaps been identified and recorded?', answer: null },
    { id: 7, question: 'Has the prototype met the defined performance and quality criteria?', answer: null },
    { id: 8, question: 'Have safety, usability, and reliability checks been completed on the prototype?', answer: null },
    { id: 9, question: 'Has feedback from engineering, manufacturing, and stakeholders been collected and reviewed?', answer: null },
    { id: 10, question: 'Has approval been obtained to move the prototype into formal testing or pilot production?', answer: null }
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