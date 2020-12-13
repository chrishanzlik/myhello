import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from './pages/control-panel/control-panel.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [ControlPanelComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
