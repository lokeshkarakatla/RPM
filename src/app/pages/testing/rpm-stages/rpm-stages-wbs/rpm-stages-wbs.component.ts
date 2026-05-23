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
      name: 'Scoping & Concept Generation',
      count: 15,
      isOpen: false,
      subItems: ['Define project initiation criteria and innovation goals', 'Conduct brainstorming sessions and ideation workshops', 'Complete initial market gap and trend analysis', 'TPerform high-level technical assessment of the concept', 'Screen ideas against corporate strategy alignment', 'Consolidate concepts into a preliminary project brief', 'Gate 1 Review: Evaluate concept viability and approve preliminary scoping budget', 'Define the final project scope and draft the Scope Statement', 'Build the Work Breakdown Structure (WBS) and WBS Dictionary', 'Estimate task durations and identify task dependencies', 'Develop the critical path and master Project Schedule (Gantt chart)', 'Estimate project costs and finalize the baseline Project Budget', 'Draft the Risk Management Plan and build the initial Risk Register', 'Establish the Project Change Management process and baseline metrics', 'Secure formal stakeholder approval on the master Project Management Plan']
    },
    {
      name: 'Execution, Monitoring & Control',
      count: 19,
      isOpen: false,
      subItems: ['Onboard, assign roles, and brief project team resources', 'Procure necessary software, hardware, or third-party vendor services', 'Kick off execution of core project deliverables and technical tasks', 'Conduct regular team daily stand-ups or status synchronization meetings', 'Manage day-to-day resource allocation and workloads', 'Execute the continuous Quality Assurance (QA) plan on team outputs', 'Manage stakeholder communications and send project updates', 'Maintain and update the Risk Register with newly identified threats', 'Track actual project expenditures against the baseline budget', 'Track team velocity, productivity, and resource utilization rates', 'Log, review, and evaluate formal Change Requests', 'Issue formal Change Orders for approved modifications', 'Conduct periodic performance reviews and status meetings with clients', 'Manage and resolve internal project bottlenecks or team conflicts', 'Perform continuous Quality Control (QC) testing on deliverables', 'Document ongoing technical issues in an active Issue Log', 'Implement corrective action plans for lagging milestones', 'Consolidate and package finalized project deliverables', 'Prepare User Acceptance Testing (UAT) scripts and environment']
    },
    {
      name: 'Delivery, Handover & Closeout',
      count: 11,
      isOpen: false,
      subItems: [' Conduct UAT sessions with designated client/end-user groups', 'Log defects, bugs, or omissions identified during testing', 'Execute remediation work to address UAT feedback and defects', 'Secure formal client sign-off and project acceptance documentation', 'Deliver final end-user training and administrative documentation', 'Transition ongoing support and maintenance to operational teams', 'Release project resources back to their functional departments', 'Close out external vendor contracts and finalize outstanding invoices', 'Conduct a project retrospective/lessons-learned workshop with the team', 'Archive all project documentation and issue the final Closeout Report', 'Consolidate and package finalized project deliverables']
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
    { task: 'Field', action: 'Field Design', jobCode: 'EPC1', rate: '$100.00', planned: '5.00', dueDate: '2021-05-19', assignedTo: 'Sachin Patil', assigned: '5.00', actual: '5.00', cost: '500.00', worked: '5.00', remaining: '0.00', scheduled: '2021-05-12', date: '2021-05-12', status: 'Approved', submitted: '2021-05-24' },
    { task: 'Quality Control', action: 'Project Setup', jobCode: 'PA1', rate: '$60.00', planned: '7.00', dueDate: '2021-05-18', assignedTo: 'Option Matrix', assigned: '7.00', actual: '0.00', cost: '0.00', worked: '0.00', remaining: '0.00', scheduled: '2021-05-12', date: '-', status: 'Scheduled', submitted: '-' },
    { task: 'Field', action: 'Field Drafting', jobCode: 'CCAD3', rate: '$95.00', planned: '2.00', dueDate: '2021-05-18', assignedTo: 'Option Matrix', assigned: '2.00', actual: '0.00', cost: '0.00', worked: '0.00', remaining: '0.00', scheduled: '2021-05-12', date: '2021-05-10', status: 'Pending PM Review', submitted: '2021-05-10' },
    { task: 'Research', action: 'Project Setup', jobCode: 'PA1', rate: '$60.00', planned: '2.00', dueDate: '2021-04-30', assignedTo: 'Bob Cormier', assigned: '2.00', actual: '0.00', cost: '0.00', worked: '0.00', remaining: '0.00', scheduled: '2021-05-12', date: '-', status: 'Scheduled', submitted: '-' },
    { task: 'Structural', action: 'Structural Analysis', jobCode: 'STR2', rate: '$120.00', planned: '10.00', dueDate: '2021-06-01', assignedTo: 'James Hooper', assigned: '10.00', actual: '6.00', cost: '720.00', worked: '6.00', remaining: '4.00', scheduled: '2021-05-20', date: '2021-05-20', status: 'In Progress', submitted: '-' },
    { task: 'Electrical', action: 'Wiring Layout', jobCode: 'ELEC4', rate: '$85.00', planned: '8.00', dueDate: '2021-06-05', assignedTo: 'Nina Patel', assigned: '8.00', actual: '3.00', cost: '255.00', worked: '3.00', remaining: '5.00', scheduled: '2021-05-22', date: '2021-05-22', status: 'In Progress', submitted: '2021-05-22' },
    { task: 'Mechanical', action: 'HVAC Design', jobCode: 'MECH5', rate: '$110.00', planned: '6.00', dueDate: '2021-06-08', assignedTo: 'Carlos Rivera', assigned: '6.00', actual: '0.00', cost: '0.00', worked: '0.00', remaining: '6.00', scheduled: '2021-05-25', date: '-', status: 'Scheduled', submitted: '-' },
    { task: 'Civil', action: 'Site Survey', jobCode: 'CIV6', rate: '$75.00', planned: '4.00', dueDate: '2021-05-28', assignedTo: 'Laura Kim', assigned: '4.00', actual: '4.00', cost: '300.00', worked: '4.00', remaining: '0.00', scheduled: '2021-05-14', date: '2021-05-14', status: 'Approved', submitted: '2021-05-15' },
    { task: 'Architectural', action: 'Floor Plan Review', jobCode: 'ARCH7', rate: '$90.00', planned: '3.00', dueDate: '2021-05-30', assignedTo: 'Tom Nguyen', assigned: '3.00', actual: '1.00', cost: '90.00', worked: '1.00', remaining: '2.00', scheduled: '2021-05-18', date: '2021-05-18', status: 'Pending PM Review', submitted: '2021-05-18' },
    { task: 'Environmental', action: 'Impact Assessment', jobCode: 'ENV8', rate: '$70.00', planned: '12.00', dueDate: '2021-06-15', assignedTo: 'Sara Lee', assigned: '12.00', actual: '0.00', cost: '0.00', worked: '0.00', remaining: '12.00', scheduled: '2021-06-01', date: '-', status: 'Scheduled', submitted: '-' },
    { task: 'Geotechnical', action: 'Soil Testing', jobCode: 'GEO9', rate: '$130.00', planned: '5.00', dueDate: '2021-05-25', assignedTo: 'Mike Adams', assigned: '5.00', actual: '5.00', cost: '650.00', worked: '5.00', remaining: '0.00', scheduled: '2021-05-10', date: '2021-05-10', status: 'Approved', submitted: '2021-05-11' },
    { task: 'Landscaping', action: 'Planting Plan', jobCode: 'LAND10', rate: '$55.00', planned: '4.00', dueDate: '2021-06-20', assignedTo: 'Grace Chen', assigned: '4.00', actual: '0.00', cost: '0.00', worked: '0.00', remaining: '4.00', scheduled: '2021-06-05', date: '-', status: 'Scheduled', submitted: '-' },
    { task: 'Inspection', action: 'Site Inspection', jobCode: 'INSP11', rate: '$80.00', planned: '2.00', dueDate: '2021-05-22', assignedTo: 'David Park', assigned: '2.00', actual: '2.00', cost: '160.00', worked: '2.00', remaining: '0.00', scheduled: '2021-05-22', date: '2021-05-22', status: 'Approved', submitted: '2021-05-23' },
    { task: 'Permitting', action: 'Permit Application', jobCode: 'PERM12', rate: '$65.00', planned: '3.00', dueDate: '2021-06-10', assignedTo: 'Rachel Wong', assigned: '3.00', actual: '1.00', cost: '65.00', worked: '1.00', remaining: '2.00', scheduled: '2021-05-28', date: '2021-05-28', status: 'Pending PM Review', submitted: '2021-05-28' },
    { task: 'Procurement', action: 'Material Sourcing', jobCode: 'PROC13', rate: '$72.00', planned: '9.00', dueDate: '2021-06-25', assignedTo: 'Kevin Hart', assigned: '9.00', actual: '0.00', cost: '0.00', worked: '0.00', remaining: '9.00', scheduled: '2021-06-08', date: '-', status: 'Scheduled', submitted: '-' },
  ];

  // Pagination properties
  paginatedData: any[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
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

  addModule() {
    this.dialog.open(AddModuleComponent, {
      width: '600px',
      data: { title: 'Add Module' }
    });
  }



  addTask() {
    this.dialog.open(AddTaskComponent, {
      width: '550px',
      data: {} // Pass any necessary data to the dialog
    });
  }










}