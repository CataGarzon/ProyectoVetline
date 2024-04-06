import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Mascota } from '../../core/models/mascotas.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class MascotasService {
  constructor(private httpClient: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  crearMascota(mascota: Mascota, numeroDocumento: string) {
    return this.httpClient.post(`${base_url}/mascotas/${numeroDocumento}`, mascota, this.headers);
  }
}
