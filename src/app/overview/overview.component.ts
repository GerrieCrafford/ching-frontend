import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { BudgetOverviewItem } from 'src/types';
import { ChingBackendService } from '../ching-backend.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  nodes: TreeNode[] = [];

  constructor(private backend: ChingBackendService) {}

  ngOnInit(): void {
    this.getOverview();
  }

  getOverview(): void {
    const findNode = (startNodes: TreeNode[], id: number): TreeNode | null => {
      const localNode = startNodes.find((x) => x.data.id == id);
      if (localNode) return localNode;

      if (!startNodes.some((x) => !!x.children)) return null;

      const children = startNodes.flatMap((n) => n.children ?? []);
      return findNode(children, id);
    };

    this.backend.getOverview(2023, 2).subscribe((items) => {
      this.nodes = [];

      for (const item of items) {
        const treeItem = {
          data: {
            category: item.categoryName,
            spent: item.spent,
            available: item.available,
            id: item.categoryId,
          },
        };

        if (!item.parentCategoryId) {
          this.nodes.push(treeItem);
          continue;
        }

        const parent = findNode(this.nodes, item.parentCategoryId);
        if (!parent) continue;

        if (!parent.children) parent.children = [];

        parent.children.push(treeItem);
      }
    });
  }
}
