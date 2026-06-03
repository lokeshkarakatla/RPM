import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AddModuleComponent } from './add-module/add-module.component';
import { AddTaskComponent } from '../../rpm-tasks/add-task/add-task.component';

@Component({
  selector: 'app-rpm-stages-wbs',
  templateUrl: './rpm-stages-wbs.component.html',
  styleUrls: ['./rpm-stages-wbs.component.scss']
})
export class RpmStagesWbsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  @ViewChild('tableContainer', { static: false }) tableContainer!: ElementRef;

  sidebarMenus = [
    { name: 'Project Initiation & Planning', count: 6, isOpen: true },
    { name: 'Execution, Monitoring & Control', count: 8, isOpen: false },
    { name: 'Delivery, Handover & Closeout', count: 5, isOpen: false }
  ];

  // Table Data 1 - Initiation & Planning
  tableData1 = [
    { task: 'Define Project Scope', jobCode: 'INIT1', rate: '$100.00', planned: '10.00', dueDate: '2021-05-01', assignedTo: 'John Doe', assigned: '10.00', actual: '10.00', cost: '1000.00', worked: '10.00', remaining: '0.00', scheduled: '2021-04-20', date: '2021-04-20', status: 'Approved', submitted: '2021-04-25' },
    { task: 'Feasibility Study', jobCode: 'INIT2', rate: '$120.00', planned: '15.00', dueDate: '2021-05-05', assignedTo: 'Jane Smith', assigned: '15.00', actual: '10.00', cost: '1200.00', worked: '10.00', remaining: '5.00', scheduled: '2021-04-22', date: '2021-04-22', status: 'In Progress', submitted: '-' },
    { task: 'Budget Estimation', jobCode: 'INIT3', rate: '$90.00', planned: '8.00', dueDate: '2021-05-10', assignedTo: 'Mike Ross', assigned: '8.00', actual: '0.00', cost: '0.00', worked: '0.00', remaining: '8.00', scheduled: '2021-04-25', date: '-', status: 'Scheduled', submitted: '-' },
    { task: 'Risk Management Plan', jobCode: 'INIT4', rate: '$110.00', planned: '12.00', dueDate: '2021-05-12', assignedTo: 'Sarah Lee', assigned: '12.00', actual: '2.00', cost: '220.00', worked: '2.00', remaining: '10.00', scheduled: '2021-04-26', date: '2021-04-26', status: 'In Progress', submitted: '-' },
    { task: 'Resource Allocation', jobCode: 'INIT5', rate: '$95.00', planned: '6.00', dueDate: '2021-05-15', assignedTo: 'Tom Hanks', assigned: '6.00', actual: '6.00', cost: '570.00', worked: '6.00', remaining: '0.00', scheduled: '2021-04-28', date: '2021-04-28', status: 'Approved', submitted: '2021-04-30' },
    { task: 'Stakeholder Kick-off', jobCode: 'INIT6', rate: '$150.00', planned: '4.00', dueDate: '2021-05-20', assignedTo: 'John Doe', assigned: '4.00', actual: '0.00', cost: '0.00', worked: '0.00', remaining: '4.00', scheduled: '2021-05-02', date: '-', status: 'Pending PM Review', submitted: '-' }
  ];

  // Table Data 2 - Execution, Monitoring & Control
  tableData2 = [
    { task: 'Body Panel Fitment', jobCode: 'EXEC1', rate: '$100.00', planned: '5.00', dueDate: '2021-05-19', assignedTo: 'Sachin Patil', assigned: '5.00', actual: '5.00', cost: '500.00', worked: '5.00', remaining: '0.00', scheduled: '2021-05-12', date: '2021-05-12', status: 'Approved', submitted: '2021-05-24' },
    { task: 'Paint Finish Quality', jobCode: 'EXEC2', rate: '$60.00', planned: '7.00', dueDate: '2021-05-18', assignedTo: ' Avi Paul', assigned: '7.00', actual: '0.00', cost: '0.00', worked: '0.00', remaining: '7.00', scheduled: '2021-05-12', date: '-', status: 'Scheduled', submitted: '-' },
    { task: 'Weld Joint Inspection', jobCode: 'EXEC3', rate: '$95.00', planned: '2.00', dueDate: '2021-05-18', assignedTo: '  Mark Johnson', assigned: '2.00', actual: '0.00', cost: '0.00', worked: '0.00', remaining: '2.00', scheduled: '2021-05-12', date: '2021-05-10', status: 'Pending PM Review', submitted: '2021-05-10' },
    { task: 'Door Alignment Check', jobCode: 'EXEC4', rate: '$60.00', planned: '2.00', dueDate: '2021-04-30', assignedTo: 'Bob Cormier', assigned: '2.00', actual: '0.00', cost: '0.00', worked: '0.00', remaining: '2.00', scheduled: '2021-05-12', date: '-', status: 'Scheduled', submitted: '-' },
    { task: 'Engine Mount Verification', jobCode: 'EXEC5', rate: '$120.00', planned: '10.00', dueDate: '2021-06-01', assignedTo: 'James Hooper', assigned: '10.00', actual: '6.00', cost: '720.00', worked: '6.00', remaining: '4.00', scheduled: '2021-05-20', date: '2021-05-20', status: 'In Progress', submitted: '-' },
    { task: 'Wiring Harness Routing', jobCode: 'EXEC6', rate: '$85.00', planned: '8.00', dueDate: '2021-06-05', assignedTo: 'Nina Patel', assigned: '8.00', actual: '3.00', cost: '255.00', worked: '3.00', remaining: '5.00', scheduled: '2021-05-22', date: '2021-05-22', status: 'In Progress', submitted: '2021-05-22' },
    { task: 'HVAC Performance Test', jobCode: 'EXEC7', rate: '$110.00', planned: '6.00', dueDate: '2021-06-08', assignedTo: 'Carlos Rivera', assigned: '6.00', actual: '0.00', cost: '0.00', worked: '0.00', remaining: '6.00', scheduled: '2021-05-25', date: '-', status: 'Scheduled', submitted: '-' },
    { task: 'Chassis Dimension Audit', jobCode: 'EXEC8', rate: '$75.00', planned: '4.00', dueDate: '2021-05-28', assignedTo: 'Laura Kim', assigned: '4.00', actual: '4.00', cost: '300.00', worked: '4.00', remaining: '0.00', scheduled: '2021-05-14', date: '2021-05-14', status: 'Approved', submitted: '2021-05-15' }
  ];

  // Table Data 3 - Delivery, Handover & Closeout
  tableData3 = [
    { task: 'Final Vehicle Inspection', jobCode: 'DELIV1', rate: '$80.00', planned: '2.00', dueDate: '2021-06-22', assignedTo: 'David Park', assigned: '2.00', actual: '2.00', cost: '160.00', worked: '2.00', remaining: '0.00', scheduled: '2021-06-20', date: '2021-06-20', status: 'Approved', submitted: '2021-06-21' },
    { task: 'Client UAT Sign-off', jobCode: 'DELIV2', rate: '$150.00', planned: '5.00', dueDate: '2021-06-25', assignedTo: 'Jane Smith', assigned: '5.00', actual: '0.00', cost: '0.00', worked: '0.00', remaining: '5.00', scheduled: '2021-06-23', date: '-', status: 'Scheduled', submitted: '-' },
    { task: 'Handover Documentation', jobCode: 'DELIV3', rate: '$75.00', planned: '8.00', dueDate: '2021-06-28', assignedTo: 'Rachel Wong', assigned: '8.00', actual: '4.00', cost: '300.00', worked: '4.00', remaining: '4.00', scheduled: '2021-06-24', date: '2021-06-24', status: 'In Progress', submitted: '-' },
    { task: 'Release Resources', jobCode: 'DELIV4', rate: '$60.00', planned: '3.00', dueDate: '2021-06-30', assignedTo: 'Mike Adams', assigned: '3.00', actual: '0.00', cost: '0.00', worked: '0.00', remaining: '3.00', scheduled: '2021-06-29', date: '-', status: 'Pending PM Review', submitted: '-' },
    { task: 'Project Retrospective', jobCode: 'DELIV5', rate: '$100.00', planned: '6.00', dueDate: '2021-07-02', assignedTo: 'John Doe', assigned: '6.00', actual: '0.00', cost: '0.00', worked: '0.00', remaining: '6.00', scheduled: '2021-07-01', date: '-', status: 'Scheduled', submitted: '-' }
  ];

  // Active data arrays
  tableData: any[] = [];
  paginatedData: any[] = [];
  
  // Pagination properties
  totalItems: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  ngOnInit(): void {
    // Sync counts
    this.sidebarMenus[0].count = this.tableData1.length;
    this.sidebarMenus[1].count = this.tableData2.length;
    this.sidebarMenus[2].count = this.tableData3.length;

    // Default to the first table array on load
    this.tableData = this.tableData1;
    this.totalItems = this.tableData.length;
    this.updatePaginatedData();
  }

  selectMenu(index: number) {
    // 1. Toggle accordion visibility
    this.sidebarMenus.forEach((menu, i) => {
      menu.isOpen = (i === index) ? !menu.isOpen : false;
    });

    // 2. Switch data based on the selected index
    if (index === 0) {
      this.tableData = this.tableData1;
    } else if (index === 1) {
      this.tableData = this.tableData2;
    } else if (index === 2) {
      this.tableData = this.tableData3;
    }

    // 3. Reset pagination to the first page
    this.pageIndex = 0;
    this.totalItems = this.tableData.length;
    this.updatePaginatedData();
  }

  // Handle page changes
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedData();
  }

  // Slice the data array based on current page and page size
  updatePaginatedData() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.tableData.slice(startIndex, endIndex);
  }

  // --- Horizontal Scrolling Logic ---

  scrollLeft(): void {
    if (this.tableContainer) {
      this.tableContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    if (this.tableContainer) {
      this.tableContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  addModule() {
    this.dialog.open(AddModuleComponent, {
      width: '600px',
      data: { title: 'Add Module' }
    });
  }

  addTask() {
    this.dialog.open(AddTaskComponent, {
      width: '550px',
      data: {} 
    });
  }
}