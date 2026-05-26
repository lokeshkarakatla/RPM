import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commodity-master',
  templateUrl: './commodity-master.component.html',
  styleUrls: ['./commodity-master.component.scss']
})
export class CommodityMasterComponent implements OnInit {

  showFilters: boolean = false; 
  selectedCategory: string | null = null;
  selectedStatus: string = '';

  tableData = [
    { name: 'Casting', status: 'Active' },
    { name: 'Forging', status: 'Inactive' },
    { name: 'Machining', status: 'Active' },
    { name: 'Fasteners', status: 'Inactive' },
    { name: 'Non-Metallic', status: 'Active' },
    { name: 'Sheet Metal', status: 'Active' }
  ];

  constructor() { }

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
}