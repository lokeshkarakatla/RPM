import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private location: Location
  ) { }

  ngOnInit(): void { }

  editFacility(facility: Facility): void {
    console.log('Edit', facility);
  }

  deleteFacility(facility: Facility): void {
    console.log('Delete', facility);
  }

  addFacility(): void {
    console.log('Add Facility clicked');
    // Example:
    // this.router.navigate(['/facilities/add']);
  }

  viewScheduling(facility: Facility): void {
    this.router.navigate(['facilities_sample'], { relativeTo: this.route });
  }

   goBack(): void {
    this.location.back();
  }


}