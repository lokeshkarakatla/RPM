import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-obj-image-dialog',
  templateUrl: './obj-image-dialog.component.html',
  styleUrls: ['./obj-image-dialog.component.scss']
})
export class ObjImageDialogComponent implements OnInit {

  Image: any;
  file: File | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ObjImageDialogComponent>
  ) { }

  ngOnInit(): void {
    this.Image = this.data?.image;
  }

  close() {
    this.dialogRef.close();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();

    if (event.dataTransfer?.files.length) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File) {
    this.file = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.Image = reader.result;
    };

    reader.readAsDataURL(file);
  }

  save() {
    if (!this.file) {
      alert('Please upload a file before saving.');
      return;
    }

    console.log('Saving file:', this.file.name);
  }


gridSize = 10;

gridCells = Array(this.gridSize * this.gridSize).fill(0);

selectedCells: number[] = [];

selectCell(index: number) {

  if (this.selectedCells.includes(index)) {
    this.selectedCells =
      this.selectedCells.filter(x => x !== index);
  } else {
    this.selectedCells.push(index);
  }
}


}