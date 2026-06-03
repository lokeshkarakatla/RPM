import { ImgClickPopComponent } from './img-click-pop/img-click-pop.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AddCheckpointComponent } from '../add-checkpoint/add-checkpoint.component';

@Component({
  selector: 'app-checkpoint-check',
  templateUrl: './checkpoint-check.component.html',
  styleUrls: ['./checkpoint-check.component.scss']
})
export class CheckpointCheckComponent implements OnInit {

  Image: any = '/assets/car10x10.png';
  disableOverview: boolean = false;

  constructor(public dialog: MatDialog, public router: Router) { 
    // Keep constructor clean
  }

  ngOnInit(): void {
    // 1. Retrieve the stored image
    const storedImage = sessionStorage.getItem('currentCheckpointImage');
    if (storedImage) {
      this.Image = storedImage;
    }

    // 2. Retrieve the hide/show flag for the Overview tab
    const isOverviewDisabled = sessionStorage.getItem('disableOverview');
    if (isOverviewDisabled === 'true') {
      this.disableOverview = true;
    } else {
      this.disableOverview = false;
    }
  }

  values = [
    { value: '5.5', row: '10', col: '9', serial: '121', checkpoints: 'checkpoint-1', measure: 'GAP', lsl: '0.20', usl: '1.2', unit: 'mm' },
    { value: '3.2', row: '9', col: '8', serial: '122', checkpoints: 'checkpoint-2', measure: 'Flush', lsl: '0.22', usl: '1.25', unit: 'mm' },
    { value: '5.5', row: '6', col: '7', serial: '123', checkpoints: 'checkpoint-3', measure: 'Alignment', lsl: '0.1', usl: '1.0', unit: 'mm' },
    { value: '5.5', row: '3', col: '4', serial: '124', checkpoints: 'checkpoint-4', measure: 'Consistancy', lsl: '0.20', usl: '1.2', unit: 'mm' },
    { value: '5.5', row: '9', col: '2', serial: '125', checkpoints: 'checkpoint-5', measure: 'GAP', lsl: '0.20', usl: '1.2', unit: 'mm' },
    { value: '5.5', row: '4', col: '9', serial: '126', checkpoints: 'checkpoint-8', measure: 'Flush', lsl: '0.22', usl: '1.25', unit: 'mm' },
    { value: '5.5', row: '2', col: '9', serial: '127', checkpoints: 'checkpoint-9', measure: 'Alignment', lsl: '0.1', usl: '1.0', unit: 'mm' },
    { value: '5.5', row: '3', col: '7', serial: '128', checkpoints: 'checkpoint-10', measure: 'Consistancy', lsl: '0.20', usl: '1.2', unit: 'mm' },
    { value: '5.5', row: '8', col: '6', serial: '129', checkpoints: 'checkpoint-11', measure: 'GAP', lsl: '0.20', usl: '1.2', unit: 'mm' },
    { value: '5.5', row: '9', col: '10', serial: '130', checkpoints: 'checkpoint-12', measure: 'Flush', lsl: '0.22', usl: '1.25', unit: 'mm' }
  ]

  imgpop(item: any) {
    this.dialog.open(ImgClickPopComponent, {
      data: item,
      width: "500px",
      height: "auto"
    })
  }

  addcheckpoint(item: any) {
    this.dialog.open(AddCheckpointComponent, {
      data: item,
      width: "600px",
      height: "auto"
    })
  }

  // Helper function to clean up storage when navigating away
  clearStorage() {
    sessionStorage.removeItem('currentCheckpointImage');
    sessionStorage.removeItem('disableOverview');
  }

  next() {
    this.clearStorage();
    this.router.navigate(['/app/new-audits/objective-audits/prts-objective-setup/obj-setup-modules-checkpoints']);
  }

  back() {
    this.clearStorage();
    this.router.navigate(['/app/setup/subjective/overview']);
  }

  goBack() {
    this.clearStorage();
    this.router.navigate(['/app/objective-audits/prts-objective-setup/obj-setup-modules-checkpoints']);
  }
}