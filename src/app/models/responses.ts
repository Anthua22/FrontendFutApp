import { User } from 'src/app/models/models';
import { MiembroEquipo, Partido, Equipo } from './models';
export interface TokenResponse {
  token: string;
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

export interface MiembroEquipoRespose {
  resultado: MiembroEquipo;
}

export interface EquipoResponse{
  resultado: Equipo;
}
export interface EquiposResponse {
  resultado: Equipo[];
}

export interface UserResponse {
  resultado: User;
}
