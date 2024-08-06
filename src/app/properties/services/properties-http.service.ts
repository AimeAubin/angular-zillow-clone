import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Property } from '../model/properties';
import { map, Observable } from 'rxjs';

@Injectable()
export class PropertiesHttpService {
  constructor(private http: HttpClient) {}

  getAllProperties(): Observable<Property[]> {
    return this.http
      .get<ApiResponse>(
        `https://zillow-com4.p.rapidapi.com/properties/search?location=Houston`,
        {
          headers: {
            'x-rapidapi-key':
              'aa8133cfb9msh0a8097d5ab2c36bp181e13jsn26029f1e7e5e',
            'x-rapidapi-host': 'zillow-com4.p.rapidapi.com',
          },
        }
      )
      .pipe(map((res) => res['data']));
  }
}
