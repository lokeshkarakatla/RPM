import { AddCheckpointRequestComponent } from './add-checkpoint-request/add-checkpoint-request.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImgClickPopComponent } from 'src/app/pages/setup/subjective-setup/checkpoint-master/checkpoint-check/img-click-pop/img-click-pop.component';
import { environment } from 'src/environments/environment';
import { ImgPopSealingComponent } from './img-pop-sealing/img-pop-sealing.component';

@Component({
  selector: 'app-sealing',
  templateUrl: './sealing.component.html',
  styleUrls: ['./sealing.component.scss']
})
export class SealingComponent implements OnInit {

  isChecked3: string = 'no';
  isChecked4: string = 'yes';
  isChecked5: string = 'yes';
  isChecked6: string = 'yes';
  isChecked7: string = 'yes';
  isChecked8: string = 'yes';
  isChecked9: string = 'yes';
  isChecked10: string = 'yes';
  isChecked11: string = 'yes';

  // --- GRID DENSITY CONTROL ---
  gridRows = Array(8).fill(0); 
  gridCols = Array(11).fill(0);

  // Updated images array with standardized heights and widths
  images = [
    {
      title: "Right Fender",
      src: "/assets/Swift/Right_Fender.png",
      height: "310px", width: "480px", heightPx: 310, widthPx: 480,
      highlightedCells: [
        { col: 2, row: 2, color: "rgba(255, 205, 205, 0.64)", value: "2" },
        { col: 5, row: 2, color: "rgba(255, 205, 205, 0.64)", value: "12" },
        { col: 7, row: 2, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 3, row: 3, color: "rgba(255, 205, 205, 0.64)", value: "1" },
        { col: 2, row: 4, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 3, row: 1, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 6, row: 3, color: "rgba(127, 255, 127, 0.62)", value: "12" },
      ],
    },
    {
      title: "Right Front Door",
      src: "/assets/Swift/Right_Front_Door.png",
      height: "310px", width: "480px", heightPx: 310, widthPx: 480,
      highlightedCells: [
        // { col: 2, row: 1, color: "rgba(255, 205, 205, 0.64)", value: "3" },
        { col: 3, row: 1, color: "rgba(255, 205, 205, 0.64)", value: "6" },
        { col: 6, row: 2, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        // { col: 1, row: 5, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 7, row: 5, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 3, row: 6, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        // { col: 1, row: 7, color: "rgba(255, 205, 205, 0.64)", value: "3" },
        { col: 5, row: 7, color: "rgba(255, 205, 205, 0.64)", value: "12" },
        { col: 7, row: 7, color: "rgba(127, 255, 127, 0.62)", value: "12" },
      ],
    },
    {
      title: "Right Rear Door",
      src: "/assets/Swift/Right_Rear_Door.png",
      height: "310px", width: "480px", heightPx: 310, widthPx: 480,
      highlightedCells: [
        { col: 3, row: 1, color: "rgba(255, 205, 205, 0.64)", value: "3" },
        { col: 6, row: 1, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 8, row: 3, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        // { col: 2, row: 4, color: "rgba(255, 205, 205, 0.64)", value: "8" }, 
        { col: 6, row: 4, color: "rgba(255, 205, 205, 0.64)", value: "3" },
        { col: 7, row: 4, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 3, row: 6, color: "rgba(255, 205, 205, 0.64)", value: "7" },
        { col: 6, row: 7, color: "rgba(255, 205, 205, 0.64)", value: "12" },
        { col: 5, row: 8, color: "rgba(255, 205, 205, 0.64)", value: "6" },
        { col: 6, row: 8, color: "rgba(127, 255, 127, 0.62)", value: "12" },
      ],
    },
    {
      title: "Rear",
      src: "/assets/Swift/Back.png",
      height: "310px", width: "480px", heightPx: 310, widthPx: 480,
      highlightedCells: [
           { col: 4, row: 4, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 6, row: 4, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 2, row: 5, color: "rgba(255, 205, 205, 0.64)", value: "9" },
        { col: 4, row: 6, color: "rgba(255, 205, 205, 0.64)", value: "2" },
        { col: 6, row: 6, color: "rgba(255, 205, 205, 0.64)", value: "7" },
        { col: 8, row: 5, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 2, row: 6, color: "rgba(127, 255, 127, 0.62)", value: "12" },
      ],
    },
    {
      title: "Left Rear Door",
      src: "/assets/Swift/Left_Rear_Door.png",
      height: "310px", width: "480px", heightPx: 310, widthPx: 480,
      highlightedCells: [
        // { col: 3, row: 1, color: "rgba(255, 205, 205, 0.64)", value: "3" },
        { col: 6, row: 1, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        // { col: 2, row: 4, color: "rgba(255, 205, 205, 0.64)", value: "8" },
        { col: 6, row: 4, color: "rgba(255, 205, 205, 0.64)", value: "3" },
        { col: 7, row: 4, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 3, row: 5, color: "rgba(127, 255, 127, 0.62)", value: "9" },
        { col: 3, row: 6, color: "rgba(255, 205, 205, 0.64)", value: "7" },
        { col: 6, row: 7, color: "rgba(255, 205, 205, 0.64)", value: "12" },
        { col: 5, row: 8, color: "rgba(255, 205, 205, 0.64)", value: "6" },
      ],
    },
    {
      title: "Left Front Door",
      src: "/assets/Swift/Left_Front_Door.png",
      height: "310px", width: "480px", heightPx: 310, widthPx: 480,
      highlightedCells: [
        { col: 6, row: 1, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 8, row: 1, color: "rgba(255, 205, 205, 0.64)", value: "1" },
        { col: 7, row: 5, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 3, row: 6, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 4, row: 7, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 5, row: 7, color: "rgba(255, 205, 205, 0.64)", value: "5" },
        // { col: 6, row: 8, color: "rgba(255, 205, 205, 0.64)", value: "3" },
        { col: 7, row: 7, color: "rgba(127, 255, 127, 0.62)", value: "12" },
      ],
    },
    {
      title: "Left Fender",
      src: "/assets/Swift/Left_Fender.png",
      height: "310px", width: "480px", heightPx: 310, widthPx: 480,
      highlightedCells: [
        { col: 11, row: 2, color: "rgba(255, 205, 205, 0.64)", value: "2" },
        { col: 8, row: 2, color: "rgba(255, 205, 205, 0.64)", value: "12" },
        { col: 6, row: 2, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 10, row: 3, color: "rgba(255, 205, 205, 0.64)", value: "1" },
        { col: 7, row: 3, color: "rgba(255, 205, 205, 0.64)", value: "3" },
        // { col: 11, row: 4, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        // { col: 5, row: 3, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 9, row: 1, color: "rgba(127, 255, 127, 0.62)", value: "12" },
      ],
    },
    {
      title: "Roof",
      src: "/assets/Swift/Roof.png",
      height: "310px", width: "480px", heightPx: 310, widthPx: 480,
      highlightedCells: [
        { col: 5, row: 4, color: "rgba(255, 205, 205, 0.64)", value: "2" },
        { col: 9, row: 4, color: "rgba(255, 205, 205, 0.64)", value: "7" },
        { col: 10, row: 5, color: "rgba(255, 205, 205, 0.64)", value: "3" },
        // { col: 11, row: 2, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 6, row: 3, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 6, row: 6, color: "rgba(127, 255, 127, 0.62)", value: "12" },
      ],
    },
    {
      title: "Bonnet",
      src: "/assets/Swift/Bonnet.png",
      height: "310px", width: "480px", heightPx: 310, widthPx: 480,
      highlightedCells: [
        { col: 7, row: 4, color: "rgba(255, 205, 205, 0.64)", value: "1" },
        { col: 4, row: 5, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 3, row: 2, color: "rgba(127, 255, 127, 0.62)", value: "12" },
        { col: 3, row: 4, color: "rgba(255, 205, 205, 0.64)", value: "4" },
      ],
    },
  ];

  // Store the active image object here instead of just a string
  currentImage: any = this.images[0];

  constructor(public dialog: MatDialog) {
    if (environment.mode === 1) {
    }
  }

  ngOnInit(): void {
  }

  // Helper method to retrieve cell specific styles/values
  getCellData(rowIndex: number, colIndex: number) {
    if (!this.currentImage || !this.currentImage.highlightedCells) return null;
    return this.currentImage.highlightedCells.find(
      (cell: any) => cell.row === rowIndex && cell.col === colIndex
    );
  }

  // --- REST OF YOUR DATA (Values & Values1) ---
  values = [
    { status: 'Total', value: '128' },
    { status: 'Checks', value: '125' },
    { status: 'Pass', value: '120' },
    { status: 'Fail', value: '5' },
  ]

  values1 = [
    { value: '5.5', row: '10', col: '5', serial: '121', checkpoints: 'checkpoint-1', measure: 'GAP', lsl: '0.20', usl: '1.2', unit: 'mm' },
    { value: '5.5', row: '7', col: '10', serial: '122', checkpoints: 'checkpoint-2', measure: 'Flush', lsl: '0.22', usl: '1.25', unit: 'mm' },
    { value: '5.5', row: '4', col: '5', serial: '123', checkpoints: 'checkpoint-3', measure: 'Alignment', lsl: '0.1', usl: '1.0', unit: 'mm' },
    { value: '5.5', row: '5', col: '3', serial: '124', checkpoints: 'checkpoint-4', measure: 'Consistancy', lsl: '0.20', usl: '1.2', unit: 'mm' },
    { value: '5.5', row: '8', col: '8', serial: '125', checkpoints: 'checkpoint-5', measure: 'GAP', lsl: '0.20', usl: '1.2', unit: 'mm' },
  ]

  imgpop(item: any) {
    this.dialog.open(ImgPopSealingComponent, {
      data: item,
      width: "750px",
      height: "auto"
    })
  }

  requestCheckpoints(item: any) {
    this.dialog.open(AddCheckpointRequestComponent, {
      data: item,
      width: "1100px",
      height: "auto"
    })
  }

  // Helper method to reset all tabs to inactive state
  resetColors() {
    this.isChecked3 = 'yes';
    this.isChecked4 = 'yes';
    this.isChecked5 = 'yes';
    this.isChecked6 = 'yes';
    this.isChecked7 = 'yes';
    this.isChecked8 = 'yes';
    this.isChecked9 = 'yes';
    this.isChecked10 = 'yes';
    this.isChecked11 = 'yes';
  }

  // Tab click methods updated to set the entire object
  color3() { this.resetColors(); this.isChecked3 = 'no'; this.currentImage = this.images[0]; }
  color4() { this.resetColors(); this.isChecked4 = 'no'; this.currentImage = this.images[1]; }
  color5() { this.resetColors(); this.isChecked5 = 'no'; this.currentImage = this.images[2]; }
  color6() { this.resetColors(); this.isChecked6 = 'no'; this.currentImage = this.images[3]; }
  color7() { this.resetColors(); this.isChecked7 = 'no'; this.currentImage = this.images[4]; }
  color8() { this.resetColors(); this.isChecked8 = 'no'; this.currentImage = this.images[5]; }
  color9() { this.resetColors(); this.isChecked9 = 'no'; this.currentImage = this.images[6]; }
  color10() { this.resetColors(); this.isChecked10 = 'no'; this.currentImage = this.images[7]; }
  color11() { this.resetColors(); this.isChecked11 = 'no'; this.currentImage = this.images[8]; }
}