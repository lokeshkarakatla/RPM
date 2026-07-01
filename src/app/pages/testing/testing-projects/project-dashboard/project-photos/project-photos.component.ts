import { Component, OnInit } from '@angular/core';
import { AddphotoPopComponent } from './addphoto-pop/addphoto-pop.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms'; // Import Forms

@Component({
  selector: 'app-project-photos',
  templateUrl: './project-photos.component.html',
  styleUrls: ['./project-photos.component.scss']
})
export class ProjectPhotosComponent implements OnInit {
  
  showFilters: boolean = false;
  filterForm: FormGroup; // Declare the form group

  constructor(
    private dialog: MatDialog, 
    private fb: FormBuilder // Inject FormBuilder
  ) { 
    // Initialize the form controls to match your HTML
    this.filterForm = this.fb.group({
      Keyword: [''],
      Status: [null]
    });
  }

  ngOnInit(): void {
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  clearFilters() {
    this.filterForm.reset(); // This clears the form inputs
    console.log("Filters cleared");
  }

  searchFilters() {
    // This logs the current values typed into the form
    console.log("Search triggered with values:", this.filterForm.value);
  }

  Addphoto(value: any) {
    this.dialog.open(AddphotoPopComponent, {
      data: value,
      height: 'auto',
      width: '500px',
    });
  }
  showFilter: boolean = false;







    toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }
}