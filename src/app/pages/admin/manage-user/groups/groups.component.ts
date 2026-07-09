import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

export interface Group {
  name: string;
  team: number;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups: Group[] = [
    { name: 'Group 1', team: 6, status: 'Active' },
    { name: 'Group 2', team: 3, status: 'Active' },
    { name: 'Group 3', team: 1, status: 'Active' },
    { name: 'Group 4', team: 1, status: 'Active' },
    { name: 'Group 5', team: 1, status: 'Active' },
    { name: 'Group 6', team: 2, status: 'Active' },
    { name: 'Group 7', team: 0, status: 'Active' }
  ];

  filterToggle = false;
  searchQuery = '';
  filterKeyword = '';

  // Add Group Modal state
  showAddModal = false;
  newGroupName = '';
  newGroupTeam = 0;
  newGroupStatus: 'Active' | 'Inactive' = 'Active';

  // Edit Group Modal state
  showEditModal = false;
  editingGroup: Group | null = null;
  editingIndex = -1;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  // --- Filtering ---
  get filteredGroupsList(): Group[] {
    return this.groups.filter(g => {
      const mainMatch = !this.searchQuery || g.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const keywordMatch = !this.filterKeyword || g.name.toLowerCase().includes(this.filterKeyword.toLowerCase());
      return mainMatch && keywordMatch;
    });
  }

  toggleFilter() {
    this.filterToggle = !this.filterToggle;
  }

  clearFilter() {
    this.filterKeyword = '';
  }

  applyFilter() {
    // Currently keyword input directly updates filterKeyword, so we just toggle/close the filter or confirm
    this.filterToggle = false;
  }

  // --- Add Group Action ---
  openAddModal() {
    this.newGroupName = '';
    this.newGroupTeam = 0;
    this.newGroupStatus = 'Active';
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  saveNewGroup() {
    const name = this.newGroupName.trim();
    if (!name) return;
    
    this.groups.push({
      name,
      team: this.newGroupTeam,
      status: this.newGroupStatus
    });
    this.closeAddModal();
  }

  // --- Edit Group Action ---
  openEditModal(group: Group, index: number) {
    this.editingGroup = { ...group };
    this.editingIndex = index;
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingGroup = null;
    this.editingIndex = -1;
  }

  updateGroup() {
    if (!this.editingGroup || this.editingIndex === -1) return;
    const name = this.editingGroup.name.trim();
    if (!name) return;

    // Find original index in this.groups array
    const originalIndex = this.groups.findIndex(g => g.name === this.filteredGroupsList[this.editingIndex].name);
    if (originalIndex !== -1) {
      this.groups[originalIndex] = { ...this.editingGroup };
    }
    this.closeEditModal();
  }

  // --- Delete Group Action ---
  deleteGroup(index: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: {
        title: 'Delete Confirmation',
        content: 'Are you sure you want to delete this record?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const targetGroup = this.filteredGroupsList[index];
        this.groups = this.groups.filter(g => g !== targetGroup);
      }
    });
  }

}
