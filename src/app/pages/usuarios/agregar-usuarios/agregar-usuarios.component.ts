import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { config } from '../../../../enviroments/configuration/config';
import { ROUTER_APP } from '../../../core/enum/router-app.enum';
import { UsuarioModel } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-agregar-usuarios',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregar-usuarios.component.html',
  styleUrl: './agregar-usuarios.component.css',
})
export class AgregarUsuariosComponent implements OnInit {
  usuarioForm: FormGroup;
  roles = config.roles;

  usuarioSelecccionado: UsuarioModel;

  get ROUTER_APP() {
    return ROUTER_APP;
    
  }

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id})=>{
    this.buscarUsuario(id.toString())
    });

    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }

  crearUsuario() {
    if(this.usuarioSelecccionado){
      this.actualizarUsuario();
    }
    else
    {
      if (this.usuarioForm.valid) {
        const usuarioData = this.usuarioForm.value;
        this.usuariosService.crearUsuarios(usuarioData).subscribe({
          next: (resp: any) => {
            Swal.fire(
              'Creado',
              `Se creó el usuario ${resp.usuario.nombre} satisfactoriamente`,
              'success'
            );
  
            this.usuarioForm.reset();
          },
          error: (error) => {
            Swal.fire('Error', `Error al crear el usuario, ${error}`, 'error');
          },
        });
      } else {
        Swal.fire(
          'Error',
          `El formulario es inválido. Por favor, revise los campos.`,
          'error'
        );
      }
    }
    
  }
  get dataFormulario() {
    return this.usuarioForm.controls;
  }
  

  actualizarUsuario() {
    const dataActualizada: UsuarioModel = {
      ...this.usuarioForm.value,
      _id: this.usuarioSelecccionado._id,
      nombre: this.usuarioForm.value.nombre,
      email: this.usuarioForm.value.email,
      tipoDocumento: this.usuarioForm.value.tipoDocumento,
      numeroDocumento: this.usuarioForm.value.numeroDocumento,
      login: this.usuarioForm.value.login,
      rol: this.usuarioForm.value.rol
    };

    this.usuariosService.actualizarUnUsuario(dataActualizada).subscribe({
      next: (resp: any) => {
        Swal.fire(
          'Usuario Actualizado',
          'El usuario se actualizó satisfactoriamente',
          'success'
        );
      },
      error: (error: any) => {
        const errors = error?.error?.errors;
        const errorList: string[] = [];
  
        if (errors) {
          Object.entries(errors).forEach(([key, value]: [string, any]) => {
            if (value && value['msg']) {
              errorList.push(`** ${value['msg']} <br>`);
            }
          });
        }
  
        Swal.fire({
          title: 'Error al actualizar el usuario',
          icon: 'error',
          html: `${errorList.length ? errorList.join('') : error.error.msg}`
        });
      }
    });
  }
  



  buscarUsuario(id: string) {
    if (id !== 'nuevo') {
      this.usuariosService.getUnUsuario(id).subscribe({
        next: (resp: any) => {
          const {
            nombre,
            email,
            tipoDocumento,
            numeroDocumento,
            login,
            password,
            rol
          } = resp.usuarios;
          this.usuarioSelecccionado = resp.usuarios;

          this.usuarioForm.setValue({
            nombre: nombre,
            email: email,
            tipoDocumento: tipoDocumento,
            numeroDocumento: numeroDocumento,
            login: login,
            password: '',
            rol: rol
          });
        },
        error:(error: any) => {
          const errors = error?.error?.errors;
          const errorList: string[] = [];
        
          if (errors) {
            Object.entries(errors).forEach(([key, value]: [string, any]) => {
              if (value && value['msg']) {
                errorList.push(`* ${value['msg']} <br>`);
              }
            });
          }
        
          Swal.fire({
            title: 'Error al buscar el usuario',
            icon: 'error',
            html: `${errorList.length ? errorList.join('') : error.error.msg}`
          });
        }
        
      });
    }
  }
}