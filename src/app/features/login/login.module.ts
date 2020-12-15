import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from './pages/login/login.page';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [LoginPage],
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule, CoreModule]
})
export class LoginModule {}
