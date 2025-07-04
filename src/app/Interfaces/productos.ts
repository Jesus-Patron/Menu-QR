export interface Productos {
    idProducto: number,
    categoria?: string,
    imagen?: string,
    nombre?: string,
    descripcion?: string,
    precio?: number,
    disponibilidad?: number,
    cantidad?: number;
    seleccionado?: boolean;
}
