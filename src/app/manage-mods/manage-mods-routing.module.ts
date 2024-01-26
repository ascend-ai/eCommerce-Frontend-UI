import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  ManageModsComponent
} from './manage-mods.component';

const routes: Routes = [
  { path: '', component: ManageModsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageModsRoutingModule { }
