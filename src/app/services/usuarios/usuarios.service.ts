import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../../core/models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
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

  getUsuarios() {
    return this.httpClient.get(`${base_url}/usuario`, this.headers);
  }
  getUnUsuario(id: string) {
    return this.httpClient.get(`${base_url}/usuario/${id}`, this.headers);
  }  

  crearUsuarios(usuario: UsuarioModel) {
    return this.httpClient.post(`${base_url}/usuario`, usuario, this.headers);
  }

  actualizarUnUsuario(usuario: UsuarioModel) {
    return this.httpClient.put(
      `${base_url}/usuario/${usuario._id}`,
      usuario,
      this.headers
    );
  }
  

  eliminarUnUsuario(id: string) {
    return this.httpClient.delete(`${base_url}/usuario/${id}`, this.headers);
  }
}