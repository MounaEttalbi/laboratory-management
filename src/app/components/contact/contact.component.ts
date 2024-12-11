import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const contactData = {
      name: this.name,
      email: this.email,
      message: this.message
    };

    this.http.post('http://localhost:8080/api/contact', contactData).subscribe(
      (response: any) => {
        this.successMessage = 'Message envoyé avec succès!';
        this.errorMessage = '';
        this.resetForm();
        // Afficher l'alerte de succès
        alert(this.successMessage);
      },
      (error) => {
        this.errorMessage = 'Une erreur s\'est produite. Veuillez réessayer.';
        this.successMessage = '';
        console.error(error);
        // Afficher l'alerte d'erreur
        alert(this.errorMessage);
      }
    );
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
