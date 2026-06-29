import { clientMenuItems } from './../menu';
import { Component, OnInit, Input, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { MenuService } from '../menu.service';

import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // Note: Providing MenuService here creates a new instance for this component. 
  // If it's already provided in root/module, you can remove this providers array.
  providers: [MenuService] 
})
export class HorizontalMenuComponent implements OnInit {

  @Input('menuParentId') menuParentId: any;
  public menuItems: Array<any> = [];
  public settings: Settings;
  public currentUrl: string = '';

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  constructor(
    public appSettings: AppSettings,
    public menuService: MenuService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.menuItems = this.menuService.getHorizontalMenuItems();
    this.menuItems = this.menuItems.filter(item => item.parentId == this.menuParentId);

    const isClient = localStorage.getItem('isClient');
    if (isClient && JSON.parse(isClient) == true) {
      this.menuItems = this.menuService.getClientMenuItems();
    }

    // This block perfectly handles the route change detection!
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
        this.cdr.detectChanges(); 
      }
    });

    setTimeout(() => this.cdr.detectChanges(), 100);
  }

  // ✅ CHANGED: Delete the old logic and call the service directly!
  isMenuItemActive(menu: any): boolean {
    return this.menuService.isMenuItemActive(menu);
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.settings.fixedHeader) {
          const mainContent = document.getElementById('main-content');
          if (mainContent) {
            mainContent.scrollTop = 0;
          }
        }
        else {
          const drawer = document.getElementsByClassName('mat-drawer-content')[0] as HTMLElement;
          if (drawer) {
            drawer.scrollTop = 0;
          }
        }
      }
    });
  }
}