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
  loca:any
  notlocation:boolean=false

 constructor(public dialog: MatDialog, private _users:UsuariosService,private router: Router){
   this.latitud=0;
   this.longitud=0
   this.users = [];
 }

  ngOnInit(){
    this.getusers();
    this.getlocation();




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
getlocation(){
  this._users.getlocationusertoken().subscribe(locations=>{
    this.loca =locations;
    if(!this.loca[0]){
      this.notlocation = true;
      (mapboxgl as any).accessToken = environment.mapboxgl;
      var mapa = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-79.009094,-1.5908848], // starting position [lng, lat]
    zoom: 6   // starting zoom
    });
    mapa.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
      })
      );
    mapa.addControl(new mapboxgl.NavigationControl());
    }else{

      this.longitud = this.loca[0].longitud;
      this.latitud = this.loca[0].latitud;
      // console.log(this.latitud,this.longitud);

      (mapboxgl as any).accessToken = environment.mapboxgl;
      var mapa = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [this.latitud,this.longitud], // starting position [lng, lat]
    zoom: 16   // starting zoom
    });
    mapa.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
      })
      );
    mapa.addControl(new mapboxgl.NavigationControl());
    // Set marker options.
    let marker = new mapboxgl.Marker({
      color: "#152329",
      draggable: false
    }).setLngLat([this.latitud,this.longitud])
      .addTo(mapa);

    }





  })
}
  openDialog() {
    this.dialog.open(UpdatepasswordComponent,{
      data:'julio'
    });
  }

}
