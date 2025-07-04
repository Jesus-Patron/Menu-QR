import { Component, OnInit } from '@angular/core';
import { Productos } from '../../Interfaces/productos';
import { ProductosService } from '../../Services/productos.service';
import { PedidosService } from '../../Services/pedidos.service';
import { PedidoCompleto } from '../../Interfaces/pedido-completo';
import { DetallePedidos } from '../../Interfaces/detalle-pedidos';
import { ClientesService } from '../../Services/clientes.service';
import { Cliente } from '../../Interfaces/cliente';
import { Mesa } from '../../Interfaces/mesa';
import { MesasService } from '../../Services/mesas.service';
import Swal from 'sweetalert2';

@Component({
  standalone: false,
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  comidas: { categoria: string; alimentos: (Productos & { cantidad?: number })[] }[] = [];
  categoriaSeleccionada: string = '';

  nombreCliente: string = '';
  clienteEncontrado?: Cliente;
  mostrarModalCliente: boolean = false;

  nuevoCliente: Cliente = {
    idClientes: 0,
    nombre: ''
  };

  mesasDisponibles: Mesa[] = [];
  idMesaSeleccionada?: number;

  mostrarResumen: boolean = false;
  resumenPedido: { nombre: string; cantidad: number; subtotal: number }[] = [];
  totalResumen: number = 0;

  constructor(
    private productosService: ProductosService,
    private pedidosService: PedidosService,
    private clientesService: ClientesService,
    private mesasService: MesasService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerMesasDisponibles();
  }

  obtenerMesasDisponibles() {
    this.mesasService.obtenerDisponibles().subscribe({
      next: (res) => {
        if (res.status && res.value) this.mesasDisponibles = res.value;
      },
      error: () => {
        console.error('Error al cargar mesas disponibles');
      }
    });
  }

  obtenerProductos(): void {
    this.productosService.listar().subscribe({
      next: (response) => {
        if (response.status && response.value) {
          this.comidas = this.agruparPorCategoria(response.value);
        }
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
      }
    });
  }

  agruparPorCategoria(productos: Productos[]): { categoria: string; alimentos: (Productos & { cantidad?: number, seleccionado?: boolean })[] }[] {
    const agrupado: { [key: string]: (Productos & { cantidad?: number, seleccionado?: boolean })[] } = {};
    for (const producto of productos) {
      const categoria = producto.categoria || 'Sin Categoría';
      if (!agrupado[categoria]) agrupado[categoria] = [];
      agrupado[categoria].push({ ...producto, cantidad: 0, seleccionado: false });
    }
    return Object.entries(agrupado).map(([categoria, alimentos]) => ({ categoria, alimentos }));
  }

  actualizarSeleccion(comida: any): void {
    if (comida.seleccionado && (!comida.cantidad || comida.cantidad === 0)) {
      comida.cantidad = 1; // Establece cantidad mínima al seleccionar
    }

    if (!comida.seleccionado) {
      comida.cantidad = 0; // Reinicia si se deselecciona
    }

    this.actualizarResumenPedido(); // Recalcula el resumen
  }

  toggleCategoria(categoriaNombre: string): void {
    this.categoriaSeleccionada =
      this.categoriaSeleccionada === categoriaNombre ? '' : categoriaNombre;
  }

  incrementarCantidad(comida: any): void {
    comida.cantidad = (comida.cantidad ?? 0) + 1;
    this.actualizarResumenPedido();
  }

  decrementarCantidad(comida: any): void {
    if (comida.cantidad && comida.cantidad > 0) {
      comida.cantidad--;

      if (comida.cantidad === 0) {
        this.resumenPedido = this.resumenPedido.filter(i => i.nombre !== comida.nombre);
      }

      this.actualizarResumenPedido();
    }
  }

  buscarCliente() {
    if (!this.nombreCliente.trim()) {
      Swal.fire('Aviso', 'Ingresa un nombre para buscar', 'info');
      return;
    }

    this.clientesService.obtenerPorNombre(this.nombreCliente).subscribe({
      next: (res) => {
        if (res.status && res.value) {
          this.clienteEncontrado = res.value;
        } else {
          this.clienteEncontrado = undefined;
          Swal.fire('No encontrado', 'Cliente no encontrado', 'warning');
        }
      },
      error: () => {
        this.clienteEncontrado = undefined;
        Swal.fire('Error', 'Error al buscar cliente', 'error');
      }
    });
  }

  abrirModalCliente() {
    this.nuevoCliente = { idClientes: 0, nombre: '' };
    this.mostrarModalCliente = true;
  }

  cerrarModalCliente() {
    this.mostrarModalCliente = false;
  }

  registrarCliente() {
    const { nombre, telefono, correo } = this.nuevoCliente;

    if (!nombre?.trim()) {
      Swal.fire('Aviso', 'El nombre del cliente es obligatorio', 'warning');
      return;
    }

    this.clientesService.registrar(this.nuevoCliente).subscribe({
      next: (res) => {
        if (res.status && res.value) {
          this.clienteEncontrado = res.value;
          this.nombreCliente = res.value.nombre ?? '';
          this.mostrarModalCliente = false;
          Swal.fire('Éxito', 'Cliente registrado correctamente', 'success');
        }
      },
      error: () => {
        Swal.fire('Error', 'Error al registrar cliente', 'error');
      }
    });
  }

  ordenar() {
    const productosSeleccionados = this.comidas
      .flatMap(c => c.alimentos)
      .filter(p => p.cantidad && p.cantidad > 0);

    if (productosSeleccionados.length === 0) {
      Swal.fire('Aviso', 'No has seleccionado productos', 'warning');
      return;
    }

    if (!this.idMesaSeleccionada) {
      Swal.fire('Aviso', 'Selecciona una mesa para el pedido', 'warning');
      return;
    }

    this.resumenPedido = productosSeleccionados.map(p => ({
      nombre: p.nombre ?? 'Producto desconocido',
      cantidad: p.cantidad ?? 0,
      subtotal: (p.precio ?? 0) * (p.cantidad ?? 0)
    }));

    this.totalResumen = this.resumenPedido.reduce((acc, item) => acc + item.subtotal, 0);
    this.mostrarResumen = true;
  }

  confirmarPedido() {
    const productosSeleccionados = this.comidas
      .flatMap(c => c.alimentos)
      .filter(p => p.cantidad && p.cantidad > 0);

    const detalles: DetallePedidos[] = productosSeleccionados.map(p => ({
      idDetalle: 0,
      idProducto: p.idProducto ?? 0,
      nombreProducto: p.nombre ?? 'Producto sin nombre',
      cantidad: p.cantidad ?? 0,
      subtotal: (p.precio ?? 0) * (p.cantidad ?? 0)
    }));

    const pedido: PedidoCompleto = {
      pedido: {
        idPedido: 0,
        nombreCliente: this.clienteEncontrado?.nombre || this.nombreCliente || 'Cliente Mostrador',
        idCliente: this.clienteEncontrado?.idClientes ?? 0,
        estado: 'Pendiente',
        total: this.totalResumen,
        idMesa: this.idMesaSeleccionada ?? 0,
        fecha: new Date()
      },
      detalles: detalles
    };

    this.pedidosService.registrar(pedido).subscribe({
      next: (res) => {
        if (res.status) {
          Swal.fire('Éxito', 'Pedido registrado correctamente', 'success');

          // Cambiar disponibilidad de la mesa
          const mesaOcupada = this.mesasDisponibles.find(m => m.idMesas === this.idMesaSeleccionada);
          if (mesaOcupada) {
            const nuevaMesa: Mesa = {
              idMesas: mesaOcupada.idMesas,
              numero: mesaOcupada.numero,
              disponibilidad: 'Ocupada'
            };
            this.mesasService.cambiarDisponibilidad(nuevaMesa).subscribe({
              next: () => this.obtenerMesasDisponibles(),
              error: () => Swal.fire('Error', 'No se pudo actualizar la disponibilidad de la mesa', 'error')
            });
          }

          // Reset UI
          this.obtenerProductos();
          this.nombreCliente = '';
          this.clienteEncontrado = undefined;
          this.idMesaSeleccionada = undefined;
          this.mostrarResumen = false;
          this.categoriaSeleccionada = '';
          this.reiniciarCantidadesProductos();
        }
      },
      error: () => {
        Swal.fire('Error', 'No se pudo registrar el pedido', 'error');
      }
    });
  }

  cancelarResumen() {
    this.mostrarResumen = false;
  }

  private reiniciarCantidadesProductos() {
    this.comidas.forEach(categoria => {
      categoria.alimentos.forEach(producto => {
        producto.cantidad = 0;
      });
    });
  }

  aumentarCantidad(item: any): void {
    item.cantidad++;
    for (let categoria of this.comidas) {
      let comida = categoria.alimentos.find(c => c.nombre === item.nombre);
      if (comida) {
        comida.cantidad = item.cantidad;
        break;
      }
    }
    this.actualizarResumen();
  }

  disminuirCantidad(item: any): void {
    if (item.cantidad > 1) {
      item.cantidad--;
      for (let categoria of this.comidas) {
        let comida = categoria.alimentos.find(c => c.nombre === item.nombre);
        if (comida) {
          comida.cantidad = item.cantidad;
          break;
        }
      }
      this.actualizarResumen();
    } else {
      this.eliminarProducto(item);
    }
  }

  eliminarProducto(item: any): void {
    this.resumenPedido = this.resumenPedido.filter(i => i.nombre !== item.nombre);
    for (let categoria of this.comidas) {
      let comida = categoria.alimentos.find(c => c.nombre === item.nombre);
      if (comida) {
        comida.cantidad = 0;
        comida.seleccionado = false;
        break;
      }
    }
    this.actualizarResumen();
    if (this.resumenPedido.length === 0) {
      this.mostrarResumen = false;
    }
  }

  actualizarResumen(): void {
    this.totalResumen = this.resumenPedido.reduce((total, item) => {
      return total + (item.subtotal * item.cantidad);
    }, 0);
  }

  actualizarResumenPedido(): void {
    const resumen: any[] = [];

    for (let categoria of this.comidas) {
      for (let comida of categoria.alimentos) {
        if (comida.cantidad && comida.cantidad > 0) {
          const existente = resumen.find(i => i.nombre === comida.nombre);
          if (existente) {
            existente.cantidad += comida.cantidad;
          } else {
            resumen.push({
              nombre: comida.nombre,
              cantidad: comida.cantidad,
              subtotal: comida.precio
            });
          }
        }
      }
    }

    this.resumenPedido = resumen;
    this.actualizarResumen();

    if (this.resumenPedido.length === 0) {
      this.mostrarResumen = false;
    }
  }

}
