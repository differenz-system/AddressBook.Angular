import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {

  // Only prepend if not absolute URL
  if (!req.url.startsWith('http')) {
    const apiReq = req.clone({
      url: environment.apiBaseUrl + req.url
    });
    return next(apiReq);
  }

  return next(req);
};
