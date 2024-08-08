import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const customHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    setHeaders: {
      'x-rapidapi-key': `${environment.rapidApiKey}`,
      'x-rapidapi-host': `${environment.rapidApidhost}`,
    },
  });

  return next(req);
};
