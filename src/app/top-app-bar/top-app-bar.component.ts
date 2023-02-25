import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-top-app-bar',
  templateUrl: './top-app-bar.component.html',
  styleUrls: ['./top-app-bar.component.scss'],
})
export class TopAppBarComponent {
  items: MenuItem[] = [
    {
      label: 'Overview',
      routerLink: ['/overview'],
    },
    {
      label: 'Budget Assignments',
      routerLink: ['/budget-assignment'],
    },
  ];

  constructor() {}
}
