export interface IResponsePenaltyAll {
  type?: string;
  notification?: string;
  licensePlate?: string;
  secretary?: string;
  infraction?: string;
  status?: string;
  value?: string;
  payableValue?: string;
}

export interface IResponsePenalty {
  tickets: string; // Comparendos
  fines: string; // Multas
  paymentAgreements: string; // Acuerdos de pago
  totalAmount: string; // Total
  value: boolean;
  message?: string;
}
