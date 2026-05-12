import { clientMenuItems } from './../menu';
import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { MenuService } from '../menu.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { users } from 'src/app/pages/helpers/data';
import { UserPermissionService } from 'src/app/pages/helpers/user-permission.service';

@Component({
  selector: 'app-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MenuService]
})
export class HorizontalMenuComponent implements OnInit {
  @Input('menuParentId') menuParentId: any;
  public menuItems: Array<any> = [];
  public settings: Settings;
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  constructor(public appSettings: AppSettings, public menuService: MenuService, public router: Router) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.menuItems = this.menuService.getHorizontalMenuItems();
    this.menuItems = this.menuItems.filter(item => item.parentId == this.menuParentId);

    // this.menuItems = this.menuService.getHorizontalMenuItems();
    // this.menuItems = this.menuService.getHorizontalMenuItems();
    // let userModulePermissions = UserPermissionService.fnGetUserModuleMenu()
    // this.menuItems = this.menuItems.filter(x => userModulePermissions.indexOf(x.id) != -1 || (x.parentId != 0))
    // this.menuItems = this.menuItems.filter(item => item.parentId == this.menuParentId);
    // let userScreenPermissions = UserPermissionService.fnGetUserSubMenu() //users.find(x => x.userId == userId).permissions.filter(x => x.canRead).map(x => x.menuId)
    // if (this.menuItems.length == this.menuItems.filter(x => x.parentId != 0).length) {
    //   this.menuItems = this.menuItems.filter(x => userScreenPermissions.indexOf(x.id) != -1)
    // }

    const isClient = localStorage.getItem('isClient');
    if (isClient && JSON.parse(isClient) == true) {
      this.menuItems = this.menuService.getClientMenuItems();
    }
  }

  /** Returns true when the given menu item should be highlighted as active.
   *  Extends the normal prefix match to treat /app/prtsnavbar/* as belonging
   *  to the /app/prts-part (7D) menu item so the active state is preserved
   *  when the 7D detail view is opened in a new tab.
   */
  isMenuItemActive(menu: any): boolean {
    const url = this.router.url;
    if (url.startsWith(menu.routerLink)) return true;
    // Both /app/prtsnavbar/* and /app/prtsonepager/* belong to the 7D (/app/prts-part) module
    if (menu.routerLink === '/app/prts-part' && url.startsWith('/app/prtsnavbar')) return true;
    if (menu.routerLink === '/app/prts-part' && url.startsWith('/app/prtsonepager')) return true;
    return false;
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.settings.fixedHeader) {
          let mainContent = document.getElementById('main-content');
          if (mainContent) {
            mainContent.scrollTop = 0;
          }
        }
        else {
          document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
        }
      }
    });
  }

}