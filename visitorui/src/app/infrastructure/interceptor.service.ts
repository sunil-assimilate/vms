import {
    HttpInterceptor, HttpHandler, HttpHeaderResponse, HttpProgressEvent,
    HttpSentEvent, HttpRequest, HttpUserEvent, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class HttpRequestInterceptor implements HttpInterceptor {
   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        let serviceToken = JSON.parse(localStorage.getItem('ServiceToken'));
        if (serviceToken != null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${serviceToken.token}`
                }
            });
        }
        // logging the updated Parameters to browser's console
        console.log('Before making api call : ', request);
        return next.handle(request).pipe(
            tap(
                event => {
                    // logging the http response to browser's console in case of a success
                    if (event instanceof HttpResponse) {
                        console.log('api call success :', event);
                    }
                },
                error => {
                    // logging the http response to browser's console in case of a failuer
                    if (event instanceof HttpResponse) {

                        console.log('api call error :', event);
                    }
                }
            )
        );
    }
}