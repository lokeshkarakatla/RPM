import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process-completed-reference',
  templateUrl: './process-completed-reference.component.html',
  styleUrls: ['./process-completed-reference.component.scss']
})
export class ProcessCompletedReferenceComponent implements OnInit {

  // Top Categories 
  categories = ['QMS (4)', 'MM  (2)', 'PPC  (5)', 'IME  (4)', 'CAPA  (4)'];
  selectedCategory = 'QMS (4)';

  // Dictionary mapping each category to its specific set of 12 questions and their colors
  categoryQuestionsMap: { [key: string]: any[] } = {
    'QMS (4)': [
      { id: 1, tooltip: 'Casting (4)', status: 'green', question: 'Are the casting temperatures within the specified limits?' },
      { id: 2, tooltip: 'Forging (1)', status: 'green', question: 'Is the forging die pre-heated correctly?' },
      { id: 3, tooltip: 'Machining (3)', status: 'green', question: 'Are all cutting tools calibrated and within tolerance?' },
      { id: 4, tooltip: 'Non-Metallic (5)', status: 'red', question: 'Is the curing time and temperature documented?' },
      { id: 5, tooltip: 'Sheet Metal (4)', status: 'green', question: 'Is the blanking pressure adequate for the thickness?' },
      { id: 6, tooltip: 'Proprietary (1)', status: 'green', question: 'Are proprietary compound mixing ratios verified?' },
      { id: 7, tooltip: 'Steel Mills (3)', status: 'green', question: 'Are the rolling tolerances being met per specifications?' },
      { id: 8, tooltip: 'Casting (4)', status: 'green', question: 'Are the cooling rates actively monitored and recorded?' },
      { id: 9, tooltip: 'Forging (1)', status: 'green', question: 'Is the grain flow inspected and approved?' },
      { id: 10, tooltip: 'Machining (3)', status: 'yellow', question: 'Are the surface finishes measured and within spec?' },
      { id: 11, tooltip: 'Non-Metallic (5)', status: 'yellow', question: 'Is the material storage temperature controlled?' },
      { id: 12, tooltip: 'Sheet Metal (4)', status: 'green', question: 'Are the bend radii checked against the drawing?' }
    ],
    'MM  (2)': [
      { id: 1, tooltip: 'Receiving (2)', status: 'green', question: 'Are raw material certificates verified upon receipt?' },
      { id: 2, tooltip: 'Storage (3)', status: 'green', question: 'Is the FIFO (First-In-First-Out) method strictly followed?' },
      { id: 3, tooltip: 'Handling (1)', status: 'green', question: 'Are materials handled to prevent damage and contamination?' },
      { id: 4, tooltip: 'Traceability (4)', status: 'yellow', question: 'Is part traceability maintained throughout the warehouse?' },
      { id: 5, tooltip: 'Scrap (2)', status: 'green', question: 'Are non-conforming materials properly segregated and labeled?' },
      { id: 6, tooltip: 'Inventory (3)', status: 'green', question: 'Are cycle counts performed regularly?' },
      { id: 7, tooltip: 'Environment (1)', status: 'red', question: 'Are temperature/humidity sensitive materials stored correctly?' },
      { id: 8, tooltip: 'Packaging (2)', status: 'green', question: 'Are packaging standards available and being followed?' },
      { id: 9, tooltip: 'Dispatch (4)', status: 'green', question: 'Is the dispatch staging area clearly demarcated?' },
      { id: 10, tooltip: 'Hazardous (2)', status: 'green', question: 'Are hazardous materials stored with secondary containment?' },
      { id: 11, tooltip: 'Shelf Life (3)', status: 'yellow', question: 'Are shelf-life expiry dates monitored and alerted?' },
      { id: 12, tooltip: 'Calibration (1)', status: 'green', question: 'Are weighing scales in the material area calibrated?' }
    ],
    'PPC  (5)': [
      { id: 1, tooltip: 'Scheduling (4)', status: 'green', question: 'Is the daily production plan displayed and communicated?' },
      { id: 2, tooltip: 'Capacity (2)', status: 'red', question: 'Are machine capacity bottlenecks identified?' },
      { id: 3, tooltip: 'Tracking (3)', status: 'green', question: 'Is production tracking updated shift-wise?' },
      { id: 4, tooltip: 'Downtime (4)', status: 'green', question: 'Is machine downtime accurately logged and analyzed?' },
      { id: 5, tooltip: 'Changeover (2)', status: 'yellow', question: 'Are SMED (Single Minute Exchange of Die) practices used?' },
      { id: 6, tooltip: 'Yield (1)', status: 'green', question: 'Are production yields matching the planned targets?' },
      { id: 7, tooltip: 'Shortages (3)', status: 'green', question: 'Is there an escalation matrix for material shortages?' },
      { id: 8, tooltip: 'Manpower (2)', status: 'green', question: 'Is skill-matrix considered during manpower allocation?' },
      { id: 9, tooltip: 'Maintenance (4)', status: 'green', question: 'Is preventive maintenance scheduled without affecting runs?' },
      { id: 10, tooltip: 'OEE (5)', status: 'green', question: 'Is the Overall Equipment Effectiveness (OEE) tracked?' },
      { id: 11, tooltip: 'WIP (3)', status: 'yellow', question: 'Are Work-In-Progress (WIP) inventory levels within limits?' },
      { id: 12, tooltip: 'Review (1)', status: 'red', question: 'Are plan vs. actual variances reviewed daily?' }
    ],
    'IME  (4)': [
      { id: 1, tooltip: 'Layout (3)', status: 'green', question: 'Is the shop floor layout optimized for material flow?' },
      { id: 2, tooltip: 'SOPs (4)', status: 'green', question: 'Are Standard Operating Procedures (SOPs) displayed at stations?' },
      { id: 3, tooltip: 'Ergonomics (2)', status: 'yellow', question: 'Have ergonomic risk assessments been conducted for operators?' },
      { id: 4, tooltip: 'Time Study (4)', status: 'green', question: 'Are cycle times validated against the routing documents?' },
      { id: 5, tooltip: 'Poka-Yoke (5)', status: 'green', question: 'Are error-proofing (Poka-Yoke) devices functioning properly?' },
      { id: 6, tooltip: '5S (2)', status: 'green', question: 'Is the 5S score maintained above the target threshold?' },
      { id: 7, tooltip: 'Tools (3)', status: 'green', question: 'Are specified torque tools used and verified?' },
      { id: 8, tooltip: 'Jigs (1)', status: 'red', question: 'Are fixtures, jigs, and gauges periodically validated?' },
      { id: 9, tooltip: 'Automation (4)', status: 'green', question: 'Are automated sensors and vision systems clean and active?' },
      { id: 10, tooltip: 'Safety (3)', status: 'green', question: 'Are machine safety guards and light curtains operational?' },
      { id: 11, tooltip: 'Training (2)', status: 'yellow', question: 'Are operators trained on the latest engineering revisions?' },
      { id: 12, tooltip: 'NPI (5)', status: 'green', question: 'Are New Product Introduction (NPI) trial records available?' }
    ],
    'CAPA  (4)': [
      { id: 1, tooltip: 'Containment (4)', status: 'green', question: 'Were immediate containment actions implemented within 24h?' },
      { id: 2, tooltip: 'Root Cause (5)', status: 'yellow', question: 'Is the Why-Why or Fishbone analysis correctly documented?' },
      { id: 3, tooltip: 'Corrective (3)', status: 'green', question: 'Have permanent corrective actions been validated?' },
      { id: 4, tooltip: 'Preventive (2)', status: 'green', question: 'Have preventive actions been horizontally deployed?' },
      { id: 5, tooltip: 'FMEA (4)', status: 'red', question: 'Was the PFMEA updated after the customer complaint?' },
      { id: 6, tooltip: 'Control Plan (3)', status: 'green', question: 'Was the Control Plan revised to reflect the new checks?' },
      { id: 7, tooltip: 'Closure (1)', status: 'green', question: 'Are CAPAs closed within the stipulated target time?' },
      { id: 8, tooltip: 'Effectiveness (4)', status: 'green', question: 'Is there a record of CAPA effectiveness monitoring for 3 months?' },
      { id: 9, tooltip: 'Rejection (2)', status: 'green', question: 'Did the internal rejection rate drop post-CAPA implementation?' },
      { id: 10, tooltip: 'Training (3)', status: 'yellow', question: 'Were operators retrained on the updated CAPA procedures?' },
      { id: 11, tooltip: 'Audits (5)', status: 'green', question: 'Are previous CAPAs being verified during internal audits?' },
      { id: 12, tooltip: 'Escalation (1)', status: 'green', question: 'Are overdue open CAPAs escalated to management?' }
    ]
  };

