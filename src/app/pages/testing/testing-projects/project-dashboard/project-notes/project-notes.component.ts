import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { ActivatedRoute, Router } from '@angular/router';

export interface NoteData {
  actions: string;
  date: string;
  postedBy: string;
  message: string;
  document: string;
  tags: string;
}

@Component({
  selector: 'app-project-notes',
  templateUrl: './project-notes.component.html',
  styleUrls: ['./project-notes.component.scss']
})
export class ProjectNotesComponent implements OnInit {

  displayedColumns: string[] = ['actions', 'date', 'postedBy', 'message', 'document', 'tags'];
  dataSource: NoteData[] = [];
  
  selectedTag: string = '';
  noteText: string = '';
  availableTags: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadTags();
    this.loadNotes();
  }

  loadTags(): void {
    const stored = localStorage.getItem('rpm_tags');
    let tagsList = [];
    if (stored) {
      tagsList = JSON.parse(stored);
    } else {
      tagsList = [
        { id: 1, name: 'Side View', isActive: true, description: 'Notes regarding side view layout' },
        { id: 2, name: 'Face View', isActive: true, description: 'Notes regarding face view layouts' },
        { id: 3, name: 'Demerit', isActive: true, description: 'Notes regarding demerit points' },
        { id: 4, name: 'Process Stage', isActive: true, description: 'Notes regarding process stages' }
      ];
      localStorage.setItem('rpm_tags', JSON.stringify(tagsList));
    }
    // Filter to only active tags
    this.availableTags = tagsList.filter((t: any) => t.isActive).map((t: any) => t.name);
  }

  loadNotes(): void {
    const stored = localStorage.getItem('rpm_notes');
    if (stored) {
      this.dataSource = JSON.parse(stored);
    } else {
      this.dataSource = [];
    }
  }

  addNote(): void {
    if (!this.selectedTag || !this.noteText.trim()) {
      return;
    }
    const newNote: NoteData = {
      actions: '',
      date: new Date().toLocaleDateString(),
      postedBy: 'Admin',
      message: this.noteText.trim(),
      document: '',
      tags: this.selectedTag
    };
    this.dataSource = [newNote, ...this.dataSource];
    localStorage.setItem('rpm_notes', JSON.stringify(this.dataSource));
    this.clearForm();
  }

  clearForm(): void {
    this.selectedTag = '';
    this.noteText = '';
  }

  goBack(): void {
    this.router.navigateByUrl('/app/testing/projects');
  }

  uploaddoc(value: any) {
    this.dialog.open(UploadDocumentComponent, {
      data: value,
      height: 'auto',
      width: '500px',
    });
  }
}