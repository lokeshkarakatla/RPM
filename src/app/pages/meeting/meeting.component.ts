import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { MeetingDialogComponent } from './meeting-dialog/meeting-dialog.component';


import { Router } from '@angular/router';
import { AddattendanceComponent } from 'src/app/addattendance/addattendance.component';
import { AgendadetailsComponent } from 'src/app/agendadetails/agendadetails.component';
import { MeetingrefComponent } from 'src/app/meetingref/meetingref.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent {

  totalSize = 0;
  constructor(private router: Router, private dialog: MatDialog) { }

  goBack() {
    this.router.navigate(['/app/complaints']);
  }
  data = [
    {
      referenceNo: "FC/2026/04/05",
      date: "10-10-2024",
      actionPoints: 2,
      attendance: "2/7",
      lateAttendance: "1/7",
      time:"10 AM",
      duration:"55 min",
      meetingRef:"(Meet/2025/10/02)",
      agenda:3,
    },
    {
      referenceNo: "FC/2026/04/06",
      date: "11-10-2024",
      actionPoints: 0,
      attendance: "2/7",
      lateAttendance: "1/7"
    },
    {
      referenceNo: "FC/2026/04/07",
      date: "24-10-2024",
      actionPoints: 0,
      attendance: "1/7",
      lateAttendance: "1/7"
    },
    {
      referenceNo: "FC/2026/04/08",
      date: "23-10-2024",
      actionPoints: 0,
      attendance: "2/7",
      lateAttendance: "1/7"
    },
    {
      referenceNo: "FC/2026/04/09",
      date: "23-10-2024",
      actionPoints: 0,
      attendance: "2/7",
      lateAttendance: "1/7"
    },
    {
      referenceNo: "FC/2026/04/10",
      date: "29-10-2024",
      actionPoints: 1,
      attendance: "1/7",
      lateAttendance: "1/7"
    }
  ];

  public gotoMeeting(id: any) {
    this.router.navigate(['/app/complaints/meeting/add']);
  }
  Attendancecount() {
    this.dialog.open(AddattendanceComponent, {
      height: '300px',
      width: '600px' 
    });
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

    openMeetingDialog(item: any) {
    this.dialog.open(MeetingrefComponent, {
      width: '900px',
      data: item
    });
  }

  openAgendaDialog(item: any) {
    this.dialog.open(AgendadetailsComponent, {
      width: '700px',
      data: item
    });
  }
}