import { HttpInterceptorFn } from '@angular/common/http';

export const customHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    setHeaders: {
      'x-rapidapi-key': 'db65e2056bmsh5c8b3610d6cc6abp1ae9c9jsna5e8ebdceba2',
      'x-rapidapi-host': 'zillow-com4.p.rapidapi.com',
    },
  });

  return next(req);
};
