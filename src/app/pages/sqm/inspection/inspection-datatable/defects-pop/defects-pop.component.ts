import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-defects-pop',
  templateUrl: './defects-pop.component.html',
  styleUrls: ['./defects-pop.component.scss']
})
export class DefectsPopComponent implements OnInit {

  gridCells: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DefectsPopComponent>
  ) { }

  ngOnInit(): void {
    this.generateHeatmapGrid();
  }


  
generateHeatmapGrid() {
  const defectLabels = [
    { index: 0, label: 'Sink Mark (45)' },
    { index: 1, label: 'Thick Paint (23)' },
    { index: 2, label: 'Dent (102)' },
    { index: 3, label: 'Short Fill (4)' },
    { index: 33, label: 'Burn Mark' }
  ];

  const totalRows = 10;
  const totalCols = 5;
  const totalCells = totalRows * totalCols;

  this.gridCells = [];

  for (let i = 0; i < totalCells; i++) {

    const defect = defectLabels.find(d => d.index === i);

    const ratio = i / (totalCells - 1);

    const bgColor = `rgba(220, 38, 38, ${1 - ratio * 0.9})`;

    this.gridCells.push({
      label: defect ? defect.label : '',
      bgColor,
      textColor: ratio < 0.5 ? '#fff' : '#333'
    });
  }
}

  close() {
    this.dialogRef.close();
  }


  
}