import { Component, OnInit } from '@angular/core';
import { movies } from 'src/app/models/movies';
import { series } from 'src/app/models/series';
import { movieSelected } from 'src/app/models/movieselected';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  contenido: any = movies.concat(series);
  buscar: any = '';
  resultados: any[] = [];
  modal = false;
  selected: movieSelected;
  code: string = "";
  url: string = ``;
  safeUrl: SafeResourceUrl;
  genero: string = '';
  generoOptions: string[] = [
    "Comedia", "Terror", "Ficción", "Aventura", "Romance", "Fantasía", "Drama",
    "fantasia", "Suspenso", "Acción", "Crimen", "Biografía", "Historia",
    "Ciencia ficción", "Thriller", "Misterio", "Animación", ""
  ];


  constructor(private sanitizer: DomSanitizer) {

  }
  
  ngOnInit(): void {
      this.resultados = this.contenido;
  }
  
  busqueda() {
    if (this.buscar !== "" && this.genero === "") {
      this.resultados = this.contenido.filter((item: any) => {
        return (
          item.titulo.toLowerCase().includes(this.buscar.toLowerCase()) ||
          item.descripcion.toLowerCase().includes(this.buscar.toLowerCase())
        );
      });
    }
    else {
      this.resultados = [];
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
      if (this.genero === "" && this.buscar === ""){
      this.resultados = this.contenido;
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
