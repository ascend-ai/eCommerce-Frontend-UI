import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageModsRoutingModule } from './manage-mods-routing.module';
import { ManageModsComponent } from './manage-mods.component';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [
    ManageModsComponent
  ],
  imports: [
    CommonModule,
    ManageModsRoutingModule,
    SharedModule
  ]
})
export class ManageModsModule { }
