import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Property } from '../model/properties';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import {
  selectAllProperties,
  selectCondoProperties,
  selectSingleFamilyProperties,
  selectTownHomeProperties,
} from '../store/properties.selectors';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss',
})
export class PropertiesComponent {
  properties$!: Observable<Property[]>;
  propertyTypeSubject = new BehaviorSubject<string>('all');

  propertyTypes = [
    { value: 'all', label: 'All Properties' },
    { value: 'singleFamily', label: 'Single Family' },
    { value: 'condo', label: 'Condos' },
    { value: 'townhome', label: 'Town Home' },
  ];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    const allProperties$ = this.store.pipe(select(selectAllProperties));
    const condoProperties$ = this.store.pipe(select(selectCondoProperties));
    const singleFamilyProperties$ = this.store.pipe(
      select(selectSingleFamilyProperties)
    );
    const townHomeProperties$ = this.store.pipe(
      select(selectTownHomeProperties)
    );

    this.properties$ = combineLatest([
      this.propertyTypeSubject,
      allProperties$,
      condoProperties$,
      singleFamilyProperties$,
      townHomeProperties$,
    ]).pipe(
      map(([selectedType, all, condos, singleFamily, townhome]) => {
        switch (selectedType) {
          case 'condo':
            return condos;
          case 'singleFamily':
            return singleFamily;
          case 'townhome':
            return townhome
          default:
            return all;
        }
      })
    );
  }

  onPropertyTypeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.propertyTypeSubject.next(select.value);
  }
}
