import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';


//matrial angular
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';



import { MapaComponent } from './component/mapa/mapa.component';
import { FooterComponent } from './component/footer/footer.component';
import { UpdatepasswordComponent } from './modals/updatepassword/updatepassword.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminDashboardComponent,
    MapaComponent,
    FooterComponent,
    UpdatepasswordComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule
  ],
    providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
