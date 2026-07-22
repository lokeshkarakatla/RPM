import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { AddSiteMasterComponent } from './add-site-master/add-site-master.component';

export interface SiteMasterData {
  id: number;
  siteName: string;
  siteCode: string;
  isActive: boolean;
}

@Component({
  selector: 'app-site-master',
  templateUrl: './site-master.component.html',
  styleUrls: ['./site-master.component.scss']
})
export class SiteMasterComponent implements OnInit {

  filterToggle = false;
  filterForm!: FormGroup;

  canUpdate = true;
  canDelete = true;

  totalSize = 0;
  currentPage = 0;
  pageSize = 10;

  tableList: SiteMasterData[] = [];
  displayList: SiteMasterData[] = [];

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.formInit();
    this.getSites();
  }

  formInit(): void {
    this.filterForm = this.fb.group({ Keyword: [''], Status: [null] });
  }

  getSites(): void {
    const stored = localStorage.getItem('rpm_sites');
    if (stored) {
      this.tableList = JSON.parse(stored);
    } else {
      this.tableList = [
        { id: 1, siteName: 'Pune Manufacturing Facility', siteCode: 'SITE-PUN', isActive: true },
        { id: 2, siteName: 'Chennai Engine Unit', siteCode: 'SITE-MAA', isActive: true },
        { id: 3, siteName: 'Bengaluru R&D Hub', siteCode: 'SITE-BLR', isActive: true },
        { id: 4, siteName: 'Hosur Proving Grounds', siteCode: 'SITE-HSR', isActive: true },
        { id: 5, siteName: 'Gurugram Spares Depot', siteCode: 'SITE-GUG', isActive: true },
        { id: 6, siteName: 'Faridabad Press Shop', siteCode: 'SITE-FBD', isActive: false },
        { id: 7, siteName: 'Ahmedabad Parts Hub', siteCode: 'SITE-AMD', isActive: true }
      ];
      localStorage.setItem('rpm_sites', JSON.stringify(this.tableList));
    }
    this.applyFilter();
  }

  applyFilter(): void {
    const kw = this.filterForm?.get('Keyword')?.value?.toLowerCase() || '';
    const status = this.filterForm?.get('Status')?.value;
    this.displayList = this.tableList.filter(item => {
      const matchesKw = !kw || item.siteName.toLowerCase().includes(kw) || item.siteCode.toLowerCase().includes(kw);
      const matchesStatus = status === null || status === undefined || item.isActive === status;
      return matchesKw && matchesStatus;
    });
    this.totalSize = this.displayList.length;
  }

  openEditDialog(item: any): void {
    const dialogRef = this.dialog.open(AddSiteMasterComponent, { data: item, width: '560px', height: 'auto' });
    dialogRef.afterClosed().subscribe(result => { if (result) this.getSites(); });
  }

  Confirmation(item: SiteMasterData): void {
    const nextStatus = item.isActive ? 'Inactive' : 'Active';
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: { title: 'Change Status', content: `Are you sure you want to change the status of site "${item.siteName}" to ${nextStatus}?` }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        item.isActive = !item.isActive;
        localStorage.setItem('rpm_sites', JSON.stringify(this.tableList));
        this.getSites();
      }
    });
  }

  deleteConfirmation(item: SiteMasterData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: { title: 'Delete Site', content: `Are you sure you want to delete the site "${item.siteName}"?` }
    });
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.tableList = this.tableList.filter(t => t.id !== item.id);
        localStorage.setItem('rpm_sites', JSON.stringify(this.tableList));
        this.getSites();
      }
    });
  }

  fnHandlePage(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get paginatedList(): SiteMasterData[] {
    const start = this.currentPage * this.pageSize;
    return this.displayList.slice(start, start + this.pageSize);
  }
}
