import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Mesa } from '../Interfaces/mesa';
import { ResponseApi } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class MesasService {
  private urlApi:string = environment.endpoint + "Mesa";

  constructor(private http:HttpClient) { }

  listar(): Observable<ResponseApi<Mesa[]>> {
    return this.http.get<ResponseApi<Mesa[]>>(`${this.urlApi}/lista`);
  }

  obtenerDisponibles(): Observable<ResponseApi<Mesa[]>> {
    return this.http.get<ResponseApi<Mesa[]>>(`${this.urlApi}/disponibles`);
  }

  obtenerOcupadas(): Observable<ResponseApi<Mesa[]>> {
    return this.http.get<ResponseApi<Mesa[]>>(`${this.urlApi}/Ocupadas`);
  }

  obtenerPorId(id: number): Observable<ResponseApi<Mesa>> {
    return this.http.get<ResponseApi<Mesa>>(`${this.urlApi}/${id}`);
  }

  cambiarDisponibilidad(mesa: Mesa): Observable<ResponseApi<boolean>> {
    return this.http.put<ResponseApi<boolean>>(`${this.urlApi}/cambiar-disponibilidad`, mesa);
  }
}
