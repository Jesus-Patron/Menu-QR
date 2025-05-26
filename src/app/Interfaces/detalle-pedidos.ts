export interface DetallePedidos {
    idDetalle: number,
    idPedido?: number,
    idProducto?: number
    nombreProducto?: string,
    cantidad?: number,
    subtotal?: number
}
