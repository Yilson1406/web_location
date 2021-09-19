
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { MapaComponent } from './component/mapa/mapa.component';



const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminDashboardComponent},
  {path:'user',component:MapaComponent},
  {path:'**',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
