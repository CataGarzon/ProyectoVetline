import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AutenticacionService } from '../../../services/autenticacion/autenticacion.service';
import { UsuarioModel } from '../../models/usuario.model';

@Directive({
  selector: '[appPermisos]',
  standalone: true,
})
export class PermisosDirective implements OnInit {
  private usuario: UsuarioModel;
  private permisos: string[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private autenticacionService: AutenticacionService
  ) {}

  ngOnInit(): void {
    this.usuario = this.autenticacionService.usuario;
    this.actualizarVista();
  }

  @Input('appPermisos')
  set appPermisos(valor: string[]) {
    this.permisos = valor;
  }

  private actualizarVista(): void {
    this.viewContainer.clear();
    if (this.validarPermisos()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private validarPermisos(): boolean {
    let tienePermiso: boolean = false;

    if (this.usuario && this.usuario.rol) {
      for (let [index, rol] of this.permisos.entries()) {
        if (this.usuario.rol.toUpperCase() === rol) {
          tienePermiso = true;
          return tienePermiso;
        }
      }
    }
    return tienePermiso;
  }
}
