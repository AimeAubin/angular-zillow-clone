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
        `https://zillow-com4.p.rapidapi.com/properties/search?location=houston`
      )
      .pipe(map((res) => res['data']));
  }
}
