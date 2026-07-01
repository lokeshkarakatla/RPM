import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

    private router: Router,
    private route: ActivatedRoute

  ) { }
  ngOnInit(): void { }

  editAsset(asset: Asset): void {
    console.log('Edit', asset);
  }

  deleteAsset(asset: Asset): void {
    console.log('Delete', asset);
  }

  addAsset(): void {
    console.log('Add Asset clicked');
    // Example:
    // this.router.navigate(['/assets/add']);
  }

viewScheduling(asset: Asset): void {
  this.router.navigate(['sample'], { relativeTo: this.route }); // now relative, no '../'
}

}