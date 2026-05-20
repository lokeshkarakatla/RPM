import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gates',
  templateUrl: './gates.component.html',
  styleUrls: ['./gates.component.scss']
})
export class GatesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  isNavOpen = true;

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }
}
