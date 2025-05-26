import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { PedidoCompleto } from '../Interfaces/pedido-completo';
import { ResponseApi } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private urlApi: string = environment.endpoint + "Pedido";

  constructor(private http: HttpClient) {}

  listar(): Observable<ResponseApi<PedidoCompleto[]>> {
    return this.http.get<ResponseApi<PedidoCompleto[]>>(`${this.urlApi}/listar`);
  }

  registrar(pedido: PedidoCompleto): Observable<ResponseApi<PedidoCompleto>> {
    return this.http.post<ResponseApi<PedidoCompleto>>(`${this.urlApi}/registrar`, pedido);
  }

  editar(pedido: PedidoCompleto): Observable<ResponseApi<boolean>> {
    return this.http.put<ResponseApi<boolean>>(`${this.urlApi}/editar`, pedido);
  }

  cancelar(id: number): Observable<ResponseApi<boolean>> {
    return this.http.put<ResponseApi<boolean>>(`${this.urlApi}/cancelar/${id}`, {});
  }

  obtenerPorId(id: number): Observable<ResponseApi<PedidoCompleto>> {
    return this.http.get<ResponseApi<PedidoCompleto>>(`${this.urlApi}/${id}`);
  }

  obtenerPorCliente(idCliente: number): Observable<ResponseApi<PedidoCompleto[]>> {
    return this.http.get<ResponseApi<PedidoCompleto[]>>(`${this.urlApi}/cliente/${idCliente}`);
  }

  obtenerPorMesa(idMesa: number): Observable<ResponseApi<PedidoCompleto[]>> {
    return this.http.get<ResponseApi<PedidoCompleto[]>>(`${this.urlApi}/mesa/${idMesa}`);
  }

  obtenerPorFecha(fecha: string): Observable<ResponseApi<PedidoCompleto[]>> {
    return this.http.get<ResponseApi<PedidoCompleto[]>>(`${this.urlApi}/fecha/${fecha}`);
  }

  obtenerPorNombreCliente(nombre: string): Observable<ResponseApi<PedidoCompleto[]>> {
    return this.http.get<ResponseApi<PedidoCompleto[]>>(`${this.urlApi}/buscar-por-nombre?nombre=${nombre}`);
  }

  obtenerPorEstado(estado: string): Observable<ResponseApi<PedidoCompleto[]>> {
    return this.http.get<ResponseApi<PedidoCompleto[]>>(`${this.urlApi}/estado/${estado}`);
  }

  obtenerPorProducto(idProducto: number): Observable<ResponseApi<PedidoCompleto[]>> {
    return this.http.get<ResponseApi<PedidoCompleto[]>>(`${this.urlApi}/producto/${idProducto}`);
  }

  cambiarEstado(idPedido: number, nuevoEstado: string): Observable<ResponseApi<boolean>> {
    return this.http.put<ResponseApi<boolean>>(`${this.urlApi}/cambiar-estado/${idPedido}?nuevoEstado=${nuevoEstado}`, {});
  }
}