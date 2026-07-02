import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdditemSubCategoryComponent } from './additem-sub-category/additem-sub-category.component';

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

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.getCategory();
  }

  formInit(): void {
    this.filterForm = this.fb.group({
      Keyword: [''],
      Status: [null]
    });
  }

  getCategory(): void {
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

  openEditDialog(value: any) {
    let dialogRef = this.dialog.open(AdditemSubCategoryComponent, {
      data: value,
      height: 'auto',
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.getCategory();
      }
    })
  }

  deleteConfirmation(item: any): void {
    console.log('Delete Subcategory triggered for:', item);
  }

  Confirmation(item: any): void {
    item.IsActive = !item.IsActive;
    console.log('Status changed for:', item.CategoryName, '-> New Status:', item.IsActive);
  }

  fnHandlePage(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}