import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from '../sidebar/sidebar.component'

import {BodyComponent} from '../body/body.component'
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent,BodyComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  template: `
    <app-sidebar/>
    <app-body/>
  <router-outlet/>
  `,
  styles: [],
})
export class DashboardComponent {

}
