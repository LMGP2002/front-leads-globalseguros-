import { Component, inject, OnInit } from '@angular/core';
import { LeadService } from '../services/lead.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IpService } from '../services/ip.service';
import Swal from 'sweetalert2';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lead-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.css'],
})
export default class LeadFormComponent implements OnInit {
  //Inyección de dependencias
  private leadService = inject(LeadService);
  private ipService = inject(IpService);
  private fb = inject(FormBuilder);
  private router=inject(Router)

  showAlert = false; // Variable para controlar la visibilidad de la alerta de errores
  formSubmitted = false; // Variable para controlar la visibilidad del formulario

  private ipCliente = ''
  private date = new Date();
  private hora = ''
  private fecha = ''


  ngOnInit(): void {

    // Obtener y almacenar la IP del cliente
    this.ipService.getIp().subscribe((ipData: any) => {
      this.ipCliente=ipData.ip;
      localStorage.setItem('ipCliente', this.ipCliente);
    });

    this.hora = `${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()}`;
    this.fecha = `${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate()}`;

     // Almacenar en localStorage hora actual, fecha actual
     localStorage.setItem('horaIngreso', this.hora);
     localStorage.setItem('fechaIngreso', this.fecha);

  }

  // Relación de los controles con el formulario y sus validaciones
  form = this.fb.group({
    nomCliente: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\sÑñ]{1,100}$/)]],
    nit: ['', [Validators.required, Validators.pattern(/^[^#¿?,]*$/)]],
    nomPunto: ['', [Validators.required, Validators.pattern(/^[^#¿?,]*$/)]],
    nomEquipo: ['', [Validators.required, Validators.pattern(/^[^#¿?,]*$/)]],
    ciudad: ['Bogotá', [Validators.required]],
    rtc: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    promotor: ['', [Validators.required, Validators.pattern(/^[^#¿?,]*$/)]],
    usuario: ['', [Validators.required, Validators.pattern(/^[^#¿?,]*$/)]],
    tratamientoDatos: [false, [Validators.requiredTrue]],
  });


  create() {
    this.showAlert = true;

    if (this.form.invalid) {
      return;
    }

    const lead = this.form.value;

    this.leadService.create(lead).pipe(
      catchError((error) => {
        // Alerta de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo conectar con el servidor. Verifica tu conexión o intenta más tarde.',
          confirmButtonText: 'Ok'
        });

        return of(null);
      })
    ).subscribe((response) => {
      if (response) {
        this.formSubmitted = true;
      }
    });
  }



  // Mensajes de error para visualizar en la alerta
  getErrorMessage() {
    if (this.form.get('nomCliente')?.hasError('required')) {
      return 'El nombre del cliente es obligatorio.';
    } else if (this.form.get('nomCliente')?.hasError('pattern')) {
      return 'El nombre del cliente solo debe contener letras (máximo 100 caracteres).';
    } else if (this.form.get('nit')?.hasError('required')) {
      return 'El NIT es obligatorio.';
    } else if (this.form.get('nomPunto')?.hasError('pattern') || this.form.get('nomEquipo')?.hasError('pattern') || this.form.get('nit')?.hasError('pattern') || this.form.get('promotor')?.hasError('pattern') || this.form.get('usuario')?.hasError('pattern')) {
      return 'Los campos no deben contener estos caracteres # ¿ ? ,';
    } else if (this.form.get('nomPunto')?.hasError('required') || this.form.get('nomEquipo')?.hasError('required') || this.form.get('nit')?.hasError('required') || this.form.get('promotor')?.hasError('required') || this.form.get('usuario')?.hasError('required')) {
      return 'No deje campos vacíos.';
    } else if (this.form.get('rtc')?.hasError('required')) {
      return 'El RTC es obligatorio.';
    } else if (this.form.get('rtc')?.hasError('pattern')) {
      return 'El RTC solo debe contener números.';
    } else if (!this.form.get('tratamientoDatos')?.value) {
      return 'Debe aceptar el tratamiento de datos.';
    }
    return null;
  }

  navigateToFilter() {
    this.router.navigate(['/filter']);
  }
}

