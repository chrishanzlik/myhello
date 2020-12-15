import { Observable, Observer } from 'rxjs';

export class AuthService {
  fakeAuth(token: string): Observable<string> {
    return new Observable((observer: Observer<string>) => {
      setTimeout(() => {
        const normalizedToken = token.toLowerCase();

        if (normalizedToken === 'foobar') {
          observer.next('take-your-fake-jwt');
        } else if (normalizedToken === 'server') {
          observer.error({ status: 500 });
        } else {
          observer.error({ status: 401 });
        }

        observer.complete();
      }, 1000);
    });
  }
}
