import { Pedido } from "./pedido";
import { DetallePedidos } from "./detalle-pedidos";

export interface PedidoCompleto {
    pedido: Pedido;
    detalles: DetallePedidos[];
}
