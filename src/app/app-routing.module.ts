import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './Components/menu/menu.component';
import { CocinaComponent } from './Components/cocina/cocina.component';

const routes: Routes = [
  {path:'',component:MenuComponent,pathMatch:'full'},
  {path:'menu',component:MenuComponent,pathMatch:'full'},
  {path:'cocina',component:CocinaComponent,pathMatch:'full'},
  {path: '**', redirectTo: '/menu', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
