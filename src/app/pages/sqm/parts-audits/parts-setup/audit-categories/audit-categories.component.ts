import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPartCategoryComponent } from './add-part-category/add-part-category.component';

@Component({
  selector: 'app-audit-categories',
  templateUrl: './audit-categories.component.html',
  styleUrls: ['./audit-categories.component.scss']
})
export class AuditCategoriesComponent implements OnInit {


  showFilters: boolean = false; 
  selectedCategory: string | null = null;
  selectedStatus: string = '';

  tableData = [
    { name: 'Dimensional Clock ', status: 'Active' },
    { name: 'Surface Finish', status: 'Active' },
    { name: 'Performance', status: 'Active' },
    { name: 'Metallurgical', status: 'Active' },
    { name: 'Mechanical', status: 'Active' }
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


 addCategory(data:any) {
  const dialogRef = this.dialog.open(AddPartCategoryComponent, {
    width: '650px',
    disableClose: true ,
    data:data       // prevents closing on backdrop click
  });

//   dialogRef.afterClosed().subscribe((result: { name: string; status: string; }) => {
//     if (result) {
//       // result = { name: '...', status: '...' }
//       this.tableData.push(result);  // or call your API here
//     }
//   });
// }
}
}