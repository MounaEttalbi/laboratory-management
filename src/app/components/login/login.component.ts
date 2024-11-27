import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  email: string = '';

  constructor() {}

  onSignUpClick() {
    const container = document.querySelector('.container') as HTMLElement;
    container.classList.add('sign-up-mode');
  }

  onSignInClick() {
    const container = document.querySelector('.container') as HTMLElement;
    container.classList.remove('sign-up-mode');
  }

  onLoginSubmit() {
    console.log('Login submitted');
    // Ajoute la logique de connexion ici
  }

  onSignupSubmit() {
    console.log('Signup submitted');
    // Ajoute la logique d'inscription ici
  }
}
