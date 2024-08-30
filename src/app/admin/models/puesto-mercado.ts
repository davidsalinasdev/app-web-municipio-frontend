export interface PuestoMercado {
    id?: number;
    nro_puesto: string;
    sector_id?: number;
    titular_id?: number;
    usuario_id?: number;
    precio_mensual: string;
    fecha_ingreso: string;
    nro_contrato: string;
    observaciones: string;
    estado?: number;
}