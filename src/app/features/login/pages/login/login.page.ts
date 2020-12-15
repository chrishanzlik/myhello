import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoaderState } from '../../models/loader-state';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit, OnDestroy {
  /**
   * Enumeration of `LoaderState`s.
   */
  LoaderState = LoaderState;

  /**
   * Components OnDestroy notification
   */
  private componentDestruction$ = new Subject();

  /**
   * Actual loader state. See `LoaderState` enum for more information.
   */
  loadingState = LoaderState.None;

  /**
   * Error message, if present.
   */
  message: string | null = null;

  /**
   * Login form
   */
  form: FormGroup = this.formBuilder.group({ token: '' });

  /**
   * Error messages for failed login attempts.
   */
  errorMessages: { [id: number]: string } = {
    [400]: 'Der Server hat ungültige Daten erhalten.',
    [401]: 'Ungültiges Token.',
    [404]: 'Die Zielseite wurde nicht gefunden. (404)',
    [500]: 'Ein serverseitiger Fehler ist aufgetreten.'
  };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form
      .get('token')
      ?.valueChanges.pipe(
        tap(() => this.resetLoaderState()),
        debounceTime(250),
        filter((token: string) => token.length === 6),
        tap(() => (this.loadingState = LoaderState.Loading)),
        switchMap((token: string) =>
          of(token).pipe(
            switchMap(() => this.authService.fakeAuth(token)),
            catchError((error) => this.handleErrorStatusCode(error))
          )
        ),
        tap(() => (this.loadingState = LoaderState.Done)),
        takeUntil(this.componentDestruction$)
      )
      .subscribe((_) => {
        console.log('success');
      });
  }

  ngOnDestroy(): void {
    this.componentDestruction$.next();
    this.componentDestruction$.complete();
  }

  /**
   * Handles the thrown error object. Either rethrows the unhandeld error or returns empty.
   * @param error Thrown error object
   * @returns `Observable<never>`
   */
  private handleErrorStatusCode(error: any): Observable<never> {
    this.loadingState = LoaderState.Failed;
    if (!error || !error.status) {
      throw error;
    }
    this.message =
      this.errorMessages[error.status] ||
      `Ein unerwarteter Fehler ist aufgetreten. (${error.status})`;
    return EMPTY;
  }

  private resetLoaderState(): void {
    this.loadingState = LoaderState.None;
    this.message = null;
  }
}
