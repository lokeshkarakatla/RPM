import { Component, OnInit } from '@angular/core';
import { PauditsNewAuditComponent } from './paudits-new-audit/paudits-new-audit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-process-audits',
  templateUrl: './process-audits.component.html',
  styleUrls: ['./process-audits.component.scss']
})
export class ProcessAuditsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openaudit() {
    this.dialog.open(PauditsNewAuditComponent, {
      width: '600px',
      height: '600px'
    });
  }

}
