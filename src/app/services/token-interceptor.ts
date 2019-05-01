import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { TokenService } from './token.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // return next.handle(req);

        const headersConfig = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        };

        const token = this.tokenService.GetToken();
        if (token) {

            // tslint:disable-next-line:no-string-literal
            headersConfig['Authorization'] = 'Bearer ' + token;
        }

        const changeRequest = req.clone({ setHeaders: headersConfig });
        return next.handle(changeRequest);
    }
}
