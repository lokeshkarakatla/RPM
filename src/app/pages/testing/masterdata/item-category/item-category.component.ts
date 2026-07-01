import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface ItemCategory {
  CategoryId?: number;
  CategoryName: string;
  IsActive: boolean;
}

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html',
  styleUrls: ['./item-category.component.scss']
})
export class ItemCategoryComponent implements OnInit {
  // UI Controls
  filterToggle: boolean = false;
  filterForm!: FormGroup;
  
  // Permissions (used in HTML for ngClass disable-custom)
  canUpdate: boolean = true;
  canDelete: boolean = true;

  // Pagination Variables
  totalSize: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;

  // Table Data
  tableList: ItemCategory[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formInit();
    this.getCategory(); // Load initial data on init
  }

  // Initialize the Filter Form
  formInit(): void {
    this.filterForm = this.fb.group({
      Keyword: [''],
      Status: [null]
    });
  }

  // Fetch Category Data
  getCategory(): void {
    // Note: In a real app, you would pass filterForm values to your API service here.
    // Injecting dummy data mapped to your HTML structure
    this.tableList = [
      { CategoryId: 1, CategoryName: 'Raw Materials', IsActive: true },
      { CategoryId: 2, CategoryName: 'Finished Goods', IsActive: true },
      { CategoryId: 3, CategoryName: 'Packaging Material', IsActive: true },
      { CategoryId: 4, CategoryName: 'Consumables', IsActive: false },
      { CategoryId: 5, CategoryName: 'Spare Parts', IsActive: true },
      { CategoryId: 6, CategoryName: 'Hardware', IsActive: true }
    ];
    
    this.totalSize = this.tableList.length;
  }

  // Action Methods
  openEditDialog(item: any): void {
    if (item) {
      console.log('Edit Category triggered for:', item);
      // Logic to open modal/dialog in Edit mode goes here
    } else {
      console.log('Add New Category triggered');
      // Logic to open modal/dialog in Add mode goes here
    }
  }

  deleteConfirmation(item: any): void {
    console.log('Delete Category triggered for:', item);
    // Logic to open a confirmation dialog and then call delete API goes here
  }

  Confirmation(item: any): void {
    // Toggles the Active/Inactive status directly from the table
    item.IsActive = !item.IsActive;
    console.log('Status changed for:', item.CategoryName, 'New Status:', item.IsActive);
    // Call API to update status in the backend here
  }

  // Pagination Handler
  fnHandlePage(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    // Usually, you call getCategory() here again if you are doing server-side pagination
  }
}