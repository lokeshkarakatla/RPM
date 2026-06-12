import { Component, OnInit } from '@angular/core';
import { ViewDocPhotosComponent } from '../../parts-audits/parts-actions/view-doc-photos/view-doc-photos.component';
import { PartsAddParameterComponent } from '../../parts-audits/parts-active-audits/parts-reference/parts-add-parameter/parts-add-parameter.component';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { AuditrefRemarksPopComponent } from './auditref-remarks-pop/auditref-remarks-pop.component';

@Component({
  selector: 'app-parts-audit-reference',
  templateUrl: './parts-audit-reference.component.html',
  styleUrls: ['./parts-audit-reference.component.scss']
})
export class PartsAuditReferenceComponent implements OnInit {

  constructor(
    private location: Location,
    public dialog: MatDialog,
  ) { }

  goBack(): void {
    this.location.back();
  }

  // Top Categories (Cleaned up extra spaces for exact matching)
  categories = [
    { name: 'Dimensional Checks (4)'  },
    { name: 'Surface Finish (5)', tooltip: 'Material Management' },
    { name: 'Performance (3)', tooltip: 'Production Planning & Control' },
    { name: 'Metallurgical (5)', tooltip: 'Inspection & Measurement Engineering' },
    { name: 'CAPA(4)', tooltip: 'Corrective and Preventive Actions' }
  ];
  
  selectedCategory = 'Dimensional Checks (4)';

  // Pagination
  pageSize = 4;
  pageIndex = 0;
  pagedData: any[] = [];
  tableData: any[] = []; 

