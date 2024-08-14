import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Property } from '../model/properties';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { selectAllProperties } from '../store/properties.selectors';

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
