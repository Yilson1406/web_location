import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlbase:string='/api/';
  constructor(private httclient:HttpClient) { }
  login(form:Login):Promise<any>{
    // const headers = new HttpHeaders({
    //   'Token':JSON.stringify(localStorage.getItem('SEED-ESME'))
    // })
    let ruta = this.urlbase + "auth";
    return this.httclient.post<any>(ruta,form).toPromise();
  }
}
