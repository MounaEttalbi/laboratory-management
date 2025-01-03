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
    console.log('Déconnexion en cours...');
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']).then(() => {
      console.log('Redirection réussie.');
    }).catch(err => {
      console.error('Erreur lors de la redirection :', err);
    });
  }
  
}
