import { Component, inject } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { FormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-leads',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-leads.component.html',
  styleUrls: ['./filter-leads.component.css']
})
export default class FilterLeadsComponent {

  startDate: string = '';  // Variable para almacenar la fecha de inicio
  endDate: string = '';    // Variable para almacenar la fecha de fin

  private filterService=inject(FilterService);
  private router = inject(Router);


  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }


  // Método para invocar la descarga del CSV
  downloadCSV() {
    if (this.startDate && this.endDate) {
      let formattedStartDate = formatDate(this.startDate, 'dd/MM/yyyy', 'en-US');
      let formattedEndDate = formatDate(this.endDate, 'dd/MM/yyyy', 'en-US');

      this.filterService.checkLeadsExist(formattedStartDate, formattedEndDate).then(exist => {
        if (exist) {
          this.filterService.downloadLeadsCSV(formattedStartDate, formattedEndDate);
        } else {
          // Mostrar mensaje si no hay leads
          Swal.fire({
            icon: 'info',
            title: 'Sin resultados',
            text: 'No se encontraron leads en el rango de fechas seleccionado',
            confirmButtonText: 'Entendido'
          });
        }
      });
    } else {
      // Alerta de error
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Completa las dos fechas',
        confirmButtonText: 'Entendido'
      });
    }
  }
}
