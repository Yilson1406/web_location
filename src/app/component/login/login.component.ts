import { AuthService } from './../../services/auth.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formlogin:FormGroup;
  texto:boolean=true;
  spiner:boolean = false;
  mensaje:string ='';
  viewmensaje : boolean = false;

  constructor(private fb:FormBuilder,
              private _auth:AuthService,
              private router:Router) {
    this.formlogin = this.fb.group({
      email:['',[
        Validators.pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/),
        Validators.required]],
      password:['',Validators.required]
    })
   }

  ngOnInit(): void {

  }
  login(){
    this.texto=false;
    this.spiner = true
    this._auth.login(this.formlogin.value).then(datos=>{


      setTimeout(() => {

          if(datos.estado){
            localStorage.setItem('SEED-ESME', JSON.stringify({Token:datos.Token,rol:datos.rol}));
            if(datos.rol == 'USER'){
              this.router.navigate(['/user'])
            }if (datos.rol == 'ADMIN') {
              this.router.navigate(['/admin'])
            }
          }else{
            this.texto=true;
            this.spiner = false
            this.viewmensaje = true
            this.mensaje ='Usuario no Existe'
            setTimeout(() => {
              this.viewmensaje = false
            }, 2000);
          }

      }, 2000);

      // console.log(datos);


    }).catch(error=>{

      setTimeout(() => {
        this.texto=true;
        this.spiner = false
        if (error.status === 400) {
          this.viewmensaje = true
          this.mensaje =error.error.Mensaje;
//          console.log('error',error.error.Mensaje);
        }if(error.status === 504){
          console.log('error de api');

        }
      }, 2000);

      setTimeout(() => {
        this.viewmensaje = false
      }, 7000);


    })
  }

}
