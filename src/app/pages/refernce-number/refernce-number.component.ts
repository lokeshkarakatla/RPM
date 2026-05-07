import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-refernce-number',
  templateUrl: './refernce-number.component.html',
  styleUrls: ['./refernce-number.component.scss']
})
export class RefernceNumberComponent implements OnInit {

  isBaseInfoActive: boolean = false;
  activeTab: string = '';

  constructor(private router: Router) {
    // ✅ Set immediately — before any lifecycle hook
    this.activeTab = this.router.url;
    this.isBaseInfoActive = this.router.url.includes('base-info');
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeTab = event.urlAfterRedirects;
        this.isBaseInfoActive = this.activeTab.includes('base-info');
      });
  }

  goBack() {
    this.router.navigate(['/app/complaints']);
  }
}
