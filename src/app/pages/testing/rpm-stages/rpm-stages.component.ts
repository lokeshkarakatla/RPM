import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

import { StatusConfirmationDialogComponent } from '../testing-projects/add-projects/status-confirmation-dialog/status-confirmation-dialog.component';

@Component({
  selector: 'app-rpm-stages',
  templateUrl: './rpm-stages.component.html',
  styleUrls: ['./rpm-stages.component.scss']
})
export class RpmStagesComponent implements OnInit, OnDestroy {

  private subs = new Subscription();

  canUpdate = true;
  canDelete = true;

  totalSize = 0; 
  currentPage = 0;
  pageSize = 10; 

  tdata = [
    { phase: "Feasibility", description: "Evaluate project viability", tasks: 45, status:"Active" },
    { phase: "Design", description: "Create functional, technical", tasks: 58, status:"Active" },
    { phase: "Prototyping", description: "Develop an initial working.", tasks: 39, status:"Inactive" },
    { phase: "Testing", description: "Validate functionality, quality", tasks: 51, status:"Active" },
    { phase: "Launch", description: "Prepare and release the product", tasks: 41, status:"Inactive" },
    { phase: "Implementation", description: "Execute full-scale adoption", tasks: 27, status:"Inactive" }
  ];

  pagedData: any[] = [];

  constructor(private dialog: MatDialog, private dragulaService: DragulaService) {
    if (this.dragulaService.find('STAGE_ROWS')) {
      this.dragulaService.destroy('STAGE_ROWS');
    }

    this.dragulaService.createGroup('STAGE_ROWS', {
      revertOnSpill: true,
      moves: (el, container, handle) => {
        // Prevents the empty state row from being draggable
        return !el?.classList.contains('no-drag');
      }
    });

    // ✅ Listen to dropModel to get the automatically reordered page slice
this.subs.add(
  this.dragulaService.dropModel('STAGE_ROWS').subscribe(({ targetModel }) => {
    this.pagedData = [...targetModel];  // ✅ full reordered array
    this.syncMasterArray();
  })
);
  }

  ngOnInit(): void {
    this.totalSize = this.tdata.length;
    this.updatePageData();
  }

  ngOnDestroy(): void {
    this.dragulaService.destroy('STAGE_ROWS');
    this.subs.unsubscribe();
  }

  fnHandlePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePageData();
  }

  updatePageData() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.tdata.slice(startIndex, endIndex);
  }

  // ✅ Clean, math-based replacement instead of unreliable DOM parsing
  syncMasterArray() {
    const startIndex = this.currentPage * this.pageSize;
    
    // Replace the modified segment inside the master data matrix
    this.tdata.splice(startIndex, this.pageSize, ...this.pagedData);

    // Refresh view data to keep everything completely in sync
    this.updatePageData();
  }

  Confirmation(item: any) {
    this.dialog.open(StatusConfirmationDialogComponent, {
      width: 'auto',
      data: { TractorStatusId: item.TractorStatusId, title: 'Change Status', content: 'Are you sure you want to Change the Status ?' }
    });
  }

  openEditDialog(item: any) { console.log('Edit:', item); }
  deleteConfirmation(item: any) { console.log('Delete:', item); }
}