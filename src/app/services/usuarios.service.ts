import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Login } from '../models/login.model';
import { Users } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  urlbase:string='/api/';
  localstora:any =localStorage.getItem('SEED-ESME');
  token:any = JSON.parse(this.localstora);
  headers = new HttpHeaders(
    {
    'Token':this.token.Token
    })

  constructor(private httclient:HttpClient) {


   }

  updatepassword(password:any):Promise<any>{

    let objeto = {
      password : password.password1,
      passback: password.passback
    }

    let ruta = this.urlbase + "password";
    return this.httclient.put(ruta,objeto,{headers:this.headers}).toPromise();
    // console.log(ruta);

  }
  getusertoken():Observable<Users>{
   let ruta = this.urlbase + "users";
   return this.httclient.get<Users>(ruta,{headers: this.headers});
  }

  getlocationusertoken():Observable<Users>{
    let ruta = this.urlbase + "users/location";
    return this.httclient.get<Users>(ruta,{headers: this.headers});
   }

}
