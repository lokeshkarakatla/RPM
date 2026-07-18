import { Component, OnInit } from '@angular/core';
import { AddphotoPopComponent } from './addphoto-pop/addphoto-pop.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-project-photos',
  templateUrl: './project-photos.component.html',
  styleUrls: ['./project-photos.component.scss']
})
export class ProjectPhotosComponent implements OnInit {
  
  showFilter: boolean = false;
  photoList: any[] = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos() {
    this.photoList = [
      { url: '/assets/Swift/Right_Fender.png', title: 'Right Fender', description: 'Freshly painted fender installed today.', module: 'Module 1', stage: 'Stage 1' },
      { url: '/assets/Swift/Roof.png', title: 'Roof View', description: 'Structural integrity check completed.', module: 'Module 2', stage: 'Stage 1' },
      { url: '/assets/Swift/Bonnet.png', title: 'Bonnet', description: 'Alignment confirmed for closure.', module: 'Module 1', stage: 'Stage 2' }
    ];
  }

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  Addphoto(photo: any = null) {
    const dialogRef = this.dialog.open(AddphotoPopComponent, {
      data: photo,
      height: 'auto',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (photo) {
          // Edit Mode
          const index = this.photoList.indexOf(photo);
          if (index !== -1) {
            this.photoList[index] = {
              url: result.url || photo.url,
              title: result.title,
              description: result.description,
              module: result.module,
              stage: result.stage
            };
          }
        } else {
          // Add Mode
          this.photoList.push({
            url: result.url || '/assets/Swift/Right_Fender.png',
            title: result.title,
            description: result.description,
            module: result.module,
            stage: result.stage
          });
        }
      }
    });
  }

  deletePhoto(index: number) {
    if (confirm('Are you sure you want to delete this photo?')) {
      this.photoList.splice(index, 1);
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.photoList, event.previousIndex, event.currentIndex);
  }

  goBack() {
    window.history.back();
  }
}