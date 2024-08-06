import { Component } from '@angular/core';
import { PropertiesHttpService } from '../services/properties-http.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Observable } from 'rxjs';
import { Property } from '../model/properties';
import { selectAllProperties } from '../properties.selectors';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss',
})
export class PropertiesComponent {
  properties$!: Observable<Property[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.properties$ = this.store.pipe(select(selectAllProperties));
  }
}
