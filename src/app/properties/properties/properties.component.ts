import { Component } from '@angular/core';
import { PropertiesHttpService } from '../services/properties-http.service';
import { Observable, shareReplay } from 'rxjs';
import { Property } from '../model/properties';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss',
})
export class PropertiesComponent {
  properties$!: Observable<Property[]>;

  constructor(private propertiesHttpService: PropertiesHttpService) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.properties$ = this.propertiesHttpService
      .getAllProperties()
      .pipe(shareReplay());
  }
}
