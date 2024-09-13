import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private baseUrl = 'http://localhost:8080/api/v1/leads';

  private http=inject(HttpClient);


  // Método para verificar si existen leads en el rango de fechas
  async checkLeadsExist(startDate: string, endDate: string): Promise<boolean> {
    const body = { startDate, endDate };

    try {
      const leads = await firstValueFrom(this.http.post<any[]>(`${this.baseUrl}/filter`, body));
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

    this.http.post(`${this.baseUrl}/export`, body, {
      responseType: 'blob', // Recibir el archivo como blob
      headers: {
        'Content-Type': 'application/json',
      },
    }).subscribe({
      next: (blob: Blob) => {
        // Crea un enlace para descargar el archivo
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
