import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
guardado:any
constructor(private router:Router){

}
  ngOnInit() {

    this.guardado = localStorage.getItem('SEED-ESME');

    let user =JSON.parse(this.guardado);



  if (user == null) {
    this.router.navigate(['/login'])
  }else{
    if(user.rol == 'User'){
      this.router.navigate(['/user'])
    }
    if (user.rol == 'ADMIN') {
      this.router.navigate(['/admin'])
    }
  }


  }
}
