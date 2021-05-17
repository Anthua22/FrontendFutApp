export interface Auth {
  _id?: string,
  email?: string;
  password?: string;
}

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
export interface User extends Auth {
  telefono?: string;
  nombre_completo: string;
  foto: string;
  rol?: string,
  categoria?: string
}

export interface MiembroEquipo extends User {
  sancionado: boolean
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
  lugar_encuentro: string,
  acta?: string,
  fecha_modificacion?: Date
}
