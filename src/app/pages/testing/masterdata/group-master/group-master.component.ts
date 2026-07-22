import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { AddGroupMasterComponent } from './add-group-master/add-group-master.component';

export interface GroupMasterData {
  id: number;
  groupName: string;
  groupCode: string;
  isActive: boolean;
}

@Component({
  selector: 'app-group-master',
  templateUrl: './group-master.component.html',
  styleUrls: ['./group-master.component.scss']
})
export class GroupMasterComponent implements OnInit {

  filterToggle = false;
  filterForm!: FormGroup;

  canUpdate = true;
  canDelete = true;

  totalSize = 0;
  currentPage = 0;
  pageSize = 10;

  tableList: GroupMasterData[] = [];
  displayList: GroupMasterData[] = [];

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.formInit();
    this.getGroups();
  }

  formInit(): void {
    this.filterForm = this.fb.group({ Keyword: [''], Status: [null] });
  }

  getGroups(): void {
    const stored = localStorage.getItem('rpm_groups');
    if (stored) {
      this.tableList = JSON.parse(stored);
    } else {
      this.tableList = [
        { id: 1, groupName: 'Assembly Group', groupCode: 'GRP-ASM', isActive: true },
        { id: 2, groupName: 'Quality Group', groupCode: 'GRP-QLT', isActive: true },
        { id: 3, groupName: 'Engineering Group', groupCode: 'GRP-ENG', isActive: true },
        { id: 4, groupName: 'EHS & Safety Group', groupCode: 'GRP-EHS', isActive: true },
        { id: 5, groupName: 'Supply Chain Group', groupCode: 'GRP-SCM', isActive: false },
        { id: 6, groupName: 'Paint & Body Group', groupCode: 'GRP-PNT', isActive: true },
        { id: 7, groupName: 'Powertrain Group', groupCode: 'GRP-PWR', isActive: true }
      ];
      localStorage.setItem('rpm_groups', JSON.stringify(this.tableList));
    }
    this.applyFilter();
  }

  applyFilter(): void {
    const kw = this.filterForm?.get('Keyword')?.value?.toLowerCase() || '';
    const status = this.filterForm?.get('Status')?.value;
    this.displayList = this.tableList.filter(item => {
      const matchesKw = !kw || item.groupName.toLowerCase().includes(kw) || item.groupCode.toLowerCase().includes(kw);
      const matchesStatus = status === null || status === undefined || item.isActive === status;
      return matchesKw && matchesStatus;
    });
    this.totalSize = this.displayList.length;
  }

  openEditDialog(item: any): void {
    const dialogRef = this.dialog.open(AddGroupMasterComponent, { data: item, width: '560px', height: 'auto' });
    dialogRef.afterClosed().subscribe(result => { if (result) this.getGroups(); });
  }

  Confirmation(item: GroupMasterData): void {
    const nextStatus = item.isActive ? 'Inactive' : 'Active';
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: { title: 'Change Status', content: `Are you sure you want to change the status of group "${item.groupName}" to ${nextStatus}?` }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        item.isActive = !item.isActive;
        localStorage.setItem('rpm_groups', JSON.stringify(this.tableList));
        this.getGroups();
      }
    });
  }

  deleteConfirmation(item: GroupMasterData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: { title: 'Delete Group', content: `Are you sure you want to delete the group "${item.groupName}"?` }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.tableList = this.tableList.filter(t => t.id !== item.id);
        localStorage.setItem('rpm_groups', JSON.stringify(this.tableList));
        this.getGroups();
      }
    });
  }

  fnHandlePage(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get paginatedList(): GroupMasterData[] {
    const start = this.currentPage * this.pageSize;
    return this.displayList.slice(start, start + this.pageSize);
  }
}
