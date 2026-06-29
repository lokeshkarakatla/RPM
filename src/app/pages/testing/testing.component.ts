import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {
  isNavOpen = true;
  showSetupTabs = false;

  // ✅ CHANGED: Removed tasks, issues, and todo from this array
  setupRoutes = ['/stages', '/gates', '/testing-masterData'];

  constructor(private router: Router) {
    this.checkRoute(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkRoute(event.urlAfterRedirects);
    });
  }

  ngOnInit() { }

  checkRoute(url: string) {
    this.showSetupTabs = this.setupRoutes.some(route => url.includes(route));
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }
}