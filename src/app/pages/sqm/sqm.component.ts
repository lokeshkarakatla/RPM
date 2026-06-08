import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';

// Import your dialog components here (adjust relative paths as needed)
import { PauditsNewAuditComponent } from './process-audits/paudits-new-audit/paudits-new-audit.component';
import { NewAuditComponent as PartsNewAuditComponent } from './parts-audits/new-audit/new-audit.component';
import { PauditsHelpDeskComponent } from './process-audits/paudits-help-desk/paudits-help-desk.component';

@Component({
  selector: 'app-sqm',
  templateUrl: './sqm.component.html',
  styleUrls: ['./sqm.component.scss']
})
export class SqmComponent implements OnInit {
  hideSidebar = false;
  isSidenavOpen = true;
  activeTab = 'sqmd'; // Can be 'sqmd', 'process', or 'parts'


  constructor(
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Check initial route
    this.updateLayout(this.router.url);

    // Listen for route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateLayout(event.urlAfterRedirects);
      });
  }



  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  // Pass the module string from the template to open the correct dialog
  openaudit(module: string) {
    if (module === 'process') {
      this.dialog.open(PauditsNewAuditComponent, { width: '600px', height: 'auto' });
    } else if (module === 'parts') {
      this.dialog.open(PartsNewAuditComponent, { width: '600px', height: 'auto' });
    }
  }

  openUserManual(fileName: string): void {
    window.open(`assets/${fileName}`, '_blank');
  }

  openHelpDesk() {
    this.dialog.open(PauditsHelpDeskComponent, { width: '600px', height: '350px' });
  }

// Inside SqmComponent class

updateLayout(url: string) {
  this.hideSidebar = url.includes('reference') || url.includes('details');

  let newTab = 'sqmd';
  if (url.includes('/setup')) {
    newTab = 'setup';
  } else if (url.includes('/process')) {
    newTab = 'process';
  } else if (url.includes('/parts')) {
    newTab = 'parts';
  }

  // Auto-set isSidenavOpen when the TAB changes
  if (newTab !== this.activeTab) {
    if (newTab === 'sqmd' || newTab === 'setup') {
      // Hide sidenav for Dashboard AND Setup
      this.isSidenavOpen = false;
    } else {
      // Show sidenav for Process and Parts
      this.isSidenavOpen = !this.hideSidebar;
    }
  }

  // Always hide if sidebar is forcibly hidden by inner routes
  if (this.hideSidebar) {
    this.isSidenavOpen = false;
  }

  this.activeTab = newTab;
  this.cdr.detectChanges();
}


}