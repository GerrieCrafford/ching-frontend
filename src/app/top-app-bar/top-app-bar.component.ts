import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-top-app-bar',
  templateUrl: './top-app-bar.component.html',
  styleUrls: ['./top-app-bar.component.scss'],
})
export class TopAppBarComponent {
  items!: MenuItem[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Overview',
        command: () => this.router.navigate(['/']),
      },
      {
        label: 'Budget Assignments',
        command: () => this.router.navigate(['/budget-assignment']),
      },
    ];
  }
}
