import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Diezpp } from '../service/diezpp';

@Injectable({
  providedIn: 'root'
})
export class DiezppService {

  private API_URI: string;
  constructor(private http: HttpClient) {
    this.API_URI = environment.apiUrl;
  }

  getAllTask(): any {
    const path = `${this.API_URI}/todos`;
    return this.http.get<Diezpp[]>(path);

  }
}
