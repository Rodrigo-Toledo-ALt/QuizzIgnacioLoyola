import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JugadorDTO } from '../Modelos/JugadorDTO';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class JugadorService {
  private apiUrl = `${environment.apiUrl}/jugadores`; // Asegúrate de que coincide con tu backend

  constructor(private http: HttpClient) {}

  // Guardar la puntuación del jugador en la BD
  guardarPuntuacion(jugador: JugadorDTO): Observable<JugadorDTO> {
    return this.http.post<JugadorDTO>(`${this.apiUrl}/guardar`, jugador);
  }

  // Obtener el top 10 de jugadores con mejor puntuación
  obtenerTop10Jugadores(): Observable<JugadorDTO[]> {
    return this.http.get<JugadorDTO[]>(`${this.apiUrl}/top10`);
  }
}
