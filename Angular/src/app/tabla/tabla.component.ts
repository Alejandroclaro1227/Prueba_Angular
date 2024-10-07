import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { FormsModule } from '@angular/forms';

interface Registro {
  nombre: string;
  apellido: string;
  email: string;
  direccion: string;
  pais: string;
  departamento: string;
  ciudad: string;
}
@Component({
  selector: 'app-tabla',
  standalone: true, // Asegúrate de que sea standalone
  imports: [CommonModule, FormsModule], // Importar FormsModule para [(ngModel)]
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent {
  @Input() registros: Registro[] = []; 
  filterText: string = ''; 
  editIndex: number | null = null; 
  registroEditado: Registro = {} as Registro; 

  // Función para devolver los registros filtrados
  getRegistrosFiltrados(): Registro[] {
    if (!this.filterText) {
      return this.registros; 
    }

    const lowerFilterText = this.filterText.toLowerCase();

    return this.registros.filter((registro) =>
      Object.values(registro).some((value) =>
        value.toString().toLowerCase().includes(lowerFilterText)
      )
    );
  }

  // Función para iniciar la edición de un registro
  editarRegistro(index: number) {
    this.editIndex = index;
    this.registroEditado = { ...this.registros[index] }; 
  }

  // Función para guardar los cambios realizados en un registro
  guardarEdicion() {
    if (this.editIndex !== null) {
      this.registros[this.editIndex] = { ...this.registroEditado }; // Guardar cambios
      this.editIndex = null; 
    }
  }

  // Función para cancelar la edición de un registro
  cancelarEdicion() {
    this.editIndex = null;
  }
}
