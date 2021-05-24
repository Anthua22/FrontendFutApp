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
  ROJA,
  AMARILLA
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
  categoria?: string
}

export interface MiembroEquipo extends User {
  sancionado: boolean,
  titular?: boolean,
  dorsal?: number,
  suplente?:boolean,
  capitan?: boolean,
  portero?:boolean,
  goles?: Gol[],
  sancion_partido?:Sancion[]
}

export interface Gol {
  minuto: string
}

export interface Sancion {
  tarjeta: Tarjeta,
  minuto: string
}

export interface Equipo {
  _id?: string,
  nombre: string,
  escudo: string,
  miembros?: MiembroEquipo[],
  email: string,
  categoria: Categoria,
  direccion_campo: string
}
export interface Partido {
  _id?: string,
  equipo_local: Equipo,
  equipo_visitante: Equipo,
  arbitro_principal: User,
  arbitro_secundario?: User,
  cronometrador?: User,
  fecha_encuentro: Date,
  categoria: string,
  lt?: number,
  ln?: number,
  jornada: number,
  resultado?: string,
  lugar_encuentro: string,
  acta?: string,
  fecha_modificacion?: Date
}
