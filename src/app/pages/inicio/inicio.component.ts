import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  nombre: string='';
 
  ngOnInit(): void
   {
   this.nombre ='catalina';
  
  }
  mostrarModal():void{
    Swal.fire({
      title: "The Internet?",
      text: "That thing is still around?",
      icon: "question",
    });
  }
  
  
}
