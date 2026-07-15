import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { AddTagComponent } from './add-tag/add-tag.component';

export interface TagMasterData {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

@Component({
  selector: 'app-tag-master',
  templateUrl: './tag-master.component.html',
  styleUrls: ['./tag-master.component.scss']
})
export class TagMasterComponent implements OnInit {

  filterToggle = false;
  filterForm!: FormGroup;

  canUpdate = true;
  canDelete = true;

  totalSize = 0;
  currentPage = 0;
  pageSize = 10;

  tableList: TagMasterData[] = [];
  displayList: TagMasterData[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.getTags();
  }

  formInit(): void {
    this.filterForm = this.fb.group({
      Keyword: [''],
      Status: [null]
    });
  }

  getTags(): void {
    const stored = localStorage.getItem('rpm_tags');
    if (stored) {
      this.tableList = JSON.parse(stored);
    } else {
      this.tableList = [
        { id: 1, name: 'Side View', isActive: true, description: 'Notes regarding side view layout' },
        { id: 2, name: 'Face View', isActive: true, description: 'Notes regarding face view layouts' },
        { id: 3, name: 'Demerit', isActive: true, description: 'Notes regarding demerit points' },
        { id: 4, name: 'Process Stage', isActive: true, description: 'Notes regarding process stages' }
      ];
      localStorage.setItem('rpm_tags', JSON.stringify(this.tableList));
    }
    this.applyFilter();
  }

  applyFilter(): void {
    const kw = this.filterForm?.get('Keyword')?.value?.toLowerCase() || '';
    const status = this.filterForm?.get('Status')?.value;

    this.displayList = this.tableList.filter(item => {
      const matchesKw = !kw || item.name.toLowerCase().includes(kw) || item.description.toLowerCase().includes(kw);
      const matchesStatus = status === null || status === undefined || item.isActive === status;
      return matchesKw && matchesStatus;
    });

    this.totalSize = this.displayList.length;
  }

  openEditDialog(item: any): void {
    const dialogRef = this.dialog.open(AddTagComponent, {
      data: item,
      width: '560px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTags();
      }
    });
  }

  Confirmation(item: TagMasterData): void {
    const nextStatusText = item.isActive ? 'Inactive' : 'Active';
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: { title: 'Change Status', content: `Are you sure you want to change the status of tag "${item.name}" to ${nextStatusText}?` }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        item.isActive = !item.isActive;
        localStorage.setItem('rpm_tags', JSON.stringify(this.tableList));
        this.getTags();
      }
    });
  }

  deleteConfirmation(item: TagMasterData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: { title: 'Delete Tag', content: `Are you sure you want to delete the tag "${item.name}"?` }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.tableList = this.tableList.filter(t => t.id !== item.id);
        localStorage.setItem('rpm_tags', JSON.stringify(this.tableList));
        this.getTags();
      }
    });
  }

  fnHandlePage(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get paginatedList(): TagMasterData[] {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.displayList.slice(start, end);
  }
}
