import { Component, OnInit } from '@angular/core';

interface Asset {
  AssetCode: string;
  AssetType: string;
  AssetName: string;
  AssetMake: string;
  AssetModel: string;
  Status: string;
  scheduling:number
}

@Component({
  selector: 'app-placeholder-image',
  templateUrl: './placeholder-image.component.html',
  styleUrls: ['./placeholder-image.component.scss']
})
export class PlaceholderImageComponent implements OnInit {

  canUpdate: boolean = true;
  canDelete: boolean = true;

  allAssets: Asset[] = [
    {
      AssetCode: 'FO-32',
      AssetType: 'Heavy Equipment',
      AssetName: 'Forklifts',
      AssetMake: 'Bosch',
      AssetModel: 'BK-93',
      Status: 'Active',
      scheduling:244
    },
    {
      AssetCode: 'TIP-21',
      AssetType: 'Heavy Equipment',
      AssetName: 'Tippers',
      AssetMake: 'Caterpillar',
      AssetModel: 'CAT-32',
      Status: 'Active',
      scheduling:644
    },
    {
      AssetCode: 'TRE-45',
      AssetType: 'Heavy Equipment',
      AssetName: 'Trenchers',
      AssetMake: 'Volvo',
      AssetModel: 'VOL-73',
      Status: 'Inactive',
      scheduling:414
    },
    {
      AssetCode: 'CR-43',
      AssetType: 'Hand and Power tools',
      AssetName: 'Crimpers',
      AssetMake: 'Black and Decker',
      AssetModel: 'BD-43',
      Status: 'Active',
      scheduling:321
    },
    {
      AssetCode: 'MIX-54',
      AssetType: 'Hand and Power tools',
      AssetName: 'Mixers',
      AssetMake: 'Hitachi',
      AssetModel: 'HIT-76',
      Status: 'Inactive',
      scheduling:454
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  goToDashboard(assetCode: string): void {
    // TODO: wire up navigation to the asset's dashboard/detail view
  }

  openEditDialog(item: Asset): void {
    // TODO: wire up edit dialog logic
  }

  deleteConfirmation(item: Asset): void {
    // TODO: wire up delete confirmation logic
  }

}