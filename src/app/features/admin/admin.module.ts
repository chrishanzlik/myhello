import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelPage } from './pages/control-panel/control-panel.page';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [ControlPanelPage],
  imports: [CommonModule, AdminRoutingModule]
})
export class AdminModule {}
