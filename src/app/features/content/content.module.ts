import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './pages/home/home.page';
import { ContentRoutingModule } from './content-routing.module';

@NgModule({
  declarations: [HomePage],
  imports: [CommonModule, ContentRoutingModule]
})
export class ContentModule {}
