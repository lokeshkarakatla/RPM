import { Component, OnInit } from '@angular/core';
import { AddProcessCategoryPopComponent } from './add-process-category-pop/add-process-category-pop.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-process-audits-categories',
  templateUrl: './process-audits-categories.component.html',
  styleUrls: ['./process-audits-categories.component.scss']
})
export class ProcessAuditsCategoriesComponent implements OnInit {

  showFilters: boolean = false; 
  selectedCategory: string | null = null;
  selectedStatus: string = '';

  tableData = [
    { name: 'Category 1', status: 'Active' },
    { name: 'Category 2', status: 'Active' },
    { name: 'Category 3', status: 'Active' },
    { name: 'Category 4', status: 'Active' },
    { name: 'Category 5', status: 'Active' }
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


 addCategory(data: any): void {
  const dialogRef = this.dialog.open(AddProcessCategoryPopComponent, {
    width: '650px',
    disableClose: true  ,     // prevents closing on backdrop click
    data: data
  });

  dialogRef.afterClosed().subscribe((result: { name: string; status: string; }) => {
    if (result) {
      // result = { name: '...', status: '...' }
      this.tableData.push(result);  // or call your API here
    }
  });
}
}