import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROUTER_APP } from '../../core/enum/router-app.enum';
import { AutenticacionService } from '../../services/autenticacion/autenticacion.service';
import { PermisosDirective } from '../../core/directives/permisos/permisos.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [RouterLink, PermisosDirective],
})
export class HeaderComponent {
  contador: number = 0;

  autenticacionService = inject(AutenticacionService);

  get ROUTER_APP() {
    return ROUTER_APP;
  }

  recibirContador(valor: number) {
    this.contador = valor;
  }

  cerrarSesion() {
    this.autenticacionService.logout();
  }
}