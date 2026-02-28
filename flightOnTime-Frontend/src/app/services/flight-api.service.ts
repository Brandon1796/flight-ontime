import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface FlightPredictionRequest {
  aerolinea: string;
  origen: string;
  destino: string;
  fechaPartida: string;
  distanciaKm: number;
}

export interface FlightPredictionResponse {
  prevision: string; // "A TIEMPO", "RETRASADO", etc.
  probabilidad: number; // 0.85 (85%)
}

export interface FlightHistory {
  id: number;
  aerolinea: string;
  origen: string;
  destino: string;
  fechaPartida: string; // ISO format: "2024-01-15T14:30:00"
  distanciaKm: number;
  prevision: string; // "A TIEMPO", "RETRASADO"
  probabilidad: number; // 0.85 (85%)
  createdAt: string; // ISO format
  updatedAt: string; // ISO format
}

export interface GlobalStats {
  accuracy: number;
  inferenceTime: number;
  totalPredictions: number;
  totalScannedPoints: number;
}

@Injectable({
  providedIn: 'root'
})
export class FlightApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  predictFlight(data: FlightPredictionRequest): Observable<FlightPredictionResponse> {
    // Transformar el objeto al formato que espera el backend (snake_case)
    // El backend espera: fecha_Partida (con guión bajo y P mayúscula) y distancia_km
    const backendData = {
      aerolinea: data.aerolinea,
      origen: data.origen,
      destino: data.destino,
      fecha_Partida: data.fechaPartida, // Formato esperado: "yyyy-MM-dd HH:mm:ss"
      distancia_km: data.distanciaKm
    };
    
    console.log('=== SOLICITUD AL BACKEND ===');
    console.log('URL:', `${this.apiUrl}/predict`);
    console.log('Método: POST');
    console.log('Body:', JSON.stringify(backendData, null, 2));
    console.log('===========================');
    
    return this.http.post<FlightPredictionResponse>(`${this.apiUrl}/predict`, backendData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  getHistory(): Observable<FlightHistory[]> {
    console.log('Obteniendo historial desde:', `${this.apiUrl}/predict/history`);
    return this.http.get<FlightHistory[]>(`${this.apiUrl}/predict/history`, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  getGlobalStats(): Observable<GlobalStats> {
    return this.http.get<GlobalStats>(`${this.apiUrl}/stats`);
  }
}