import {Component, OnInit} from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonApp,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonModal,
  IonText,
  IonList
} from '@ionic/angular/standalone';
import {IonicModule} from "@ionic/angular";
import {PreguntaService} from "../Servicios/PreguntaService";
import {PreguntaDTO} from "../Modelos/PreguntaDTO";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RespuestaDTO} from "../Modelos/RespuestaDTO";
import {JugadorService} from "../Servicios/JugadorService";
import {JugadorDTO} from "../Modelos/JugadorDTO";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonApp, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonButton, NgForOf, NgIf, IonItem, IonLabel, IonInput, FormsModule, IonModal, IonText, IonList],
})
export class HomePage implements  OnInit{

  preguntas: PreguntaDTO[] = [];
  preguntaActual?: PreguntaDTO;
  nombreUsuario: string = ''; // Inicializa la variable
  puntuacion: number = 0; // Puntuación inicial

  topJugadores: JugadorDTO[] = []; // Lista de los mejores jugadores

  tiempoRestante: number = 120  ;
  temporizadorActivo: boolean = false;
  intervalo?: any;
  juegoFinalizado: boolean = false; // Para bloquear el juego al terminar

  private inicioTiempo: number = 0; // Variable para medir el tiempo real jugado

  constructor( private preguntaService: PreguntaService, private jugadorService: JugadorService) {}


  ngOnInit() {

  }

  cargarPreguntas() {
    this.preguntaService.obtenerPreguntasAleatorias().subscribe(
      (data) => {
        this.preguntas = data;
        this.preguntaActual = this.preguntas.length > 0 ? this.preguntas[0] : undefined;
      },
      (error) => {
        console.error('Error al obtener preguntas:', error);
      }
    );
  }
  seleccionarRespuesta(respuesta: RespuestaDTO) {
    if (respuesta.esCorrecta) {
      this.puntuacion += 10;
    }

    // Verificar si es la última pregunta
    const indexActual = this.preguntas.indexOf(this.preguntaActual!);
    if (indexActual < this.preguntas.length - 1) {
      this.preguntaActual = this.preguntas[indexActual + 1];
    } else {
      this.detenerTemporizador();
    }
  }



  iniciarJuego() {
    if (!this.temporizadorActivo) {
      this.temporizadorActivo = true;
      this.tiempoRestante = 120; // Tiempo inicial (puedes cambiarlo según necesites)
      this.inicioTiempo = this.tiempoRestante; // Guarda el tiempo inicial al iniciar el juego

      this.cargarPreguntas();

      this.intervalo = setInterval(() => {
        if (this.tiempoRestante > 0) {
          this.tiempoRestante--;
        } else {
          this.detenerTemporizador();
        }
      }, 1000);
    }
  }


  detenerTemporizador() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.temporizadorActivo = false;
      this.juegoFinalizado = true;
    }

    // Calcula el tiempo jugado correctamente
    const tiempoJugado = this.inicioTiempo - this.tiempoRestante;

    // Crear objeto jugador con la puntuación y el tiempo jugado correcto
    const jugador: JugadorDTO = {
      nombre: this.nombreUsuario,
      puntuacion: this.puntuacion,
      tiempo: tiempoJugado // Guarda correctamente el tiempo jugado
    };

    // Enviar datos al backend
    this.jugadorService.guardarPuntuacion(jugador).subscribe(() => {
      this.obtenerTop10Jugadores();
    });
  }


  reiniciarJuego() {
    window.location.reload(); // Recarga toda la página
  }

  obtenerTop10Jugadores() {
    this.jugadorService.obtenerTop10Jugadores().subscribe((jugadores) => {
      this.topJugadores = jugadores;
    });
  }



}
