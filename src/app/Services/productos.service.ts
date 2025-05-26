import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Productos } from '../Interfaces/productos';
import { ResponseApi } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private urlApi:string = environment.endpoint + "Producto";

  constructor(private http:HttpClient) { }

  listar(): Observable<ResponseApi<Productos[]>> {
    return this.http.get<ResponseApi<Productos[]>>(`${this.urlApi}/lista`);
  }

  registrar(producto: Productos): Observable<ResponseApi<Productos>> {
    return this.http.post<ResponseApi<Productos>>(`${this.urlApi}/registrar`, producto);
  }

  modificar(producto: Productos): Observable<ResponseApi<boolean>> {
    return this.http.put<ResponseApi<boolean>>(`${this.urlApi}/modificar`, producto);
  }

  eliminar(id: number): Observable<ResponseApi<boolean>> {
    return this.http.delete<ResponseApi<boolean>>(`${this.urlApi}/eliminar/${id}`);
  }
}
