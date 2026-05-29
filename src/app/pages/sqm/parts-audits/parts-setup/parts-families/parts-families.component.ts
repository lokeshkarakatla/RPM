import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPartsFamilypopComponent } from './add-parts-familypop/add-parts-familypop.component';

@Component({
  selector: 'app-parts-families',
  templateUrl: './parts-families.component.html',
  styleUrls: ['./parts-families.component.scss']
})
export class PartsFamiliesComponent implements OnInit {

  showFilters: boolean = false; 
  selectedCategory: string | null = null;
  selectedStatus: string = '';

  tableData = [
  { name: 'Engine Components', status: 'Active' },
  { name: 'Transmission Systems', status: 'Active' },
  { name: 'Chassis and Frame', status: 'Inactive' },
  { name: 'Suspension Parts', status: 'Active' },
  { name: 'Electrical Systems', status: 'Inactive' },
  { name: 'Braking Systems', status: 'Active' },
  { name: 'Body and Cabin', status: 'Active' },
  { name: 'Fuel Systems', status: 'Inactive' },
  { name: 'Cooling Systems', status: 'Active' },
  { name: 'Steering Systems', status: 'Active' }
];
 

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {}

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  onClear(): void {
    this.selectedCategory = null;
    this.selectedStatus = '';
  }

  onGo(): void {
    console.log('Filters Applied:', { category: this.selectedCategory, status: this.selectedStatus });
  }

  addCommodity(data:any) {
   const dialogRef = this.dialog.open(AddPartsFamilypopComponent, {
       width: '650px',
       disableClose: true ,
       data:data       // prevents closing on backdrop click
     });
   
  //    dialogRef.afterClosed().subscribe((result: { name: string; status: string; }) => {
  //      if (result) {
  //        // result = { name: '...', status: '...' }
  //        this.tableData.push(result);  // or call your API here
  //      }
  //    });
  // }
}
}
