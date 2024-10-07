import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactoComponent } from './contacto/contacto.component';
import { TablaComponent } from './tabla/tabla.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactoComponent, TablaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';
  registros = [
    { nombre: 'Juan', apellido: 'Pérez' },
    { nombre: 'María', apellido: 'Gómez' }
  ];
}
