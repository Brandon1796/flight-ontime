import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightApiService, FlightPredictionRequest } from '../../services/flight-api.service';
import { PredictionResultComponent } from '../prediction-result/prediction-result.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, PredictionResultComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  predictionForm: FlightPredictionRequest;
  departureTime: string = '14:30'; // Hora por defecto

  // Códigos IATA de las aerolíneas
  airlineCodes = ['IB', 'G3', 'AA', 'LA', 'AR'];

  // Mapeo de códigos IATA a nombres completos de aerolíneas
  airlineNames: { [key: string]: string } = {
    'IB': 'Iberia',
    'G3': 'Gol Transportes Aéreos',
    'AA': 'American Airlines',
    'LA': 'LATAM Airlines',
    'AR': 'Aerolíneas Argentinas'
  };

  // Códigos IATA de las ciudades
  cityCodes = ['MAD', 'GRU', 'AEP', 'MIA', 'EZE'];

  // Mapeo de códigos IATA a nombres completos de ciudades
  cityNames: { [key: string]: string } = {
    'MAD': 'Madrid',
    'GRU': 'São Paulo - Guarulhos',
    'AEP': 'Buenos Aires - Aeroparque Jorge Newbery',
    'MIA': 'Miami',
    'EZE': 'Buenos Aires - Ezeiza'
  };

  // Mapa de distancias entre aeropuertos en kilómetros
  // Formato: 'ORIGEN-DESTINO': distancia en km
  distances: { [key: string]: number } = {
    'MAD-GRU': 7912.5,
    'MAD-AEP': 10125.3,
    'MAD-MIA': 6890.7,
    'MAD-EZE': 10158.9,
    'GRU-MAD': 7912.5,
    'GRU-AEP': 1698.4,
    'GRU-MIA': 6365.2,
    'GRU-EZE': 1689.7,
    'AEP-MAD': 10125.3,
    'AEP-GRU': 1698.4,
    'AEP-MIA': 7234.8,
    'AEP-EZE': 7.2,
    'MIA-MAD': 6890.7,
    'MIA-GRU': 6365.2,
    'MIA-AEP': 7234.8,
    'MIA-EZE': 7228.5,
    'EZE-MAD': 10158.9,
    'EZE-GRU': 1689.7,
    'EZE-AEP': 7.2,
    'EZE-MIA': 7228.5
  };

  isPredicting = false;
  showResult = false;
  predictionResult: any = null;

  constructor(
    private flightApiService: FlightApiService,
    private router: Router
  ) {
    const today = new Date(); // Fecha actual
    this.predictionForm = {
      aerolinea: 'IB', // Código IATA por defecto
      origen: 'MAD', // Código IATA por defecto
      destino: 'GRU', // Código IATA por defecto
      fechaPartida: this.formatDateForInput(today), // Fecha actual por defecto
      distanciaKm: 0 // Se calculará en onSubmit
    };
  }

  // Método para obtener la fecha mínima permitida (fecha actual) - para compatibilidad
  getMinDate(): string {
    return this.getCurrentDate();
  }

  // Método para obtener el nombre completo de una aerolínea
  getAirlineName(code: string): string {
    return this.airlineNames[code] || code;
  }

  // Método para obtener el nombre completo de una ciudad
  getCityName(code: string): string {
    return this.cityNames[code] || code;
  }

  // Método para obtener las ciudades disponibles para origen (excluye el destino seleccionado)
  getAvailableOrigins(): string[] {
    return this.cityCodes.filter(code => code !== this.predictionForm.destino);
  }

  // Método para obtener las ciudades disponibles para destino (excluye el origen seleccionado)
  getAvailableDestinations(): string[] {
    return this.cityCodes.filter(code => code !== this.predictionForm.origen);
  }

  // Método que se ejecuta cuando cambia el origen
  onOriginChange(): void {
    // Si el destino es igual al origen, resetear el destino
    if (this.predictionForm.origen === this.predictionForm.destino) {
      const available = this.getAvailableDestinations();
      this.predictionForm.destino = available.length > 0 ? available[0] : '';
    }
  }

  // Método que se ejecuta cuando cambia el destino
  onDestinationChange(): void {
    // Si el origen es igual al destino, resetear el origen
    if (this.predictionForm.destino === this.predictionForm.origen) {
      const available = this.getAvailableOrigins();
      this.predictionForm.origen = available.length > 0 ? available[0] : '';
    }
  }

  // Obtener la distancia entre origen y destino
  getDistance(origin: string, destination: string): number {
    const key = `${origin}-${destination}`;
    return this.distances[key] || 0;
  }

  // Formatear fecha para el input HTML (YYYY-MM-DD)
  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Formatear fecha para el backend (yyyy-MM-dd HH:mm:ss)
  private formatDateForBackend(date: string, time: string): string {
    return `${date} ${time}:00`;
  }

  // Obtener fecha actual formateada para el input
  getCurrentDate(): string {
    return this.formatDateForInput(new Date());
  }

  // Obtener hora mínima permitida (si la fecha es hoy, debe ser mayor a la hora actual)
  getMinTime(): string {
    if (!this.predictionForm.fechaPartida) {
      return '';
    }

    const today = new Date();
    const selectedDate = new Date(this.predictionForm.fechaPartida + 'T00:00:00');
    
    // Si la fecha es futura, no hay restricción de hora
    const isToday = selectedDate.toDateString() === today.toDateString();
    if (!isToday) {
      return '';
    }
    
    // Si la fecha seleccionada es hoy, la hora debe ser mayor a la hora actual
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes() + 1).padStart(2, '0'); // +1 minuto para permitir la siguiente hora
    return `${hours}:${minutes}`;
  }

  // Método que se ejecuta cuando cambia la fecha
  onDateChange(): void {
    // Si la fecha cambió a hoy y la hora seleccionada es anterior a la hora actual, actualizar la hora
    const minTime = this.getMinTime();
    if (minTime && this.departureTime && this.departureTime < minTime) {
      // Establecer la hora mínima permitida
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes() + 1).padStart(2, '0');
      this.departureTime = `${hours}:${minutes}`;
    }
  }

  // Método que se ejecuta cuando cambia la hora
  onTimeChange(): void {
    // Validar que la hora no sea anterior a la hora mínima permitida
    const minTime = this.getMinTime();
    if (minTime && this.departureTime && this.departureTime < minTime) {
      // Si la hora es anterior a la mínima, ajustarla
      this.departureTime = minTime;
    }
  }

  onSubmit(): void {
    if (this.isPredicting) return;

    // Validar que todos los campos estén completos
    if (!this.predictionForm.fechaPartida || !this.departureTime) {
      alert('Por favor, completa la fecha y hora de salida');
      return;
    }

    // Validar que si la fecha es hoy, la hora sea mayor a la hora actual
    const minTime = this.getMinTime();
    if (minTime && this.departureTime < minTime) {
      alert('La hora de salida debe ser mayor a la hora actual para fechas de hoy');
      // Ajustar automáticamente la hora
      this.departureTime = minTime;
      return;
    }

    // Calcular distancia entre origen y destino
    const distance = this.getDistance(this.predictionForm.origen, this.predictionForm.destino);
    
    if (distance === 0) {
      console.error('No se encontró distancia para la ruta seleccionada');
      alert('Error: No se pudo calcular la distancia para esta ruta');
      return;
    }

    // Validar que la distancia no exceda 7 dígitos enteros
    const distanceRounded = parseFloat(distance.toFixed(2));
    if (distanceRounded >= 10000000) {
      alert('Error: La distancia excede el límite permitido');
      return;
    }

    // Formatear fecha y hora para el backend (yyyy-MM-dd HH:mm:ss)
    const fechaFormateada = this.formatDateForBackend(this.predictionForm.fechaPartida, this.departureTime);
    
    // Preparar datos para enviar al backend
    const requestData: FlightPredictionRequest = {
      aerolinea: this.predictionForm.aerolinea.toUpperCase(), // Asegurar mayúsculas
      origen: this.predictionForm.origen.toUpperCase(),
      destino: this.predictionForm.destino.toUpperCase(),
      fechaPartida: fechaFormateada, // Formato: yyyy-MM-dd HH:mm:ss
      distanciaKm: distanceRounded // Redondear a 2 decimales
    };

    console.log('Datos preparados para el backend:', requestData);

    this.isPredicting = true;

    // Guardar los datos del formulario para pasarlos al componente de resultado
    const currentFormData = { ...this.predictionForm };

    // Llamar al backend
    this.flightApiService.predictFlight(requestData).subscribe({
      next: (response) => {
        console.log('✅ Predicción recibida exitosamente:', response);
        this.predictionResult = response;
        // Actualizar el formulario con los datos usados para la predicción
        this.predictionForm = { ...currentFormData, fechaPartida: requestData.fechaPartida };
        this.showResult = true;
        this.isPredicting = false;
      },
      error: (error) => {
        console.error('❌ Error al predecir vuelo:', error);
        console.error('Detalles del error:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          error: error.error
        });
        
        let errorMessage = 'Error al realizar la predicción.';
        
        // Manejar diferentes tipos de errores
        if (error.status === 0 || error.message?.includes('Failed to fetch') || error.message?.includes('CORS')) {
          errorMessage = 'Error de CORS: El backend no está permitiendo peticiones desde el frontend.\n\n' +
                        'Por favor, verifica que:\n' +
                        '1. El backend esté corriendo en http://localhost:8080\n' +
                        '2. El backend tenga configurado CORS para permitir peticiones desde http://localhost:4200\n' +
                        '3. Revisa la consola del navegador para más detalles';
        } else if (error.status === 404) {
          errorMessage = 'Endpoint no encontrado. Verifica que el backend esté corriendo en http://localhost:8080/predict';
        } else if (error.status === 500) {
          errorMessage = 'Error interno del servidor. Revisa los logs del backend.';
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }
        
        alert(errorMessage);
        this.isPredicting = false;
      },
      complete: () => {
        this.isPredicting = false;
      }
    });
  }

  onNewPrediction(): void {
    this.showResult = false;
    this.predictionResult = null;
  }
}