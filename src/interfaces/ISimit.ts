export interface ISimit {
  multas: IMultas[];
  totalGeneral: number;
  totalMultas: number;
  totalAcuerdosPagar: number;
}

export interface IMultas {
  infractor: IInfractor;
  placa: string;
  valor: number;
  infracciones: IInfractiones[];
  valorPagar: number;
  departamento: string;
  organismoTransito: string;
}

export interface IInfractor {
  tipoDocumento: string;
  numeroDocumento: string;
  nombre: string;
  apellido: string;
}

export interface IInfractiones {
  codigoInfraccion: string;
  descripcionInfraccion: string;
  valorInfraccion: number;
}
