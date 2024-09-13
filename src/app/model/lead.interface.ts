export interface Lead {
  id:               number;
  fechaCreacion:    Date;
  nomCliente:       string;
  nit:              string;
  nomPunto:         string;
  nomEquipo:        string;
  ciudad:           string;
  rtc:              string;
  promotor:         string;
  usuario:          string;
  tratamientoDatos: boolean;
}
