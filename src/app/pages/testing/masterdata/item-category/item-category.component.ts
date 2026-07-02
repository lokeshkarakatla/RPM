import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddItemCategoryComponent } from './add-item-category/add-item-category.component';

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
      { CategoryId: 1, CategoryName: 'Raw Materials', IsActive: true },
      { CategoryId: 2, CategoryName: 'Finished Goods', IsActive: true },
      { CategoryId: 3, CategoryName: 'Packaging Material', IsActive: true },
      { CategoryId: 4, CategoryName: 'Consumables', IsActive: false },
      { CategoryId: 5, CategoryName: 'Spare Parts', IsActive: true },
      { CategoryId: 6, CategoryName: 'Hardware', IsActive: true }
    ];

    this.totalSize = this.tableList.length;
  }

  openEditDialog(item: any) {
    let dialogRef = this.dialog.open(AddItemCategoryComponent, {
      data: item,
      height: 'auto',
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.getCategory();
      }
    });
  } 

  deleteConfirmation(item: any): void {
    console.log('Delete Category triggered for:', item);
  }

  Confirmation(item: any): void {
    item.IsActive = !item.IsActive;
    console.log('Status changed for:', item.CategoryName, 'New Status:', item.IsActive);
  }

  fnHandlePage(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}