  // Rendered active steps list
  processSteps: any[] = [];
  selectedStep = 10; // Initially selected based on your original file

  // Form Controls Models
  rating = "5";

  // Dropdown Options
  severities = [
    { value: "8", label: "8 - Primary Performance Failure" },
    { value: "9", label: "9 - Safety/Regulatory" },
  ];
  occurrences = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  detections = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  pdcaStatuses = ["Plan", "Do", "Check", "Act"];
  actionTypes = ["Containment", "Corrective", "Preventive"];

  // Selected Values
  selectedSeverity = "8";
  selectedOccurrence = "4";
  selectedDetection = "2";
  pdcaStatus = "";
  actionType = "";
  isResolved = false;

  // Image Gallery Mock Data
  galleryImages = [
    "assets/img8.jpg",
    "assets/img-001.jpg",
    "assets/img-002.jpg",
    "assets/img-003.jpg",
    "assets/img5.jpg",
  ];

  selectedFiles: File[] = [];

  constructor(private location: Location) {}

  ngOnInit(): void {
    // Initialize the default questions on load
    this.processSteps = this.categoryQuestionsMap[this.selectedCategory];
  }

  goBack(): void {
    this.location.back();
  }

  // Set active category tab AND update the questions
  selectCategory(catName: string) {
    this.selectedCategory = catName;
    this.processSteps = this.categoryQuestionsMap[catName] || [];
    this.selectedStep = 1; // Reset to question 1 on category change
  }

