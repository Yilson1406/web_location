import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from './../../services/usuarios.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.scss']
})
export class UpdatepasswordComponent implements OnInit {
  mensaje:string = '';
  form: FormGroup;
  spiner:boolean=false;
  texto:boolean=true;
  viewmensaje:boolean=false;
  constructor(public dialogRef: MatDialogRef<UpdatepasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private _user:UsuariosService,
    private fb: FormBuilder,
    private _router:Router) {
      this.form = this.fb.group({
        password1:['', Validators.required],
        password2:['',Validators.required],
        passback:['',Validators.required]

      })
     }

  ngOnInit(): void {

  }
  update(){
    // console.log(this.form.value.password1);
    this.spiner=true
    this.texto = false

    // console.log(this.form.value);
    if ( this.form.value.password1 == this.form.value.password2 ) {
    // this.mensaje = 'si coniciden';
    //   console.log(this.mensaje);

      this._user.updatepassword(this.form.value)
    .then(()=>{

      setTimeout(() => {
        this.dialogRef.close();
        localStorage.removeItem('SEED-ESME');
        this._router.navigate(['/login'])
      }, 3000);

      // console.log(datos);

    })
    .catch(error=>{
      setTimeout(() => {
        this.mensaje =error.error.Mensaje;
        this.viewmensaje = true;
        this.spiner = false
        this.texto = true
      }, 2000);
      setTimeout(() => {
        this.viewmensaje = false
      }, 5000);


    })
    } else {
      setTimeout(() => {
        this.mensaje = 'Su Password no coninciden';
        this.viewmensaje = true;
        this.spiner = false
        this.texto = true
      }, 2000);
      setTimeout(() => {
        this.viewmensaje = false
      }, 5000);


    }


  }

}
