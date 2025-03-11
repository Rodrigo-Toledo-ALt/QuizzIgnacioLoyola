import {RespuestaDTO} from "./RespuestaDTO";

export interface PreguntaDTO {
  titulo: string;
  imagenUrl: string;
  tipo: string;
  respuestas: RespuestaDTO[];
}
