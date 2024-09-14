import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit(form: any) {
    const { email, password } = form.value;

    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor, completa ambos campos antes de iniciar sesión.',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    this.authService.login(email, password).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);
        this.router.navigate(['/filter']);
      },
      error: (err) => {
        if (err.status === 0) {
          Swal.fire({
            icon: 'error',
            title: 'Sin conexión',
            text: 'Parece que hay errores de conexión, inténtalo más tarde.',
            confirmButtonText: 'Entendido'
          });
        } else if (err.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Error de autenticación',
            text: err.error || 'Credenciales inválidas. Inténtalo de nuevo.',
            confirmButtonText: 'Entendido'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error inesperado',
            text: 'Ha ocurrido un error. Inténtalo de nuevo más tarde.',
            confirmButtonText: 'Entendido'
          });
        }
      }
    });
  }
}
