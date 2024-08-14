import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginSuccess } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Angular Zillow Clone';
  store = inject(Store);

  ngOnInit() {
    const auth = localStorage.getItem('auth');
    if (auth) {
      this.store.dispatch(loginSuccess({ res: JSON.parse(auth) }));
    }
  }
}
