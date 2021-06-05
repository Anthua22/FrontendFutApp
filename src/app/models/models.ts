export enum Categoria {
  PRIMERA = "Primera",
  SEGUNDA = "Segunda",
  SEGUNDAB = "Segunda B",
  TERCERA = "Tercera",
  REGIONAL = "Regional",
  FB = "Futbol Base",
  SC = "Sin Categoria"
}

export enum Rol {
  ADMIN,
  USER
}

export enum Tarjeta {
  ROJA = "ROJA",
  AMARILLA = "AMARILLA",
  SGAMARILLA = "SEGUNDA AMARILLA"
}

export interface Auth {
  _id?: string,
  email?: string;
  password?: string;
}


export interface User extends Auth {
  telefono?: string;
  nombre_completo: string;
  foto: string;
  rol?: string,
  categoria?: Categoria,
  me?: boolean
}

export interface MiembroEquipo extends User {
  sancionado: boolean,
  titular?: boolean,
  dorsal?: string,
  suplente?: boolean,
  capitan?: boolean,
  portero?: boolean,
  goles?: Gol[],
  sancion_partido?: Sancion[],
  asiste?: boolean
}

export interface Gol {
  minuto: number
}

export interface Sancion {
  tarjeta: Tarjeta,
  minuto: number,
  motivo: string,
  jugador?: string
}

export interface FaltasTM {
  faltasPrimeraParte: number,
  faltasSegundaParte: number,
  tiempoPrimeraParte: boolean,
  tiempoSegundaParte: boolean
}

export interface Equipo {
  _id?: string,
  nombre: string,
  escudo: string,
  miembros?: MiembroEquipo[],
  email: string,
  categoria: Categoria,
  direccion_campo: string,
  lt?: number,
  ln?: number
}

interface PartidoBase {
  _id?: string,
  fecha_encuentro: Date,
  categoria: Categoria,
  lt?: number,
  ln?: number,
  jornada: number,
  lugar_encuentro: string,

}

export interface PartidoAdd extends PartidoBase {
  equipo_local: string,
  equipo_visitante: string,
  arbitro_principal: string,
  arbitro_secundario?: string,
  cronometrador?: string
}
export interface Partido extends PartidoBase {
  equipo_local: Equipo,
  equipo_visitante: Equipo,
  arbitro_principal: User,
  arbitro_secundario?: User,
  cronometrador?: User,
  resultado?: string,
  acta?: string,
  fecha_modificacion?: Date,
  titularesLocales?: MiembroEquipo[],
  titularesVisitantes?: MiembroEquipo[],
  suplentesLocales?: MiembroEquipo[],
  suplentesVisitantes?: MiembroEquipo[],
  capitanLocal?: MiembroEquipo,
  capitanVisitante?: MiembroEquipo,
  staffLocal?: MiembroEquipo[],
  staffVistante?: MiembroEquipo[],
  sanciones_jugadores?: Sancion[],
  sanciones_staff?: Sancion[],
  porterosLocales?: MiembroEquipo[],
  porterosVisitantes?: MiembroEquipo[],
  faltasTmLocal?: FaltasTM,
  faltasTmVisitante?: FaltasTM

}
