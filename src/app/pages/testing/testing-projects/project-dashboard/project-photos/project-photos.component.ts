import { Component, OnInit } from '@angular/core';
import { AddphotoPopComponent } from './addphoto-pop/addphoto-pop.component';
import { MatDialog } from '@angular/material/dialog';

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
      { url: '/assets/Swift/Right_Fender.png', title: 'Right Fender', description: 'Freshly painted fender installed today.' },
      { url: '/assets/Swift/Roof.png', title: 'Roof View', description: 'Structural integrity check completed.' },
      { url: '/assets/Swift/Bonnet.png', title: 'Bonnet', description: 'Alignment confirmed for closure.' }
    ];
  }

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  Addphoto(value: any) {
    this.dialog.open(AddphotoPopComponent, {
      data: value,
      height: 'auto',
      width: '500px',
    });
  }

  goBack() {
    window.history.back();
  }
}