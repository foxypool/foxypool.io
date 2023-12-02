import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import {PoolListComponent} from './pool-list/pool-list.component'
import {GettingStartedComponent} from './getting-started/getting-started.component'

const routes: Routes = [
  { path: '', component: GettingStartedComponent, pathMatch: 'full' },
  { path: 'pools', component: PoolListComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
