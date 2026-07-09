import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AddGateComponent } from './add-gate/add-gate.component';
import { PageHeaderService } from 'src/app/shared/page-header.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { StatusConfirmationDialogComponent } from '../testing-projects/add-projects/status-confirmation-dialog/status-confirmation-dialog.component';

@Component({
  selector: 'app-gates',
  templateUrl: './gates.component.html',
  styleUrls: ['./gates.component.scss']
})
export class GatesComponent implements OnInit, OnDestroy {

  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  filterToggle: boolean = false;
  gridCmp: any;
  tableList: any[] = [];
  canDelete = true;
  canUpdate = true;

  isChildRouteActive: boolean = false;

  Status = [
    { name: 'Active', value: true },
    { name: 'Inactive', value: false }
  ];

  stages = [
    { name: 'Feasibility', count: 10, route: 'feasibility', status: true, description: 'Evaluate the technical and commercial viability of the project.', stageCode: "STG001", gateCode: "GT001" },
    { name: 'Design', count: 10, route: 'design', status: false, description: 'Develop the detailed design for the project.', stageCode: "STG002", gateCode: "GT002" },
    { name: 'Prototyping', count: 10, route: 'prototyping', status: false, description: 'Create prototypes to test the design.', stageCode: "STG003", gateCode: "GT003" },
    { name: 'Testing', count: 10, route: 'testing', status: false, description: 'Conduct thorough testing of the prototypes.', stageCode: "STG004", gateCode: "GT004" },
    { name: 'Launch', count: 10, route: 'launch', status: false, description: 'Deploy the final product to the market.', stageCode: "STG005", gateCode: "GT005" },
    { name: 'Implementation', count: 10, route: 'implementation', status: false, description: 'Implement the final solution in the production environment.', stageCode: "STG006", gateCode: "GT006" },
  ];

  private subs = new Subscription();

  constructor(
    public dialog: MatDialog,
    private dragulaService: DragulaService,
    private router: Router,
    private _activeRoute: ActivatedRoute,
    private location: Location,
    private pageHeaderService: PageHeaderService
  ) {
    if (this.dragulaService.find('MONITORSTEPS')) {
      this.dragulaService.destroy('MONITORSTEPS');
    }

    this.dragulaService.createGroup('MONITORSTEPS', {
      revertOnSpill: true,
      moves: (el, container, handle) => {
        return !el?.classList.contains('no-drag');
      }
    });

    this.subs.add(
      this.dragulaService.dropModel('MONITORSTEPS').subscribe(({ targetModel }) => {
        this.stages = [...targetModel];
      })
    );
  }

  ngOnInit(): void {
    this.tableList = [...this.stages];

    this.checkChildRoute();

    this.subs.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this.checkChildRoute();
        })
    );
  }

  ngOnDestroy(): void {
    this.dragulaService.destroy('MONITORSTEPS');
    this.subs.unsubscribe();
  }

  private checkChildRoute(): void {
    const childRoutes = this.stages.map(s => s.route);
    const currentUrl = this.router.url;

    this.isChildRouteActive = childRoutes.some(route =>
      currentUrl.includes(`/gates/${route}`)
    );
  }

  navigateTo(route: string): void {
    this.router.navigate([route], { relativeTo: this._activeRoute });
  }

  goBack(): void {
    this.location.back();
  }

  public addmodule(item: any): void {
    let dialogRef = this.dialog.open(AddGateComponent, {
      width: '500px',
      height: 'auto',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        item.name = result.name;
        item.stageName = result.stageName;
        item.description = result.description;
      }
    });
  }

  deleteConfirmation(item: any): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: {
        title: 'Delete Confirmation',
        content: 'Are you sure you want to delete this record?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.stages.indexOf(item);
        if (index > -1) {
          this.stages.splice(index, 1);
        }
      }
    });
  }

  Confirmation(item: any): void {
    let dialogRef = this.dialog.open(StatusConfirmationDialogComponent, {
      width: 'auto',
      data: {
        title: 'Change Status',
        content: 'Are you sure you want to Change the Status ?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        item.status = !item.status;
      }
    });
  }

  getTests(): void { }

  clearFilter(): void { }

  addGate(): void {
    const dialogRef = this.dialog.open(AddGateComponent, {
      width: '500px',
      height: 'auto',
      disableClose: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Gate added:', result);
      }
    });
  }

}