import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';

import { MENU_ITEMS } from 'src/app/constants/menu.constants';
import { MenuItem } from 'src/interfaces/menu';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @ViewChild('drw')
  drw!: ElementRef;
  menuItems: { [key: string]: MenuItem } = MENU_ITEMS;
  isExpanded = false;

  ngOnInit() {
    const sidebarState = localStorage.getItem('sidebarExpanded');
    this.isExpanded = sidebarState === 'true';
  }

  getLangFromStorage(): string {
    return localStorage.getItem('userLang') || 'ca';
  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
    console.log('object');
    localStorage.setItem('sidebarExpanded', this.isExpanded.toString());

    if (!this.isExpanded) {
      Object.keys(this.menuItems).forEach((key) => {
        const item = this.menuItems[key];
        if (item.children) {
          item.isOpen = false;
        }
      });
    }
  }

  toggleSubMenu(item: any): void {
    item.value.isOpen = !item.value.isOpen;
  }
}
