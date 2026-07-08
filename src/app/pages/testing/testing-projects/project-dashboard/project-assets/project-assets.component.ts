import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddAssetPopComponent } from './add-asset-pop/add-asset-pop.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { StatusConfirmationDialogComponent } from '../../add-projects/status-confirmation-dialog/status-confirmation-dialog.component';

interface Asset {
  assetCode: string;
  assetType: string;
  assetName: string;
  assetMake: string;
  assetModel: string;
  log: number;
  pmChecklist: number;
  monitoring: number;
  status: string;
}

@Component({
  selector: 'app-project-assets',
  templateUrl: './project-assets.component.html',
  styleUrls: ['./project-assets.component.scss']
})
export class ProjectAssetsComponent implements OnInit {

  assets: Asset[] = [
    {
      assetCode: 'FO-32',
      assetType: 'Heavy Equipment',
      assetName: 'Forklifts',
      assetMake: 'Bosch',
      assetModel: 'BK-93',
      log: 125,
      pmChecklist: 13,
      monitoring: 75,
      status: 'Active'
    },
    {
      assetCode: 'TIP-21',
      assetType: 'Heavy Equipment',
      assetName: 'Tippers',
      assetMake: 'Caterpillar',
      assetModel: 'CAT-32',
      log: 568,
      pmChecklist: 23,
      monitoring: 64,
      status: 'Active'
    },
    {
      assetCode: 'TRE-45',
      assetType: 'Heavy Equipment',
      assetName: 'Trenchers',
      assetMake: 'Volvo',
      assetModel: 'VOL-73',
      log: 291,
      pmChecklist: 8,
      monitoring: 32,
      status: 'Inactive'
    },
    {
      assetCode: 'CR-43',
      assetType: 'Hand and Power tools',
      assetName: 'Crimpers',
      assetMake: 'Black and Decker',
      assetModel: 'BD-43',
      log: 423,
      pmChecklist: 9,
      monitoring: 42,
      status: 'Active'
    },
    {
      assetCode: 'MIX-54',
      assetType: 'Hand and Power tools',
      assetName: 'Mixers',
      assetMake: 'Hitachi',
      assetModel: 'HIT-76',
      log: 363,
      pmChecklist: 7,
      monitoring: 12,
      status: 'Inactive'
    }
  ];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private location:Location

  ) { }
  ngOnInit(): void { }

  Confirmation(asset: Asset): void {
    let dialogRef = this.dialog.open(StatusConfirmationDialogComponent, {
      width: 'auto',
      data: {
        title: 'Change Status',
        content: 'Are you sure you want to Change the Status ?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        asset.status = asset.status === 'Active' ? 'Inactive' : 'Active';
      }
    });
  }

  editAsset(asset: Asset): void {
    let dialogRef = this.dialog.open(AddAssetPopComponent, {
      width: '750px',
      height: 'auto',
      data: asset
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        asset.assetCode = result.assetCode;
        asset.assetType = result.assetType;
        asset.assetName = result.assetName;
        asset.assetMake = result.assetMake;
        asset.assetModel = result.assetModel;
      }
    });
  }

  deleteAsset(asset: Asset): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: {
        title: 'Delete Confirmation',
        content: 'Are you sure you want to delete this record?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assets = this.assets.filter(a => a.assetCode !== asset.assetCode);
      }
    });
  }

  addAsset(): void {
    let dialogRef = this.dialog.open(AddAssetPopComponent, {
      width: '750px',
      height: 'auto'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assets.push({
          assetCode: result.assetCode,
          assetType: result.assetType,
          assetName: result.assetName,
          assetMake: result.assetMake,
          assetModel: result.assetModel,
          log: 0,
          pmChecklist: 0,
          monitoring: 0,
          status: 'Active'
        });
      }
    });
  }

  viewScheduling(asset: Asset): void {
    this.router.navigate(['sample'], { relativeTo: this.route });
  }

  goBack(): void {
    this.router.navigateByUrl('/app/testing/projects');
  }

}