import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
contactoForm =new FormGroup({
  nombre: new FormControl('', Validators.required),
  email: new FormControl('',
 [Validators.email,Validators.required]),
  mensaje:new FormControl('Mensaje por defecto'),
});
 

enviarContacto()
{
  console.log('Envia formulario',this.contactoForm);

}
}
