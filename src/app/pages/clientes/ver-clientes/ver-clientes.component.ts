import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../core/interfaces/cliente';
import { ClientesService } from '../../../services/clientes/clientes.service'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router';
import { ROUTER_APP } from '../../../core/enum/router-app.enum';
import { PermisosDirective } from '../../../core/directives/permisos/permisos.directive';

@Component({
    selector: 'app-ver-clientes',
    standalone: true, // No está claro qué significa standalone aquí, verifica si es necesario
   imports:[PermisosDirective],
    templateUrl: './ver-clientes.component.html',
    styleUrls: ['./ver-clientes.component.css'],
})
export class VerClientesComponent implements OnInit {
    misClientes: Cliente[] = [];

    constructor(private clienteService: ClientesService, private router: Router) {}

    ngOnInit(): void {
        this.clienteService.getClientes().subscribe((data: any) => {
            console.log(data);
            this.misClientes = data.clientes;
        });
    }

    eliminarCliente(idCliente: number): void {
        this.misClientes = this.misClientes.filter((cliente) => cliente._id !== idCliente);
        console.log('Eliminar', this.misClientes);
    }

    agregarCliente() {
      this.router.navigateByUrl(ROUTER_APP.ADD_CLIENTES);
    }
}
