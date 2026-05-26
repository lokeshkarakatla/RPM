import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-parts-familypop',
  templateUrl: './add-parts-familypop.component.html',
  styleUrls: ['./add-parts-familypop.component.scss']
})
export class AddPartsFamilypopComponent implements OnInit {

  
   
     isDragOver = false;
     selectedFileName: string = '';
     selectedFile: File | null = null;
   
     constructor(private dialogRef: MatDialogRef<AddPartsFamilypopComponent>) {}
   
     ngOnInit(): void {}
   
     /** Triggered when user drags a file over the drop zone */
     onDragOver(event: DragEvent): void {
       event.preventDefault();
       event.stopPropagation();
       this.isDragOver = true;
     }
   
     /** Triggered when the dragged file leaves the drop zone */
     onDragLeave(event: DragEvent): void {
       event.preventDefault();
       event.stopPropagation();
       this.isDragOver = false;
     }
   
     /** Triggered when user drops a file onto the drop zone */
     onDrop(event: DragEvent): void {
       event.preventDefault();
       event.stopPropagation();
       this.isDragOver = false;
   
       const files = event.dataTransfer?.files;
       if (files && files.length > 0) {
         this.handleFile(files[0]);
       }
     }
   
     /** Triggered when user selects a file via the Browse Files input */
     onFileSelected(event: Event): void {
       const input = event.target as HTMLInputElement;
       if (input.files && input.files.length > 0) {
         this.handleFile(input.files[0]);
       }
     }
   
     /** Common handler: stores file reference and shows file name */
     private handleFile(file: File): void {
       this.selectedFile = file;
       this.selectedFileName = file.name;
     }
   
     /** Closes the dialog */
     close(): void {
       this.dialogRef.close();
     }
   
     /** Save handler — extend with your API call as needed */
     save(): void {
       if (!this.selectedFile) {
         console.warn('No file selected.');
         return;
       }
   
       const formData = new FormData();
       formData.append('file', this.selectedFile, this.selectedFile.name);
   
       // TODO: inject your service and call the API, e.g.:
       // this.commodityService.uploadTemplate(formData).subscribe(...)
   
       console.log('Saving with file:', this.selectedFile.name);
       this.dialogRef.close({ file: this.selectedFile });
     }
}
