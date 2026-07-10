import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface TeamMember {
  id: string;
  initials: string;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss']
})
export class AddAssignmentComponent implements OnInit {
  availableMembers: TeamMember[] = [];
  assignedMembers: TeamMember[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddAssignmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initializeMembers();
  }

  initializeMembers(): void {
    // All available members
    const allMembers = [
      { id: '1', initials: 'AJ', name: 'Alex Johnson' },
      { id: '2', initials: 'SC', name: 'Samantha Carter' },
      { id: '3', initials: 'MC', name: 'Michael Chen' },
      { id: '4', initials: 'SW', name: 'Sarah Williams' },
      { id: '5', initials: 'DR', name: 'David Rodriguez' },
      { id: '6', initials: 'ED', name: 'Emily Davis' },
      { id: '7', initials: 'JW', name: 'James Wilson' },
      { id: '8', initials: 'OM', name: 'Olivia Martinez' },
      { id: '9', initials: 'WT', name: 'William Taylor' },
      { id: '10', initials: 'SA', name: 'Sophia Anderson' },
      { id: '11', initials: 'DT', name: 'Daniel Thomas' }
    ];

    // Pre-assigned members
    const preAssigned = [
      { id: '12', initials: 'LW', name: 'Liam White' },
      { id: '13', initials: 'EH', name: 'Emma Harris' },
      { id: '14', initials: 'NM', name: 'Noah Martin' },
      { id: '15', initials: 'AJ', name: 'Ava Jackson' },
      { id: '16', initials: 'EM', name: 'Ethan Moore' }
    ];

    this.availableMembers = allMembers.map(m => ({ ...m, selected: false }));
    this.assignedMembers = preAssigned.map(m => ({ ...m, selected: false }));
  }

  // Toggle selection in available members
  toggleAvailableSelection(member: TeamMember): void {
    member.selected = !member.selected;
  }

  // Toggle selection in assigned members
  toggleAssignedSelection(member: TeamMember): void {
    member.selected = !member.selected;
  }

  // Add selected members to assigned team
  addToTeam(): void {
    const selectedMembers = this.availableMembers.filter(m => m.selected);
    this.assignedMembers.push(...selectedMembers);
    this.availableMembers = this.availableMembers.filter(m => !m.selected);
    // Reset selections
    this.assignedMembers.forEach(m => m.selected = false);
  }

  // Remove selected members from assigned team
  removeFromTeam(): void {
    const selectedMembers = this.assignedMembers.filter(m => m.selected);
    this.availableMembers.push(...selectedMembers);
    this.assignedMembers = this.assignedMembers.filter(m => !m.selected);
    // Reset selections
    this.availableMembers.forEach(m => m.selected = false);
  }

  // Check if add button should be disabled
  canAdd(): boolean {
    return this.availableMembers.some(m => m.selected);
  }

  // Check if remove button should be disabled
  canRemove(): boolean {
    return this.assignedMembers.some(m => m.selected);
  }

  onSave(): void {
    this.dialogRef.close(this.assignedMembers);
  }

  close(): void {
    this.dialogRef.close();
  }

}