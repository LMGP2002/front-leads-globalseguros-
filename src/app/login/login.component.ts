import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Asegúrate de que el nombre del archivo es correcto
})
export default class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: any) {
    const { email, password } = form.value;
    this.authService.login(email, password).subscribe({
      next: (token) => {
        localStorage.setItem('token', token); // Guardar token en localStorage
        this.router.navigate(['/filter']); // Redirigir a la ruta protegida
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
}
