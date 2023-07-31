import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  series: any = "serie"
  pelicula: any = "pelicula"

  constructor(private router: Router) {

  }

  filtrar(tipo: string) {
    this.router.navigate(["/categoria", tipo])
  }
}
