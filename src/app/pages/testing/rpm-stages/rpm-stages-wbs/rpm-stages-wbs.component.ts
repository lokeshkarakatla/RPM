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
 
  // Target the table container using ViewChild for scrolling
  @ViewChild('tableContainer', { static: false }) tableContainer!: ElementRef;

  // Sidebar Data
  sidebarMenus = [
    { 
      name: 'Modules', 
      count: 36, 
      isOpen: false,
      subItems: ['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5', 'Module 6', 'Module 7', 'Module 8']
    },
    { 
      name: 'Tasks', 
      count: 34, 
      isOpen: false,
      subItems: [' Task 1', 'Task 2', 'Task 3']
    },
    // { 
    //   name: 'Newton', 
    //   count: 40, 
    //   isOpen: false,
    //   subItems: ['Isaac Clark', 'Marie Curie', 'Nikola Tesla', 'Albert E.', 'Grace Hopper']
    // }
  ];

  // Table Data
  tableData = [
    {
      task: 'Field', action: 'Field Design', jobCode: 'EPC1', rate: '$100.00', planned: '5.00',
      dueDate: '2021-05-19', assignedTo: 'Sachin Patil', assigned: '5.00', actual: '5.00',
      cost: '500', worked: '5.00', remaining: '0.00', scheduled: '2021-05-12', date: '2021-05-12',
      status: 'Approved', submitted: '2021-05-24'
    },
    {
      task: 'Quality Control', action: 'Project Setup', jobCode: 'PA1', rate: '$60.00', planned: '7.00',
      dueDate: '2021-05-18', assignedTo: 'Option Matrix', assigned: '7.00', actual: '0.00',
      cost: '0.00', worked: '0.00', remaining: '0.00', scheduled: '2021-05-12', date: '-',
      status: 'Scheduled', submitted: '-'
    },
    {
      task: 'Field', action: 'Field Drafting', jobCode: 'CCAD3', rate: '$95.00', planned: '2.00',
      dueDate: '2021-05-18', assignedTo: 'Option Matrix', assigned: '2.00', actual: '0.00',
      cost: '0.00', worked: '0.00', remaining: '0.00', scheduled: '2021-05-12', date: '2021-05-10',
      status: 'Pending PM Review', submitted: '2021-05-10'
    },
    {
      task: 'Research', action: 'Project Setup', jobCode: 'PA1', rate: '$60.00', planned: '2.00',
      dueDate: '2021-04-30', assignedTo: 'Bob Cormier', assigned: '2.00', actual: '0.00',
      cost: '0.00', worked: '0.00', remaining: '0.00', scheduled: '2021-05-12', date: '-',
      status: 'Scheduled', submitted: '-'
    }
  ];

  // Pagination properties
  paginatedData: any[] = [];
  totalItems: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;


  ngOnInit(): void {
    // Initialize pagination
    this.totalItems = this.tableData.length;
    this.updatePaginatedData();
  }

  toggleMenu(index: number) {
    this.sidebarMenus[index].isOpen = !this.sidebarMenus[index].isOpen;
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
      // Adjust the '-300' value to scroll more or less per click
      this.tableContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    if (this.tableContainer) {
      // Adjust the '300' value to scroll more or less per click
      this.tableContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

addModule()
{
  this.dialog.open(AddModuleComponent, {
    width: '600px',
    data: { title: 'Add Module' }
  });
}



addTask()
{
  this.dialog.open(AddTaskComponent, {
    width: '550px',
    data: {} // Pass any necessary data to the dialog
  });
}









  
}