  // Set active process step
  selectStep(id: number) {
    this.selectedStep = id;
  }

  // Helper function to get the currently selected question
  getSelectedQuestion(): string {
    const step = this.processSteps.find(s => s.id === this.selectedStep);
    return step ? step.question : '';
  }

  // Set rating
  setRating(val: string) {
    this.rating = val;
  }

  // Auto-calculated SOD Score
  get sodScore(): string {
    if (
      !this.selectedSeverity ||
      !this.selectedOccurrence ||
      !this.selectedDetection
    )
      return "";
    return `${this.selectedSeverity}${this.selectedOccurrence}${this.selectedDetection}`;
  }

  // Auto-calculated Risk Rating based on SOD Score
  get riskRating(): string {
    const score = parseInt(this.sodScore, 10);
    if (isNaN(score)) return "";
    if (score >= 800) return "High";
    if (score >= 400) return "Medium";
    return "Low";
  }

  // File Handlers
  onFileSelected(event: any): void {
    if (event.target.files) {
      this.addFiles(event.target.files);
    }
  }

  onDragOver(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.add('drag-over');
  }

  onDragLeave(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove('drag-over');
  }

  onDrop(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.classList.remove('drag-over');
    if (event.dataTransfer.files) {
      this.addFiles(event.dataTransfer.files);
    }
  }

  addFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  addImage(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];

      if (file) {
        console.log(file);
        const reader = new FileReader();
        reader.onload = () => {
          const imageUrl = reader.result as string;
          this.galleryImages.push(imageUrl);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  }
}