import { Users } from './../../models/user.models';
import { UsuariosService } from './../../services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UpdatepasswordComponent } from 'src/app/modals/updatepassword/updatepassword.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
  providers:[UsuariosService]
})
export class MapaComponent implements OnInit {

  latitud:number;
  longitud:number;
  users:Users[];
  user:string=''

 constructor(public dialog: MatDialog, private _users:UsuariosService,private router: Router){
   this.latitud=0.9875287;
   this.longitud=-79.6545162
   this.users = [];
 }

  ngOnInit(){
    this.getusers();


    (mapboxgl as any).accessToken = environment.mapboxgl;
  var mapa = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: [this.longitud,this.latitud], // starting position [lng, lat]
zoom: 16   // starting zoom
});

mapa.addControl(new mapboxgl.NavigationControl());
// Set marker options.
let marker = new mapboxgl.Marker({
  color: "#152329",
  draggable: false
}).setLngLat([this.longitud,this.latitud])
  .addTo(mapa);

  }

  logout(){
    setTimeout(() => {
      localStorage.removeItem('SEED-ESME');
      this.router.navigate(['/login'])
    }, 3000);
  }

getusers(){

  this._users.getusertoken().subscribe(datos =>{
    this.users.push(datos)
    this.user = datos.nombres;
    // console.log(this.users);

  })
}
  openDialog() {
    this.dialog.open(UpdatepasswordComponent,{
      data:'julio'
    });
  }

}
