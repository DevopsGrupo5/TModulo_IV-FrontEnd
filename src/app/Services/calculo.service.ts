import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculoService {
  API_url="http://localhost:8080/rest/msdxc/dxc?sueldo=20000&ahorro=2334";
  constructor(private http:HttpClient) { }

  calcular(ahorro:number,sueldo:number){
    
    return this.http.get(this.API_url+'/dxc?sueldo='+sueldo+'&ahorro='+ahorro);
  }
}
