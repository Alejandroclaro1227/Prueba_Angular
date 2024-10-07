import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private registros: any[] = []; // Lista para almacenar los registros

  // Método para agregar un nuevo registro
  agregarRegistro(registro: any) {
    this.registros.push(registro);
  }

  // Método para obtener todos los registros
  obtenerRegistros() {
    return this.registros;
  }
}
