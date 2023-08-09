import { Component } from '@angular/core';
import { movies } from 'src/app/models/movies';
import { series } from 'src/app/models/series';
import { ActivatedRoute } from '@angular/router';
import { movieSelected } from 'src/app/models/movieselected';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  contenido: any
  nombreCategoria: string = ''
  buscar: any = ""
  resultados: any[] = [];
  titulo: string = "";
  modal = false;
  selected: movieSelected;
  code: string = "";
  url: string = ``;
  safeUrl: SafeResourceUrl;
  genero: string = '';
  pelicula: boolean = false;
  serie: boolean = false;
  generoOptionsPelicula: string[] = ["Comedia", "Terror", "Ficción", "Aventura", "Romance", "Fantasía", "Suspenso", "Acción", "Drama", "Ciencia ficción", ""];
  generoOptionsSerie: string[] = ["Fantasía", "Drama", "Crimen", "Comedia", "Romance", "Biografía", "Historia", "Terror", "Ciencia ficción", "Thriller", "Misterio", "Animación", "Acción", "Aventura", "Suspenso", ""];

  constructor(private routeActivate: ActivatedRoute, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.routeActivate.params.subscribe(params => {
      this.nombreCategoria = params['tipo'];

      if (this.buscar === "") {
        this.resultados = []
      }

      if (this.nombreCategoria === "pelicula") {
        this.contenido = movies
        this.titulo = "Películas"
        this.pelicula = true
        this.serie = false
        this.genero = ""
      } else {
        this.contenido = series
        this.titulo = "Series"
        this.pelicula = false
        this.serie = true
        this.genero = ""
      }
    });

  }
  busqueda() {

    if (this.buscar !== "" && this.genero === "") {
      this.resultados = this.contenido.filter((item: any) => {
        return (
          item.titulo.toLowerCase().includes(this.buscar.toLowerCase()) ||
          item.descripcion.toLowerCase().includes(this.buscar.toLowerCase())
        );
      });
    } else {
      this.resultados = []
    }

    if (this.buscar !== "" && this.genero !== "") {
      this.resultados = this.contenido.filter((item: any) => {
        return (
          item.titulo.toLowerCase().includes(this.buscar.toLowerCase()) && item.genero.includes(this.genero)
        );
      });
    }

    setTimeout(() => {
      if (this.buscar === '') {
        this.resultados = this.contenido.filter((item) => {
          return item.genero.includes(this.genero);
        });
      }
    }, 100)
  }

  verPelicula(pelicula: movieSelected) {
    this.modal = true;
    this.selected = pelicula
    this.code = pelicula.trailer;
    this.url = `https://www.youtube.com/embed/${this.code}`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
  closeModal() {
    this.modal = false
  }

  seleccionarGenero(generoOption: string) {
    this.genero = generoOption;
    this.busqueda();
  }

}
