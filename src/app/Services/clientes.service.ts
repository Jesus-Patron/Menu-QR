import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Cliente } from '../Interfaces/cliente';
import { ResponseApi } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private urlApi:string = environment.endpoint + "Cliente";

  constructor(private http:HttpClient) { }
  
  listar(): Observable<ResponseApi<Cliente[]>> {
    return this.http.get<ResponseApi<Cliente[]>>(`${this.urlApi}/lista`);
  }

  obtenerPorId(id: number): Observable<ResponseApi<Cliente>> {
    return this.http.get<ResponseApi<Cliente>>(`${this.urlApi}/obtener/${id}`);
  }

  registrar(cliente: Cliente): Observable<ResponseApi<Cliente>> {
    return this.http.post<ResponseApi<Cliente>>(`${this.urlApi}/registrar`, cliente);
  }

  editar(cliente: Cliente): Observable<ResponseApi<boolean>> {
    return this.http.put<ResponseApi<boolean>>(`${this.urlApi}/editar`, cliente);
  }

  eliminar(id: number): Observable<ResponseApi<boolean>> {
    return this.http.delete<ResponseApi<boolean>>(`${this.urlApi}/eliminar/${id}`);
  }

  obtenerIdPorNombre(nombre: string): Observable<ResponseApi<number>> {
    return this.http.get<ResponseApi<number>>(`${this.urlApi}/ObtenerIdPorNombre/${nombre}`);
  }

  obtenerPorNombre(nombre: string): Observable<ResponseApi<Cliente>> {
    return this.http.get<ResponseApi<Cliente>>(`${this.urlApi}/ObtenerPorNombre/${encodeURIComponent(nombre)}`);
  }
}
