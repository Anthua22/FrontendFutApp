import { MiembroEquipo, Partido, Equipo } from './models';
export interface TokenResponse {
  token: string;
}

export interface ResponseGeneric {
  resultado: any;
}

export interface PartidosResponse {
  resultado: Partido[]
}

export interface PartidoResponse {
  resultado: Partido
}
export interface ErrorResponse {
  error: string;
}

export interface MiembrosEquipoRespose {
  resultado: MiembroEquipo[];
}

export interface EquiposResponse {
  resultado: Equipo[];
}
