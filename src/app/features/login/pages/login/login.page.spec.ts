import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  flushMicrotasks,
  TestBed,
  tick
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoaderState } from '../../models/loader-state';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let mockAuthService: any;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj(['authenticate']);
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [ReactiveFormsModule],
      providers: [{ provide: AuthService, useValue: mockAuthService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is in busy state while loading', fakeAsync(() => {
    mockAuthService.authenticate.and.returnValue(of('token').pipe(delay(100)));

    component.form.patchValue({ token: '123456' });
    tick(250);
    discardPeriodicTasks();

    expect(component.loadingState).toBe(LoaderState.Loading);
  }));

  it('it is in error state when auth service denies', fakeAsync(() => {
    mockAuthService.authenticate.and.returnValue(throwError({ status: 401 }));

    component.form.patchValue({ token: '123456' });
    tick(250);
    expect(component.loadingState).toBe(LoaderState.Failed);
    expect(component.message).toBeDefined();
  }));

  it('is in success state when auth service accept token', fakeAsync(() => {
    mockAuthService.authenticate.and.returnValue(of('token'));

    component.form.patchValue({ token: '123456' });
    tick(250);
    expect(component.loadingState).toBe(LoaderState.Done);
  }));

  it('resets loader state on input', fakeAsync(() => {
    mockAuthService.authenticate.and.returnValue(of('token'));

    component.form.patchValue({ token: '123456' });
    tick(250);
    expect(component.loadingState).toBe(LoaderState.Done);

    component.form.patchValue({ token: '12345' });
    tick(250);
    expect(component.loadingState).toBe(LoaderState.Idle);
  }));

  it('should not have error message after construction', () => {
    expect(component.message).toBeNull();
  });

  it('is in idle state after construction', () => {
    expect(component.loadingState).toBe(LoaderState.Idle);
  });

  it("don't tries to authenticate when token is too short", fakeAsync(() => {
    mockAuthService.authenticate.and.returnValue(of('token'));
    component.form.patchValue({ token: '123' });
    tick(500);
    flushMicrotasks();
    expect(mockAuthService.authenticate).not.toHaveBeenCalled();
  }));

  it("don't tries to authenticate when token is too long", fakeAsync(() => {
    mockAuthService.authenticate.and.returnValue(of('token'));
    component.form.patchValue({ token: '1234567' });
    tick(500);
    flushMicrotasks();
    expect(mockAuthService.authenticate).not.toHaveBeenCalled();
  }));
});
