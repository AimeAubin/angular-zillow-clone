import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Property } from '../model/properties';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class PropertiesHttpService {
  constructor(private http: HttpClient) {}

  getAllProperties(): Observable<Property[]> {
    return this.http
      .get<ApiResponse>(
        `${environment.rapidApiUrl}`
      )
      .pipe(map((res) => res['data']));
  }
}
