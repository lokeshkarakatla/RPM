import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdditemComponent } from './additem/additem.component';

interface ItemMaster {
  IsActive: boolean;
  ItemCode: string;
  ItemName: string;
  ItemCategory: string;
  ItemSubCategory: string;
  AvailableQuantity: number;
  UnitRate: number;
  Description: string;
}

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.scss']
})
export class ItemMasterComponent implements OnInit {
  // UI Controls
  filterToggle: boolean = false;
  filterForm!: FormGroup;
  canUpdate: boolean = true;
  canDelete: boolean = true;

  // Pagination
  totalSize: number = 12;
  currentPage: number = 0;
  pageSize: number = 10;

  // Master List
  allItems: ItemMaster[] = [
    { ItemCode: 'RAW-METL', ItemName: 'Raw Metals', ItemCategory: 'Raw Materials', ItemSubCategory: 'Metals', AvailableQuantity: 450, UnitRate: 1250.00, IsActive: true, Description: 'Various raw metals used in manufacturing processes' },
    { ItemCode: 'RAW-PLAS', ItemName: 'Raw Plastics', ItemCategory: 'Raw Materials', ItemSubCategory: 'Plastics', AvailableQuantity: 1200, UnitRate: 425.00, IsActive: true, Description: 'Various raw plastics used in manufacturing processes' },
    { ItemCode: 'COMP-ELEC', ItemName: 'Electronic Components', ItemCategory: 'Components', ItemSubCategory: 'Electronics', AvailableQuantity: 3400, UnitRate: 3700.00, IsActive: true, Description: 'Various electronic components used in manufacturing processes' },
    { ItemCode: 'COMP-HARD', ItemName: 'Industrial Hardware', ItemCategory: 'Components', ItemSubCategory: 'Hardware', AvailableQuantity: 8500, UnitRate: 175.00, IsActive: true, Description: 'Various industrial hardware items used in manufacturing processes' },
    { ItemCode: 'SUB-ASMB', ItemName: 'Internal Sub-Assemblies', ItemCategory: 'Assemblies', ItemSubCategory: 'Internal', AvailableQuantity: 120, UnitRate: 9800.00, IsActive: true, Description: 'Various internal sub-assemblies used in manufacturing processes' },
    { ItemCode: 'WIP-MACH', ItemName: 'Machined Blanks', ItemCategory: 'Work In Progress', ItemSubCategory: 'Machined', AvailableQuantity: 330, UnitRate: 6200.00, IsActive: true, Description: 'Various machined blanks used in manufacturing processes' },
    { ItemCode: 'FG-STAN', ItemName: 'Standard Finished Goods', ItemCategory: 'Finished Goods', ItemSubCategory: 'Standard', AvailableQuantity: 670, UnitRate: 20500.00, IsActive: true, Description: 'Various standard finished goods used in manufacturing processes' },
    { ItemCode: 'FG-CUST', ItemName: 'Custom Engineered Goods', ItemCategory: 'Finished Goods', ItemSubCategory: 'Custom', AvailableQuantity: 15, UnitRate: 70000.00, IsActive: true, Description: 'Various custom engineered goods used in manufacturing processes' },
    { ItemCode: 'PKG-PRIM', ItemName: 'Primary Packaging', ItemCategory: 'Packaging', ItemSubCategory: 'Primary', AvailableQuantity: 5000, UnitRate: 40.00, IsActive: true, Description: 'Various primary packaging items used in manufacturing processes' },
    { ItemCode: 'PKG-SECO', ItemName: 'Secondary Packaging', ItemCategory: 'Packaging', ItemSubCategory: 'Secondary', AvailableQuantity: 2100, UnitRate: 250.00, IsActive: true, Description: 'Various secondary packaging items used in manufacturing processes' },
    { ItemCode: 'MRO-TOOL', ItemName: 'Consumable Tools', ItemCategory: 'MRO', ItemSubCategory: 'Tools', AvailableQuantity: 85, UnitRate: 1500.00, IsActive: true, Description: 'Various consumable tools used in manufacturing processes' },
    { ItemCode: 'MRO-SAFE', ItemName: 'Safety Equipment / PPE', ItemCategory: 'MRO', ItemSubCategory: 'Safety', AvailableQuantity: 450, UnitRate: 2000.00, IsActive: true, Description: 'Various safety equipment and PPE used in manufacturing processes' }
  ];

  // Table Data
  tableList: ItemMaster[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.getCategory();
  }

  formInit() {
    this.filterForm = this.fb.group({
      Keyword: [''],
      Status: [null]
    });
  }

  getCategory() {
    const keyword = (this.filterForm.value.Keyword || '').toLowerCase().trim();
    const status = this.filterForm.value.Status;

    let list = [...this.allItems];

    if (keyword) {
      list = list.filter(item => 
        (item.ItemName || '').toLowerCase().includes(keyword) ||
        (item.ItemCode || '').toLowerCase().includes(keyword) ||
        (item.ItemCategory || '').toLowerCase().includes(keyword) ||
        (item.ItemSubCategory || '').toLowerCase().includes(keyword) ||
        (item.Description || '').toLowerCase().includes(keyword)
      );
    }

    if (status !== null && status !== undefined) {
      list = list.filter(item => item.IsActive === status);
    }

    this.tableList = list;
    this.totalSize = this.tableList.length;
  }

  formatDescription(description: string): string {
    if (!description) return '';
    const words = description.trim().split(/\s+/);
    if (words.length <= 5) return description;

    const mid = Math.ceil(words.length / 2);
    const firstLine = words.slice(0, mid).join(' ');
    const secondLine = words.slice(mid).join(' ');
    return `${firstLine}<br>${secondLine}`;
  }

  openEditDialog(item: any) {
    let dialogRef = this.dialog.open(AdditemComponent, {
      data: item,
      height: 'auto',
      width: '550px',
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        if (item) {
          // Editing existing item
          const index = this.allItems.findIndex(x => x.ItemCode === item.ItemCode);
          if (index !== -1) {
            this.allItems[index] = {
              ...this.allItems[index],
              ...data
            };
          }
        } else {
          // Adding a new item
          const newItem: ItemMaster = {
            IsActive: true,
            ItemCode: data.ItemCode || 'NEW-ITEM-' + Math.floor(Math.random() * 1000),
            ItemName: data.ItemName || '',
            ItemCategory: data.ItemCategory || '',
            ItemSubCategory: data.ItemSubCategory || '',
            AvailableQuantity: Number(data.AvailableQuantity) || 0,
            UnitRate: Number(data.UnitRate) || 0,
            Description: data.Description || ''
          };
          this.allItems.unshift(newItem);
        }
        this.getCategory();
      }
    });
  }

  deleteConfirmation(item: any): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: { title: 'Delete Item', content: 'Are you sure you want to Delete this Item?' }
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.allItems = this.allItems.filter(x => x.ItemCode !== item.ItemCode);
        this.getCategory();
      }
    });
  }

  Confirmation(item: any) {
    item.IsActive = !item.IsActive;
    this.getCategory();
  }

  fnHandlePage(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  scrollRight() {
    const container = document.getElementById('grid-table-container');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  scrollLeft() {
    const container = document.getElementById('grid-table-container');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }
}