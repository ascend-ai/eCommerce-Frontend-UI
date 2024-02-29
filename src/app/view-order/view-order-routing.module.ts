import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  ViewOrderComponent
} from './view-order.component';

const routes: Routes = [
  { path: '', component: ViewOrderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewOrderRoutingModule { }
