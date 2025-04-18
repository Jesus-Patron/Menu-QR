import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './Components/menu/menu.component';

const routes: Routes = [
  {path:'',component:MenuComponent,pathMatch:'full'},
  {path:'menu',component:MenuComponent,pathMatch:'full'},
  {path: '**', redirectTo: '/menu', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
