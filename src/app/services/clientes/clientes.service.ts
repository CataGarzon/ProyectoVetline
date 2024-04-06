import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroment';
import { ClienteModel } from '../../core/models/cliente.model';

const base_url = environment.base_url;

@Injectable({
    providedIn: 'root',
})
export class ClientesService {
    constructor(private httpClient: HttpClient) { }
    get token(): string { return localStorage.getItem('token') || ''; }
    
    get headers() {
        return {
          headers: {
            'x-token': this.token,
          },
        };
      }

    getClientes() {
        return this.httpClient.get(`${base_url}/cliente`,this.headers);
    }

    crearClientes(cliente: ClienteModel) {
        return this.httpClient.post(`${base_url}/cliente`, cliente,this.headers);

    }
}