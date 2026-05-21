import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator'; // 1. Import PageEvent
import { StatusConfirmationDialogComponent } from '../testing-projects/add-projects/status-confirmation-dialog/status-confirmation-dialog.component';

@Component({
  selector: 'app-rpm-stages',
  templateUrl: './rpm-stages.component.html',
  styleUrls: ['./rpm-stages.component.scss']
})
export class RpmStagesComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  // 2. Pagination variables
  totalSize = 0; 
  currentPage = 0;
  pageSize = 5; // Set default to 5 to match your first pageSizeOption

  // 3. Your full data list
  tdata = [
    { phase: "Feasibility", description: "Evaluate project viability", tasks: 2, status:"Active" },
    { phase: "Design", description: "Create functional, technical", tasks: 3, status:"Active" },
    { phase: "Prototyping", description: "Develop an initial working.", tasks: 1, status:"Inactive" },
    { phase: "Testing", description: "Validate functionality, quality", tasks: 4, status:"Active" },
    { phase: "Launch", description: "Prepare and release the product", tasks: 5, status:"Inactive" },
    { phase: "Implementation", description: "Execute full-scale adoption", tasks: 2, status:"Inactive" }
  ];

  // 4. Array to hold the data for the active page
  pagedData: any[] = [];

  ngOnInit(): void {
    // 5. Initialize the total size and load the first page of data
    this.totalSize = this.tdata.length;
    this.updatePageData();
  }

  // 6. Handle the page change event from the paginator
  fnHandlePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePageData();
  }

  // 7. Method to slice the main array based on page index and size
  updatePageData() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedData = this.tdata.slice(startIndex, endIndex);
  }

  Confirmation(item: any) {
    let dialogRef = this.dialog.open(StatusConfirmationDialogComponent, {
      width: 'auto',
      data: { TractorStatusId: item.TractorStatusId, title: 'Change Status', content: 'Are you sure you want to Change the Status ?' }
    });
  }
}