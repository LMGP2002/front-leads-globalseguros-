import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpService {
  private http=inject(HttpClient);

  getIp(){
    return this.http.get<any>('https://api.ipify.org/?format=json');
  }

}

