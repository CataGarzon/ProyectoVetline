import { Component } from '@angular/core';
import {FormControl,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ClientesService } from '../../../services/clientes/clientes.service';
import { ClienteModel } from '../../../core/models/cliente.model';

@Component({
  selector: 'app-agregar-clientes',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregar-clientes.component.html',
  styleUrl: './agregar-clientes.component.css',
})
export class AgregarClientesComponent {
  clienteForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    telefono: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    tipoDocumento: new FormControl('', [Validators.required]),
    numeroDocumento: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
  });

  constructor(private clienteService: ClientesService) {}

  crearCliente() {
    const clienteNuevo = this.clienteForm.value;
    if (this.clienteForm.valid) {
      const data: ClienteModel = {
        nombre: clienteNuevo.nombre || '',
        telefono: Number(clienteNuevo.telefono),
        email: clienteNuevo.email || '',
        tipoDocumento: clienteNuevo.tipoDocumento || '',
        numeroDocumento: clienteNuevo.numeroDocumento || '',
        direccion: clienteNuevo.direccion || '',
      };

      this.clienteService.crearClientes(data).subscribe({
        next: (resp: any) => {
          console.log('Usuario Creado', resp);
        },
        error: (error: any) => {
          console.log('Error al crear el cliente', error);
        },
      });
    }
  }
}