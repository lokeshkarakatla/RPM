import { Component, OnInit, Optional, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit {

  isDialog = false;

  // Available members for the left box
  availableMembers: string[] = [
    'Alex Johnson',
    'Samantha Carter',
    'Michael Chen',
    'Sarah Williams',
    'David Rodriguez',
    'Emily Davis',
    'James Wilson',
    'Olivia Martinez',
    'William Taylor',
    'Sophia Anderson',
    'Daniel Thomas'
  ];

  // Assigned members for the right box
  assignedMembers: string[] = [
    'Liam White',
    'Emma Harris',
    'Noah Martin',
    'Ava Jackson',
    'Ethan Moore'
  ];

  // Track the user's active selections in the lists
  selectedAvailable: string[] = [];
  selectedAssigned: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isDialog = !window.location.href.includes('/team');
  }

  ngOnInit(): void {
  }

  // Extracts the first letter of the first and last name (e.g., "Alex Johnson" -> "AJ")
  getInitials(name: string): string {
    if (!name) return '';
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  }

  // Toggles selection for the custom list UI
  toggleSelection(member: string, list: string[]) {
    const index = list.indexOf(member);
    if (index > -1) {
      list.splice(index, 1); // Deselect
    } else {
      list.push(member); // Select
    }
  }

  // Moves items from Left (Available) to Right (Assigned)
  addMembers() {
    if (this.selectedAvailable.length > 0) {
      this.assignedMembers.push(...this.selectedAvailable);
      
      this.availableMembers = this.availableMembers.filter(
        (member) => !this.selectedAvailable.includes(member)
      );
      
      this.selectedAvailable = [];
    }
  }

  // Moves items from Right (Assigned) to Left (Available)
  removeMembers() {
    if (this.selectedAssigned.length > 0) {
      this.availableMembers.push(...this.selectedAssigned);
      
      this.assignedMembers = this.assignedMembers.filter(
        (member) => !this.selectedAssigned.includes(member)
      );
      
      this.selectedAssigned = [];
    }
  }

  // Saves the selection and closes the dialog
  save() {
    this.dialog.closeAll();
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  goBack(): void {
    if (this.isDialog) {
      this.dialog.closeAll();
    } else {
      this.router.navigateByUrl('/app/testing/projects');
    }
  }
}