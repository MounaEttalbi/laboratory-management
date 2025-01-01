import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  showConfirmation: boolean=false;

  constructor(private router: Router) { }

  confirmLogout(): void {
    this.showConfirmation = true;
  }

  cancelLogout(): void {
    this.showConfirmation = false;
  }

  logout(): void {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
