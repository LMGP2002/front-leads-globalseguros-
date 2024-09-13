import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Lead } from '../model/lead.interface';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private http=inject(HttpClient);

  getAll(){
    return this.http.get<Lead[]>('http://localhost:8080/api/v1/leads');
  }

  create(lead:any){
    return this.http.post<{ [key: string]: string }>('http://localhost:8080/api/v1/leads',lead)
  }

}
