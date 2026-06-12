import { Component, OnInit } from '@angular/core';
import { ViewDocPhotosComponent } from '../../parts-audits/parts-actions/view-doc-photos/view-doc-photos.component';
import { PartsAddParameterComponent } from '../../parts-audits/parts-active-audits/parts-reference/parts-add-parameter/parts-add-parameter.component';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { AuditrefRemarksPopComponent } from '../parts-audit-reference/auditref-remarks-pop/auditref-remarks-pop.component';

@Component({
  selector: 'app-parts-completed-reference',
  templateUrl: './parts-completed-reference.component.html',
  styleUrls: ['./parts-completed-reference.component.scss']
})
export class PartsCompletedReferenceComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private location: Location
  ) { }

  goBack(): void {
    this.location.back();
  }

  // Top Categories
  categories = [
    'Dimensional Checks (4)',
    'Surface Finish (5)',
    'Performance (3)',
    'Metallurgical (5)',
    'Mechanical (4)'
  ];
  selectedCategory = 'Dimensional Checks (4)';

  // Pagination
  pageSize = 4;
  pageIndex = 0;
  pagedData: any[] = [];
  tableData: any[] = []; // This will hold the currently active list

  // Dictionary holding unique parameters for EACH category
  categoryData: { [key: string]: any[] } = {
    'Dimensional Checks (4)': [
      { parameter: 'OUTER DIAMETER', spec: '457.0±0.8', min: 23, max: 27, actionLink: '8', special: 'General', method: 'Thermocouple', s1: 24.5, s2: 25.0, s3: 26.0, s4: 25.5, s5: 24.8, okay: true },
      { parameter: 'TOTAL LENGTH', spec: '4.747 / 34.798', min: 6.5, max: 7.5, actionLink: '11', special: 'General', method: 'pH Meter', s1: 7.1, s2: 6.9, s3: 7.2, s4: 6.8, s5: 7.0, okay: true },
      { parameter: 'WIDTH', spec: '20.0±0.2', min: 1000, max: 2000, actionLink: '12', special: 'General', method: 'Conductivity Meter', s1: 1400, s2: 1500, s3: 1600, s4: 1550, s5: 1450, okay: false },
      { parameter: 'HOLE CENTER', spec: '5.0±0.3', min: 7, max: 9, actionLink: '3', special: 'General', method: 'DO Meter', s1: 8.2, s2: 7.8, s3: 8.0, s4: 7.5, s5: 8.1, okay: false }
    ],
    'Surface Finish (5)': [
      { parameter: 'ROUGHNESS (Ra)', spec: '1.6 µm', min: 1.2, max: 1.8, actionLink: '7', special: 'Critical', method: 'Profilometer', s1: 1.4, s2: 1.5, s3: 1.7, s4: 1.6, s5: 1.5, okay: true },
      { parameter: 'PEAK COUNT (Rpc)', spec: '60/cm', min: 50, max: 70, actionLink: '3', special: 'General', method: 'Profilometer', s1: 55, s2: 62, s3: 58, s4: 65, s5: 60, okay: false },
      { parameter: 'COATING THICKNESS', spec: '15 µm', min: 12, max: 18, actionLink: '9', special: 'Critical', method: 'DFT Gauge', s1: 14, s2: 13, s3: 15, s4: 16, s5: 15, okay: true },
      { parameter: 'SCRATCH DEPTH', spec: '< 0.05 mm', min: 0, max: 0.05, actionLink: '14', special: 'General', method: 'Visual/Laser', s1: 0.01, s2: 0.02, s3: 0.04, s4: 0.01, s5: 0.02, okay: false },
      { parameter: 'WAVINESS (Wt)', spec: '0.8 µm', min: 0.5, max: 1.0, actionLink: '6', special: 'General', method: 'Scanner', s1: 0.6, s2: 0.9, s3: 0.7, s4: 0.8, s5: 0.7, okay: true }
    ],
    'Performance (3)': [
      { parameter: 'MAX RPM', spec: '3000', min: 2900, max: 3100, actionLink: '5', special: 'Critical', method: 'Tachometer', s1: 2950, s2: 3050, s3: 3000, s4: 2980, s5: 3020, okay: false },
      { parameter: 'FLOW RATE', spec: '50 L/min', min: 48, max: 52, actionLink: '2', special: 'General', method: 'Flow Meter', s1: 49, s2: 51, s3: 50, s4: 48.5, s5: 49.5, okay: true },
      { parameter: 'PRESSURE DROP', spec: '< 0.5 bar', min: 0, max: 0.5, actionLink: '15', special: 'Critical', method: 'Pressure Gauge', s1: 0.2, s2: 0.3, s3: 0.4, s4: 0.25, s5: 0.35, okay: true }
    ],
    'Metallurgical (5)': [
      { parameter: 'GRAIN SIZE', spec: 'ASTM 6-8', min: 6, max: 8, actionLink: '18', special: 'Critical', method: 'Microscope', s1: 7, s2: 6.5, s3: 7.5, s4: 6.8, s5: 7.2, okay: true },
      { parameter: 'INCLUSION RATING', spec: '< Level 2', min: 0, max: 2, actionLink: '6', special: 'General', method: 'Microscope', s1: 1, s2: 1.5, s3: 0.5, s4: 1.2, s5: 1.0, okay: false },
      { parameter: 'DECARBURIZATION', spec: '< 0.1 mm', min: 0, max: 0.1, actionLink: '4', special: 'Critical', method: 'Optical', s1: 0.05, s2: 0.08, s3: 0.04, s4: 0.06, s5: 0.07, okay: true },
      { parameter: 'MICROSTRUCTURE', spec: 'Martensite', min: 0, max: 0, actionLink: '4', special: 'Critical', method: 'Etching', s1: 0, s2: 0, s3: 0, s4: 0, s5: 0, okay: false },
      { parameter: 'CORE HARDNESS', spec: '30 HRC', min: 28, max: 32, actionLink: '9', special: 'General', method: 'Rockwell', s1: 29, s2: 31, s3: 30, s4: 28.5, s5: 30.5, okay: true }
    ],
    'Mechanical (4)': [
      { parameter: 'YIELD STRENGTH', spec: '400 MPa', min: 380, max: 420, actionLink: '2', special: 'Critical', method: 'UTM', s1: 390, s2: 410, s3: 405, s4: 395, s5: 400, okay: false },
      { parameter: 'ELONGATION', spec: '> 15%', min: 15, max: 25, actionLink: '1', special: 'General', method: 'UTM', s1: 16, s2: 18, s3: 17, s4: 19, s5: 20, okay: true },
      { parameter: 'IMPACT ENERGY', spec: '27 J', min: 25, max: 35, actionLink: '11', special: 'Critical', method: 'Charpy', s1: 28, s2: 30, s3: 26, s4: 29, s5: 32, okay: false },
      { parameter: 'SHEAR STRENGTH', spec: '250 MPa', min: 240, max: 260, actionLink: '7', special: 'General', method: 'UTM', s1: 245, s2: 255, s3: 250, s4: 248, s5: 252, okay: true }
    ]
  };

  ngOnInit(): void {
    // Load the initial data for the default selected tab
    this.tableData = this.categoryData[this.selectedCategory] || [];
    this.updatePage();
  }

  // Set active category tab AND update table data
  selectCategory(cat: string) {
    this.selectedCategory = cat;
    // Load the new parameters array based on the clicked tab
    this.tableData = this.categoryData[cat] || [];
    // Reset pagination back to page 1
    this.pageIndex = 0; 
    this.updatePage();
  }

  // Pagination Logic
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }

  private updatePage(): void {
    const start = this.pageIndex * this.pageSize;
    this.pagedData = this.tableData.slice(start, start + this.pageSize);
  }

  addchecklistaudit() {
    let dialogRef = this.dialog.open(PartsAddParameterComponent, {
      height: 'auto',
      width: '850px'
    });
    dialogRef.afterClosed().subscribe(data => {});
  }

  opendocpop() {
    this.dialog.open(ViewDocPhotosComponent, {
      width: '600px',
      height: '450px',
    });
  }

  editParameter(item: any) {
    let dialogRef = this.dialog.open(PartsAddParameterComponent, {
      height: 'auto',
      width: '850px',
      data: item // Tells the popup it's in Edit mode
    });
    dialogRef.afterClosed().subscribe(data => {
      // Handle any updates after popup closes if necessary
    });
  }

  opennotes() {
    this.dialog.open(AuditrefRemarksPopComponent, {
      width: '500px',
      height: 'auto'
    });
  }

  deleteParameter(item: any): void {
    const confirmDelete = window.confirm('Are you sure you want to delete?');
    
    if (confirmDelete) {
      // Find the index of the item in the currently active tableData array
      const index = this.tableData.indexOf(item);
      
      if (index > -1) {
        // Remove the item from the array
        this.tableData.splice(index, 1);
        
        // Refresh the paginated view to reflect the deletion
        this.updatePage();
      }
    }
  }
}