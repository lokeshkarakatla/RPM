import { SkipDialogComponent } from './../skip-dialog/skip-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NoteComponent } from '../note/note.component';
import { PartsData } from '../PartsData';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { AddCapaComponent } from '../../capa/add-capa/add-capa.component';

import { MonitorDialogComponent } from './monitor-dialog/monitor-dialog.component';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  totalSize = 0;
  filterToggle: boolean = false;
  fromPage: string | null = null;
  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog) {
    this.route.queryParams.subscribe(params => {
      this.fromPage = params['from'] || null;
    });
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  data = [
    {
      title: "High-Performance Nissan Ariya NISMO Debuts on World EV (FIELD/2024/09/6)",
      role: "Shop Head",
      department: "QA",
      issue: "Engine Overheating",
      details: "enginee getting sound",
      date: "2024-09-20",
      status: "Open",
      actions: { edit: true, delete: true }
    },
    {
      title: "High-Performance Nissan Ariya NISMO Debuts on World EV (FIELD/2024/09/6)",
      role: "Shift Manager",
      department: "Quality",
      issue: "Brakes Squeaking not working",
      details: "Brakes Squeaking not working",
      date: "2024-09-24",
      status: "Pending",
      actions: { edit: true, delete: true }
    },
    {
      title: "This road hazard service is part of Bosch’s connected map issue (FIELD/2024/09/8)",
      role: "Shop Head",
      department: "QA",
      issue: "Transmission Slipping",
      details: "Transmission Slipping is not good",
      date: "2024-09-24",
      status: "WIP",
      actions: { edit: true, delete: true }
    },
    {
      title: "High-Performance Nissan Ariya NISMO Debuts on World EV (FIELD/2024/09/6)",
      role: "Shop Head",
      department: "Account",
      issue: "Transmission Slipping",
      details: "Transmission Slipping",
      date: "2024-09-24",
      status: "WIP",
      actions: { edit: true, delete: true }
    },
    {
      title: "High-Performance Nissan Ariya NISMO Debuts on World EV (FIELD/2024/09/6)",
      role: "Shift Manager",
      department: "Developer",
      issue: "Battery Draining",
      details: "Battery Draining",
      date: "2024-09-24",
      status: "Pending",
      actions: { edit: true, delete: true }
    },
    {
      title: "Global fleet of connected vehicles (FIELD/2024/09/3)",
      role: "Shift Manager",
      department: "QA",
      issue: "Unusual Vibrations",
      details: "Unusual Vibrations",
      date: "2024-09-24",
      status: "Open",
      actions: { edit: true, delete: true }
    },
    {
      title: "High-Performance Nissan Ariya NISMO Debuts on World EV (FIELD/2024/09/6)",
      role: "Shift Manager",
      department: "Quality",
      issue: "Brakes Squeaking not working",
      details: "Brakes Squeaking not working",
      date: "2024-09-24",
      status: "Open",
      actions: { edit: true, delete: true }
    },
    {
      title: "High-Performance Nissan Ariya NISMO Debuts on World EV (FIELD/2024/09/6)",
      role: "Shift Manager",
      department: "Quality",
      issue: "Brakes Squeaking not getting",
      details: "Brakes Squeaking not working",
      date: "2024-09-24",
      status: "Pending",
      actions: { edit: true, delete: true }
    }
  ];

  // goBack() {
  //   this.router.navigate(['/app/complaints']);
  // }
  goBack() {
    if (this.fromPage === 'meeting') {
      this.router.navigate(['/app/complaints/meeting']);
    } else {
      this.router.navigate(['/app/complaints']);
    }
  }

  public openCAPA(id: any) {
    console.log('jkhksbdjk');
    let dialogRef = this.dialog.open(AddCapaComponent, {
      data: id,
      height: 'auto',
      width: '800px',
    });
    // dialogRef.afterClosed().subscribe((data: any) => {});
  }

  deleteConfirmation() {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: { component: null, title: 'Delete Confirmation', content: 'Are you sure you want to Delete?', isConfirmation: true }
    });
    dialogRef.afterClosed().subscribe(
      (data: any) => {
        if (data) {
        }
      }
    );
  }


 

checked1: boolean = false;
checked2: boolean = false;

selectedRow: string = '';

onCheckboxChange(row: string) {
  this.selectedRow = row;

  const dialogRef = this.dialog.open(MonitorDialogComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === false) {
      // ❌ If NO clicked → uncheck checkbox
      if (row === 'row1') this.checked1 = false;
      if (row === 'row2') this.checked2 = false;
    }
  });
}



}
