import { Component, OnInit } from '@angular/core';
import { AddCommodityPopComponent } from './add-commodity-pop/add-commodity-pop.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-commodity-master',
  templateUrl: './commodity-master.component.html',
  styleUrls: ['./commodity-master.component.scss']
})
export class CommodityMasterComponent implements OnInit {

  showFilters: boolean = false; 
  selectedCategory: string | null = null;
  selectedStatus: string = '';

  tableData = [
    { name: 'Casting', status: 'Active' },
    { name: 'Forging', status: 'Inactive' },
    { name: 'Machining', status: 'Active' },
    { name: 'Fasteners', status: 'Inactive' },
    { name: 'Non-Metallic', status: 'Active' },
    { name: 'Sheet Metal', status: 'Active' }
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

  addCommodity(data: any): void {
   const dialogRef = this.dialog.open(AddCommodityPopComponent, {
       width: '650px',
       disableClose: true   ,
       data:data     // prevents closing on backdrop click
     });
   
     dialogRef.afterClosed().subscribe((result: { name: string; status: string; }) => {
       if (result) {
         // result = { name: '...', status: '...' }
         this.tableData.push(result);  // or call your API here
       }
     });
  }
}