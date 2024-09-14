import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private baseUrl = 'http://localhost:8080/api/v1/leads';
  private http = inject(HttpClient);

  // Método para obtener el token JWT desde el almacenamiento local
  private getToken(): string | null {
    return localStorage.getItem('token'); // O donde sea que estés almacenando el token
  }

  // Método para verificar si existen leads en el rango de fechas
  async checkLeadsExist(startDate: string, endDate: string): Promise<boolean> {
    const body = { startDate, endDate };
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`  // Incluir el token JWT
    });

    try {
      const leads = await firstValueFrom(this.http.post<any[]>(`${this.baseUrl}/filter`, body, { headers }));
      return Array.isArray(leads) && leads.length > 0;
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al verificar los leads',
        confirmButtonText: 'Entendido'
      });
      return false;
    }
  }

  // Método para descargar el CSV
  downloadLeadsCSV(startDate: string, endDate: string): void {
    const body = { startDate, endDate };
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`  // Incluir el token JWT
    });

    this.http.post(`${this.baseUrl}/export`, body, {
      headers,
      responseType: 'blob', // Recibir el archivo como blob
    }).subscribe({
      next: (blob: Blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = 'leads.csv';
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al descargar el archivo CSV',
          confirmButtonText: 'Entendido'
        });
      }
    });
  }
}
