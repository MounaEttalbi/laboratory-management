import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-background',
  
  //imports: [],
  templateUrl: './background.component.html',
  styleUrl: './background.component.css'
})
export class BackgroundComponent {
  
  constructor(private router: Router) {}
  onLoginClick(): void {
    this.router.navigate(['/login']);
  }

}
