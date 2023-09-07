export default interface Classroom {
  building: number;
  name: string;
  maximumCapacity: number;
  status: string;
  hasProjector: boolean;
  observations: string;
}

export enum ClassroomStatus {
  Utilizavel = "Utilizavel",
  EmReforma = "Em reforma",
  ForaDeUso = "Fora de uso"
}