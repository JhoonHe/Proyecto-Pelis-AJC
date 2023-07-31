import { Component } from '@angular/core';
import { movies } from 'src/app/models/movies';
import { series } from 'src/app/models/series';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  contenido: any = movies.concat(series);
  buscar: any;
  resultados: any[] = [];

  constructor(private router: Router) {

  }

  busqueda() {

    if (this.buscar !== "") {
      this.resultados = this.contenido.filter((pelicula: any) =>
        pelicula.titulo.toLowerCase().includes(this.buscar.toLowerCase()) || pelicula.descripcion.toLowerCase().includes(this.buscar.toLowerCase())
      );
    } else {
      this.resultados = []

    }

  }

  verPelicula(id: string) {
    console.log(id);
    this.router.navigate(['/detalle', id]);
  }
}
