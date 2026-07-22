import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { AddStateMasterComponent } from './add-state-master/add-state-master.component';

export interface StateMasterData {
  id: number;
  stateName: string;
  stateCode: string;
  isActive: boolean;
}

@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.scss']
})
export class StateMasterComponent implements OnInit {

  filterToggle = false;
  filterForm!: FormGroup;

  canUpdate = true;
  canDelete = true;

  totalSize = 0;
  currentPage = 0;
  pageSize = 10;

  tableList: StateMasterData[] = [];
  displayList: StateMasterData[] = [];

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.formInit();
    this.getStates();
  }

  formInit(): void {
    this.filterForm = this.fb.group({ Keyword: [''], Status: [null] });
  }

  getStates(): void {
    const stored = localStorage.getItem('rpm_states');
    if (stored) {
      this.tableList = JSON.parse(stored);
    } else {
      this.tableList = [
        { id: 1, stateName: 'Maharashtra', stateCode: 'MH', isActive: true },
        { id: 2, stateName: 'Tamil Nadu', stateCode: 'TN', isActive: true },
        { id: 3, stateName: 'Karnataka', stateCode: 'KA', isActive: true },
        { id: 4, stateName: 'Haryana', stateCode: 'HR', isActive: true },
        { id: 5, stateName: 'Rajasthan', stateCode: 'RJ', isActive: false },
        { id: 6, stateName: 'Gujarat', stateCode: 'GJ', isActive: true },
        { id: 7, stateName: 'Uttar Pradesh', stateCode: 'UP', isActive: true }
      ];
      localStorage.setItem('rpm_states', JSON.stringify(this.tableList));
    }
    this.applyFilter();
  }

  applyFilter(): void {
    const kw = this.filterForm?.get('Keyword')?.value?.toLowerCase() || '';
    const status = this.filterForm?.get('Status')?.value;
    this.displayList = this.tableList.filter(item => {
      const matchesKw = !kw || item.stateName.toLowerCase().includes(kw) || item.stateCode.toLowerCase().includes(kw);
      const matchesStatus = status === null || status === undefined || item.isActive === status;
      return matchesKw && matchesStatus;
    });
    this.totalSize = this.displayList.length;
  }

  openEditDialog(item: any): void {
    const dialogRef = this.dialog.open(AddStateMasterComponent, { data: item, width: '560px', height: 'auto' });
    dialogRef.afterClosed().subscribe(result => { if (result) this.getStates(); });
  }

  Confirmation(item: StateMasterData): void {
    const nextStatus = item.isActive ? 'Inactive' : 'Active';
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: { title: 'Change Status', content: `Are you sure you want to change the status of state "${item.stateName}" to ${nextStatus}?` }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        item.isActive = !item.isActive;
        localStorage.setItem('rpm_states', JSON.stringify(this.tableList));
        this.getStates();
      }
    });
  }

  deleteConfirmation(item: StateMasterData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: { title: 'Delete State', content: `Are you sure you want to delete the state "${item.stateName}"?` }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.tableList = this.tableList.filter(t => t.id !== item.id);
        localStorage.setItem('rpm_states', JSON.stringify(this.tableList));
        this.getStates();
      }
    });
  }

  fnHandlePage(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get paginatedList(): StateMasterData[] {
    const start = this.currentPage * this.pageSize;
    return this.displayList.slice(start, start + this.pageSize);
  }
}
