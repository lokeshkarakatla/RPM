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
  { name: 'Engine Components', status: 'Active', parameters: 12 },
  { name: 'Transmission Systems', status: 'Active', parameters: 8 },
  { name: 'Chassis and Frame', status: 'Inactive', parameters: 0 },
  { name: 'Suspension Parts', status: 'Active', parameters: 15 },
  { name: 'Electrical Systems', status: 'Inactive', parameters: 0 },
  { name: 'Braking Systems', status: 'Active', parameters: 10 },
  { name: 'Body and Cabin', status: 'Active', parameters: 20 },
  { name: 'Fuel Systems', status: 'Inactive', parameters: 0 },
  { name: 'Cooling Systems', status: 'Active', parameters: 12 },
  { name: 'Steering Systems', status: 'Active', parameters: 8 }
];
selectedKeyword: any;
 

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
