import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddFacilityPopComponent } from './add-facility-pop/add-facility-pop.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { StatusConfirmationDialogComponent } from '../../add-projects/status-confirmation-dialog/status-confirmation-dialog.component';

interface Facility {
  facilityCode: string;
  facilityType: string;
  facilityName: string;
  location: string;
  capacity: number;
  log: number;
  pmChecklist: number;
  monitoring: number;
  status: string;
}

@Component({
  selector: 'app-project-facilities',
  templateUrl: './project-facilities.component.html',
  styleUrls: ['./project-facilities.component.scss']
})
export class ProjectFacilitiesComponent implements OnInit {

  facilities: Facility[] = [
    {
      facilityCode: 'WH-11',
      facilityType: 'Warehouse',
      facilityName: 'Main Storage',
      location: 'Block A',
      capacity: 500,
      log: 210,
      pmChecklist: 14,
      monitoring: 60,
      status: 'Active'
    },
    {
      facilityCode: 'OFC-02',
      facilityType: 'Office',
      facilityName: 'Site Office',
      location: 'Block B',
      capacity: 40,
      log: 95,
      pmChecklist: 6,
      monitoring: 20,
      status: 'Active'
    },
    {
      facilityCode: 'YRD-05',
      facilityType: 'Yard',
      facilityName: 'Equipment Yard',
      location: 'Block C',
      capacity: 200,
      log: 150,
      pmChecklist: 9,
      monitoring: 35,
      status: 'Inactive'
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  Confirmation(facility: Facility): void {
    let dialogRef = this.dialog.open(StatusConfirmationDialogComponent, {
      width: 'auto',
      data: {
        title: 'Change Status',
        content: 'Are you sure you want to Change the Status ?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        facility.status = facility.status === 'Active' ? 'Inactive' : 'Active';
      }
    });
  }

  editFacility(facility: Facility): void {
    let dialogRef = this.dialog.open(AddFacilityPopComponent, {
      width: '750px',
      height: 'auto',
      data: facility
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        facility.facilityCode = result.facilityCode;
        facility.facilityType = result.facilityType;
        facility.facilityName = result.facilityName;
        facility.location = result.location;
        facility.capacity = result.capacity;
      }
    });
  }

  deleteFacility(facility: Facility): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: {
        title: 'Delete Confirmation',
        content: 'Are you sure you want to delete this record?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.facilities = this.facilities.filter(f => f.facilityCode !== facility.facilityCode);
      }
    });
  }

  addFacility(): void {
    let dialogRef = this.dialog.open(AddFacilityPopComponent, {
      width: '750px',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.facilities.push({
          facilityCode: result.facilityCode,
          facilityType: result.facilityType,
          facilityName: result.facilityName,
          location: result.location,
          capacity: result.capacity,
          log: 0,
          pmChecklist: 0,
          monitoring: 0,
          status: 'Active'
        });
      }
    });
  }

  viewScheduling(facility: Facility): void {
    this.router.navigate(['facilities_sample'], { relativeTo: this.route });
  }

  goBack(): void {
    this.router.navigateByUrl('/app/testing/projects');
  }
}