import { Component } from '@angular/core';
import { movies } from 'src/app/models/movies';
import { series } from 'src/app/models/series';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  contenido: any
  nombreCategoria: string = ''
  buscar: any
  resultados: any[] = [];

  constructor(private routeActivate: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.routeActivate.params.subscribe(params => {
      this.nombreCategoria = params['tipo'];

      if (this.buscar === "") {
        this.resultados = []
      }

      if (this.nombreCategoria === "pelicula") {
        this.contenido = movies
      } else {
        this.contenido = series
      }
    });

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

}
