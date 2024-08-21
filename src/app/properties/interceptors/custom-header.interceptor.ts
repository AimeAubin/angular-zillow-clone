import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const customHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(environment.rapidApiUrl)) {
    const modifiedReq = req.clone({
      setHeaders: {
        'x-rapidapi-key': `${environment.rapidApiKey}`,
        'x-rapidapi-host': `${environment.rapidApidhost}`,
      },
    });

    return next(modifiedReq);
  }
  return next(req);
};
