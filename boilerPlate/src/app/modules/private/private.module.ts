import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateLayoutComponent } from './private-layout/private-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PrivateLayoutComponent],
  imports: [CommonModule, PrivateRoutingModule, SharedModule],
})
export class PrivateModule {}
