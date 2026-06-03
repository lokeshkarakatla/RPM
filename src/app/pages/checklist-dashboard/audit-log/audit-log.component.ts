import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

import { AddChecklistLineitemComponent } from './add-checklist-lineitem/add-checklist-lineitem.component';
import { AddTableNotesComponent } from './add-table-notes/add-table-notes.component';
import { ImageDisplayComponent } from './image-display/image-display.component';
import { RequestTypeComponent } from './request-type/request-type.component';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss']
})
export class AuditLogComponent implements OnInit {

  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  
  // Top Button States
  isChecked1: string = 'no';
  isChecked2: string = 'yes';
  isChecked3: string = 'yes';
  isChecked4: string = 'yes';
  isChecked5: string = 'yes';
  
  filterToggle = false;
  gridToggle = false;
  
  // --- NEW IMAGE LOGIC VARIABLES ---
  selectedSidePart: number = 1; // Default to the first button (Right Fender)
  currentImage: string = '/assets/Right_fender.jpeg'; // Initial Image

  images = {
    img1: '/assets/Right_fender.jpeg', // Right Fender
    img2: '/assets/Right_Front_Door.jpeg', // Right Front Door
    img3: '/assets/Right_Rear_Door.jpeg', // Right Rear Door
    img4: '/assets/Rear.jpeg', // Rear
    img5: '/assets/Left_Rear_Door.jpeg',   // Left Rear Door
    img6: '/assets/Left_Front_Door.jpeg',  // Left Front Door
    img7: '/assets/Left_Fender.jpeg', // Left Fender 
    img8: '/assets/Roof.jpeg',        // Roof 
    img9: '/assets/Bonnet.jpeg'       // Bonnet
  };

  constructor(public dialog: MatDialog, private router: Router) { }

  values: any[] = [];
  
  values1 = [
    { sno: '1', module: 'BSO', function: 'Aesthetics', defect: 'Thin Paint', issue: 'Fuel filler hinge area/Fuel flap edge', side: 'LH', face: 'FT', agency: 'GA', demerit: '1' },
    { sno: '2', module: 'Door', function: 'Mutilation', defect: 'Ding', issue: 'RHR BSO Ding', side: 'RH', face: 'RR', agency: 'Paint', demerit: '10' },
    { sno: '3', module: 'Rear bumper', function: 'Aesthetics', defect: 'Scratch ', issue: 'LHR Door outer scratch', side: 'BH', face: 'BH', agency: 'Body', demerit: '20' },
    { sno: '4', module: 'Tailgate', function: 'Mutilation', defect: 'Sink / flow marks', issue: 'Roof rail - Sink marks / Waviness', side: 'LH', face: 'BH', agency: 'SQE', demerit: '10' },
    { sno: '5', module: 'Central Console', function: 'Mutilation', defect: 'Dirty', issue: 'RHR 60 seat dirty', side: 'LH', face: 'FT', agency: 'SQE', demerit: '50' },
    { sno: '6', module: 'C pillar', function: 'Aesthetics', defect: 'Color / Shade Mismatch', issue: 'Roof rail - Sink marks / Waviness', side: 'RH', face: 'FT', agency: 'Body', demerit: '20' },
    { sno: '7', module: 'Rear Seat', function: 'Mutilation', defect: 'Tool / Scuff Marks', issue: 'Roof rail - Sink marks / Waviness', side: 'BH', face: 'BH', agency: 'SQE', demerit: '1' },
    { sno: '8', module: 'Door', function: 'Aesthetics', defect: 'Damage/ Scratch/ Chip', issue: 'RH rocker panel scratch', side: 'RR', face: 'FT', agency: 'Paint', demerit: '10' },
    { sno: '9', module: 'BSO', function: 'Aesthetics', defect: 'Uneven/Excess Gap', issue: 'Door apeture / BSO color mismatch- G red', side: 'RH', face: 'FT', agency: 'Body', demerit: '20' },
    { sno: '10', module: 'Tailgate', function: 'Mutilation', defect: 'Dent/ Ding / Bump', issue: 'Fuel flap - Reinforcement Panel Spot Exposed', side: 'RR', face: 'RR', agency: 'Paint', demerit: '50' },
  ]

  ngOnInit() {
    if (environment.mode == 1) {
      this.values = this.values1;
    }
  }

  // --- DYNAMIC IMAGE CHANGER METHOD ---
  changeImage(partId: number, imgPath: string) {
    this.selectedSidePart = partId;
    this.currentImage = imgPath;
  }

  opendashboard() {
    window.open('/#/app/checklistdoard/issuelog/request-type');
  }

  request(item: any) {
    this.dialog.open(RequestTypeComponent, {
      data: item,
      width: "1100px",
      height: "auto"
    });
  }

  public addchecklistissuelineitem(item: any) {
    this.dialog.open(AddChecklistLineitemComponent, {
      data: item,
      width: "900px",
      height: "auto"
    });
  }

  scrollGrid(side: string) {
    var ele = document.getElementById('tableScroll');
    if(ele) {
      if (side == 'right') ele.scrollLeft += 210;
      else ele.scrollLeft -= 210;
    }
  }

  public addnote(item: any) {
    this.dialog.open(AddTableNotesComponent, {
      data: item,
      width: "600px",
      height: "auto"
    });
  }

  public imageSource(item: any) {
    this.dialog.open(ImageDisplayComponent, {
      data: item,
      width: "600px",
      height: "auto"
    });
  }

  public addchecklistaudit(auditdata: any) {
    window.open('/#/app/prts-grid');
  }

  // Top Filter Buttons Colors
  color1() {
    this.isChecked1 = 'no'; this.isChecked2 = 'yes'; this.isChecked3 = 'yes'; this.isChecked4 = 'yes'; this.isChecked5 = 'yes';
  }
  color2() {
    this.isChecked1 = 'yes'; this.isChecked2 = 'no'; this.isChecked3 = 'yes'; this.isChecked4 = 'yes'; this.isChecked5 = 'yes';
  }
  color3() {
    this.isChecked1 = 'yes'; this.isChecked2 = 'yes'; this.isChecked3 = 'no'; this.isChecked4 = 'yes'; this.isChecked5 = 'yes';
  }
  color4() {
    this.isChecked1 = 'yes'; this.isChecked2 = 'yes'; this.isChecked3 = 'yes'; this.isChecked4 = 'no'; this.isChecked5 = 'yes';
  }
  color5() {
    this.isChecked1 = 'yes'; this.isChecked2 = 'yes'; this.isChecked3 = 'yes'; this.isChecked4 = 'yes'; this.isChecked5 = 'no';
  }

}