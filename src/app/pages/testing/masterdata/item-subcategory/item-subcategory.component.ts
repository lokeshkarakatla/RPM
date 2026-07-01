import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface ItemSubcategory {
  SubCategoryId?: number;
  CategoryName: string; // Matches the {{item.CategoryName}} binding in your HTML
  IsActive: boolean;
}

@Component({
  selector: 'app-item-subcategory',
  templateUrl: './item-subcategory.component.html',
  styleUrls: ['./item-subcategory.component.scss']
})
export class ItemSubcategoryComponent implements OnInit {
  // UI Controls
  filterToggle: boolean = false;
  filterForm!: FormGroup;

  // Action Permissions (controls the disable-custom class)
  canUpdate: boolean = true;
  canDelete: boolean = true;

  // Pagination Variables
  totalSize: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;

  // Table Data
  tableList: ItemSubcategory[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formInit();
    this.getCategory(); // Loads the initial data
  }

  // Initialize the Filter Form
  formInit(): void {
    this.filterForm = this.fb.group({
      Keyword: [''],
      Status: [null]
    });
  }

  // Fetch Subcategory Data (Kept the name getCategory to match your HTML button click bindings)
  getCategory(): void {
    // Injecting dummy data mapped to your HTML structure
    this.tableList = [
      { SubCategoryId: 101, CategoryName: 'Metals', IsActive: true },
      { SubCategoryId: 102, CategoryName: 'Plastics', IsActive: true },
      { SubCategoryId: 103, CategoryName: 'Electronics', IsActive: true },
      { SubCategoryId: 104, CategoryName: 'Hardware', IsActive: false },
      { SubCategoryId: 105, CategoryName: 'Internal Assemblies', IsActive: true },
      { SubCategoryId: 106, CategoryName: 'Primary Packaging', IsActive: true },
      { SubCategoryId: 107, CategoryName: 'Secondary Packaging', IsActive: true },
      { SubCategoryId: 108, CategoryName: 'Tools', IsActive: true },
      { SubCategoryId: 109, CategoryName: 'Safety Equipment', IsActive: false }
    ];

    this.totalSize = this.tableList.length;
  }

  // Action Methods
  openEditDialog(item: any): void {
    if (item) {
      console.log('Edit Subcategory triggered for:', item);
      // Logic for editing goes here
    } else {
      console.log('Add New Subcategory triggered');
      // Logic for adding goes here
    }
  }

  deleteConfirmation(item: any): void {
    console.log('Delete Subcategory triggered for:', item);
    // Logic for deleting goes here
  }

  Confirmation(item: any): void {
    // Toggles the Active/Inactive status directly from the table
    item.IsActive = !item.IsActive;
    console.log('Status changed for:', item.CategoryName, '-> New Status:', item.IsActive);
  }

  // Pagination Handler
  fnHandlePage(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    // In a real scenario, you would call your API fetch method here for server-side pagination
  }
}