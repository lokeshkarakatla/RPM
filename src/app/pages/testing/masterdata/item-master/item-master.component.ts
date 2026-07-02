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
    this.tableList = [
      { ItemCode: 'RAW-METL', ItemName: 'Raw Metals', ItemCategory: 'Raw Materials', ItemSubCategory: 'Metals', AvailableQuantity: 450, UnitRate: 1250.00, IsActive: true },
      { ItemCode: 'RAW-PLAS', ItemName: 'Raw Plastics', ItemCategory: 'Raw Materials', ItemSubCategory: 'Plastics', AvailableQuantity: 1200, UnitRate: 425.00, IsActive: true },
      { ItemCode: 'COMP-ELEC', ItemName: 'Electronic Components', ItemCategory: 'Components', ItemSubCategory: 'Electronics', AvailableQuantity: 3400, UnitRate: 3700.00, IsActive: true },
      { ItemCode: 'COMP-HARD', ItemName: 'Industrial Hardware', ItemCategory: 'Components', ItemSubCategory: 'Hardware', AvailableQuantity: 8500, UnitRate: 175.00, IsActive: true },
      { ItemCode: 'SUB-ASMB', ItemName: 'Internal Sub-Assemblies', ItemCategory: 'Assemblies', ItemSubCategory: 'Internal', AvailableQuantity: 120, UnitRate: 9800.00, IsActive: true },
      { ItemCode: 'WIP-MACH', ItemName: 'Machined Blanks', ItemCategory: 'Work In Progress', ItemSubCategory: 'Machined', AvailableQuantity: 330, UnitRate: 6200.00, IsActive: true },
      { ItemCode: 'FG-STAN', ItemName: 'Standard Finished Goods', ItemCategory: 'Finished Goods', ItemSubCategory: 'Standard', AvailableQuantity: 670, UnitRate: 20500.00, IsActive: true },
      { ItemCode: 'FG-CUST', ItemName: 'Custom Engineered Goods', ItemCategory: 'Finished Goods', ItemSubCategory: 'Custom', AvailableQuantity: 15, UnitRate: 70000.00, IsActive: true },
      { ItemCode: 'PKG-PRIM', ItemName: 'Primary Packaging', ItemCategory: 'Packaging', ItemSubCategory: 'Primary', AvailableQuantity: 5000, UnitRate: 40.00, IsActive: true },
      { ItemCode: 'PKG-SECO', ItemName: 'Secondary Packaging', ItemCategory: 'Packaging', ItemSubCategory: 'Secondary', AvailableQuantity: 2100, UnitRate: 250.00, IsActive: true },
      { ItemCode: 'MRO-TOOL', ItemName: 'Consumable Tools', ItemCategory: 'MRO', ItemSubCategory: 'Tools', AvailableQuantity: 85, UnitRate: 1500.00, IsActive: true },
      { ItemCode: 'MRO-SAFE', ItemName: 'Safety Equipment / PPE', ItemCategory: 'MRO', ItemSubCategory: 'Safety', AvailableQuantity: 450, UnitRate: 2000.00, IsActive: true }
    ];
  }

  openEditDialog(item: any) {
    let dialogRef = this.dialog.open(AdditemComponent, {
      data: item,
      height: 'auto',
      width: '550px',
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.getCategory();
      }
    });
  }

  deleteConfirmation(item: any) {
    console.log('Delete item:', item);
  }

  Confirmation(item: any) {
    item.IsActive = !item.IsActive;
  }

  fnHandlePage(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}