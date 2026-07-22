import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { AddCityMasterComponent } from './add-city-master/add-city-master.component';

export interface CityMasterData {
  id: number;
  cityName: string;
  cityCode: string;
  isActive: boolean;
}

@Component({
  selector: 'app-city-master',
  templateUrl: './city-master.component.html',
  styleUrls: ['./city-master.component.scss']
})
export class CityMasterComponent implements OnInit {

  filterToggle = false;
  filterForm!: FormGroup;

  canUpdate = true;
  canDelete = true;

  totalSize = 0;
  currentPage = 0;
  pageSize = 10;

  tableList: CityMasterData[] = [];
  displayList: CityMasterData[] = [];

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.formInit();
    this.getCities();
  }

  formInit(): void {
    this.filterForm = this.fb.group({ Keyword: [''], Status: [null] });
  }

  getCities(): void {
    const stored = localStorage.getItem('rpm_cities');
    if (stored) {
      this.tableList = JSON.parse(stored);
    } else {
      this.tableList = [
        { id: 1, cityName: 'Pune', cityCode: 'PUN', isActive: true },
        { id: 2, cityName: 'Mumbai', cityCode: 'MUM', isActive: true },
        { id: 3, cityName: 'Chennai', cityCode: 'MAA', isActive: true },
        { id: 4, cityName: 'Coimbatore', cityCode: 'CBE', isActive: true },
        { id: 5, cityName: 'Bengaluru', cityCode: 'BLR', isActive: true },
        { id: 6, cityName: 'Hosur', cityCode: 'HSR', isActive: true },
        { id: 7, cityName: 'Gurugram', cityCode: 'GUG', isActive: true },
        { id: 8, cityName: 'Faridabad', cityCode: 'FBD', isActive: false },
        { id: 9, cityName: 'Ahmedabad', cityCode: 'AMD', isActive: true },
        { id: 10, cityName: 'Lucknow', cityCode: 'LKO', isActive: true }
      ];
      localStorage.setItem('rpm_cities', JSON.stringify(this.tableList));
    }
    this.applyFilter();
  }

  applyFilter(): void {
    const kw = this.filterForm?.get('Keyword')?.value?.toLowerCase() || '';
    const status = this.filterForm?.get('Status')?.value;
    this.displayList = this.tableList.filter(item => {
      const matchesKw = !kw || item.cityName.toLowerCase().includes(kw) || item.cityCode.toLowerCase().includes(kw);
      const matchesStatus = status === null || status === undefined || item.isActive === status;
      return matchesKw && matchesStatus;
    });
    this.totalSize = this.displayList.length;
  }

  openEditDialog(item: any): void {
    const dialogRef = this.dialog.open(AddCityMasterComponent, { data: item, width: '560px', height: 'auto' });
    dialogRef.afterClosed().subscribe(result => { if (result) this.getCities(); });
  }

  Confirmation(item: CityMasterData): void {
    const nextStatus = item.isActive ? 'Inactive' : 'Active';
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: { title: 'Change Status', content: `Are you sure you want to change the status of city "${item.cityName}" to ${nextStatus}?` }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        item.isActive = !item.isActive;
        localStorage.setItem('rpm_cities', JSON.stringify(this.tableList));
        this.getCities();
      }
    });
  }

  deleteConfirmation(item: CityMasterData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: { title: 'Delete City', content: `Are you sure you want to delete the city "${item.cityName}"?` }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.tableList = this.tableList.filter(t => t.id !== item.id);
        localStorage.setItem('rpm_cities', JSON.stringify(this.tableList));
        this.getCities();
      }
    });
  }

  fnHandlePage(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get paginatedList(): CityMasterData[] {
    const start = this.currentPage * this.pageSize;
    return this.displayList.slice(start, start + this.pageSize);
  }
}
