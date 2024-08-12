import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../../environments/environment";

export const customAuthInterceptor: HttpInterceptorFn = ( req, next ) => {
    req = req.clone( {
        setHeaders: {
            'X-APN':`${environment.xapn}`
        }
    } )
    
    return next(req)
}