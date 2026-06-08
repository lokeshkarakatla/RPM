import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddQuestionPopComponent } from './add-question-pop/add-question-pop.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-commodity-inner-grid',
  templateUrl: './commodity-inner-grid.component.html',
  styleUrls: ['./commodity-inner-grid.component.scss']
})
export class CommodityInnerGridComponent implements OnInit {
  
  // Data extracted from the new screenshot
  tableData = [
    { question: 'Engineering Report', code: 'ENGR', mandatory: '', priority: '' },
    { question: 'Digital Transformation', code: 'DT', mandatory: '', priority: '' },
    { question: 'Productivity Report', code: 'PR1', mandatory: '', priority: '' },
    { question: 'Predictability Report', code: 'PR2', mandatory: '', priority: '' },
    { question: 'Monthly Metrics', code: 'MM', mandatory: '', priority: '' },
    { question: 'Monthly Quality Review', code: 'MQR', mandatory: '', priority: '' },
    { question: 'Daily Progress Report', code: 'DPR', mandatory: '', priority: '' },
    { question: 'Defect Leakage Report', code: 'DLR', mandatory: '', priority: '' }
  ];

  constructor(private dialog: MatDialog, public router: Router,private location: Location) { }

  ngOnInit(): void {
  }

  // --- Action Handlers ---

  onAddQuestion(): void {
    this.dialog.open(AddQuestionPopComponent, {
      width: '600px',
      data: {} // Pass any necessary data to the dialog
    }); 
    // Logic to open Add Question dialog
  }

  onBack(): void {
    console.log('Back button clicked');
    // Logic to navigate back
    // this.router.navigate(['/previous-route']);
  }

  onEdit(item: any): void {
    console.log('Edit clicked for:', item.question);
  }

  onDelete(item: any): void {
    console.log('Delete clicked for:', item.question);
  }

  goBack()
  {
    this.location.back();
  }
}