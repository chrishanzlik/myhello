import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule, CoreModule]
})
export class LoginModule {}
