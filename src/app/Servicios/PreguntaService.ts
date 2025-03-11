import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PreguntaDTO } from '../Modelos/PreguntaDTO';
import { RespuestaDTO } from '../Modelos/RespuestaDTO';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private apiUrl = 'api/pregunta/aleatorias'; // Asegúrate de que coincida con tu backend

  constructor(private http: HttpClient) {}

  obtenerPreguntasAleatorias(): Observable<PreguntaDTO[]> {
    return this.http.get<PreguntaDTO[]>(this.apiUrl);
  }
}
