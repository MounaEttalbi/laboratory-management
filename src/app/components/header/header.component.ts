import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  
  //imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, AfterViewInit {

  lastScrollY: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Vérification si l'environnement est côté client avant d'utiliser window
    if (typeof window !== 'undefined') {
      this.lastScrollY = window.scrollY;
    }
  }

  ngAfterViewInit(): void {
    // Cette méthode sera exécutée après que la vue soit complètement chargée
    if (typeof window !== 'undefined') {
      this.lastScrollY = window.scrollY;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    // Vérification que window est défini avant d'utiliser window.scrollY
    if (typeof window !== 'undefined') {
      const navbar = document.querySelector('.navbar1') as HTMLElement;
      
      if (window.scrollY > this.lastScrollY) {
        navbar.classList.add('hidden');  // Cache la navbar quand on scroll vers le bas
      } else {
        navbar.classList.remove('hidden');  // Affiche la navbar quand on scroll vers le haut
      }
      this.lastScrollY = window.scrollY;  // Met à jour la position du dernier scroll
    }
  }

  // Méthode pour rediriger vers la page de connexion
  onLoginClick(): void {
    this.router.navigate(['/login']);
  }
}
