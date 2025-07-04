import { Component, OnInit } from '@angular/core';
import { PedidoCompleto } from '../../Interfaces/pedido-completo';
import { PedidosService } from '../../Services/pedidos.service';
import { MesasService } from '../../Services/mesas.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  standalone: false,
  selector: 'app-menu',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.css'],
})
export class CocinaComponent implements OnInit {
  pedidos: PedidoCompleto[] = [];
  pedidosFiltrados: PedidoCompleto[] = [];

  filtros = {
    idPedido: '',
    idCliente: '',
    nombreCliente: '',
    idMesa: '',
    idProducto: '',
    fecha: '',
    estado: ''
  };

  constructor(
    private pedidosService: PedidosService,
    private mesasService: MesasService
  ) {}

  ngOnInit(): void {
    this.obtenerPedidos();
  }

  obtenerPedidos(): void {
    this.pedidosService.listar().subscribe({
      next: (res) => {
        this.pedidos = res.value;
        this.filtrarPedidos();
      }
    });
  }

  filtrarPedidos(): void {
    this.pedidosFiltrados = this.pedidos.filter(p => {
      return (!this.filtros.idPedido || p.pedido.idPedido == +this.filtros.idPedido)
        && (!this.filtros.idCliente || p.pedido.idCliente == +this.filtros.idCliente)
        && (!this.filtros.nombreCliente || p.pedido.nombreCliente?.toLowerCase().includes(this.filtros.nombreCliente.toLowerCase()))
        && (!this.filtros.idMesa || p.pedido.idMesa == +this.filtros.idMesa)
        && (!this.filtros.estado || p.pedido.estado === this.filtros.estado)
        && (!this.filtros.fecha || new Date(p.pedido.fecha!).toISOString().slice(0,10) === this.filtros.fecha)
        && (!this.filtros.idProducto || p.detalles.some(d => d.idProducto == +this.filtros.idProducto));
    });

    // Ordenar los pedidos: primero los activos (Pendiente o Servido), luego los terminados
    this.pedidosFiltrados.sort((a, b) => {
      const estadoA = a.pedido.estado;
      const estadoB = b.pedido.estado;

      const esActivoA = estadoA !== 'Pagado' && estadoA !== 'Cancelado';
      const esActivoB = estadoB !== 'Pagado' && estadoB !== 'Cancelado';

      if (esActivoA && !esActivoB) return -1;
      if (!esActivoA && esActivoB) return 1;

      // Si ambos son del mismo grupo, ordenar por idPedido ascendente
      return a.pedido.idPedido - b.pedido.idPedido;
    });
  }


  cambiarEstado(id: number, nuevoEstado: string): void {
    const pedidoEditado = this.pedidos.find(p => p.pedido.idPedido === id);
    if (!pedidoEditado) return;

    pedidoEditado.pedido.estado = nuevoEstado;
    this.pedidosService.editar(pedidoEditado).subscribe({
      next: () => this.obtenerPedidos()
    });
  }

  confirmarPago(pedido: PedidoCompleto): void {
    Swal.fire({
      title: `¿Marcar pedido #${pedido.pedido.idPedido} como pagado?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cerrar'
    }).then(result => {
      if (result.isConfirmed) {
        const pedidoActualizado = {
          ...pedido,
          pedido: { ...pedido.pedido, estado: 'Pagado' }
        };

        this.pedidosService.editar(pedidoActualizado).subscribe({
          next: () => {
            const idMesa = pedido.pedido.idMesa;
            if (!idMesa) {
              Swal.fire('Aviso', 'Este pedido no tiene una mesa asociada.', 'warning');
              return;
            }
            this.mesasService.obtenerPorId(idMesa).subscribe({
              next: res => {
                const mesa = res.value!;
                mesa.disponibilidad = 'Disponible';
                this.mesasService.cambiarDisponibilidad(mesa).subscribe({
                  next: () => {
                    Swal.fire('¡Hecho!', 'Pedido pagado y mesa liberada.', 'success');
                    this.obtenerPedidos();
                  },
                  error: () => Swal.fire('Error', 'No se pudo liberar la mesa.', 'error')
                });
              },
              error: () => Swal.fire('Error', 'No se pudo obtener la mesa.', 'error')
            });
          },
          error: () => Swal.fire('Error', 'No se pudo actualizar el pedido.', 'error')
        });
      }
    });
  }

  confirmarCancelacion(pedido: PedidoCompleto): void {
    Swal.fire({
      title: `¿Cancelar pedido #${pedido.pedido.idPedido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Cancelar',
      cancelButtonText: 'Regresar'
    }).then(result => {
      if (result.isConfirmed) {
        const pedidoActualizado = {
          ...pedido,
          pedido: { ...pedido.pedido, estado: 'Cancelado' }
        };

        this.pedidosService.editar(pedidoActualizado).subscribe({
          next: () => {
            const idMesa = pedido.pedido.idMesa;
            if (!idMesa) {
              Swal.fire('Aviso', 'Este pedido no tiene una mesa asociada.', 'warning');
              return;
            }
            this.mesasService.obtenerPorId(idMesa).subscribe({
              next: res => {
                const mesa = res.value!;
                mesa.disponibilidad = 'Disponible';
                this.mesasService.cambiarDisponibilidad(mesa).subscribe({
                  next: () => {
                    Swal.fire('¡Hecho!', 'Pedido cancelado y mesa liberada.', 'success');
                    this.obtenerPedidos();
                  },
                  error: () => Swal.fire('Error', 'No se pudo liberar la mesa.', 'error')
                });
              },
              error: () => Swal.fire('Error', 'No se pudo obtener la mesa.', 'error')
            });
          },
          error: () => Swal.fire('Error', 'No se pudo cancelar el pedido.', 'error')
        });
      }
    });
  }

  generarReporteExcel(): void {
    const pedidosPagados = this.pedidosFiltrados.filter(p => p.pedido.estado === 'Pagado');

    const data = pedidosPagados.map(p => {
      const totalSinIva = p.detalles.reduce((sum, d) => sum + d.subtotal!, 0);
      const iva = totalSinIva * 0.16;
      const totalConIva = totalSinIva + iva;

      return {
        'ID Pedido': p.pedido.idPedido,
        'Fecha': new Date(p.pedido.fecha!).toLocaleString(),
        'Cliente': p.pedido.nombreCliente || 'No especificado',
        'Mesa': p.pedido.idMesa || '',
        'Estado': p.pedido.estado,
        'Total Sin IVA': totalSinIva.toFixed(2),
        'IVA (16%)': iva.toFixed(2),
        'Total Con IVA': totalConIva.toFixed(2)
      };
    });

    // Agregar fila de totales
    const totalSinIva = data.reduce((sum, d) => sum + parseFloat(d['Total Sin IVA']), 0);
    const totalIva = data.reduce((sum, d) => sum + parseFloat(d['IVA (16%)']), 0);
    const totalConIva = data.reduce((sum, d) => sum + parseFloat(d['Total Con IVA']), 0);
    data.push({
      'ID Pedido': 0,
      'Fecha': '',
      'Cliente': '',
      'Mesa': '',
      'Estado': '',
      'Total Sin IVA': totalSinIva.toFixed(2),
      'IVA (16%)': totalIva.toFixed(2),
      'Total Con IVA': totalConIva.toFixed(2)
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { 'Totales': worksheet }, SheetNames: ['Totales'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, 'Reporte_Totales_Pedidos.xlsx');
  }
}
