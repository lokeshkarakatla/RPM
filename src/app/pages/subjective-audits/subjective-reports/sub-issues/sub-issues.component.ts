import { AddIssesComponent } from './add-isses/add-isses.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { AddPsrPopComponent } from './add-psr-pop/add-psr-pop.component';

@Component({
  selector: 'app-sub-issues',
  templateUrl: './sub-issues.component.html',
  styleUrls: ['./sub-issues.component.scss']
})
export class SubIssuesComponent implements OnInit {

  // Pagination variable
  
  filterToggle: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


element = document.getElementById('some-id');
if (element:any) {
  element.classList.add('some-class');
}

viewMode: number = 2; // 1 = single view, 2 = double view

  images = [
    { title: 'Right Fender', src: '/assets/Right_fender.jpeg',height: '288px', width: '480px' },
    { title: 'Right Front Door', src: '/assets/Right_Front_Door.jpeg',height: '350px', width: '350px' },
    { title: 'Right Rear Door', src: '/assets/Right_Rear_Door.jpeg',height: '350px', width: '350px' },
    { title: '  Rear', src: '/assets/Rear.jpeg',height: '350px', width: '400px' },
    { title: 'Left Rear Door', src: '/assets/Left_Rear_Door.jpeg',height: '350px', width: '350px' },
      { title: 'Left Front Door', src: '/assets/Left_Front_Door.jpeg',height: '350px', width: '350px' },
    { title: 'Left Fender  ', src: '/assets/Left_Fender.jpeg',height: '288px', width: '480px' },
    { title: '  Roof', src: '/assets/Roof.jpeg',height: '290px', width: '500px' },
    { title: '    Bonnet', src: '/assets/Bonnet.jpeg',height: '320px', width: '450px' }
  ];

}