import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { config } from '../../../../enviroments/configuration/config';
import { ROUTER_APP } from '../../../core/enum/router-app.enum';
import { UsuarioModel } from '../../../core/models/usuario.model';
import { Mascota } from '../../../core/models/mascotas.model';
import { MascotasService } from '../../../services/mascotas/mascotas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asignar-mascota',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './asignar-mascota.component.html',
  styleUrl: './asignar-mascota.component.css'
})
export class AsignarMascotaComponent implements OnInit {
  mascotaForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private mascotasService: MascotasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mascotaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      observaciones: [''] 
    });
  }

  crearMascota(): void {
    if (this.mascotaForm.valid) {
      const mascotaData = this.mascotaForm.value;
      const numeroDocumento = mascotaData.numeroDocumento; 
      delete mascotaData.numeroDocumento; 
      this.mascotasService.crearMascota(mascotaData, numeroDocumento).subscribe({
        next: (resp: any) => {
          Swal.fire(
            'Creada',
            `Se creó la mascota ${resp.mascota.nombre} correctamente`,
            'success'
          );
        },
        error: (error) => {
          Swal.fire('Error', `Error al crear la mascota: ${error.message}`, 'error');
          console.error('Error al crear la mascota:', error);
        }
      });
    } else {
      Swal.fire(
        'Error',
        'El formulario es inválido. Por favor, revise los campos.',
        'error'
      );
      console.log('El formulario es inválido. Por favor, revise los campos.');
    }
  }
  

 
}