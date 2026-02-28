import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FlightPredictionResponse, FlightPredictionRequest } from '../../services/flight-api.service';

@Component({
  selector: 'app-prediction-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prediction-result.component.html',
  styleUrl: './prediction-result.component.css'
})
export class PredictionResultComponent {
  @Input() predictionResult!: FlightPredictionResponse;
  @Input() flightData!: FlightPredictionRequest;
  @Output() newPrediction = new EventEmitter<void>();

  // Datos mockeados para los factores clave (para vista "A TIEMPO")
  keyFactors = {
    weather: { label: 'Condiciones Meteorológicas', value: 'ÓPTIMAS', percentage: 92 },
    traffic: { label: 'Densidad de Tráfico Aéreo', value: 'BAJA', percentage: 75 },
    reliability: { label: 'Confiabilidad de Aeronave', value: 'ESTABLE', percentage: 88 }
  };

  constructor(private router: Router) {}

  // Método para verificar si el vuelo está retrasado
  isDelayed(): boolean {
    return this.predictionResult?.prevision?.toUpperCase() === 'RETRASADO';
  }

  // Método para obtener el porcentaje como número entero para el gauge
  getProbabilityPercentage(): number {
    return Math.round((this.predictionResult?.probabilidad || 0.85) * 100);
  }

  // Método para obtener el porcentaje de offset del gauge SVG (para retrasado)
  getGaugeOffset(): number {
    const percentage = this.getProbabilityPercentage();
    const circumference = 283; // 2 * PI * 45 (radio del círculo)
    return circumference - (percentage / 100) * circumference;
  }

  // Método para obtener el texto de la previsión
  getPrevisionText(): string {
    return this.predictionResult?.prevision || 'A TIEMPO';
  }

  // Método para obtener el ángulo del gauge circular
  getGaugeRotation(): string {
    const percentage = this.getProbabilityPercentage();
    const degrees = (percentage / 100) * 360;
    return `${degrees}deg`;
  }

  // Método para obtener el nombre de la ciudad
  getCityName(code: string | undefined): string {
    if (!code) return '';
    const cityNames: { [key: string]: string } = {
      'MAD': 'Madrid',
      'GRU': 'São Paulo - Guarulhos',
      'AEP': 'Buenos Aires - Aeroparque Jorge Newbery',
      'MIA': 'Miami',
      'EZE': 'Buenos Aires - Ezeiza'
    };
    return cityNames[code] || code;
  }

  // Método para obtener el nombre de la aerolínea
  getAirlineName(code: string | undefined): string {
    if (!code) return '';
    const airlineNames: { [key: string]: string } = {
      'IB': 'Iberia',
      'G3': 'Gol Transportes Aéreos',
      'AA': 'American Airlines',
      'LA': 'LATAM Airlines',
      'AR': 'Aerolíneas Argentinas'
    };
    return airlineNames[code] || code;
  }

  // Método para formatear la fecha
  formatDate(dateString: string | undefined): string {
    if (!dateString) return '';
    try {
      // La fecha viene en formato 'yyyy-MM-dd HH:mm:ss' del backend
      const datePart = dateString.split(' ')[0]; // Obtener solo la parte de la fecha
      const [year, month, day] = datePart.split('-');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${months[parseInt(month) - 1]} ${parseInt(day)}`;
    } catch (error) {
      return dateString || '';
    }
  }

  // Volver a hacer una nueva predicción
  onNewPrediction(): void {
    this.newPrediction.emit();
  }
}