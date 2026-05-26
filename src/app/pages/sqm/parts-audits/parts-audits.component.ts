import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewAuditComponent } from './new-audit/new-audit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-parts-audits',
  templateUrl: './parts-audits.component.html',
  styleUrls: ['./parts-audits.component.scss']
})
export class PartsAuditsComponent implements OnInit {
  // Properties required by your HTML template
  isSidenavOpen: boolean = true;
  hideSidebar: boolean = false;

  constructor(private router: Router,private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  // Method to toggle the sidenav state
  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  // Method triggered by the "New Audit" button
  openaudit(): void {
    // If you want it to route to the new-audit component:
    this.dialog.open(NewAuditComponent, {
        width: '600px',
      height: '600px'
      // You can pass data to the
     
    });
}

 

}