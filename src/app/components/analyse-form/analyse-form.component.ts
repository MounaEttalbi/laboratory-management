import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnalyseService } from '../../services/analyse.service';
import { AnalyseDto } from '../../models/AnalyseDto';

@Component({
  selector: 'app-analyse-form',
  templateUrl: './analyse-form.component.html',
  styleUrls: ['./analyse-form.component.css']
})
export class AnalyseFormComponent {
  analyseForm: FormGroup;

  constructor(private fb: FormBuilder, private analyseService: AnalyseService) {
    // Initialize the form with validation
    this.analyseForm = this.fb.group({
      nom: ['', [Validators.required]],
      description: ['', [Validators.required]],
      laboratoire: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
  }

  // Method to handle form submission
  onSubmit() {
    if (this.analyseForm.valid) {
      const analyseDto: AnalyseDto = this.analyseForm.value;
      this.analyseService.addAnalyse(analyseDto).subscribe(
        () => {
          alert('Analyse successfully added');
          this.analyseForm.reset();  // Reset form after submission
        },
        error => {
          console.error('There was an error!', error);
          alert('There was an error while adding the analyse');
        }
      );
    }
  }

  // Getters to easily access form controls in the template
  get nom() {
    return this.analyseForm.get('nom');
  }

  get description() {
    return this.analyseForm.get('description');
  }

  get laboratoire() {
    return this.analyseForm.get('laboratoire');
  }

  get type() {
    return this.analyseForm.get('type');
  }
}
