import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, HeaderComponent],
  template: `
    
    <router-outlet/>
  `,
  styles: [],
})
export class AppComponent {
  title = 'frontend-projet-libre';
}
