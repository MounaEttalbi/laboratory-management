import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  selectedSection: string = '';  // Section initiale vide

  selectSection(section: string): void {
    this.selectedSection = section;
    console.log('Section sélectionnée:', this.selectedSection);
  }
}
