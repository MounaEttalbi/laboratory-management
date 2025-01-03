import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { analyse } from '../../models/analyse';
import { EpreuveService } from '../../services/epreuve.service';

@Component({
  selector: 'app-analysis-details',
  templateUrl: './analysis-details.component.html',
  styleUrls: ['./analysis-details.component.css'],
})
export class AnalysisDetailsComponent implements OnInit{
  @Input() analysis!: analyse;
  @Output() close = new EventEmitter<void>();
  @Output() addEpreuve = new EventEmitter<void>();
  @Output() idAnalyse?: number;
  epreuves:any[] = [];
  constructor(private epreuveService: EpreuveService) {}
  ngOnInit(): void {
    this. fetchEpreuves();
  }
  fetchEpreuves(): void {
    if(this.analysis.id){
      this.epreuveService.getEpreuvesByAnalyse(this.analysis.id).subscribe(
        (data: any) => {
          console.log("epreuves ",data)
          this. epreuves = data;
        //  this.filteredAnalyses = data; // Initialisation de filteredAnalyses
         // console.log('Analyses rÃ©cupÃ©rÃ©es:', this.analyses);
        },
        (error) => {
          console.error('Erreur lors de la rÃ©cupÃ©ration des analyses:', error);
        }
      );
    }
   
  }
  // Method to close the modal
  closeModal(): void {
    this.close.emit();
  }
  deleteEpreuve(index: number): void {
    this.epreuves.splice(index, 1);
  }
  // Method to trigger adding a new epreuve
  addNewEpreuve(): void {
   console.log("nchof wch kyn id analyse",this.analysis.id);
    this.isModalOpen = true; // Ensure this is set to true when you want to open the modal
    this.addEpreuve.emit();  // This emits the event for the parent to handle
    //this.close.emit();       // This closes the current modal (if required)
  }
  
  isModalOpen = false;
  isModalEditOpen = false;
  selectedAnalysis!: analyse;
  // MÃ©thode pour ouvrir la modal
 
  filterAnalyses() {
   
  }

}