import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addphoto-pop',
  templateUrl: './addphoto-pop.component.html',
  styleUrls: ['./addphoto-pop.component.scss']
})
export class AddphotoPopComponent implements OnInit {
  
  isEditMode: boolean = false;
  title: string = '';
  description: string = '';
  module: string = '';
  stage: string = '';
  selectedFile: File | null = null;
  imageUrl: string = '';

  modules: string[] = ['Module 1', 'Module 2'];
  stages: string[] = ['Stage 1', 'Stage 2'];

  constructor(
    public dialogRef: MatDialogRef<AddphotoPopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.isEditMode = true;
      this.title = data.title || '';
      this.description = data.description || '';
      this.module = data.module || '';
      this.stage = data.stage || '';
      this.imageUrl = data.url || '';
    }
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.imageUrl = URL.createObjectURL(this.selectedFile);
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imageUrl = '';
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.title.trim()) {
      return;
    }
    
    this.dialogRef.close({
      title: this.title,
      description: this.description,
      module: this.module,
      stage: this.stage,
      file: this.selectedFile,
      url: this.imageUrl
    });
  }
}

