export interface Pedido {
    idPedido: number,
    idCliente?: number,
    nombreCliente?: string,
    idMesa?: number,
    fecha?: Date,
    estado?: string,
    total?: number
}
