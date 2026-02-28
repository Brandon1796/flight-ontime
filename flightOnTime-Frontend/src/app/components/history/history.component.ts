import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FlightApiService, FlightHistory } from '../../services/flight-api.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  history: FlightHistory[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private flightApiService: FlightApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.isLoading = true;
    this.error = null;

    this.flightApiService.getHistory().subscribe({
      next: (data) => {
        console.log('Historial recibido:', data);
        this.history = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar historial:', error);
        this.error = 'Error al cargar el historial de predicciones';
        this.isLoading = false;
      }
    });
  }


  // Método para obtener el nombre de la aerolínea
  getAirlineName(code: string): string {
    const airlineNames: { [key: string]: string } = {
      'IB': 'Iberia',
      'G3': 'Gol Transportes Aéreos',
      'AA': 'American Airlines',
      'LA': 'LATAM Airlines',
      'AR': 'Aerolíneas Argentinas'
    };
    return airlineNames[code] || code;
  }

  // Método para obtener el nombre de la ciudad
  getCityName(code: string): string {
    const cityNames: { [key: string]: string } = {
      'MAD': 'Madrid',
      'GRU': 'São Paulo - Guarulhos',
      'AEP': 'Buenos Aires - Aeroparque Jorge Newbery',
      'MIA': 'Miami',
      'EZE': 'Buenos Aires - Ezeiza'
    };
    return cityNames[code] || code;
  }

  // Método para formatear la fecha
  formatDate(dateString: string): string {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch (error) {
      return dateString;
    }
  }

  // Método para formatear la probabilidad
  formatProbability(probabilidad: number): string {
    return `${Math.round(probabilidad * 100)}%`;
  }

  // Método para obtener clase de badge según la previsión
  getPrevisionBadgeClass(prevision: string): string {
    return prevision === 'A TIEMPO' 
      ? 'bg-emerald-400/10 border-emerald-400/30 text-emerald-400' 
      : 'bg-red-500/10 border-red-500/30 text-red-500';
  }

  // Método para obtener icono según la previsión
  getPrevisionIcon(prevision: string): string {
    return prevision === 'A TIEMPO' ? 'verified_user' : 'warning';
  }

  // Volver al home
  goBack(): void {
    this.router.navigate(['/']);
  }
}
