import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

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

  @ViewChild('editNoteDialog') editNoteDialog!: TemplateRef<any>;

  displayedColumns: string[] = ['actions', 'date', 'postedBy', 'message', 'document', 'tags'];
  dataSource: NoteData[] = [];
  
  selectedTag: string = '';
  noteText: string = '';
  availableTags: string[] = [];
  editingNote: NoteData | null = null;
  editSelectedTag: string = '';
  editNoteText: string = '';
  editDialogRef: any = null;

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
      this.dataSource = [
        { actions: '', date: '07/10/2026', postedBy: 'Ram Kumar', message: 'Initial requirement analysis completed. Waiting for client sign-off.', document: 'HL7 Integration Spec.pdf', tags: 'Side View' },
        { actions: '', date: '07/11/2026', postedBy: 'Vijay Verma', message: 'Added feedback regarding demerit calculations in section 4.', document: 'Safety Audit Clearance.pdf', tags: 'Demerit' },
        { actions: '', date: '07/12/2026', postedBy: 'Neha Sharma', message: 'CAD models updated to revision 3. Ready for process design validation.', document: 'Design Standards Handbook.pdf', tags: 'Face View' },
        { actions: '', date: '07/14/2026', postedBy: 'Admin', message: 'Reviewed process stage pipeline for NextGen Assembly Line. Minor tweaks needed in development.', document: 'Assembly Line Layout v1.pdf', tags: 'Process Stage' }
      ];
      localStorage.setItem('rpm_notes', JSON.stringify(this.dataSource));
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

  editNote(note: NoteData): void {
    this.editingNote = note;
    this.editSelectedTag = note.tags;
    this.editNoteText = note.message;
    this.editDialogRef = this.dialog.open(this.editNoteDialog, {
      width: '500px',
      height: 'auto'
    });
  }

  closeEditDialog(): void {
    if (this.editDialogRef) {
      this.editDialogRef.close();
      this.editDialogRef = null;
    }
    this.editingNote = null;
  }

  saveEditDialog(): void {
    if (!this.editSelectedTag || !this.editNoteText.trim()) {
      return;
    }
    if (this.editingNote) {
      this.editingNote.tags = this.editSelectedTag;
      this.editingNote.message = this.editNoteText.trim();
      localStorage.setItem('rpm_notes', JSON.stringify(this.dataSource));
    }
    this.closeEditDialog();
  }

  deleteNote(note: NoteData): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: {
        title: 'Delete Confirmation',
        content: 'Are you sure you want to delete this note?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.editingNote === note) {
          this.closeEditDialog();
        }
        this.dataSource = this.dataSource.filter(n => n !== note);
        localStorage.setItem('rpm_notes', JSON.stringify(this.dataSource));
      }
    });
  }

  clearForm(): void {
    this.selectedTag = '';
    this.noteText = '';
  }

  viewPdf(fileName: string): void {
    alert('Viewing document: ' + fileName);
  }

  downloadPdf(fileName: string): void {
    alert('Downloading document: ' + fileName);
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