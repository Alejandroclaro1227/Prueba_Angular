import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TablaComponent } from '../tabla/tabla.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TablaComponent],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
})
export class ContactoComponent {
  contactForm: FormGroup;
  registros: any[] = [];
  showDepartment = false;
  departments = ['Antioquia', 'Cundinamarca', 'Valle del Cauca'];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      sexo: ['', Validators.required],
      nacimiento: ['', [Validators.required, this.dateValidator.bind(this)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      casa: ['', Validators.required],
      pais: ['', Validators.required],
      departamento: [''],
      ciudad: [''],
      comentarios: [''],
    });
  }

  // Calcular la edad
  calculateAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  }

  dateValidator(control: AbstractControl) {
    const birthDate = control.value;
    if (birthDate) {
      const age = this.calculateAge(birthDate);
      if (age < 18) {
        return { underage: true }; // Error si menor de 18
      }
    }
    return null; // Válido si mayor o igual a 18
  }

  // Validación de país
  onCountryChange(event: Event) {
    const selectedCountry = (event.target as HTMLSelectElement).value;
    const isColombia = selectedCountry.toLowerCase() === 'colombia';

    this.showDepartment = isColombia;
    const validators = isColombia ? [Validators.required] : [];

    this.contactForm.get('departamento')?.setValidators(validators);
    this.contactForm.get('ciudad')?.setValidators(validators);

    this.contactForm.get('departamento')?.updateValueAndValidity();
    this.contactForm.get('ciudad')?.updateValueAndValidity();
  }

  // Enviar el formulario con mensajes específicos
  onSubmit(event: Event) {
    event.preventDefault();

    // Validación de edad
    const nacimientoControl = this.contactForm.get('nacimiento');
    if (nacimientoControl?.errors?.['underage']) {
      alert('Debes tener al menos 18 años para registrarte.');
      return;
    }

    
    if (!this.contactForm.get('sexo')?.valid) {
      alert('El campo Sexo es obligatorio.');
      return;
    }

    if (!this.contactForm.get('nombre')?.valid) {
      alert('El campo Nombre es obligatorio.');
      return;
    }

    if (!this.contactForm.get('apellido')?.valid) {
      alert('El campo Apellido es obligatorio.');
      return;
    }

    if (!this.contactForm.get('email')?.valid) {
      alert('El campo Email es obligatorio o el formato no es correcto.');
      return;
    }

    if (!this.contactForm.get('direccion')?.valid) {
      alert('El campo Dirección es obligatorio.');
      return;
    }

    if (!this.contactForm.get('casa')?.valid) {
      alert('El campo Casa es obligatorio.');
      return;
    }

    if (!this.contactForm.get('pais')?.valid) {
      alert('El campo País es obligatorio.');
      return;
    }

    if (this.showDepartment) {
      if (!this.contactForm.get('departamento')?.valid) {
        alert('El campo Departamento es obligatorio para Colombia.');
        return;
      }

      if (!this.contactForm.get('ciudad')?.valid) {
        alert('El campo Ciudad es obligatorio para Colombia.');
        return;
      }
    }

    if (this.contactForm.valid) {
      const nuevoRegistro = this.contactForm.value;
      this.registros.push(nuevoRegistro);
      alert('Formulario enviado con éxito.');
      this.contactForm.reset();
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
}