  // Dictionary holding unique parameters for EACH category
  // FIXED: The keys here now exactly match the 'name' properties in the categories array above
  categoryData: { [key: string]: any[] } = {
    'Dimensional Checks (4)': [
      { parameter: 'OUTER DIAMETER', spec: '457.0±0.8', min: 23, max: 27, actionLink: '12', special: 'General', method: 'Thermocouple', s1: 24.5, s2: 25.0, s3: 26.0, s4: 25.5, s5: 24.8, okay: false },
      { parameter: 'TOTAL LENGTH', spec: '4.747 / 34.798', min: 6.5, max: 7.5, actionLink: '13', special: 'General', method: 'pH Meter', s1: 7.1, s2: 6.9, s3: 7.2, s4: 6.8, s5: 7.0, okay: true },
      { parameter: 'WIDTH', spec: '20.0±0.2', min: 1000, max: 2000, actionLink: '14', special: 'General', method: 'Conductivity Meter', s1: 1400, s2: 1500, s3: 1600, s4: 1550, s5: 1450, okay: false },
      { parameter: 'ACE TO HOLE CENTER', spec: '5.0±0.3', min: 7, max: 9, actionLink: '15', special: 'General', method: 'DO Meter', s1: 8.2, s2: 7.8, s3: 8.0, s4: 7.5, s5: 8.1, okay: true }
    ],
    'Surface Finish (5)': [
      { parameter: 'MATERIAL THICKNESS', spec: '2.5±0.1', min: 2.4, max: 2.6, actionLink: '21', special: 'Critical', method: 'Caliper', s1: 2.5, s2: 2.5, s3: 2.6, s4: 2.4, s5: 2.5, okay: true },
      { parameter: 'TENSILE STRENGTH', spec: '500 MPa', min: 490, max: 510, actionLink: '22', special: 'Critical', method: 'UTM', s1: 495, s2: 502, s3: 498, s4: 505, s5: 500, okay: true },
      { parameter: 'HARDNESS (HRC)', spec: '45±2', min: 43, max: 47, actionLink: '23', special: 'General', method: 'Rockwell', s1: 44, s2: 45, s3: 46, s4: 42, s5: 45, okay: false },
      { parameter: 'SURFACE FINISH', spec: 'Ra 1.6', min: 1.2, max: 1.8, actionLink: '24', special: 'General', method: 'Profilometer', s1: 1.4, s2: 1.5, s3: 1.7, s4: 1.6, s5: 1.5, okay: true },
      { parameter: 'COATING THICKNESS', spec: '15µm', min: 12, max: 18, actionLink: '25', special: 'General', method: 'DFT Gauge', s1: 14, s2: 13, s3: 15, s4: 16, s5: 15, okay: true }
    ],
    'Performance (3)': [
      { parameter: 'CYCLE TIME', spec: '45 sec', min: 40, max: 50, actionLink: '31', special: 'General', method: 'Stopwatch', s1: 44, s2: 46, s3: 45, s4: 47, s5: 45, okay: true },
      { parameter: 'MACHINE UPTIME', spec: '95%', min: 90, max: 100, actionLink: '32', special: 'Critical', method: 'System Log', s1: 94, s2: 96, s3: 92, s4: 98, s5: 95, okay: false },
      { parameter: 'SCRAP RATE', spec: '< 2%', min: 0, max: 2.5, actionLink: '33', special: 'General', method: 'Weight', s1: 1.5, s2: 1.2, s3: 2.1, s4: 1.8, s5: 1.9, okay: true }
    ],
    'Metallurgical (5)': [
      { parameter: 'CALIBRATION DRIFT', spec: '0.01%', min: 0.005, max: 0.015, actionLink: '41', special: 'Critical', method: 'Master Gauge', s1: 0.01, s2: 0.012, s3: 0.009, s4: 0.011, s5: 0.01, okay: true },
      { parameter: 'SENSOR VOLTAGE', spec: '5.0V', min: 4.8, max: 5.2, actionLink: '42', special: 'General', method: 'Multimeter', s1: 4.9, s2: 5.1, s3: 5.0, s4: 4.8, s5: 5.2, okay: true },
      { parameter: 'PROBE ALIGNMENT', spec: '0.0±0.1 deg', min: -0.1, max: 0.1, actionLink: '43', special: 'General', method: 'Laser', s1: 0.05, s2: -0.02, s3: 0.01, s4: 0.08, s5: -0.05, okay: true },
      { parameter: 'READING DELAY', spec: '< 50ms', min: 10, max: 60, actionLink: '44', special: 'General', method: 'Oscilloscope', s1: 45, s2: 55, s3: 40, s4: 48, s5: 50, okay: false },
      { parameter: 'THERMAL STABILITY', spec: '±1°C', min: -1.5, max: 1.5, actionLink: '45', special: 'Critical', method: 'Chamber', s1: 0.5, s2: -0.8, s3: 1.2, s4: -0.5, s5: 0.0, okay: true }
    ],
    'CAPA(4)': [
      { parameter: 'ROOT CAUSE DELAY', spec: '< 2 Days', min: 0, max: 3, actionLink: '51', special: 'General', method: 'System', s1: 1, s2: 2, s3: 1, s4: 3, s5: 2, okay: true },
      { parameter: 'ACTION CLOSURE', spec: '< 7 Days', min: 0, max: 10, actionLink: '52', special: 'Critical', method: 'System', s1: 5, s2: 8, s3: 6, s4: 7, s5: 9, okay: false },
      { parameter: 'EFFECTIVENESS SCORE', spec: '> 80%', min: 70, max: 100, actionLink: '53', special: 'General', method: 'Audit', s1: 85, s2: 82, s3: 78, s4: 90, s5: 88, okay: true },
      { parameter: 'REPEAT ISSUES', spec: '0', min: 0, max: 1, actionLink: '54', special: 'Critical', method: 'Log Check', s1: 0, s2: 0, s3: 1, s4: 0, s5: 0, okay: false }
    ]
  };

  ngOnInit(): void {
    // Load the initial data for the default selected tab
    this.tableData = this.categoryData[this.selectedCategory] || [];
    this.updatePage();
  }

  // Set active category tab AND update table data
  selectCategory(catName: string) {
    this.selectedCategory = catName;
    // Load the new parameters array based on the clicked tab
    this.tableData = this.categoryData[catName] || [];
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

  editParameter(item: any) {
    let dialogRef = this.dialog.open(PartsAddParameterComponent, {
      height: 'auto',
      width: '850px',
      data: item // <--- This tells the popup it's in Edit mode
    });
    dialogRef.afterClosed().subscribe(data => {
      // Handle any updates after popup closes if necessary
    });
  }

  opendocpop() {
    this.dialog.open(ViewDocPhotosComponent, {
      width: '600px',
      height: '450px',
    });
  }

  opennotes() {
    this.dialog.open(AuditrefRemarksPopComponent, {
      width: '500px',
      height: 'auto'
    });
  }

  deleteParameter(item: any): void {
    const confirmDelete = window.confirm('Are you sure you want to delete??');
    
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